import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

function PartnersSection() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("partners").select("*");
      if (data) setPartners(data);
      else console.error("خطأ:", error);
      setLoading(false);
    };
    fetchPartners();
  }, []);

  if (loading) return null;

  return (
    <section
      className="bg-[#050505] overflow-hidden py-28 border-b border-white/5"
      dir="rtl"
    >
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          شركاء النجاح
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-white">
          شركاء نعتز بثقتهم
        </h2>

        <p className="mt-6 text-stone-400 leading-8 max-w-2xl mx-auto">
          نفخر بالتعاون مع شركات وعلامات تجارية ساعدتنا على تنفيذ حلول رقمية
          مبتكرة وبناء شراكات طويلة الأمد قائمة على الثقة والنجاح.
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        {partners.length > 0 ? (
          <motion.div
            className="flex gap-20 md:gap-28 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-36 md:w-44 flex items-center justify-center opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-500"
              >
                <img
                  src={p.logo_url}
                  alt={p.name}
                  loading="lazy"
                  width="160"
                  height="64"
                  className="w-full h-16 object-contain brightness-125 contrast-125 will-change-transform"
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-stone-600 text-center w-full">لا توجد بيانات</p>
        )}
      </div>
    </section>
  );
}

export default PartnersSection;
