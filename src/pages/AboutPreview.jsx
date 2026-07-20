import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

// دالة العداد (للحفاظ على تأثير الحركة)
function Counter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const end = parseInt(value, 10) || 0;
    const startTime = performance.now();
    let animationFrame;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
    };
    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

function AboutPreview() {
  const [content, setContent] = useState({ title: "...", description: "..." });
  const [stats, setStats] = useState([
    { label: "سنوات خبرة", value: "0" },
    { label: "عميل سعيد", value: "0" },
    { label: "مشروع مكتمل", value: "0" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. جلب العنوان والوصف من جدول About
      const { data: aboutData } = await supabase
        .from("About")
        .select("*")
        .eq("id", 1)
        .single();
      if (aboutData) {
        setContent({
          title: aboutData.title,
          description: aboutData.description,
        });
      }

      // 2. جلب الإحصائيات من جدول Stats
      const { data: statsData } = await supabase
        .from("Stats")
        .select("*")
        .eq("id", 1)
        .single();
      if (statsData) {
        setStats([
          { label: "سنوات خبرة", value: statsData.exp?.toString() || "0" },
          { label: "عميل سعيد", value: statsData.clients?.toString() || "0" },
          {
            label: "مشروع مكتمل",
            value: statsData.projects?.toString() || "0",
          },
        ]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
   <section
  dir="rtl"
  className="relative w-full bg-[#050505] py-32 px-5  overflow-hidden 
  selection:bg-orange-500/30"
>
  {/* تحسين الخلفية لتكون أعمق وأقل تشتيتاً */}
  <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
  <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

  <div className="max-w-7xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-right max-w-3xl mb-20"
    >
      <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        من أنا
      </div>
      
      <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
        {isLoading ? (
          <span className="opacity-50">جاري التحميل...</span>
        ) : (
          content.title
        )}
      </h2>
      
      <p className="text-stone-400 text-lg md:text-xl leading-relaxed max-w-xl font-light">
        {isLoading ? (
          "جاري جلب البيانات..."
        ) : (
          content.description
        )}
      </p>
    </motion.div>

    {/* شبكة الإحصائيات - تصميم Glassmorphism خفيف */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="bg-[#0a0a0a] p-10 md:p-14 text-center transition-all duration-300 hover:bg-[#121212] group"
        >
          <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
            <Counter value={stat.value} />
            <span className="text-orange-500 font-light ml-1">+</span>
          </div>
          <div className="text-stone-500 text-xs font-medium tracking-[0.2em] uppercase group-hover:text-stone-300 transition-colors">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}

export default AboutPreview;
