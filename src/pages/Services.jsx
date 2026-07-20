import React, { useState, useEffect } from "react"; // تأكد من إضافة useState, useEffect
import { motion } from "framer-motion";
import {
  FiPenTool,
  FiSmartphone,
  FiPrinter,
  FiGlobe,
  FiLayers,
  FiArrowRight,
} from "react-icons/fi";
import ServicesPreview from "./ServicesPreview";
import { supabase } from "../lib/supabaseClient";

const Services = () => {
  const [reasons, setReasons] = useState([]);

  // جلب البيانات من Supabase
  useEffect(() => {
    const fetchReasons = async () => {
      const { data } = await supabase.from("why_choose").select("*");
      if (data) setReasons(data);
    };
    fetchReasons();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen px-6 md:px-24" dir="rtl">
      <ServicesPreview />

      {/* قسم ليه تختارني (مربوط بـ Supabase) */}
      <div className="bg-[#050505] py-8 md:px-24 rounded-3xl">
        <div className="max-w-9xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              لماذا تختارني؟{" "}
            </div>

            <h2 className=" text-5xl font-bold text-white">
              {" "}
              تصاميم تصنع الانطباع الأول{" "}
            </h2>

            <p className="mt-5 text-stone-400 leading-8">
              أقدم تصاميم احترافية تجمع بين الإبداع، والاهتمام بالتفاصيل، وفهم
              هوية علامتك التجارية، لتساعدك على الظهور بصورة مميزة وترك انطباع
              يدوم لدى جمهورك.
            </p>
            {/* إضافة خط سفلي زخرفي تحت العنوان لزيادة الفخامة */}
            <div className="mt-8 h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {reasons.map((item, i) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#0a0a0a] p-10 border border-white/5 hover:border-orange-500/50 transition-all duration-500 group"
                >
                  <span className="text-white/10 text-6xl font-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-2xl font-bold text-white mt-4 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-stone-500">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="relative group p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-700 hover:border-orange-500/50">
              {/* تأثير الإضاءة الخلفية (Glow) التي تظهر عند التمرير */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-orange-500/20 via-transparent to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* إضاءة علوية ناعمة (Soft Top Light) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-sm" />

              {/* المحتوى */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span className="text-orange-500 font-bold text-[10px] tracking-[0.2em] uppercase">
                    Guarantee
                  </span>
                </div>

                <h3 className="text-white text-4xl font-black leading-tight mb-6 tracking-tight">
                  التزام <br />{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                    مطلق.
                  </span>
                </h3>

                <p className="text-stone-400 text-sm font-light leading-relaxed max-w-[250px] italic">
                  "نحن نؤمن بالتفاصيل، ولا نقبل بأقل من الكمال لنجاح مشروعك. نحن
                  شريكك حتى النهاية."
                </p>
              </div>

              {/* الجزء السفلي */}
              <div className="relative z-10 mt-12 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-orange-500 to-transparent" />
                  <span className="text-white/50 font-bold tracking-[0.2em] text-xs">
                    SAMHAN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
