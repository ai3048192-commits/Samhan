import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
// دالة عداد احترافية بأداء عالٍ
function Counter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const end = parseInt(value, 10);
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

const stats = [
  { label: "سنوات خبرة", value: "5" },
  { label: "عميل سعيد", value: "100" },
  { label: "مشروع مكتمل", value: "250" },
];

function AboutPreview() {
  return (
    <section
      dir="rtl"
      className="relative w-full bg-[#0a0a0a] py-32 px-8 md:px-24 overflow-hidden"
    >
      {/* خلفيات بصرية جمالية */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* النص التعريفي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-right max-w-3xl mr-0 ml-auto mb-24"
        >
          <span className="inline-block text-orange-500 font-bold tracking-widest text-sm mb-4 border border-orange-500/30 rounded-full px-4 py-1.5">
            من أنا
          </span>

          <h2 className="text-4xl md:text-7xl  text-white mb-2 
          leading-[1.2] tracking-tighter">
            خبرة تُصاغ في <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-500 to-red-600">
              هوية بصرية استثنائية
            </span>
          </h2>

          <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg mr-0 ml-auto">
            أنا هنا لأحول تطلعاتك إلى واقع ملموس. أدمج الإبداع بالاستراتيجية
            لأصيغ لك هوية بصرية لا تُنسى، تميزك في سوق تنافسي.
          </p>
        </motion.div>

        {/* شبكة الإحصائيات الفاجرة */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-white/10">
  {stats.map((stat, i) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className={`relative p-12 text-center border-white/10 group ${
        i !== stats.length - 1 ? "md:border-l" : ""
      }`}
    >
      {/* تأثير التوهج الهادئ عند الهوفر */}
      <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* الرقم بتنسيق كبير وواضح */}
        <div className="text-5xl md:text-6xl font-black text-white mb-4 tabular-nums">
          <Counter value={stat.value} />
          <span className="text-orange-500 font-normal">+</span>
        </div>
        
        {/* النص التوضيحي بتنسيق احترافي */}
        <div className="text-stone-400 text-sm font-medium tracking-[0.2em] uppercase">
          {stat.label}
        </div>
      </div>
      
      {/* خط سفلي يظهر عند الهوفر - لمسة "شياكة" */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
}

export default AboutPreview;