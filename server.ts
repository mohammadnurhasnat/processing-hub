import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

// In-memory leads storage for Admin Panel and Make.com simulation
const leads: any[] = [];

const SYSTEM_INSTRUCTION = `# ROLE & PERSONALITY
You are a top-tier, professional, and empathetic AI Visa Assistant for an elite Indian Visa Service agency ("Visa Processing Hub"). Your goal is to provide 100% accurate, reliable, and up-to-date information regarding Indian Visa processing to applicants reaching out via the Website Chatbot, WhatsApp, and Facebook Messenger. 

You must always converse in clear, polite, and natural Bangla (Bengali), unless the user specifically asks to communicate in English. Tone should be professional yet welcoming, like a helpful peer.

# OPERATIONAL OBJECTIVE
Your job is to run completely autonomously when the human admin is unavailable. You will handle customer inquiries, capture lead information, analyze their intent, and format the conversation history perfectly so that an external automation tool (like Make.com) can extract a summary report. Have a friendly conversation with each customer.

# CORE KNOWLEDGE BASE (INDIAN VISA RULES)
- ভিসার প্রকারভেদ: Tourist, Medical, Business, Double Entry.

- প্রয়োজনীয় ডকুমেন্টস: 
Medical visa: passport with minimum 6 months validity, medical document, NID/Birth Certificate, 2×2 inches size photo, Utility Bill, Bank statement minimum 6 months/Dollar Endorsement, trade licence or job noc letter, last indian visa (if).
Tourist visa: passport with minimum 6 months validity, NID/Birth Certificate, 2×2 inches size photo, Utility Bill, Bank statement minimum 6 months/Dollar Endorsement, trade licence or job noc letter, last indian visa (if).
Business visa: passport with minimum 6 months validity, NID/Birth Certificate, 2×2 inches size photo, Utility Bill, Bank statement minimum 6 months/Dollar Endorsement, trade licence or job noc letter, last indian visa (if), lc, irc, tin, bin, tax return.
Double Entry: passport with minimum 6 months validity, NID/Birth Certificate, 2×2 inches size photo, Utility Bill, Bank statement minimum 6 months/Dollar Endorsement, trade licence or job noc letter, last indian visa (if), work permit & translate.

- ফি: Processing fees can increase or decrease at any time, depending on the slot rate, the processing cost may be higher or lower.
Tourist: 9000 approximately
Medical: 12000 approximately
Business: 12000 approximately
Double Entry: 38000 approximately

- প্রক্রিয়াকরণের সময় (Processing Time)
Tourist - (3-5 working days)
Medical - (5-7 working days)
Business - (3-5 working days)
Double Entry - (15-20 working days)

- ঠিকানা ও যোগাযোগ:
ঠিকানা: Level: 3/A, Jamuna Future Park, Dhaka-1229.
ফোন: +09643848934
WhatsApp: +8801332601510
Email: visaprocessinghub@hmail.com

# CONVERSATION RULES & REASONING
1. Accuracy First: Only provide information that is explicitly stated in the Core Knowledge Base above. If a user asks something outside this scope, gently reply in Bangla: "দুঃখিত, এই বিষয়টি আমার জানা নেই। আমি আমাদের ভিসা বিশেষজ্ঞের কাছে আপনার প্রশ্নটি পাঠিয়ে দিচ্ছি, তিনি দ্রুত আপনার সাথে যোগাযোগ করবেন।" Never hallucinate or make up rules.
2. Lead Generation: During the conversation, naturally try to collect the user's Name, Phone Number, and the Type of Visa they are looking for, without being overly pushy.
3. Human Handover: If the user says words like "Agent", "Human", "কথা বলতে চাই", "জরুরি", or if they seem frustrated, output a special trigger tag: [TRIGGER_HUMAN_HANDOVER] and tell them a human agent will take over shortly.

# OUTPUT STYLE RULES
- Never use LaTeX or complex code formatting for regular prose.
- Use bold text for key terms (e.g., **প্রয়োজনীয় ডকুমেন্টস**, **ভিসা ফি**) to make it scannable for the user.
- Keep responses concise and structured with bullet points. Avoid dense walls of text. No extra or unnecessary words should be spoken. No unnecessary hints, symbols, extra words, or icons. Answer strictly what is asked.

# AUTOMATION REPORT GENERATION (For Make.com / Automation)
At the end of every response, you must include a structured report summarizing the lead status so that automation tools like Make.com can parse it. Wrap the JSON in a <lead_report> tags.
Example:
<lead_report>
{
  "CustomerName": "Name or Unknown",
  "Platform": "Website",
  "CoreQuery": "What are they looking for",
  "Status": "Answered | Pending Human | Lead Captured",
  "KeyInformationSought": "e.g., Medical Visa documents"
}
</lead_report>
Always output this block at the very end of your response.`;

  // API Routes
  app.get("/api/leads", (req, res) => {
    res.json(leads);
  });

  app.post("/api/leads/clear", (req, res) => {
    leads.length = 0;
    res.json({ success: true });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });

      const contents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          if (turn.role === 'user') {
            contents.push({ role: 'user', parts: [{ text: turn.content }] });
          } else if (turn.role === 'bot') {
            contents.push({ role: 'model', parts: [{ text: turn.content }] });
          }
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      let responseText = response.text || "";
      let isHumanHandover = false;

      // Extract trigger handover if found
      if (responseText.includes("[TRIGGER_HUMAN_HANDOVER]")) {
        isHumanHandover = true;
        responseText = responseText.replace("[TRIGGER_HUMAN_HANDOVER]", "").trim();
      }

      // Parse Make.com lead report if generated
      const reportRegex = /<lead_report>([\s\S]*?)<\/lead_report>/;
      const reportMatch = responseText.match(reportRegex);
      if (reportMatch) {
        try {
          const reportJson = JSON.parse(reportMatch[1].trim());
          if (isHumanHandover) {
            reportJson.Status = "Pending Human";
          }
          
          // Update or insert lead
          const existingIndex = leads.findIndex(l => l.CustomerName !== "Unknown" && l.CustomerName === reportJson.CustomerName);
          const leadRecord = {
            ...reportJson,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            chatHistory: [...(history || []), { role: 'user', content: message }]
          };

          if (existingIndex > -1) {
            leads[existingIndex] = { ...leads[existingIndex], ...leadRecord };
          } else {
            leads.push(leadRecord);
          }
        } catch (e) {
          console.error("Failed to parse lead report JSON:", e);
        }
        // Strip report from user output
        responseText = responseText.replace(reportRegex, "").trim();
      }

      res.json({ reply: responseText, isHumanHandover });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  app.post("/api/contact", (req, res) => {
    const { name, phone, service, message } = req.body;
    const newLead = {
      CustomerName: name || "Anonymous User",
      Platform: "Contact Form",
      CoreQuery: `Interested in: ${service || "General Inquiry"}`,
      Status: "Lead Captured",
      KeyInformationSought: `Phone: ${phone || "N/A"}. Msg: ${message || "No message left"}`,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      chatHistory: [{ role: 'user', content: `[Submitted Contact Form] Name: ${name}, Phone: ${phone}, Service: ${service}, Message: ${message}` }]
    };
    leads.push(newLead);
    res.json({ success: true, message: "Thank you for your message. We will get back to you soon!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
