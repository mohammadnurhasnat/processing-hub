import { motion } from 'motion/react';
import { Menu, X, Plane, PhoneCall } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/10">
              <Plane className="text-white w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 font-display transition-colors">
              Visa Processing <span className="text-blue-600">Hub</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="#services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Visa Services</a>
            <a href="#packages" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Indian Tours</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
            <button 
              onClick={onOpenAdmin} 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
            >
              Admin Panel
            </button>
            
            <a href="tel:+09643848934" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/15 text-sm">
              <PhoneCall size={16} />
              Call Support
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2 hover:bg-gray-50 rounded-xl transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 shadow-xl transition-colors duration-300"
        >
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <a href="#" onClick={() => setIsOpen(false)} className="text-gray-600 font-semibold py-2.5 border-b border-gray-50">Home</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="text-gray-600 font-semibold py-2.5 border-b border-gray-50">Visa Services</a>
            <a href="#packages" onClick={() => setIsOpen(false)} className="text-gray-600 font-semibold py-2.5 border-b border-gray-50">Indian Tours</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-600 font-semibold py-2.5 border-b border-gray-50">Contact</a>
            <button 
              onClick={() => { setIsOpen(false); onOpenAdmin?.(); }} 
              className="text-left text-gray-600 font-semibold py-2.5 border-b border-gray-50 cursor-pointer"
            >
              Admin Panel
            </button>

            <a href="tel:+09643848934" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-center mt-2 flex items-center justify-center gap-2">
              <PhoneCall size={18} />
              Call Support
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
