import React from "react";
import {
  ArrowUpRight,
  Upload,
  Palette,
  Target,
  Users,
  Calendar,
  DollarSign,
  MessageSquare,
  Briefcase,
  FileText,
  Type,
  Hexagon,
} from "lucide-react";

function StartProjectPage() {
  return (
    <section
      dir="rtl"
      className="py-32 px-6 bg-[#020202] text-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center px-4">
          {/* العنوان: تباين قوي بين الخفة والوزن الثقيل */}
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter leading-tight">
              هندسة
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 ml-3 md:ml-6">
                الرؤية{" "}
              </span>
            </h2>
          </div>

          {/* خط هندسي مبسط جداً يعطي طابع الفخامة */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-[2px] w-16 bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
            <div className="h-[2px] w-16 bg-white/10" />
          </div>

          {/* نص إضافي بسيط يعزز الفخامة */}
          <p className="mt-6 text-stone-500 text-sm md:text-base font-medium tracking-wide uppercase">
            أنت لست مجرد عميل، أنت شريك في صناعة تحفة بصرية. أخبرنا بكل تفصيلة..
            نحن نصغي جيداً.
          </p>
        </div>
        <form className="space-y-12 py-12">
          {/* 1. الهوية الأساسية */}
          <SectionTitle
            title="المعلومات الأساسية"
            icon={<Target size={20} />}
          />
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="اسم العميل / الشركة" placeholder="الاسم هنا" />
            <InputField
              label="رابط الموقع الإلكتروني (إن وجد)"
              placeholder="www.example.com"
            />
            <InputField
              label="رقم الهاتف (واتساب)"
              placeholder="010xxxxxxxxx"
            />
            <InputField
              label="طبيعة نشاط الشركة"
              placeholder="تجارة، تقنية، خدمات..."
            />
          </div>

          {/* 2. التفاصيل الفنية للجرافيك */}
          <SectionTitle
            title="التوجه الفني والجمالي"
            icon={<Palette size={20} />}
          />
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="الألوان المفضلة (أو درجات محددة)"
              placeholder="أزرق غامق، ذهبي، إلخ..."
            />
            <InputField
              label="هل يوجد شعار حالي؟"
              placeholder="نعم، مرفق / لا، أحتاج تصميم من الصفر"
            />
            <InputField
              label="الخطوط المفضلة (عربي/إنجليزي)"
              placeholder="كوفي، نسخ، خطوط عصرية..."
            />
            <InputField
              label="كلمات تصف شعور التصميم"
              placeholder="فاخر، بسيط، صاخب، تقني..."
            />
          </div>

          {/* 3. الجمهور والمنافسة */}
          <SectionTitle title="السوق والمنافسون" icon={<Users size={20} />} />
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="الجمهور المستهدف"
              placeholder="شباب، رجال أعمال، أمهات..."
            />
            <InputField
              label="أبرز 3 منافسين لك"
              placeholder="شركة أ، شركة ب، شركة ج..."
            />
          </div>

          {/* 4. متطلبات الميزانية والوقت */}
          <SectionTitle
            title="الإطار الزمني والميزانية"
            icon={<Calendar size={20} />}
          />
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="الميزانية التقديرية بالجنيه المصري"
              placeholder="مثال: 5,000 - 15,000 ج.م"
            />
            <InputField
              label="تاريخ التسليم المطلوب"
              placeholder="مثال: 15 أغسطس"
            />
          </div>

          {/* 5. رفع الملفات المرجعية */}
          <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-stone-800">
            <SectionTitle
              title="الملفات والملهمات"
              icon={<FileText size={20} />}
            />
            <p className="text-sm text-stone-500 mb-6">
              ارفع أي ملفات تعطينا تصوراً لما تريده (بروفايل قديم، سكيتش، صور
              ملهمة)
            </p>
            <div className="border-2 border-dashed border-stone-700 py-10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-all">
              <Upload className="text-orange-500 mb-4" size={32} />
              <span className="font-bold">
                اضغط لرفع الملفات (ZIP, PDF, AI, PNG)
              </span>
            </div>
          </div>

          {/* 6. ملاحظات إضافية */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-orange-500">
              تفاصيل إضافية لا نود أن نفوتها
            </label>
            <textarea
              className="w-full bg-[#0a0a0a] p-6 rounded-2xl border border-stone-800 h-40 focus:border-orange-500 outline-none"
              placeholder="اكتب هنا أي شيء آخر تعتقد أنه مهم لمشروعك..."
            ></textarea>
          </div>

          <button className="w-full py-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-[2rem] text-2xl font-black uppercase tracking-widest hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.8)] transition-all flex justify-center gap-4">
            إرسال البريف كاملاً <ArrowUpRight size={28} />
          </button>
        </form>
      </div>
    </section>
  );
}

function SectionTitle({ title, icon }) {
  return (
    <h3 className="flex items-center gap-3 text-orange-500 font-bold uppercase tracking-widest text-[11px] mb-6">
      {icon} {title}
    </h3>
  );
}

function InputField({ label, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
        {label}
      </label>
      <input
        className="w-full bg-[#0a0a0a] p-5 rounded-2xl border border-stone-800 focus:border-orange-500 transition-all outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}

export default StartProjectPage;
