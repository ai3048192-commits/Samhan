import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight } from "lucide-react";

export default function ProjectsData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [project, setProject] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        console.log("🔄 جاري جلب بيانات المشروع:", id);

        // 1. جلب بيانات المشروع الرئيسي من جدول items
        const { data: mainData, error: mainError } = await supabase
          .from("items")
          .select("*")
          .eq("id", parseInt(id))
          .single();

        if (mainError) {
          console.error("❌ خطأ في جلب المشروع:", mainError);
          throw mainError;
        }

        if (!mainData) {
          throw new Error("المشروع غير موجود");
        }

        console.log("✅ تم جلب المشروع:", mainData);

        // 2. جلب الصور من جدول portfolios المرتبطة بهذا المشروع
        const { data: galleryData, error: galleryError } = await supabase
          .from("portfolios")
          .select("*")
          .eq("project_id", parseInt(id));

        if (galleryError) {
          console.warn("⚠️ لا توجد صور للمشروع:", galleryError);
        } else {
          console.log("✅ تم جلب الصور:", galleryData);
          setGallery(galleryData || []);
        }

        // 3. جلب ملفات PDF من جدول pdfs المرتبطة بهذا المشروع
        const { data: docsData, error: docsError } = await supabase
          .from("pdfs")
          .select("*")
          .eq("project_id", parseInt(id));

        if (docsError) {
          console.warn("⚠️ لا توجد ملفات PDF للمشروع:", docsError);
        } else {
          console.log("✅ تم جلب الملفات:", docsData);
          setDocs(docsData || []);
        }

        // دمج البيانات
        setProject({
          ...mainData,
          category: selectedCategory || mainData.category,
        });

        setError(null);
      } catch (err) {
        console.error("❌ خطأ في جلب البيانات:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectData();
    }
  }, [id, selectedCategory]);

  // حالات التحميل والخطأ
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0a08] flex items-center justify-center text-[#e8e1d3]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-2xl font-bold">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0a08] flex items-center justify-center text-[#e8e1d3]">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4 text-red-500">⚠️ حدث خطأ</div>
          <p className="text-stone-400 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-all"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0b0a08] flex items-center justify-center text-[#e8e1d3]">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">🔍 المشروع غير موجود</div>
          <p className="text-stone-400 mb-6">
            عذراً، لم نتمكن من العثور على هذا المشروع
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-all"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0a08] min-h-screen text-[#e8e1d3]" dir="rtl">
      {/* ===== قسم البطل (Hero) ===== */}
      <section className="relative w-full min-h-screen overflow-hidden bg-[#0b0a08] flex flex-col">
        {/* الجزء العلوي: المساحة الفارغة الفخمة */}
        <div className="h-[15vh]" />

        {/* الجزء الأوسط: الصورة الرئيسية (بطاقة عائمة) */}
        <div className="relative z-10 w-[90%] md:max-w-7xl mx-auto h-[65vh] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden border border-white/5">
          <img
            src={project.hero_image || project.image_url}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover object-center scale-100"
          />
          {/* تدرج خفيف فوق الصورة لضمان قراءة جزء من النص العلوي */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* الجزء السفلي: المحتوى (النصوص) */}
        <div className="relative z-20 w-full px-6 md:px-16 -mt-20 md:-mt-32 max-w-[1500px] mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#141210]/95 via-[#0b0a08]/95 to-[#070605]/95 backdrop-blur-2xl p-8 md:p-14 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] group">
            {/* خط جمالي مضيء من الأعلى */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            {/* تأثير إضاءة خلفية ناعمة */}
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* القسم الرئيسي: الفئة والعنوان */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {project.category && (
                  <div className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                    </span>
                    <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                )}

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#f6f1e7] tracking-tighter leading-[1.05] drop-shadow-lg">
                  {project.name}
                </h1>
              </div>

              {/* القسم الثانوي: الوصف وزر التفاعل */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-8 lg:border-r lg:border-white/10 lg:pr-12">
                {project.description && (
                  <p className="text-[#d4cbba]/90 text-base md:text-lg font-light leading-relaxed">
                    {project.description}
                  </p>
                )}

                <div className="flex items-center gap-6 pt-2">
                  {/* تم إضافة دالة الـ onClick لضمان النزول بنعومة */}
                  <button
                    onClick={() => {
                      const galleryElement = document.getElementById("gallery");
                      if (galleryElement) {
                        galleryElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="group/btn relative inline-flex items-center justify-between gap-8 px-8 py-4 bg-orange-500 text-black font-bold text-sm tracking-wide rounded-2xl overflow-hidden shadow-xl shadow-orange-500/20 hover:bg-[#f6f1e7] transition-all duration-300 w-full sm:w-auto cursor-pointer"
                  >
                    <span className="relative z-10">مشاهدة المعرض</span>
                    <div className="relative z-10 w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center group-hover/btn:bg-orange-500 group-hover/btn:text-black transition-colors">
                      <svg
                        className="w-4 h-4 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* تدرج سفلي للخلفية لدمج القسم مع ما يليه */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b0a08] to-transparent pointer-events-none" />
      </section>

      {/* ===== شبكة الصور (Gallery) من جدول portfolios ===== */}
      {gallery && gallery.length > 0 && (
        <section
          className="px-6 md:px-20 py-20 border-t border-white/10"
          id="gallery"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              {/* شارة القسم العلوية */}
              <div className="inline-flex items-center gap-3 text-orange-400 font-extrabold text-xs tracking-[0.25em] uppercase mb-6 bg-orange-500/10 backdrop-blur-md px-5 py-2 rounded-full border border-orange-500/20 shadow-lg shadow-orange-500/5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span>معرض الأعمال</span>
              </div>

              {/* العنوان الرئيسي */}
              <h2 className="text-4xl md:text-6xl font-black text-[#f6f1e7] tracking-tight leading-[1.2] mb-6">
                أبرز أعمالنا المبدعة
              </h2>

              {/* الوصف */}
              <p className="text-[#a39a87] text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
                نستعرض هنا نخبة من أعمالنا وتصميماتنا السابقة التي تعكس خبرتنا
                التراكمية واهتمامنا بأدق التفاصيل لتحقيق أفضل النتائج.
              </p>

              {/* خط فاصل جمالي تحت العنوان */}
              <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full opacity-60" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gallery.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-[#0b0a08] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
                >
                  <img
                    src={item.image_url}
                    alt={item.title || `صورة ${index + 1}`}
                    className="w-full aspect-[4/5] object-cover !transform-none !scale-100"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/1080x1350?text=No+Image";
                    }}
                  />
               
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== عرض ملفات الـ PDF من جدول pdfs ===== */}
    {docs && docs.length > 0 && (
  <section className="px-6 md:px-20 py-20 border-t border-[#e8e1d3]/10">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        {/* شارة القسم العلوية */}
        <div className="inline-flex items-center gap-3 text-orange-400 font-extrabold text-xs tracking-[0.25em] uppercase mb-6 bg-orange-500/10 backdrop-blur-md px-5 py-2 rounded-full border border-orange-500/20 shadow-lg shadow-orange-500/5">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>الملفات المرفقة</span>
        </div>

        {/* العنوان الرئيسي */}
        <h2 className="text-4xl md:text-6xl font-black text-[#f6f1e7] tracking-tight leading-[1.2] mb-6">
          المستندات والملفات
        </h2>

        {/* الوصف */}
        <p className="text-[#a39a87] text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
          تصفح وقم بتحميل كافة المستندات والملفات التقنية الخاصة بالمشروع
          للاطلاع على التفاصيل الكاملة والمواصفات.
        </p>

        {/* خط فاصل جمالي تحت العنوان */}
        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full opacity-60" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc, index) => (
          <a
            key={doc.id || index}
            href={doc.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-3xl overflow-hidden border border-[#e8e1d3]/10 transition-all duration-300"
          >
            {doc.preview_image && (
              <div className="relative overflow-hidden bg-black h-[300px]">
                <img
                  src={doc.preview_image}
                  alt={doc.title}
                  className="w-full h-full object-cover !transform-none !scale-100"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x300?text=PDF";
                  }}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            )}
            <div className="p-6 bg-[#0b0a08]">
              <h3 className="text-xl font-bold text-[#f6f1e7]">
                {doc.title}
              </h3>
              <p className="text-[#a39a87] text-sm mt-2">
                👆 انقر لفتح الملف
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
)}

      {/* رسالة إذا لم يكن هناك معرض أو ملفات */}
      {(!gallery || gallery.length === 0) && (!docs || docs.length === 0) && (
        <section className="px-6 md:px-20 py-20 text-center border-t border-white/10">
          <p className="text-[#a39a87] text-lg">
            لا توجد صور أو ملفات إضافية لهذا المشروع حالياً
          </p>
        </section>
      )}

    </div>
  );
}
