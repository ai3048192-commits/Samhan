import React, { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, Globe } from "lucide-react";

function ContactPage() {
  // حالة لتثبيت الخدمة المختارة
  const [selectedGoal, setSelectedGoal] = useState("");

  return (
    <section
      dir="rtl"
      className="py-20 px-6 bg-[#020202] text-white min-h-screen overflow-hidden text-right"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* العنوان الرئيسي */}

        <div className="flex flex-col items-center p-8 justify-center text-center px-4 mb-24">
          <div className="relative max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.2]">
             معنا تواصل{" "}
              
            </h2>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-[2px] w-16 bg-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
              <div className="h-[2px] w-16 bg-white/10" />
            </div>
            <p className="mt-8 text-stone-500 text-sm md:text-base font-medium">
              نحن نحول الرؤية إلى واقع. جاهز للبدء؟
            </p>
          </div>
        </div>
        {/* الشبكة التفاعلية */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative">
            {/* تأثير خلفية مضيئة متفاعل وأكثر نعومة */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-600/30 to-red-600/30 rounded-[2.2rem] blur-xl opacity-50"></div>

            <div className="relative bg-[#050505]/80 backdrop-blur-md p-10 md:p-14 rounded-[2rem] border border-stone-800/50 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                {/* الاسم والبريد - تصميم عصري */}
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { label: "الاسم الكريم", placeholder: "أحمد محمد" },
                    {
                      label: "البريد الإلكتروني",
                      placeholder: "name@company.com",
                    },
                  ].map((field, i) => (
                    <div key={i} className="relative group/input">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mb-3 block">
                        {field.label}
                      </label>
                      <input
                        className="w-full bg-[#0a0a0a] p-5 rounded-[1.5rem] border border-stone-800 text-white outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-stone-800"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>

                {/* اختيار الخدمة - شكل "الكبسولة" الاحترافي */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 block">
                    نوع الخدمة المطلوبة
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "هوية بصرية",
                      "تصميم واجهات",
                      "استراتيجية",
                      "برمجة",
                      "تسويق",
                    ].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setSelectedGoal(goal)}
                        className={`px-7 py-3.5 rounded-full text-xs font-bold transition-all duration-500 border ${
                          selectedGoal === goal
                            ? "bg-orange-600 border-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-105"
                            : "bg-[#0a0a0a] border-stone-800 text-stone-400 hover:border-orange-500/50 hover:text-white"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* تفاصيل المشروع - مساحة واسعة ومريحة */}
                <div className="relative group/input">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mb-4 block">
                    تفاصيل المشروع
                  </label>
                  <textarea
                    className="w-full bg-[#0a0a0a] p-6 rounded-[1.5rem] border border-stone-800 text-white outline-none focus:border-orange-500/50 transition-all min-h-[160px] resize-none focus:ring-4 focus:ring-orange-500/10"
                    placeholder="حدثنا عن رؤيتك وطموحاتك، نحن نسمعك..."
                  ></textarea>
                </div>

                {/* زر الإرسال - تصميم "Premium" */}
                <button
                  type="submit"
                  className="group w-full py-7 bg-white text-black hover:bg-orange-600 hover:text-white rounded-[1.5rem] text-lg font-black uppercase tracking-[0.2em] transition-all duration-500 flex justify-center items-center gap-4 shadow-xl hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] active:scale-[0.97]"
                >
                  إرسال الطلب الآن
                  <span className="p-2 rounded-full bg-black/5 group-hover:bg-white/20 transition-all">
                    <ArrowUpRight size={20} />
                  </span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1 bg-[#050505] p-10 rounded-[2.5rem] border border-stone-800 relative overflow-hidden group shadow-2xl">
            {/* إطار نيون يظهر عند التمرير بشكل انسيابي */}
            <div className="absolute inset-0 border-[1px] border-orange-500/0 group-hover:border-orange-500/30 rounded-[2.5rem] transition-all duration-700 pointer-events-none"></div>

            <div className="space-y-10 relative z-10">
              {/* العنوان */}
              <div>
                <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">
                  بيانات الاتصال
                </h3>
                <div className="mt-4 flex gap-1">
                  <div className="h-[2px] w-12 bg-orange-600 shadow-[0_0_10px_#ea580c]"></div>
                  <div className="h-[2px] w-4 bg-stone-700"></div>
                </div>
              </div>

              {/* قائمة البيانات بتصميم فاجر */}
              <div className="grid gap-4">
                {[
                  {
                    icon: <Mail size={20} />,
                    label: "البريد الإلكتروني",
                    value: "hello@brandlab.ai",
                  },
                  {
                    icon: <Phone size={20} />,
                    label: "رقم الهاتف",
                    value: "+20 100 000 0000",
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: "مقرنا الرئيسي",
                    value: "القاهرة الجديدة، مصر",
                  },
                  {
                    icon: <Globe size={20} />,
                    label: "حالة الخدمة",
                    value: "متاحون 24/7",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group/item relative flex items-center gap-5 p-5 rounded-2xl border border-transparent hover:bg-[#0a0a0a] hover:border-stone-800 transition-all duration-500 cursor-default"
                  >
                    {/* أيقونة مع توهج */}
                    <div className="p-4 bg-[#0a0a0a] rounded-2xl text-stone-500 border border-stone-800 group-hover/item:border-orange-500/50 group-hover/item:text-orange-500 transition-all duration-500 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-600">
                        {item.label}
                      </p>
                      <p className="font-bold text-sm text-stone-200 mt-1">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer فاجر بـ تأثير نبض */}
            <div className="mt-12 pt-8 border-t border-stone-900 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                  نستقبل طلباتك الآن
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
