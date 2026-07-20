import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

function ServicesPreview() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("creative_fields")
        .select("*");
      if (data) {
        setServices(data);
      }
      if (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section
      className="relative w-full bg-[#050505] py-32 px-6 md:px-20 overflow-hidden"
      dir="rtl"
    >
      {/* خلفية جمالية خفيفة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            خدماتنا الاحترافية
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            كل ما تحتاجه من خدمات التصميم في مكان واحد
          </h2>

          <p className="mt-6 max-w-2xl text-stone-400 leading-8">
            أساعدك في بناء هوية بصرية قوية من خلال تصميمات إبداعية وعصرية تناسب نشاطك التجاري وتُبرز علامتك أمام جمهورك.
          </p>

          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, index) => (
            <div
              key={s.id || index}
              className="group relative bg-[#0a0a0a]/60 backdrop-blur-xl rounded-[28px] overflow-hidden transition-all duration-500 border border-white/5 hover:border-orange-500/40 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.25)] hover:-translate-y-1"
            >
              {/* إضاءة تدرجية ناعمة عند الهوفر */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-orange-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[28px]" />

              <div className="relative p-8 h-full flex flex-col">
                
                {/* رأس الكارد: الرقم مكان الأيقونة + رقم خلفي عملاق شيك */}
                <div className="flex items-center justify-between mb-8">
                 

                  {/* رقم تعبيري شفاف في الخلفية يعطي فخامة */}
                  <span className="text-7xl font-black text-white/[0.02] group-hover:text-orange-500/[0.06] select-none pointer-events-none transition-colors duration-500 -mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* العنوان */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                  {s.title}
                </h3>

                {/* الوصف */}
                <p className="text-stone-400 text-sm leading-relaxed mb-4 flex-grow group-hover:text-stone-300 transition-colors duration-300">
                  {s.description}
                </p>

                {/* خط سفلي جمالي يتفاعل مع الهوفر */}
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
                  <div className="w-full h-full bg-gradient-to-r from-orange-500 to-amber-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;