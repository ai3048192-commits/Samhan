import React from "react";
import {
  Palette,
  Layers3,
  Printer,
  Lightbulb,
  
  Headphones,
  Search,
  PenTool,
  CheckCircle2,
} from "lucide-react";
import AboutPreview from "./AboutPreview"; // تأكد من المسار الصحيح

// --- مصفوفات البيانات ---
const skillsData = [
  {
    title: "هوية بصرية",
    desc: "بناء نظام بصري متكامل يروي قصة علامتك ويترسخ في الأذهان.",
    icon: Palette,
  },
  {
    title: "تصميم واجهات (UI/UX)",
    desc: "واجهات رقمية ساحرة، مصممة بدقة لتجربة مستخدم لا تُنسى.",
    icon: Layers3,
  },
  {
    title: "تصميم مطبوعات",
    desc: "تحويل التصاميم الرقمية إلى تحف فنية ملموسة.",
    icon: Printer,
  },
  {
    title: "استشارات فنية",
    desc: "توجيه إبداعي لتحويل أفكارك ورؤيتك إلى استراتيجية بصرية.",
    icon: Lightbulb,
  },
];

const processSteps = [
  {
    title: "الاستماع للفكرة",
    desc: "نفهم رؤيتك وأهداف مشروعك بدقة.",
    icon: Headphones,
  },
  {
    title: "البحث والتحليل",
    desc: "ندرس السوق والمنافسين لنصل لأفضل زاوية إبداعية.",
    icon: Search,
  },
  {
    title: "التنفيذ والإبداع",
    desc: "نحول الأفكار إلى تصاميم بصرية مبهرة.",
    icon: PenTool,
  },
  {
    title: "المراجعة والاعتماد",
    desc: "نصل معاً للنتيجة النهائية التي ترضيك تماماً.",
    icon: CheckCircle2,
  },
];

function AboutPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
      {/* 1. القسم التعريفي */}
      <AboutPreview />

      {/* 2. قسم المهارات */}
      <section className="py-28 px-6 md:px-20 relative bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* العنوان مع تدرج لوني خفيف */}
          <h3 className="relative text-center mb-28 group">
            {/* الرقم التجريدي في الخلفية لزيادة العمق */}
            

   
                <div className="text-center mb-24">
      <h3 className="text-5xl md:text-5xl font-black text-white tracking-tighter">
        نحول الرؤية إلى
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> واقع بصري
</span>
      </h3>
    </div>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillsData.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group relative p-8 bg-stone-900/30 border border-stone-800 rounded-3xl overflow-hidden transition-all duration-500 
                       hover:-translate-y-3 hover:border-orange-500 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]"
                >
                  {/* تأثير خلفية مضيء يظهر عند الـ Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* الأيقونة مع تأثير التوهج */}
                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-stone-800/50 mb-8 border border-stone-700 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500">
                      <Icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-50 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-stone-400 leading-relaxed text-sm group-hover:text-stone-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. قسم آلية العمل (التصميم الفاجر) */}
 <section className="relative px-6 py-24 bg-[#080808] overflow-hidden">
  {/* خلفيات متوهجة هادئة لتوحيد الجو العام */}
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[150px]" />
  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[150px]" />

  <div className="max-w-7xl mx-auto relative z-10">
    
    {/* العنوان الموحد */}
    <div className="text-center mb-24">
      <h3 className="text-5xl md:text-5xl font-black text-white tracking-tighter">
        كيف <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">نصنع السحر؟</span>
      </h3>
    </div>

    {/* الشبكة (Grid) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {processSteps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={index} className="group relative p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
            
            {/* الأيقونة داخل حاوية فخمة */}
            <div className="mb-8 w-16 h-16 rounded-2xl bg-[#111] flex items-center justify-center border border-white/10 group-hover:border-orange-500/50 transition-colors shadow-xl">
              <Icon className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
            <p className="text-stone-400 text-sm leading-relaxed">{step.desc}</p>
            
            {/* تأثير ضوئي خفي عند الهوفر */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* 4. دعوة للعمل */}
<section className="py-24 px-6 bg-[#050505] text-white  text-right">
  {(() => {
    const [data, setData] = React.useState({ name: "", niche: "" });
    const [loading, setLoading] = React.useState(false);
    const [res, setRes] = React.useState(null);

    const consultAI = () => {
      if (!data.name || !data.niche) return;
      setLoading(true);
      setTimeout(() => {
        setRes({
          palette: ["#FF4500", "#121212", "#E0E0E0"],
          focus: "التركيز على البساطة (Minimalism) والخطوط الحادة لتعكس القوة.",
          roadmap: [
            "تحديد الجمهور المستهدف بدقة.",
            "بناء هوية بصرية متباينة.",
            "إطلاق حملة محتوى تركز على القيمة.",
            "قياس التفاعل والتحسين المستمر."
          ],
          aiTone: `مرحباً! بما أن ${data.name} يعمل في مجال ${data.niche}، فالمنافسة تتطلب هوية بصرية تكسر النمط التقليدي. أنصحك بالابتعاد عن الألوان المكررة واستخدام تباين قوي يخطف العين فوراً.`
        });
        setLoading(false);
      }, 2000);
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-b from-[#111] to-[#050505] p-10 rounded-[1rem]
         border border-stone-800 shadow-[0_0_50px_rgba(255,69,0,0.1)]">
          <h2 className="text-4xl md:text-6xl font-black mb-10 bg-clip-text text-transparent 
          bg-gradient-to-r from-white to-stone-500">
            مُستشارك الاستراتيجي
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <input placeholder="اسم البراند..." className="bg-[#0a0a0a] p-5 rounded-2xl border border-stone-800 focus:border-orange-500 outline-none transition" onChange={(e) => setData({...data, name: e.target.value})} />
            <input placeholder="المجال (مطاعم، تقنية، تجارة...)" className="bg-[#0a0a0a] p-5 rounded-2xl border border-stone-800 focus:border-orange-500 outline-none transition" onChange={(e) => setData({...data, niche: e.target.value})} />
          </div>
          
          <button onClick={consultAI} className="w-full bg-orange-500 hover:bg-orange-600 p-5 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.01]">
            {loading ? "جاري التحليل الاستراتيجي..." : "ابدأ التخطيط البصري"}
          </button>

          {res && (
            <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="p-6 bg-[#0a0a0a] rounded-2xl border border-stone-800">
                <h4 className="text-orange-500 font-bold mb-2">رؤية الـ AI:</h4>
                <p className="text-stone-300 italic">"{res.aiTone}"</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#0a0a0a] rounded-2xl border border-stone-800">
                  <h4 className="text-orange-500 font-bold mb-4">باليتة الألوان المميزة</h4>
                  <div className="flex gap-3">
                    {res.palette.map(c => <div key={c} className="w-12 h-12 rounded-full border border-stone-700" style={{backgroundColor: c}}></div>)}
                  </div>
                </div>
                <div className="p-6 bg-[#0a0a0a] rounded-2xl border border-stone-800">
                  <h4 className="text-orange-500 font-bold mb-2">التركيز البصري</h4>
                  <p className="text-stone-300 text-sm">{res.focus}</p>
                </div>
              </div>

              <div className="p-6 bg-[#0a0a0a] rounded-2xl border border-orange-500/30">
                <h4 className="text-orange-500 font-bold mb-4">خارطة الطريق (Roadmap)</h4>
                <ul className="space-y-2">
                  {res.roadmap.map((step, i) => <li key={i} className="flex items-center gap-3 text-stone-300"> <span className="text-orange-500">●</span> {step}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  })()}
</section>
    </div>
  );
}

export default AboutPage;
