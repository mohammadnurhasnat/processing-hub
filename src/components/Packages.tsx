import { motion } from 'motion/react';
import { Clock, MapPin, Star } from 'lucide-react';

const packages = [
  {
    title: 'Majestic Kashmir Valley',
    location: 'Srinagar, Gulmarg, Pahalgam',
    duration: '6 Days, 5 Nights',
    price: '৳35,000',
    image: 'https://images.unsplash.com/photo-1598305363304-16737aa11239?q=80&w=2000&auto=format&fit=crop',
    rating: 4.9,
    reviews: 128
  },
  {
    title: 'Royal Rajasthan Heritage',
    location: 'Jaipur, Jodhpur, Udaipur',
    duration: '7 Days, 6 Nights',
    price: '৳45,000',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop',
    rating: 4.8,
    reviews: 245
  },
  {
    title: 'Kerala Backwaters',
    location: 'Munnar, Alleppey, Kochi',
    duration: '5 Days, 4 Nights',
    price: '৳38,000',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop',
    rating: 5.0,
    reviews: 89
  }
];

export default function Packages() {
  return (
    <section id="packages" className="py-24 bg-gray-50/30 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Trending Tours</span>
            </div>
            <p className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight text-center md:text-left font-display">
              Featured Holiday Packages
            </p>
            <p className="text-lg text-gray-600 text-center md:text-left leading-relaxed">
              Handpicked destinations with premium accommodations and all-inclusive local support for an unforgettable vacation.
            </p>
          </div>
          <button className="hidden md:block border border-gray-200 text-gray-800 bg-white shadow-sm px-8 py-3.5 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
            View All Packages
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100/70 border border-gray-200/60 group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-blue-600 font-extrabold text-sm shadow-md border border-gray-100">
                  {pkg.price}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-gray-900 font-bold text-sm">{pkg.rating}</span>
                  </div>
                  <span className="text-gray-400 text-xs">({pkg.reviews} Reviews)</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight font-display">{pkg.title}</h3>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <MapPin size={16} className="text-blue-500" />
                    <span>{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <Clock size={16} className="text-blue-500" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-50 text-blue-600 font-bold py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-sm">
                  Check Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 md:hidden">
          <button className="w-full border border-gray-200 text-gray-800 bg-white shadow-sm px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
            View All Packages
          </button>
        </div>
      </div>
    </section>
  );
}
