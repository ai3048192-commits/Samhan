import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap } from "react-icons/fi";
import PortfolioPreview from "./PortfolioPreview";

const Portfolio = () => {
  // تعريف الـ State هنا ضروري عشان الـ FAQ يشتغل
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-[#050505] min-h-screen py-10 px-6 md:px-24" dir="rtl">
      {/* الهيدر */}
      <PortfolioPreview />

      {/* الـ FAQ */}
      <div className="bg-[#050505] min-h-screen w-full py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="w-full py-24 border-b border-white/5" dir="rtl">
            <div className="flex flex-col items-center justify-center text-center px-4">
              {/* العنوان */}
              <div className="relative">
                <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter leading-tight">
                  استفسارات حول{" "}
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 ml-3 md:ml-6">
                    تصميم الهوية؟
                  </span>
                </h2>
              </div>

              {/* الخط الهندسي */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="h-[2px] w-16 bg-white/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                <div className="h-[2px] w-16 bg-white/10" />
              </div>
            </div>
          </div>

          {/* توزيع الأسئلة في شبكة (Grid) - محتوى الجرافيك ديزاين */}
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {[
              {
                q: "هل تشمل الهوية البصرية شعار فقط؟",
                a: "نحن نصمم هوية متكاملة تشمل الشعارات، لوحة الألوان، الخطوط، وتطبيقات الهوية التي تعبر عن جوهر علامتك.",
              },
              {
                q: "كيف تضمن تفرد التصميم الخاص بي؟",
                a: "نعتمد على جلسات العصف الذهني والأبحاث البصرية لضمان تقديم تصاميم مبتكرة وخاصة بعلامتك التجارية حصرياً.",
              },
              {
                q: "ماذا لو لم يعجبني النموذج الأولي؟",
                a: "نحن نتبع منهجية التعديلات التكرارية، ونعمل معك خطوة بخطوة حتى نصل إلى النتيجة التي تطمح إليها.",
              },
              {
                q: "بأي صيغ يتم تسليم الملفات النهائية؟",
                a: "نسلمك كافة الملفات الأصلية والمفتوحة (Source Files) بجميع الصيغ المطلوبة (Print & Digital) للاستخدام المستقبلي.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/[0.02] border border-white/5 hover:border-orange-500/30 p-8 rounded-3xl transition-all duration-500"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-orange-500 text-sm">0{index + 1}.</span>
                  {item.q}
                </h3>
                <p className="text-stone-400 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
