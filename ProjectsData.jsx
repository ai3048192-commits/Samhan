import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight, ExternalLink, Sparkles, Image as ImageIcon, FileText, X } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        console.log("🔄 جاري البحث عن المشروع بالمعرف:", id);

        let allRecords = [];

        // 1. جلب البيانات من جدول projects
        const { data: projData, error: projError } = await supabase.from("projects").select("*");
        if (!projError && projData) {
          allRecords = [...allRecords, ...projData];
        }

        // 2. جلب البيانات من جدول items
        const { data: itemsData, error: itemsError } = await supabase.from("items").select("*");
        if (!itemsError && itemsData) {
          allRecords = [...allRecords, ...itemsData];
        }

        // 3. جلب البيانات من جدول portfolio_projects الرئيسي (لضمان تغطية الـ ID 22 أو أي مشروع جديد)
        const { data: mainProjData, error: mainProjError } = await supabase.from("portfolio_projects").select("*");
        if (!mainProjError && mainProjData) {
          allRecords = [...allRecords, ...mainProjData];
        }

        console.log("📋 إجمالي السجلات المسترجعة:", allRecords);

        if (allRecords.length === 0) {
          throw new Error("لا توجد أي بيانات في الجداول. تأكد من إضافة مشاريع في قاعدة البيانات.");
        }

        // البحث عن المشروع المطابق للـ ID
        let foundProject = allRecords.find(
          (item) => String(item.id) === String(id) || Number(item.id) === Number(id)
        );

        // إذا لم يتم العثور عليه، نأخذ أول عنصر كبديل مؤقت
        if (!foundProject) {
          console.warn(`⚠️ المعرف (${id}) غير موجود، سيتم عرض أول مشروع متاح.`);
          foundProject = allRecords[0];
        }

        const targetId = foundProject.id;
        console.log("✅ تم اعتماد المشروع برقم ID:", targetId);

        // جلب الصور الخاصة بهذا المشروع حصرياً من جدول portfolios عبر عمود image_url و project_id
        const { data: galleryData, error: galleryError } = await supabase
          .from("portfolios")
          .select("*")
          .eq("project_id", targetId);

        if (galleryError) {
          console.error("خطأ في جلب الصور:", galleryError.message);
        }
        setGallery(galleryData || []);

        // جلب الملفات الخاصة بهذا المشروع من جدول pdfs
        const { data: docsData, error: docsError } = await supabase
          .from("pdfs")
          .select("*")
          .eq("project_id", targetId);

        if (docsError) {
          console.error("خطأ في جلب المستندات:", docsError.message);
        }
        setDocs(docsData || []);

        setProject({
          ...foundProject,
          category: selectedCategory || foundProject.category || "عام",
        });

        setError(null);
      } catch (err) {
        console.error("❌ خطأ غير متوقع:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectData();
    }
  }, [id, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center text-stone-200" dir="rtl">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-xl font-bold tracking-wider">جاري تحميل تفاصيل المشروع...</div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center text-stone-200 px-6" dir="rtl">
        <div className="bg-[#121212] p-8 md:p-12 rounded-[2.5rem] border border-white/10 text-center max-w-lg w-full shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            ⚠️
          </div>
          <h3 className="text-2xl font-black mb-3">عذراً، حدث خطأ</h3>
          <p className="text-stone-400 text-sm mb-8 leading-relaxed">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowRight size={18} />
            <span>العودة للخلف</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#070707] min-h-screen text-stone-100 selection:bg-orange-500 selection:text-black" dir="rtl">
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#141414]/80 backdrop-blur-xl border border-white/10 text-stone-300 hover:text-white hover:border-orange-500/50 transition-all shadow-2xl group cursor-pointer"
        >
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-xs font-bold">العودة</span>
        </button>
      </div>

      <section className="relative w-full pt-28 pb-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-[#090909] p-8 md:p-14 rounded-[3rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="space-y-6 max-w-2xl">
                {project.category && (
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase">
                    <Sparkles size={14} />
                    <span>{project.category}</span>
                  </div>
                )}
                
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  {project.name || project.title}
                </h1>

                {project.description && (
                  <p className="text-stone-300/80 text-base md:text-lg leading-relaxed font-light">
                    {project.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto min-w-[200px]">
                {gallery.length > 0 && (
                  <button
                    onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                    className="px-6 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-sm transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <ImageIcon size={18} />
                    <span>استعراض المعرض ({gallery.length})</span>
                  </button>
                )}
                {docs.length > 0 && (
                  <button
                    onClick={() => document.getElementById("documents")?.scrollIntoView({ behavior: "smooth" })}
                    className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/10 transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <FileText size={18} className="text-orange-400" />
                    <span>الملفات المرفقة ({docs.length})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {gallery && gallery.length > 0 && (
        <section id="gallery" className="px-6 md:px-16 py-20 border-t border-white/5 bg-[#0a0a0a]/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl border border-orange-500/20">
                <ImageIcon size={24} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white">معرض الصور</h2>
                <p className="text-stone-400 text-xs mt-0.5">انقر على أي صورة لتكبيرها وعرضها بحجم كامل</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gallery.map((item, index) => (
                <div
                  key={item.id || index}
                  onClick={() => setSelectedImage(item.image_url)}
                  className="group relative bg-[#121212] rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/45 transition-all duration-500 shadow-xl cursor-pointer aspect-[1080/1350]"
                >
                  <img
                    src={item.image_url}
                    alt={`صورة المعرض ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="صورة مكبرة" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl mx-auto" />
          </div>
        </div>
      )}

      {docs && docs.length > 0 && (
        <section id="documents" className="px-6 md:px-16 py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white">المستندات والملفات</h2>
                <p className="text-stone-400 text-xs mt-0.5">الكتالوجات والملفات التقنية المتاحة للتحميل</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docs.map((doc, index) => (
                <a
                  key={doc.id || index}
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#121212] hover:bg-[#181818] p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {doc.title || `ملف PDF ${index + 1}`}
                      </h3>
                      <p className="text-stone-400 text-xs mt-1">اضغط للعرض أو التحميل</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-purple-500 group-hover:text-black text-white flex items-center justify-center transition-all">
                    <ExternalLink size={18} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}