import { motion } from "framer-motion";
import {
  FiPenTool,
  FiSmartphone,
  FiPrinter,
  FiGlobe,
  FiLayers,
} from "react-icons/fi";

const services = [
  { title: "هوية بصرية", desc: "نصنع جوهر علامتك.", icon: <FiPenTool /> },
  {
    title: "سوشيال ميديا",
    desc: "تصميم يسيطر على التريند.",
    icon: <FiSmartphone />,
  },
  { title: "مطبوعات", desc: "جودة ملموسة في كل تفصيلة.", icon: <FiPrinter /> },
  { title: "واجهات مواقع", desc: "تجربة رقمية غير مسبوقة.", icon: <FiGlobe /> },
  {
    title: "إدارة العلامة",
    desc: "استراتيجية بصرية ذكية.",
    icon: <FiLayers />,
  },
];

function ServicesPreview() {
  return (
    <section
      className="bg-[#050505] px-6 md:px-20 overflow-hidden text-right"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">

        <div
  className="w-full py-24 border-b border-white/5 bg-[#050505]"
  dir="rtl"
>
  <div className="flex flex-col items-center justify-center text-center px-4">
    <div className="relative max-w-2xl">
      <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.2]">
مجالات        <span className="block mt-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 pb-2">
                  الإبداع والحلول
        </span>
      </h2>

      {/* خط هندسي محسن مع تأثير توهج بسيط */}
       <div className="flex items-center justify-center gap-3 mt-8">
      <div className="h-[2px] w-16 bg-white/10" />
      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
      <div className="h-[2px] w-16 bg-white/10" />
    </div>
      
      {/* نص فرعي اختياري لزيادة الفخامة */}
      <p className="mt-8 text-stone-500 text-sm md:text-base font-medium">
        نجمع بين الفن التقني والدقة في التنفيذ لنضع مشروعك في القمة.
      </p>
    </div>
  </div>
</div>
        {/* الشبكة الفاجرة */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative group cursor-crosshair"
            >
              {/* الترقيم الجمالي */}
              <div className="text-white/5 font-black text-8xl absolute -top-12 -right-6 select-none transition-all group-hover:text-orange-500/20">
                0{i + 1}
              </div>

              <div className="relative z-10 border-b border-white/10 pb-8 group-hover:border-orange-500 transition-colors">
                <div className="text-3xl text-white mb-6 group-hover:text-orange-500 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-white text-2xl font-bold mb-3">
                  {s.title}
                </h3>
                <p className="text-stone-500 text-lg">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
