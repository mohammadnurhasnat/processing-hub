import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Plane, PhoneCall } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScrollEvent = () => {
      const sections = ['home', 'services', 'packages', 'contact'];
      let current = 'home';
      
      for (const section of sections) {
        if (section === 'home') {
           if (window.scrollY < 200) {
             current = 'home';
           }
        } else {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the top of the section is somewhat above the middle of the viewport
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
              current = section;
            } else if (rect.top <= window.innerHeight / 3) {
                // Keep evaluating later sections to see if they are active
                current = section;
            }
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScrollEvent);
    // Trigger once on mount
    handleScrollEvent();
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', target: '#' },
    { id: 'services', label: 'Visa Services', target: '#services' },
    { id: 'packages', label: 'Indian Tours', target: '#packages' },
    { id: 'contact', label: 'Contact', target: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 font-display transition-colors">
              Processing <span className="text-blue-600">Hub</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={link.target} 
                onClick={(e) => handleScroll(e, link.target)} 
                className={`font-medium transition-colors relative py-2 ${activeSection === link.id ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-[26px] left-0 right-0 h-[3px] bg-blue-600 rounded-t-full"
                  />
                )}
              </a>
            ))}
            
            <button 
              onClick={onOpenAdmin} 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
            >
              Admin Panel
            </button>
            
            <a href="tel:+8801332601510" className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/15 text-xs md:text-sm ml-2">
              <PhoneCall size={14} className="md:w-4 md:h-4" />
              Call Support
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2 hover:bg-gray-100/50 rounded-xl transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-72 bg-white/90 backdrop-blur-xl border-l border-white/40 shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setIsOpen(false)} className="text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center px-6 pb-6 space-y-4 overflow-y-auto w-full">
                {navLinks.map((link, index) => (
                  <motion.a 
                    key={link.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    href={link.target} 
                    onClick={(e) => { setIsOpen(false); handleScroll(e, link.target); }} 
                    className={`font-semibold text-lg py-3 border-l-4 rounded-r-xl w-full max-w-[240px] px-6 transition-colors shadow-sm ${activeSection === link.id ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-transparent text-gray-800 bg-white hover:bg-gray-50 border-gray-100'}`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.button 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.3 }}
                  onClick={() => { setIsOpen(false); onOpenAdmin?.(); }} 
                  className="text-gray-800 font-semibold text-lg py-3 border-l-4 border-transparent bg-white rounded-r-xl w-full max-w-[240px] px-6 hover:bg-gray-50 transition-colors cursor-pointer text-left shadow-sm"
                >
                  Admin Panel
                </motion.button>

                <motion.a 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + navLinks.length * 0.05, duration: 0.3 }}
                  href="tel:+8801332601510" 
                  onClick={() => setIsOpen(false)} 
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 w-full max-w-[240px] mt-6 text-sm"
                >
                  <PhoneCall size={16} />
                  Call Support
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
