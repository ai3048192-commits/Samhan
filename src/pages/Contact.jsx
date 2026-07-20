import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Mail, MapPin, Phone } from "lucide-react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [selectedGoals, setSelectedGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGoalToggle = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((item) => item !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: selectedGoals.join(", "),
          message: formData.message.trim(),
        },
      ]);

      if (error) {
        console.error("Supabase Error:", error);
        alert("حدث خطأ أثناء الإرسال: " + error.message);
      } else {
        alert("تم إرسال طلبك بنجاح!");
        setFormData({ name: "", email: "", message: "" });
        setSelectedGoals([]);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      dir="rtl"
      className="py-32 px-6 bg-[#020202] text-white min-h-screen text-right"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            معنا تواصل
          </div>
          <h2 className="text-5xl font-bold text-white">
            لنبدأ في صياغة رؤيتك
          </h2>
          <p className="mt-5 text-stone-400 leading-8 max-w-xl">
            التصميم العظيم يبدأ بحوار. أخبرنا عن مشروعك القادم، وسنتكفل نحن
            بتحويله إلى واقع بصري يترك أثراً لا يُنسى.
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative">
            <div className="relative bg-[#050505] p-8 md:p-12 rounded-[2rem] border border-stone-800">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-stone-600">
                      الاسم الكريم
                    </label>
                    <input
                      required
                      className="w-full bg-[#0a0a0a] p-4 rounded-2xl border border-stone-800 text-white outline-none focus:border-orange-500"
                      placeholder="أحمد محمد"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-stone-600">
                      البريد الإلكتروني
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full bg-[#0a0a0a] p-4 rounded-2xl border border-stone-800 text-white outline-none focus:border-orange-500"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* فلاتر الخدمات المطابقة تماماً */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase text-stone-600">
                    نوع الخدمة (يمكنك اختيار أكثر من خدمة)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Brand Identity",
                      "Social Media Design",
                      "Print Design",
                      "Packaging Design",
                      "Photo Manipulation",
                      "Presentation Design",
                    ].map((goal) => {
                      const isSelected = selectedGoals.includes(goal);
                      return (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => handleGoalToggle(goal)}
                          className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/30"
                              : "bg-[#0a0a0a] border-stone-800 text-stone-300 hover:border-stone-600"
                          }`}
                        >
                          {goal} {isSelected && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-stone-600">
                    تفاصيل المشروع
                  </label>
                  <textarea
                    required
                    className="w-full bg-[#0a0a0a] p-4 rounded-2xl border border-stone-800 text-white outline-none focus:border-orange-500 min-h-[120px]"
                    placeholder="كيف يمكنني مساعدتك اليوم؟"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-white text-black hover:bg-orange-500 hover:text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? "جاري الإرسال..." : "إرسال الطلب"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1 bg-[#0a0a0a] p-8 md:p-10 rounded-[2.5rem] border border-stone-800/80 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-700 pointer-events-none" />

            <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              بيانات الاتصال
            </h3>

            <div className="grid gap-6">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "البريد الإلكتروني",
                  value: "abdulrahmansamhan1@gmail.com",
                  href: null,
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: "رقم الهاتف",
                  value: "01001254587",
                  href: "https://wa.me/201001254587",
                  target: "_blank",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "مقرنا الرئيسي",
                  value: "القاهرة الجديدة، مصر",
                  href: null,
                },
              ].map((item, i) => {
                const Component = item.href ? "a" : "div";
                return (
                  <Component
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#0f0f0f] border border-stone-800/40 hover:border-orange-500/50 hover:bg-[#141414] transition-all duration-300 group/item cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover/item:scale-110 group-hover/item:bg-orange-500 group-hover/item:text-white transition-all duration-300 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-bold text-sm text-stone-200 group-hover/item:text-white transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </Component>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
