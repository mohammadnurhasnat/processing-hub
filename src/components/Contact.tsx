import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, CheckCircle, ChevronDown } from 'lucide-react';
import { useState, FormEvent } from 'react';

const SERVICES_LIST = [
  'Tourist Visa Support',
  'Medical Visa Fast-Track',
  'Double Entry Visa Support',
  'Business Visa Support',
  'Visa Documentation Assistance',
  'Emergency Visa Assistance',
  'Air Ticketing',
  'Tour Package',
  'Others'
];

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Tourist Visa Support');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        <div className="bg-blue-600 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-600/20 border border-blue-500/50 group/card">
          {/* Abstract Premium Decorations */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-400 rounded-full -mr-36 -mt-36 mix-blend-screen filter blur-3xl opacity-40 group-hover/card:scale-105 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-800 rounded-full -ml-36 -mb-36 mix-blend-multiply filter blur-3xl opacity-50 group-hover/card:scale-105 transition-transform duration-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-cyan-400 rounded-full filter blur-2xl opacity-25"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Contact Info (Takes 5 cols) */}
            <div className="lg:col-span-5 p-8 md:p-14 lg:p-16 text-white flex flex-col justify-between relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight leading-tight font-display">
                  Ready to Book Your <br />
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
                    Next Journey?
                  </span>
                </h2>
                <p className="text-blue-100 text-base md:text-lg mb-8 max-w-md font-light leading-relaxed">
                  Get in touch with our travel experts for a free consultation. We'll help you plan the perfect trip and handle all documentation.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4 group/item cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0 group-hover/item:bg-white group-hover/item:text-blue-600 group-hover/item:scale-105 transition-all duration-300 shadow-inner">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase tracking-widest font-bold">Call Us</p>
                      <p className="text-base md:text-lg font-bold group-hover/item:text-cyan-100 transition-colors">+09643848934</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group/item cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0 group-hover/item:bg-white group-hover/item:text-blue-600 group-hover/item:scale-105 transition-all duration-300 shadow-inner">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase tracking-widest font-bold">Email Us</p>
                      <p className="text-base md:text-lg font-bold group-hover/item:text-cyan-100 transition-colors">visaprocessinghub@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group/item cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0 group-hover/item:bg-white group-hover/item:text-blue-600 group-hover/item:scale-105 transition-all duration-300 shadow-inner">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase tracking-widest font-bold">Visit Us</p>
                      <p className="text-base md:text-lg font-bold group-hover/item:text-cyan-100 transition-colors leading-snug">Level: 3/A, Jamuna Future Park, Dhaka-1229</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-3.5">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center hover:bg-white text-white hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 border border-white/10 shadow-sm">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form (Takes 7 cols on lg) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 md:p-12 lg:p-14 m-4 md:m-6 rounded-[2.5rem] border border-blue-100/50 shadow-2xl shadow-blue-950/10 transition-all duration-300">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
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
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name" 
                          className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-blue-500 focus:bg-white text-gray-950 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none placeholder-gray-400 text-sm font-medium" 
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
                          className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-blue-500 focus:bg-white text-gray-950 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none placeholder-gray-400 text-sm font-medium" 
                        />
                      </div>
                    </div>
                     <div className="space-y-1.5 relative">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Service Type</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-blue-500 focus:bg-white text-gray-950 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-semibold flex justify-between items-center cursor-pointer shadow-sm min-h-[48px]"
                        >
                          <span>{service}</span>
                          <ChevronDown size={18} className={`text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                          <>
                            {/* Overlay backdrop to handle click-outside closing */}
                            <div 
                              className="fixed inset-0 z-40 bg-transparent" 
                              onClick={() => setIsDropdownOpen(false)}
                            />
                            
                            {/* Dropdown list container */}
                            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden py-1 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                              {SERVICES_LIST.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setService(option);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                                    service === option
                                      ? 'bg-blue-50 text-blue-600'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  <span>{option}</span>
                                  {service === option && (
                                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Message (Optional)</label>
                      <textarea 
                        rows={3} 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your passport details, travel plans, or any special requests..." 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-blue-500 focus:bg-white text-gray-950 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none placeholder-gray-400 text-sm font-medium"
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 hover:scale-[1.01]"
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
