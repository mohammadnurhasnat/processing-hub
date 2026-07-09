import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, CheckCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Visa Processing');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill out Name and Phone number");
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, service, message }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setPhone('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-600/15 border border-blue-500">
          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full -mr-48 -mt-48 mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full -ml-48 -mb-48 mix-blend-multiply filter blur-3xl opacity-50"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="p-8 md:p-16 lg:p-20 text-white flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">Ready to Book Your <br />Next Journey?</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-md font-light leading-relaxed">
                  Get in touch with our travel experts for a free consultation. We'll help you plan the perfect trip and handle all documentation.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase tracking-widest font-bold">Call Us</p>
                      <p className="text-lg font-semibold">+09643848934</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase tracking-widest font-bold">Email Us</p>
                      <p className="text-lg font-semibold">visaprocessinghub@hmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase tracking-widest font-bold">Visit Us</p>
                      <p className="text-lg font-semibold leading-snug">Level: 3/A, Jamuna Future Park, Dhaka-1229</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white text-white hover:text-blue-600 transition-all border border-white/10 shadow-sm">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 md:p-14 lg:p-16 m-4 md:m-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/10 transition-all">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {status === 'success' ? (
                  <div className="h-full py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-200">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-500 max-w-sm">
                      Thank you for contacting Visa Processing Hub. Our specialist will call you very shortly.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name" 
                          className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-200/80 focus:border-blue-500 focus:bg-white text-gray-900 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none placeholder-gray-400 text-sm font-medium" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contact phone number" 
                          className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-200/80 focus:border-blue-500 focus:bg-white text-gray-900 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none placeholder-gray-400 text-sm font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Service Type</label>
                      <div className="relative">
                        <select 
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-200/80 focus:border-blue-500 focus:bg-white text-gray-900 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none text-sm font-medium"
                        >
                          <option>Visa Processing</option>
                          <option>Air Ticketing</option>
                          <option>Tour Package</option>
                          <option>Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Message (Optional)</label>
                      <textarea 
                        rows={3} 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your passport details, travel plans, or any special requests..." 
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-200/80 focus:border-blue-500 focus:bg-white text-gray-900 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none placeholder-gray-400 text-sm font-medium"
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                      <Send size={16} />
                    </button>
                    {status === 'error' && (
                      <p className="text-sm text-red-500 font-semibold text-center mt-2">Failed to send message. Please check internet connection.</p>
                    )}
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
