import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

function PortfolioSection() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // قائمة الفئات الرئيسية

  // جلب المشاريع من جدول items
  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log("🔄 جاري جلب المشاريع من Supabase...");

      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("❌ خطأ في جلب البيانات:", error);
        throw error;
      }

      console.log("✅ تم جلب المشاريع:", data);
      setProjects(data || []);
      setError(null);
    } catch (err) {
      console.error("❌ خطأ:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // تصفية المشاريع حسب الفئة المختارة
  const displayedProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category?.trim() === filter.trim());

  console.log("📊 المشاريع المعروضة:", displayedProjects.length);

  if (loading) {
    return (
      <section className="bg-[#050505] min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">جاري التحميل...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#050505] min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl font-bold mb-4">⚠️ حدث خطأ</div>
          <p className="text-stone-400">{error}</p>
          <button
            onClick={fetchProjects}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-all"
          >
            إعادة محاولة
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#050505] min-h-screen w-full py-28 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* قسم الترحيب والعنوان */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            معرض الأعمال
          </div>

          <h2 className="text-5xl font-bold text-white">
            إبداعٌ بصري بلمسة احترافية
          </h2>

          <p className="mt-5 text-stone-400 leading-8 max-w-lg">
            استعرض نماذج من أعمالنا التي صغناها بعناية، لتمزج بين الجمال الفني
            وأهداف علامتك التجارية، محولين الأفكار إلى واقع ملموس يتحدث بلغة
            البصر.
          </p>

          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        </div>

        {/* قسم الفلتر */}


        {/* شبكة المشاريع */}
        {displayedProjects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedProjects.map((project) => (
              <motion.div
                variants={itemVariants}
                key={project.id}
                className="group relative h-[520px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#070605] cursor-pointer shadow-2xl transition-all duration-500 hover:border-orange-500/30"
              >
                {/* الصورة مع تأثير تكبير سينمائي ناعم */}
                <img
                  src={project.image_url}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x500?text=No+Image";
                  }}
                />

                {/* تدرج بصري راقي يدمج الصورة مع البطاقة السفلية */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-[#070605]/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

                {/* شارة الفئة العلوية التفاعلية */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-orange-400">
                      {project.category || "بدون فئة"}
                    </span>
                  </div>
                </div>

                {/* محتوى البطاقة في الأسفل بتصميم نظيف وهادئ */}
                <div className="absolute bottom-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    {/* اسم المشروع */}
                    <h3 className="text-2xl md:text-3xl font-light text-[#f6f1e7] tracking-tight mb-2.5 group-hover:text-orange-400 transition-colors duration-300">
                      {project.name}
                    </h3>

                    {/* الوصف بتنسيق مريح للعين */}
                    {project.description && (
                      <p className="text-[#a39a87] text-sm font-light leading-relaxed line-clamp-2 mb-6 max-w-lg">
                        {project.description}
                      </p>
                    )}

                    {/* زر الاستكشاف الراقي */}
                    <div className="pt-2 border-t border-white/[0.08]">
                      <Link
                        to={`/projects/${project.id}?category=${encodeURIComponent(
                          project.category || "",
                        )}`}
                        className="inline-flex items-center justify-between w-full pt-4 text-xs md:text-sm font-medium text-[#f6f1e7] tracking-wide group/link cursor-pointer"
                        onClick={() => {
                          console.log("🚀 الذهاب إلى المشروع:", project.id);
                        }}
                      >
                        <span className="border-b border-white/20 pb-0.5 group-hover/link:border-orange-400 group-hover/link:text-orange-400 transition-all">
                          استكشف تفاصيل المشروع
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover/link:bg-orange-500 group-hover/link:text-black group-hover/link:border-orange-500 transition-all duration-300">
                          <FiArrowUpRight
                            size={15}
                            className="-rotate-45 group-hover/link:rotate-0 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-[#070605] rounded-[2.5rem] border border-white/[0.04]">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#a39a87]">
              📂
            </div>
            <div className="text-[#a39a87] text-base font-light mb-4">
              لا توجد مشاريع متاحة في هذه الفئة حالياً
            </div>
            <button
              onClick={() => setFilter("All")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-orange-400 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-300 text-sm font-medium cursor-pointer"
            >
              عرض جميع المشاريع
            </button>
          </div>
        )}
        {/* إحصائيات */}
        <div className="text-center mt-20 pt-10 border-t border-white/10">
          <p className="text-stone-400">
            عرض {displayedProjects.length} من {projects.length} مشروع
          </p>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
