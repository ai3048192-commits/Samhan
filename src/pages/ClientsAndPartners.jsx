import { useState } from "react";
import { motion } from "framer-motion";

const partners = [
  { id: 1, name: "Brand 1", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: 2, name: "Brand 2", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { id: 3, name: "Brand 3", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: 4, name: "Brand 4", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { id: 5, name: "Brand 5", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" },
];

function PartnersSection() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="bg-[#050505]  overflow-hidden" dir="rtl">
      
<div className="w-full py-24 border-b border-white/5" dir="rtl">
  <div className="flex flex-col items-center justify-center text-center px-4">
    
    {/* العنوان: تباين قوي بين الخفة والوزن الثقيل */}
    <div className="relative">
      <h2 className="text-4xl md:text-7xl font-light text-white tracking-tighter leading-tight">
        شركاء 
        <span className="font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 ml-3 md:ml-6">
          النجاح
        </span>
      </h2>
    </div>

    {/* خط هندسي مبسط جداً يعطي طابع الفخامة */}
    <div className="flex items-center justify-center gap-3 mt-8">
      <div className="h-[2px] w-16 bg-white/10" />
      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
      <div className="h-[2px] w-16 bg-white/10" />
    </div>

    {/* نص إضافي بسيط يعزز الفخامة */}
    <p className="mt-6 text-stone-500 text-sm md:text-base font-medium tracking-wide uppercase">
      أكثر من 50+ رحلة نجاح تقنية
    </p>
    
  </div>
</div>

      {/* الشريط المتحرك (البراندات تتحرك بسهولة) */}
<div className="py-24 bg-[#050505] border-y border-white/5">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
      {partners.map((p, i) => (
        <motion.div
          key={i}
          className="relative bg-[#050505] p-8 flex items-center justify-center group overflow-hidden"
          whileHover={{ zIndex: 10 }}
        >
          {/* تأثير التوهج المربع عند التمرير */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* حركة الشعار المغناطيسية */}
          <motion.img
            src={p.logo}
            alt={p.name}
            className="w-32 h-16 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            whileHover={{ 
              scale: 1.1,
              filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))"
            }}
          />
          
          {/* خطوط إضاءة جانبية عند التمرير (Glitch Effect) */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
        </motion.div>
      ))}
    </div>
  </div>
</div>

    </section>
  );
}

export default PartnersSection;