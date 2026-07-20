import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

function ContactAndComments() {
  const [formData, setFormData] = useState({ name: "", email: "", text: "" });
  const [comments, setComments] = useState([]);

  // جلب التعليقات المعتمدة فقط
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

  // دالة الإرسال المربوطة بـ Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من أن الحقول ليست فارغة
    if (!formData.name || !formData.text) return alert("يرجى ملء البيانات المطلوبة");

    const { error } = await supabase.from("comments").insert([{ 
      name: formData.name, 
      text: formData.text, 
      approved: false // يبدأ كـ غير معتمد حتى توافق عليه من لوحة التحكم
    }]);

    if (error) {
      alert("حدث خطأ، يرجى المحاولة لاحقاً");
    } else {
      alert("تم إرسال تعليقك بنجاح! سيظهر بعد مراجعة الإدارة.");
      setFormData({ name: "", email: "", text: "" }); // تصفير الفورم
    }
  };

  return (
    <section className="bg-[#020202] py-32 px-6 relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-20 items-center">
        
        {/* الجزء الأول: الفورم */}
        <div className="md:col-span-5 relative">
          <div className="p-12 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] backdrop-blur-3xl">
            <h2 className="text-5xl font-black text-white mb-4">تواصل <span className="text-orange-500">معنا</span></h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="text" 
                placeholder="الاسم الكريم" 
                className="w-full bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl text-white outline-none focus:border-orange-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="w-full bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl text-white outline-none focus:border-orange-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <textarea 
                placeholder="كيف يمكننا مساعدتك؟" 
                rows="3" 
                className="w-full bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl text-white outline-none focus:border-orange-500"
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
              />
              <button 
                type="submit"
                className="w-full py-5 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-500 transition-all"
              >
                إرسال الطلب
              </button>
            </form>
          </div>
        </div>

        {/* الجزء الثاني: التعليقات */}
        <div className="md:col-span-7 grid gap-6">
          {comments.map((c, i) => (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-8 bg-[#0a0a0a] rounded-[1.5rem] border border-white/[0.05]"
            >
              <h4 className="text-white font-bold">{c.name}</h4>
              <p className="text-stone-400">"{c.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactAndComments;