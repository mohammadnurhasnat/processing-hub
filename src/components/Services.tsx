import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import touristBg from '../assets/images/kashmir_landscape_1783697060091.jpg';
import medicalBg from '../assets/images/medical_visa_bg_1783696727614.jpg';
import doubleEntryBg from '../assets/images/double_entry_visa_bg_1783696759271.jpg';
import businessBg from '../assets/images/business_visa_bg_1783696744283.jpg';
import visaDocBg from '../assets/images/visa_documentation_bg_1783698581534.jpg';
import emergencyBg from '../assets/images/emergency_visa_bg_1783698597865.jpg';

const services = [
  {
    title: 'Tourist Visa',
    desc: 'General tourism and sightseeing visas for exploring the beauty of India.',
    color: 'bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white',
    image: touristBg,
    rates: { slot: '৳4,500', full: '৳6,000' }
  },
  {
    title: 'Medical Visa',
    desc: 'Specialized hospital + attendant visas with fast-track processing for urgent care.',
    color: 'bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-600 group-hover:text-white',
    image: medicalBg,
    rates: { slot: '৳5,000', full: '৳7,000' }
  },
  {
    title: 'Double Entry Visa',
    desc: 'Convenient double entry visas for embassy interviews and multiple visits.',
    color: 'bg-green-50 text-green-600 border border-green-100 group-hover:bg-green-600 group-hover:text-white',
    image: doubleEntryBg,
    rates: { slot: '৳13,000', full: '৳16,500' }
  },
  {
    title: 'Business Visa',
    desc: 'Official visas for business meetings, trade fairs, and international conferences.',
    color: 'bg-purple-50 text-purple-600 border border-purple-100 group-hover:bg-purple-600 group-hover:text-white',
    image: businessBg,
    rates: { slot: '৳5,000', full: '৳7,500' }
  },
  {
    title: 'Visa Documentation',
    desc: 'Professional assistance for all types of visa documentation and paperwork.',
    color: 'bg-orange-50 text-orange-600 border border-orange-100 group-hover:bg-orange-600 group-hover:text-white',
    image: visaDocBg,
    docRates: [
      { label: 'Tourist Visa', price: '৳1,500' },
      { label: 'Medical Visa', price: '৳2,000' },
      { label: 'Business Visa', price: '৳2,500' },
      { label: 'Double Entry Visa', price: '৳3,500' }
    ]
  },
  {
    title: 'Emergency Visa Assistance',
    desc: 'Urgent visa support for immediate travel requirements or emergency bookings.',
    color: 'bg-amber-50 text-amber-600 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white',
    image: emergencyBg
  }
];

export default function Services() {
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [selectedDocCategory, setSelectedDocCategory] = useState<string | null>(null);
  return (
    <section id="services" className="pt-32 pb-24 md:pt-36 md:pb-28 bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Our Core Services</span>
            </div>
            <p className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight font-display">
              Indian Visa Specialists
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We provide end-to-end support for all categories of Indian visa applications with guaranteed professional documentation and hassle-free processing.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden p-8 rounded-3xl border border-gray-200/90 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] hover:border-blue-200/90 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              {service.image && (
                <div 
                  className="absolute inset-0 z-0 opacity-15 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <div className="relative z-10">
                {service.title === 'Emergency Visa Assistance' && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 mb-3.5 w-fit border border-red-200/60 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span>24/7 Urgent Support</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight font-display group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed mb-4 text-sm mix-blend-multiply">
                  {service.desc}
                </p>

                {service.title === 'Emergency Visa Assistance' && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-700 font-medium leading-relaxed">
                    <div className="flex items-start gap-2 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/30">
                      <span className="text-sm shrink-0">⚡</span>
                      <span><strong>ইনস্ট্যান্ট রেসপন্স:</strong> ৫ থেকে ১৫ মিনিটের মধ্যে দ্রুত ফিডব্যাক।</span>
                    </div>
                    <div className="flex items-start gap-2 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/30">
                      <span className="text-sm shrink-0">🩺</span>
                      <span><strong>মেডিকেল এমার্জেন্সি সাপোর্ট:</strong> হাসপাতাল ইনভাইটেশন ও স্লট প্রসেসিংয়ে বিশেষ অগ্রাধিকার।</span>
                    </div>
                    <div className="flex items-start gap-2 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/30">
                      <span className="text-sm shrink-0">📄</span>
                      <span><strong>দ্রুত ডকুমেন্ট স্ক্রীনিং:</strong> কোনো ভুল এড়াতে আমাদের এক্সপার্ট দ্বারা ডকুমেন্টস দ্রুত যাচাই।</span>
                    </div>
                  </div>
                )}

                {service.rates && (
                  <div className="my-4 pt-4 border-t border-gray-200 space-y-2 mix-blend-multiply">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-semibold">Only Slot:</span>
                      <span className="font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">{service.rates.slot}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-semibold">Full Processing + Documentation:</span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{service.rates.full}</span>
                    </div>
                  </div>
                )}
                
                {service.docRates && (
                  <div className="my-4 pt-4 border-t border-gray-200 space-y-2 mix-blend-multiply">
                    <p className="text-xs text-gray-600 font-semibold mb-2">Only Documentation Rates:</p>
                    <div className="space-y-2">
                      {service.docRates.map((rate, idx) => {
                        const isSelected = selectedDocCategory === rate.label;
                        const handleSelect = () => {
                          setSelectedDocCategory(prev => prev === rate.label ? null : rate.label);
                        };
                        return (
                          <div 
                            key={idx} 
                            onClick={handleSelect}
                            className={`flex justify-between items-center text-xs p-2 rounded-xl border transition-all cursor-pointer ${
                              isSelected ? 'border-orange-400 bg-orange-50/70 font-bold shadow-sm shadow-orange-500/5' : 'border-gray-100 hover:bg-gray-50/80'
                            }`}
                          >
                            <span className="text-gray-700 flex items-center gap-2">
                              <input 
                                type="checkbox"
                                checked={isSelected}
                                onChange={handleSelect}
                                onClick={(e) => e.stopPropagation()}
                                className="h-3.5 w-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                              />
                              {rate.label}
                            </span>
                            <span className="font-extrabold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">{rate.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative z-10 flex items-center justify-between border-t border-gray-200 pt-4 mt-4 mix-blend-multiply gap-3">
                {service.title === 'Emergency Visa Assistance' ? (
                  <>
                    <a
                      href="https://wa.me/8801332601510?text=Hello%2C%20I%20need%20Emergency%20Indian%20Visa%20Assistance."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2.5 rounded-full transition-colors duration-300 shadow-md flex items-center justify-center cursor-pointer shrink-0"
                      title="Contact on WhatsApp"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                    <button 
                      onClick={() => setBookingService(service.title)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-md cursor-pointer shrink-0"
                    >
                      Book Now
                    </button>
                    <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs shrink-0">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>Expert Support</span>
                    </div>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        if (service.title === 'Visa Documentation' && !selectedDocCategory) return;
                        setBookingService(service.title);
                      }}
                      disabled={service.title === 'Visa Documentation' && !selectedDocCategory}
                      className={`text-xs font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md shrink-0 ${
                        service.title === 'Visa Documentation' && !selectedDocCategory
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60 shadow-none'
                          : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                      }`}
                    >
                      Book Now
                    </button>
                    <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs shrink-0">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>Expert Support</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {bookingService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-[260px] w-full p-4 overflow-hidden"
            >
              <h3 className="text-sm font-bold text-gray-900 mb-1">সার্ভিস বুকিং নিশ্চিতকরণ</h3>
              <p className="text-xs text-gray-600 mb-4">
                আপনি কি নিশ্চিত যে আপনি <strong>{bookingService === 'Visa Documentation' ? `${bookingService} (${selectedDocCategory})` : bookingService}</strong> বুক করতে চান?
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setBookingService(null)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                >
                  না (No)
                </button>
                <button
                  onClick={() => {
                    const bookingDetail = bookingService === 'Visa Documentation' ? `${bookingService} (${selectedDocCategory})` : bookingService;
                    window.dispatchEvent(new CustomEvent('TRIGGER_CHAT', { detail: `আমি ${bookingDetail} বুক করতে চাই` }));
                    setBookingService(null);
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-sm cursor-pointer"
                >
                  হ্যাঁ (Yes)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
