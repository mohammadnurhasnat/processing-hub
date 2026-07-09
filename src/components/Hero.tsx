import { motion } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
        style={{ backgroundImage: 'url("/src/assets/images/hero_travel_bg_1783353196036.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Visa Processing Hub
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Borderless Possibilities <br />
            <span className="text-blue-400">Seamless Processing</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Your trusted partner for Indian visa applications. We specialize in fast-track medical, tourist, and business visas with expert documentation support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a 
              href="#services" 
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/30"
            >
              Explore Services
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a 
              href="https://wa.me/8801332601510" 
              target="_blank" 
              rel="noreferrer" 
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/25 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 shadow-lg text-center"
            >
              WhatsApp Support
            </a>
          </div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: 'Happy Clients', value: '10k+' },
            { label: 'Visa Success', value: '98%' },
            { label: 'Countries Covered', value: '50+' },
            { label: 'Years Experience', value: '12+' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
