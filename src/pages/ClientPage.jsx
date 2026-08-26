import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

async function getGravatarUrl(email) {
  if (!email) return "";
  const trimmed = email.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(trimmed);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `https://www.gravatar.com/avatar/${hashHex}?d=mp&s=200`;
}

function ContactAndComments() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: "",
    rating: 5,
  });
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchApprovedComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (data) setComments(data);
  };

  useEffect(() => {
    fetchApprovedComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) {
      alert("يرجى ملء الحقول المطلوبة (الاسم والتعليق)");
      return;
    }

    setIsSubmitting(true);
    const avatarUrl = await getGravatarUrl(formData.email);

    const { error } = await supabase.from("comments").insert([
      {
        name: formData.name,
        email: formData.email,
        text: formData.text,
        rating: formData.rating,
        avatar_url: avatarUrl,
        approved: false,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      alert(`خطأ: ${error.message}`);
    } else {
      alert("تم إرسال تعليقك بنجاح! سيظهر بعد مراجعة الإدارة.");
      setFormData({ name: "", email: "", text: "", rating: 5 });
      fetchApprovedComments();
    }
  };

  return (
    <section className="bg-[#050508] py-24 px-4 sm:px-6 relative overflow-hidden
     " dir="rtl">
      {/* خلفية جمالية متطورة مع إضاءات محيطية ناعمة */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* قسم نموذج الإدخال (Form) */}
        <div className="lg:col-span-5 relative lg:sticky lg:top-24">
          <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0A0A0E]/90 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-5 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              رأيك يُحدث فرقاً
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              شاركنا{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                تجربتك
              </span>
            </h2>
            <p className="text-stone-400 text-xs mb-6">نحن ننسى أي تقييم يسهم في تحسين جودة خدماتنا لك.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-300 mb-1.5 font-medium">
                  الاسم الكريم
                </label>
                <input
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  className="w-full bg-[#131318] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-stone-600"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1.5 font-medium">
                  البريد الإلكتروني <span className="text-stone-500">(اختياري للصورة الشخصية)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#131318] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-stone-600"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1.5 font-medium">
                  التقييم العام
                </label>
                <div className="flex items-center justify-between bg-[#131318] border border-white/10 px-4 py-2.5 rounded-xl">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className={`text-2xl transition-all duration-200 hover:scale-125 ${
                          formData.rating >= star
                            ? "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                            : "text-stone-700 hover:text-stone-500"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                    {formData.rating} من 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1.5 font-medium">
                  تعليقك أو انطباعك
                </label>
                <textarea
                  placeholder="اكتب تفاصيل تجربتك بكل صراحة..."
                  rows="3"
                  className="w-full bg-[#131318] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none placeholder:text-stone-600"
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/20 transition-all duration-300 disabled:opacity-50 mt-2 text-sm tracking-wide"
              >
                {isSubmitting ? "جاري الإرسال..." : "نشر التقييم"}
              </button>
            </form>
          </div>
        </div>

        {/* قسم عرض التعليقات */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                آراء العملاء المميزين
              </h3>
              <p className="text-stone-400 text-xs">
                تجارب حقيقية تعكس جودة الخدمات المقدمة
              </p>
            </div>
            <span className="text-xs px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold">
              {comments.length} تقييم
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {comments.length > 0 ? (
              comments.map((c, i) => {
                const firstLetter = c.name
                  ? c.name.charAt(0).toUpperCase()
                  : "U";

                return (
                  <motion.div
                    key={c.id || i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="p-5 bg-[#0A0A0E] rounded-2xl border border-white/10 hover:border-orange-500/40 flex flex-col justify-between transition-all duration-300 group shadow-lg relative overflow-hidden backdrop-blur-xl"
                  >
                    <div className="relative z-10">
                      {/* رأس البطاقة */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="relative shrink-0">
                            {c.avatar_url ? (
                              <img
                                src={c.avatar_url}
                                alt={c.name}
                                className="w-10 h-10 rounded-full object-cover border border-white/10 shadow-sm"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                {firstLetter}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-sm truncate group-hover:text-orange-400 transition-colors">
                              {c.name}
                            </h4>
                            <span className="text-[10px] text-stone-500">عميل معتمد</span>
                          </div>
                        </div>

                        {/* النجوم */}
                        <div className="flex gap-0.5 text-amber-400 text-xs">
                          {Array.from({ length: c.rating || 5 }).map((_, idx) => (
                            <span key={idx}>★</span>
                          ))}
                        </div>
                      </div>

                      {/* نص التعليق */}
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light text-right mt-3 bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                        {c.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="sm:col-span-2 text-center py-20 bg-[#0A0A0E] rounded-3xl border border-white/5 flex flex-col items-center justify-center shadow-inner">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-stone-400 text-xl mb-3 border border-white/10 shadow-inner">
                  💬
                </div>
                <p className="text-stone-200 text-sm font-semibold">
                  لا توجد تعليقات معتمدة حتى الآن
                </p>
                <p className="text-stone-500 text-xs mt-1">
                  كن أول من يشاركنا رأيه وتجربته المميزة!
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactAndComments;
