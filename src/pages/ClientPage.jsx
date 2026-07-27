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
    <section className="bg-black py-24 px-6 relative overflow-hidden" dir="rtl">
      {/* خلفية ضبابية جمالية متطورة */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* الفورم (ثابت بذكاء على الشاشات الكبيرة) */}
        <div className="lg:col-span-5 relative lg:sticky lg:top-24">
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#0A0A0E] border border-white/10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              رايك يهمنا
            </div>

            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
              شارك{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                تجربتك
              </span>{" "}
              معنا
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-300 mb-1.5 font-medium">
                  الاسم{" "}
                </label>
                <input
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  className="w-full bg-[#131318] border border-white/10 px-4 py-3.5 rounded-2xl text-white text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1.5 font-medium">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#131318] border border-white/10 px-4 py-3.5 rounded-2xl text-white text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
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
                <div className="flex gap-3 bg-[#131318] border border-white/10 px-4 py-3.5 rounded-2xl items-center">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className={`text-2xl transition-transform hover:scale-110 ${formData.rating >= star ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" : "text-stone-700"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <span className="mr-auto text-xs text-stone-400 font-semibold bg-white/5 px-2.5 py-1 rounded-lg">
                    {formData.rating} / 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1.5 font-medium">
                  تعليقك أو انطباعك
                </label>
                <textarea
                  placeholder="اكتب تفاصيل تجربتك هنا..."
                  rows="3"
                  className="w-full bg-[#131318] border border-white/10 px-4 py-3.5 rounded-2xl text-white text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-2xl hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/30 transition-all duration-300 disabled:opacity-50 mt-2 tracking-wide"
              >
                {isSubmitting ? "جاري الإرسال..." : "نشر التقييم"}
              </button>
            </form>
          </div>
        </div>

        {/* قسم التعليقات (ديزاين فخم ومرن يظهر بالكامل) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                آراء العملاء المميزين
              </h3>
              <p className="text-stone-400 text-xs">
                تجارب حقيقية تعكس جودة الخدمات المقدمة
              </p>
            </div>
            <span className="text-xs px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold shadow-sm">
              {comments.length} تعليق
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {comments.length > 0 ? (
              comments.map((c, i) => {
                const firstLetter = c.name
                  ? c.name.charAt(0).toUpperCase()
                  : "U";

                return (
       <motion.div 
  key={c.id || i}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4, delay: i * 0.04 }}
  className="p-5 md:p-6 bg-[#0D0D12] rounded-2xl border border-white/10 hover:border-orange-500/40 flex flex-col justify-between transition-all duration-300 group shadow-lg relative overflow-hidden backdrop-blur-xl"
>
  <div className="relative z-10">
    {/* رأس البطاقة: الاسم والصورة يمين */}
    <div className="flex items-center justify-end gap-3 mb-3">
      <div className="text-right min-w-0">
        <h4 className="text-white font-bold text-sm truncate group-hover:text-orange-400 transition-colors">{c.name}</h4>
      </div>
      <div className="relative shrink-0">
        {c.avatar_url ? (
          <img 
            src={c.avatar_url} 
            alt={c.name} 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500/30 group-hover:ring-orange-500 transition-all shadow-sm"
            onError={(e)=>{ e.target.style.display = 'none'; }} 
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {firstLetter}
          </div>
        )}
      </div>
    </div>

    {/* النجوم يمين */}
    <div className="flex justify-end gap-1 text-amber-400 text-xs mb-3">
      {Array.from({ length: c.rating || 5 }).map((_, idx) => (
        <span key={idx}>★</span>
      ))}
    </div>

    {/* نص التعليق يمين وبخط أنحف وأرتب */}
    <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light text-right">
      {c.text}
    </p>
  </div>
</motion.div>
                );
              })
            ) : (
              <div className="sm:col-span-2 text-center py-24 bg-[#0A0A0E] rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center shadow-inner">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-stone-400 text-2xl mb-4 border border-white/10 shadow-inner">
                  💬
                </div>
                <p className="text-stone-200 text-base font-semibold">
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
