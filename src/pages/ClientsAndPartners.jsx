import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

function PartnersSection() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("partners")
        .select("id, name, logo_url");
      if (data) setPartners(data);
      else console.error("خطأ:", error);
      setLoading(false);
    };
    fetchPartners();
  }, []);

  if (loading) return null;

  return (
    <section
      className="relative bg-[#050505] overflow-hidden py-32 border-y border-white/5"
      dir="rtl"
    >
      {/* عنوان القسم */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          شبكة النجاح والتميز
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          شركاء نعتز ونفخر بالعمل معهم
        </h2>
        <p className="text-stone-400 text-base md:text-lg max-w-2xl mx-auto">
          نخبة من الشركات والعلامات التجارية التي شاركناها رحلة الابتكار والنجاح
          الرقمي.
        </p>
      </div>

      {/* شريط اللوجوهات المتحرك */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {partners.length > 0 ? (
          <motion.div
            className="flex gap-8 items-center whitespace-nowrap py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          >
            {[...partners, ...partners, ...partners].map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="group relative flex-shrink-0 w-52 md:w-60 h-28 md:h-32 rounded-2xl bg-black border border-white/10 p-6 flex items-center justify-center shadow-xl hover:border-orange-500 hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] transition-all duration-500 cursor-pointer"
              >
                <img
                  src={p.logo_url}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-14 md:h-16 object-contain filter brightness-125 contrast-125 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            ))}
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
