import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ArrowUpRight, Upload, FileText } from "lucide-react";

function StartProjectPage() {
  const [formData, setFormData] = useState({
    client_name: "",
    website: "",
    phone: "",
    activity: "",
    colors: "",
    has_logo: "",
    fonts: "",
    feeling: "",
    audience: "",
    competitors: "",
    budget: "",
    deadline: "",
    additional_notes: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

 
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let fileUrl = null;

    try {
      // 1. رفع الملف إذا وجد
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("project-files")
          .upload(fileName, file, {
            contentType: file.type, 
          });
          
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("project-files")
          .getPublicUrl(fileName);
        fileUrl = urlData.publicUrl;
      }

      // 2. إرسال البيانات للجدول
      const { error } = await supabase.from("projects").insert([
        {
          ...formData,
          file_url: fileUrl,
          status: "pending",
        },
      ]);

      if (error) throw error;

      alert("تم إرسال طلبك بنجاح!");

      // 3. تنظيف النموذج (هنا التصحيح الذي طلبته)
  // استبدل كود التنظيف داخل handleSubmit بهذا:
setFormData({
  client_name: "",
  website: "",
  phone: "",
  activity: "",
  colors: "",
  has_logo: "",
  fonts: "",
  feeling: "",
  audience: "",
  competitors: "",
  budget: "",
  deadline: "",
  additional_notes: "",
});
setFile(null);
      
    } catch (error) {
      console.error("خطأ:", error);
      alert("حدث خطأ أثناء الإرسال: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      dir="rtl"
      className="py-32 px-6 bg-[#020202] text-white min-h-screen"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12">
     <div className="text-center max-w-3xl mx-auto mb-20">
  <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
    بدء التعاون
  </div>

  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
    هندسة الرؤية
  </h2>

  <p className="mt-5 text-stone-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
    شاركنا تفاصيل فكرتك وطموحاتك، لنحولها معاً إلى عمل بفريسة استثنائية تنبض بالإبداع
  </p>
</div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 1. حقول الإدخال مع توضيحات */}
          <InputFieldWithHint
            label="اسم العميل / الشركة"
            hint="كيف نُنادي شركتك أو اسمك الكريم؟"
            value={formData.client_name}
            onChange={(v) => setFormData({ ...formData, client_name: v })}
          />
          <InputFieldWithHint
            label="رابط الموقع"
            hint="رابط موقعك الحالي أو معرض أعمالك"
            value={formData.website}
            onChange={(v) => setFormData({ ...formData, website: v })}
          />
          <InputFieldWithHint
            label="رقم الهاتف (واتساب)"
            hint="للتواصل السريع معك بخصوص التصميم"
            value={formData.phone}
            onChange={(v) => setFormData({ ...formData, phone: v })}
          />
          <InputFieldWithHint
            label="طبيعة النشاط"
            hint="ماذا تقدم؟ (مثال: متجر إلكتروني، مطعم، شركة برمجيات)"
            value={formData.activity}
            onChange={(v) => setFormData({ ...formData, activity: v })}
          />
          <InputFieldWithHint
            label="الألوان المفضلة"
            hint="الألوان التي تشعر أنها تمثل هويتك"
            value={formData.colors}
            onChange={(v) => setFormData({ ...formData, colors: v })}
          />
          <InputFieldWithHint
            label="هل يوجد شعار؟"
            hint="هل لديك شعار جاهز أم تحتاج لتصميمه؟"
            value={formData.has_logo}
            onChange={(v) => setFormData({ ...formData, has_logo: v })}
          />
          <InputFieldWithHint
            label="الخطوط المفضلة"
            hint="هل تفضل خطوطاً عصرية، كلاسيكية، أو جريئة؟"
            value={formData.fonts}
            onChange={(v) => setFormData({ ...formData, fonts: v })}
          />
          <InputFieldWithHint
            label="شعور التصميم"
            hint="كلمات تصف الانطباع (فخامة، سرعة، بساطة)"
            value={formData.feeling}
            onChange={(v) => setFormData({ ...formData, feeling: v })}
          />
          <InputFieldWithHint
            label="الجمهور المستهدف"
            hint="من هم عملاؤك الذين يستهدفهم التصميم؟"
            value={formData.audience}
            onChange={(v) => setFormData({ ...formData, audience: v })}
          />
          <InputFieldWithHint
            label="المنافسون"
            hint="اذكر 3 منافسين لك لنبتكر شيئاً مميزاً"
            value={formData.competitors}
            onChange={(v) => setFormData({ ...formData, competitors: v })}
          />
          <InputFieldWithHint
            label="الميزانية التقديرية"
            hint="نطاق الميزانية المتوقع لمشروعك"
            value={formData.budget}
            onChange={(v) => setFormData({ ...formData, budget: v })}
          />
          <InputFieldWithHint
            label="تاريخ التسليم"
            hint="متى تحتاج لاستلام المشروع النهائي؟"
            value={formData.deadline}
            onChange={(v) => setFormData({ ...formData, deadline: v })}
          />
        </div>

        {/* 2. تصميم احترافي لرفع الملفات */}
        <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-stone-800 hover:border-orange-500/50 transition-all">
          <label className="block text-sm font-bold text-orange-500 mb-2">
            الملفات المرجعية
          </label>
          <p className="text-xs text-stone-500 mb-6">
            ارفع بروفايلات قديمة، سكتشات، أو صوراً ملهمة (حجم الملف لا يتجاوز 5
            ميجا)
          </p>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-700 rounded-2xl cursor-pointer hover:bg-white/5 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-stone-400 font-bold">
                اضغط هنا لاختيار ملف
              </p>
              <p className="text-xs text-stone-600">
                {file ? file.name : "لم يتم اختيار ملف"}
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>

        <textarea
          className="w-full bg-[#0a0a0a] p-6 rounded-2xl border border-stone-800 focus:border-orange-500 transition-all outline-none"
          placeholder="ملاحظات إضافية نود معرفتها؟"
          value={formData.additional_notes}
          onChange={(e) =>
            setFormData({ ...formData, additional_notes: e.target.value })
          }
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-[2rem] text-2xl font-black hover:scale-[1.01] transition-transform"
        >
          {loading ? "جاري الإرسال..." : "إرسال البريف كاملاً"}
        </button>
      </form>
    </section>
  );
}

{
  /* مكون مساعد لتقليل التكرار */
}
function InputFieldWithHint({ label, hint, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-bold text-stone-400 uppercase">
        {label}
      </label>
      <p className="text-[10px] text-stone-600 mb-2">{hint}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0a0a0a] p-5 rounded-2xl border border-stone-800 focus:border-orange-500 outline-none transition-all"
        placeholder={label}
      />
    </div>
  );
}

export default StartProjectPage;
