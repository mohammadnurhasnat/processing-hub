import { useState } from 'react';
import { MessageSquare, X, Send, Loader2, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function ChatWidget({ isOpen: propIsOpen, onClose, onOpen }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isOpen) {
      if (onClose) onClose();
      else setInternalIsOpen(false);
    } else {
      if (onOpen) onOpen();
      else setInternalIsOpen(true);
    }
  };

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHandover, setIsHandover] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: chatHistory 
        })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'bot', content: data.reply }]);
      if (data.isHumanHandover) {
        setIsHandover(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, { role: 'bot', content: 'দুঃখিত, সংযোগে কিছু সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed bottom-28 right-6 md:right-8 w-[calc(100vw-48px)] sm:w-[380px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col h-[520px] z-[100] transition-colors duration-300"
          >
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center shadow-lg shadow-blue-600/10">
              <div>
                <h3 className="font-bold text-lg font-display">Visa Hub AI Assistant</h3>
                <p className="text-blue-100 text-xs mt-0.5">সাধারণত তাৎক্ষণিক উত্তর দেয়</p>
              </div>
              <button 
                onClick={handleToggle} 
                className="hover:bg-white/10 p-2.5 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-slate-950/40">
              {chatHistory.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-slate-700">
                    <MessageSquare className="text-blue-600 dark:text-blue-400" size={28} />
                  </div>
                  <p className="text-gray-800 dark:text-slate-100 font-bold text-sm mb-1.5">আসসালামু আলাইকুম!</p>
                  <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed max-w-[240px] mx-auto">
                    ভিসা প্রসেসিং হাব-এ আপনাকে স্বাগতম। ইন্ডিয়ান ভিসা সংক্রান্ত যেকোনো প্রশ্ন আমাদের করতে পারেন।
                  </p>
                </div>
              )}
              {chatHistory.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    chat.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/5' 
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-tl-none border border-gray-100 dark:border-slate-800 shadow-sm'
                  }`}>
                    {chat.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-800 shadow-sm p-4 rounded-2xl rounded-tl-none">
                    <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={18} />
                  </div>
                </div>
              )}

              {isHandover && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-400 text-xs p-3.5 rounded-xl flex items-center gap-2">
                  <UserCheck size={16} className="text-amber-600 dark:text-amber-400" />
                  <span className="font-medium">একজন প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="ভিসা বা ডকুমেন্টস নিয়ে জিজ্ঞাসা করুন..."
                  className="flex-1 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none text-sm transition-all dark:text-white"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-md shadow-blue-600/10 flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
            isOpen 
              ? 'bg-gray-900 dark:bg-slate-800 text-white shadow-gray-900/10' 
              : 'bg-blue-600 text-white shadow-blue-600/35 hover:bg-blue-700'
          }`}
          title="AI Assistant Chat"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
    </>
  );
}
