import React from 'react';
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const projects = [
  { id: 1, title: "هوية بصرية", desc: "نظام بصري متكامل", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800" },
  { id: 2, title: "سوشيال ميديا", desc: "صناعة محتوى إبداعي", img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=800" },
  { id: 3, title: "مطبوعات تجارية", desc: "تصميم بروفايل وبطاقات", img: "https://images.unsplash.com/photo-1634942539498-88849b207a16?q=80&w=800" },
  { id: 4, title: "تصميم واجهات UI", desc: "تجربة مستخدم بصرية", img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800" },
  { id: 5, title: "إدارة العلامة", desc: "استراتيجية نمو بصرية", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { id: 6, title: "إعلانات مرئية", desc: "جذب انتباه الجمهور", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800" },
];

function PortfolioSection() {
  return (
    <section className="bg-[#050505] min-h-screen w-full py-24 px-6 overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* العنوان */}
        <div className="flex flex-col items-center justify-center text-center px-4 mb-24">
          <div className="relative max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.2]">
              نصنع حلولاً
              <span className="block mt-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 pb-2">
                تسبق المستقبل
              </span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-[2px] w-16 bg-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
              <div className="h-[2px] w-16 bg-white/10" />
            </div>
            <p className="mt-8 text-stone-500 text-sm md:text-base font-medium">
              نجمع بين الفن التقني والدقة في التنفيذ لنضع مشروعك في القمة.
            </p>
          </div>
        </div>

        {/* الشبكة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-[2rem] overflow-hidden border border-white/5 bg-black"
            >
              {/* الصورة مع تأثير Zoom */}
              <img 
                src={p.img} 
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110 opacity-70" 
              />
              
              {/* طبقة التعتيم */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* المحتوى */}
              <div className="absolute bottom-0 w-full p-8 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                  <span className="text-orange-500 font-bold text-xs tracking-[0.3em] uppercase mb-3 block">0{p.id}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-stone-400 text-sm mb-6 leading-relaxed">{p.desc}</p>
                  
                  <Link 
                    to={`/projectsdata/${p.id}`} 
                    className="inline-flex items-center gap-3 text-white font-semibold hover:text-orange-500 transition-colors"
                  >
                    استكشف التفاصيل 
                    <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;