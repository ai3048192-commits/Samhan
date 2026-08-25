import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function PortfolioSection() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("portfolio_projects").select("*");
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen w-full py-24 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            مشاريعنا المميزة
          </div>

          <h2 className="text-5xl font-bold text-white">مشاريعنا المميزة</h2>

          <p className="mt-5 text-stone-400 leading-8">
            كل مشروع يعكس شغفنا بالتصميم وحرصنا على تقديم حلول بصرية مبتكرة
            تساعد العلامات التجارية على التميز والنجاح.
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -8 }}
              className="relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group bg-black"
            >
              <img
                src={p.image_url}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover !transform-none !scale-100"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
                    {p.category || "SOCIAL MEDIA DESIGN"}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                  {p.title}
                </h3>

                {p.description && (
                  <p className="text-stone-300 text-sm font-light leading-relaxed line-clamp-2 mb-4">
                    {p.description}
                  </p>
                )}

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to="/smahan"
                    onClick={() => localStorage.setItem("selectedProjectId", p.id)}
                    className="text-white font-medium text-sm hover:text-orange-400 transition-colors"
                  >
                    استكشف تفاصيل المشروع
                  </Link>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <FiArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioSection;