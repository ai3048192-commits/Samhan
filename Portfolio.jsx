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
          <div className="text-center max-w-3xl mx-auto mb-20">
            {/* أيقونة وعنوان فرعي */}
            <div className="inline-flex items-center gap-2 text-orange-500 font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-orange-500/5 px-4 py-1.5 rounded-full border border-orange-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              استفسارات
            </div>

            {/* العنوان الرئيسي */}
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              أسئلة شائعة
            </h2>

            {/* الوصف */}
            <p className="mt-6 text-stone-400 leading-8 max-w-2xl mx-auto">
              تجد هنا إجابات وافية على أكثر الأسئلة تكراراً حول خدماتنا، وكيف
              يمكننا مساعدتك في تحقيق أهدافك الرقمية.
            </p>
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
