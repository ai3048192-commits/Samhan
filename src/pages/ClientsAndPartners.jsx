import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

function PartnersSection() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("partners")
        .select("id, name, image_url");
      
      if (data) {
        setPartners(data);
        if (data.length > 0) setSelectedPartner(data[0]);
      } else {
        console.error("خطأ:", error);
      }
      setLoading(false);
    };
    fetchPartners();
  }, []);

  if (loading) return null;

  return (
    <section className="relative bg-[#030303] overflow-hidden py-36 border-y border-white/5" dir="rtl">
      
      {/* خلفية جمالية باللون البرتقالي */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 blur-[140px] pointer-events-none" />

      {/* عنوان القسم */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg">
          <Sparkles size={14} className="animate-spin" />
          <span>شركاء النجاح والتميز</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
          نخبة نعتز ونفخر بالعمل معهم
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
          العلامات التجارية الكبرى التي شاركناها مسيرة الابتكار والنجاح الرقمي المستمر.
        </p>
      </div>

      {/* عرض تفاعلي فخم باللون البرتقالي لاسم الشريك الحالي */}
      <div className="relative z-20 max-w-md mx-auto px-4 mb-16 h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedPartner && (
            <motion.div
              key={selectedPartner.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative group px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#0a0a0a] via-[#111111] to-[#0a0a0a] border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.15)] flex items-center gap-4"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping absolute -top-1 -right-1" />
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 absolute -top-1 -right-1" />
              
              <span className="text-xs uppercase tracking-widest text-orange-400/80 font-mono">شريك مميز:</span>
              <span className="text-white font-black text-lg md:text-xl tracking-wide drop-shadow-md">
                {selectedPartner.name}
              </span>
              <ArrowUpRight size={18} className="text-orange-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* شريط اللوجوهات المتحرك */}
      <div 
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {partners.length > 0 ? (
          <motion.div
            className="flex gap-24 md:gap-36 items-center whitespace-nowrap py-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[...partners, ...partners, ...partners].map((p, i) => {
              const isSelected = selectedPartner?.id === p.id;
              return (
                <div
                  key={`${p.id}-${i}`}
                  className="relative flex-shrink-0 cursor-pointer group flex items-center justify-center h-20 w-36 md:w-44"
                  onMouseEnter={() => setSelectedPartner(p)}
                  onClick={() => setSelectedPartner(p)}
                >
                  {/* اللوجو صافي مع تأثير الإضاءة البرتقالية عند التحديد */}
                  <img
                    src={p.image_url}
                    alt={p.name}
                    loading="lazy"
                    className={`max-w-full max-h-full object-contain transition-all duration-500 
                      ${isSelected 
                        ? 'filter-none scale-125 drop-shadow-[0_0_25px_rgba(249,115,22,0.4)] opacity-100' 
                        : 'filter grayscale opacity-30 hover:grayscale-0 hover:opacity-80 hover:scale-110'}
                    `}
                  />
                </div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center text-stone-500 py-10">
            لا توجد بيانات حالياً
          </div>
        )}
      </div>

    </section>
  );
}

export default PartnersSection;
