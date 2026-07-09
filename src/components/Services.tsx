import { motion } from 'motion/react';
import { Globe, HeartPulse, RefreshCw, Briefcase, FileText, CheckCircle, Zap } from 'lucide-react';

const services = [
  {
    title: 'Tourist Visa',
    desc: 'General tourism and sightseeing visas for exploring the beauty of India.',
    icon: Globe,
    color: 'bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white',
    hoverBorder: 'hover:border-blue-200 hover:shadow-blue-600/5'
  },
  {
    title: 'Medical Visa',
    desc: 'Specialized hospital + attendant visas with fast-track processing for urgent care.',
    icon: HeartPulse,
    color: 'bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-600 group-hover:text-white',
    hoverBorder: 'hover:border-red-200 hover:shadow-red-600/5'
  },
  {
    title: 'Double Entry Visa',
    desc: 'Convenient double entry visas for embassy interviews and multiple visits.',
    icon: RefreshCw,
    color: 'bg-green-50 text-green-600 border border-green-100 group-hover:bg-green-600 group-hover:text-white',
    hoverBorder: 'hover:border-green-200 hover:shadow-green-600/5'
  },
  {
    title: 'Business Visa',
    desc: 'Official visas for business meetings, trade fairs, and international conferences.',
    icon: Briefcase,
    color: 'bg-purple-50 text-purple-600 border border-purple-100 group-hover:bg-purple-600 group-hover:text-white',
    hoverBorder: 'hover:border-purple-200 hover:shadow-purple-600/5'
  },
  {
    title: 'Visa Documentation',
    desc: 'Professional assistance for all types of visa documentation and paperwork.',
    icon: FileText,
    color: 'bg-orange-50 text-orange-600 border border-orange-100 group-hover:bg-orange-600 group-hover:text-white',
    hoverBorder: 'hover:border-orange-200 hover:shadow-orange-600/5'
  },
  {
    title: 'Emergency Visa Assistance',
    desc: 'Urgent visa support for immediate travel requirements or emergency bookings.',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white',
    hoverBorder: 'hover:border-amber-200 hover:shadow-amber-600/5'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full inline-block border border-blue-100">Our Core Services</h2>
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
              className={`group p-8 rounded-3xl border border-gray-200/70 bg-white hover:shadow-2xl ${service.hoverBorder} hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 transition-all duration-300`}>
                  <service.icon size={26} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight font-display group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  {service.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm border-t border-gray-100 pt-4 mt-auto">
                <CheckCircle size={16} className="text-blue-500" />
                <span>Expert Support Guaranteed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
