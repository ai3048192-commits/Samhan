import React from "react";
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
const services = [];
const Services = () => {
  return (
    <div className="bg-[#050505] min-h-screen  px-6 md:px-24" dir="rtl">
      <ServicesPreview />
      <div className="bg-[#050505]  px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="w-full py-20 border-b border-white/5" dir="rtl">
            <div className="flex flex-col items-center justify-center text-center px-4">
              {/* العنوان الرئيسي */}
              <div className="relative">
                <p className="text-3xl md:text-6xl font-light text-white tracking-tight leading-tight">
                  ليه{" "}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-stone-500">
                    تختارني؟
                  </span>
                </p>
              </div>

              {/* خط هندسي احترافي */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <div className="h-[1px] w-12 bg-gradient-to-l from-orange-500/50 to-transparent" />
                <div className="w-2 h-2 rotate-45 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                <div className="h-[1px] w-12 bg-gradient-to-r from-orange-500/50 to-transparent" />
              </div>
            </div>
          </div>

          {/* التصميم الشبكي (Bento Grid) المعتمد على التباين المطلق */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* الجانب الأيسر: تميزنا (تأثير مصفوفة) */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  num: "01",
                  t: "فهم استراتيجي",
                  d: "لا نبدأ قبل أن ندرك الغاية.",
                },
                { num: "02", t: "تكنولوجيا عصرية", d: "نستخدم ما يسبق السوق." },
                { num: "03", t: "كود نظيف", d: "بناء أساسات لا تنهار." },
                { num: "04", t: "تسليم دقيق", d: "الوقت هو أثمن ما نملك." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#0a0a0a] p-10 border border-white/5 hover:border-orange-500/50 transition-all duration-500 group"
                >
                  <span className="text-white/10 text-6xl font-black">
                    {item.num}
                  </span>
                  <h4 className="text-2xl font-bold text-white mt-4 mb-2">
                    {item.t}
                  </h4>
                  <p className="text-stone-500">{item.d}</p>
                </div>
              ))}
            </div>

            {/* الجانب الأيمن: الضمان (بصمة سمحان) */}
            <div className="md:col-span-1 bg-orange-500 p-10 flex flex-col justify-between">
              <h3 className="text-4xl font-black text-black leading-tight ">
                التزام <br /> مطلق.
              </h3>
              <p className="text-black/80 font-medium mt-8">
                إذا لم يلمس مشروعك قلوب جمهورك، سنعيد صياغته من جديد. الالتزام
                هنا حتى الرضا التام.
              </p>
              <div className="mt-12 w-full h-px bg-black/20" />
              <span className="text-black font-bold uppercase tracking-[0.3em] mt-6">
                SAMHAN // 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    <div className="bg-[#050505] py-32 px-6 md:px-24 relative overflow-hidden">
  {/* خلفية بتأثير مدروس */}
  <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full" />

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid lg:grid-cols-12 gap-20 items-center">
      
      {/* الجانب الأيسر */}
      <div className="lg:col-span-5 space-y-12">
        <div>
          <h2 className="text-6xl font-black text-white tracking-tighter mb-6">
            ماذا يقول <br />
            <span className="text-orange-500">شركاء النجاح؟</span>
          </h2>
          <p className="text-stone-400 text-lg leading-relaxed">
            ليست مجرد آراء، بل قصص نجاح حقيقية بنيناها سوياً. انضم لقائمة عملائنا المميزين.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { user: "محمد إبراهيم", text: "سمحان حول مشروعي من فكرة لموقع بيجيب أرباح في أسبوع واحد." },
            { user: "ليلى محمود", text: "ما شوفتش التزام في المواعيد بالشكل ده، فعلاً سمحان كلمة وشغل." },
          ].map((comment, i) => (
            <div key={i} className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] p-8 rounded-3xl transition-all duration-500">
              <div className="text-orange-500/20 text-5xl mb-4 font-serif">"</div>
              <p className="text-stone-300 font-medium mb-6 leading-relaxed italic">
                {comment.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-orange-500" />
                <span className="text-orange-500 text-sm font-bold uppercase tracking-widest">{comment.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الجانب الأيمن: Form احترافي */}
      <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/5 p-10 md:p-16 rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)]">
        <div className="mb-12">
          <h3 className="text-4xl font-black text-white mb-3">لنبدأ المشروع القادم</h3>
          <p className="text-stone-500">أخبرنا عن تفاصيل فكرتك، وسيتواصل معك فريقنا في أقرب وقت.</p>
        </div>

        <form className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {['الاسم الكامل', 'البريد الإلكتروني'].map((placeholder) => (
              <div key={placeholder} className="relative">
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-orange-500 transition-all placeholder:text-white/20 peer" 
                  placeholder={placeholder}
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-500 peer-focus:w-full" />
              </div>
            ))}
          </div>
          
          <div className="relative">
            <textarea 
              rows="4" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-orange-500 transition-all placeholder:text-white/20 peer" 
              placeholder="حدثنا عن مشروعك..."
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-500 peer-focus:w-full" />
          </div>

          <button className="w-full py-7 bg-white text-black font-black text-lg rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 group">
            إرسال الطلب 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Services;
