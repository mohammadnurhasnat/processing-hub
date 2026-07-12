import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50/40 via-white to-white pt-28 pb-16 md:pt-36 md:pb-20 border-b border-gray-100 overflow-hidden">
      {/* Background ambient lighting/blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-cyan-50/40 rounded-full filter blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Elegant typography & action elements */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Processing Hub
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight font-display"
            >
              Borderless Possibilities <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Seamless Processing</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Your trusted partner for Indian visa applications. We specialize in fast-track medical, tourist, and business visas with expert documentation support.
            </motion.p>

            {/* Quick trust list items to feel highly human-designed */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2.5 text-sm text-gray-500 font-medium pt-2"
            >
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-blue-500" /> No Hidden Charges</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-blue-500" /> 24/7 Priority Support</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a 
                href="#services" 
                className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md"
              >
                Explore Services
                <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-[18px] sm:h-[18px]" size={18} />
              </a>
              <a 
                href="https://wa.me/8801332601510" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto bg-[#25D366] text-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-sm text-center cursor-pointer"
              >
                WhatsApp Support
              </a>
            </motion.div>
          </div>

          {/* Right Side: Elegant split-visual card with overlay elements */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0 px-4 md:px-0">
            {/* Background geometric accents */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-100 rounded-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-cyan-100 rounded-full -z-10 filter blur-xl opacity-75"></div>
            
            {/* Main Visual Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl shadow-blue-900/10 h-[360px] md:h-[420px] group bg-gray-100"
            >
              <img 
                src="/src/assets/images/hero_travel_bg_1783353196036.jpg" 
                alt="Indian Tourism Travel Scenic" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent"></div>
              
              {/* Overlay Glass Badge 1 - Top Left */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-100/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-base">100%</div>
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Proper</p>
                  <p className="text-xs font-bold text-gray-800 leading-none mt-0.5">Documentation</p>
                </div>
              </div>

              {/* Overlay Glass Badge 2 - Bottom Right */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-100/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base">4k+</div>
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Happy Clients</p>
                  <p className="text-xs font-bold text-gray-800 leading-none mt-0.5">Across BD</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4 Sleek Minimalist Statistics Inline Cards to keep height thin and responsive */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mt-16 pt-12 border-t border-gray-100/80"
        >
          {[
            { label: 'Happy Clients', value: '4k+', desc: '' },
            { label: 'Accurate guidelines', value: '100%', desc: '' },
            { label: 'Tours Covered', value: '10+', desc: '' },
            { label: 'Years Experience', value: '4+', desc: '' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.03)] hover:border-blue-100/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl md:text-3xl font-black text-blue-600 tracking-tight font-display">{stat.value}</div>
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
              <div className="text-[11px] text-gray-400 font-medium leading-tight mt-1.5">{stat.desc}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
