import heroImage from "../assets/سمحان.png";
import { motion } from "framer-motion";
import AboutPreview from "../pages/AboutPreview"; // تم تعديل المسار هنا
import ServicesPreview from "../pages/ServicesPreview";
import PortfolioPreview from "../pages/PortfolioPreview";
import ClientsAndPartners from "../pages/ClientsAndPartners";
import { Link } from "react-router-dom"; // تأكد من استيراد Link
function Home() {
  return (
    // قمت بجمع كل شيء داخل div واحد رئيسي
    <div className="bg-[#0a0a0a]">
      <div
        className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col md:flex-row-reverse items-center justify-center p-6 md:px-24 md:py-20 gap-12 md:gap-32 overflow-hidden relative"
        dir="rtl"
      >
        {/* توهج خلفي هادئ */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

        {/* 1. الصورة */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            /* تم تغيير rounded-[30%] إلى rounded-full ليصبح دائرياً بالكامل */
            className="w-64 h-64 md:w-[480px] md:h-[480px] rounded-full overflow-hidden border border-stone-800 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          >
            <img
              src={heroImage}
              alt="سمحان"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* 2. النصوص */}
        <div className="text-center md:text-right z-10 max-w-xl flex flex-col items-center md:items-start w-full">
          {/* 2. النصوص */}
          <div className="text-center z-10 max-w-xl flex flex-col items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center" // تأكيد التوسيط هنا
            >
              <h1 className="text-3xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight">
                Graphic
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-500 to-red-600">
                  Designer
                </span>
              </h1>

              <p className="text-stone-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
                تصاميم مدروسة تجمع بين الإبداع والاستراتيجية لتمنح علامتك
                التجارية حضوراً أقوى.
              </p>
            </motion.div>

            {/* الأزرار - تم ضبطها لتكون في المنتصف */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col md:flex-row gap-4 w-full justify-center"
            >
              <Link
                to="/portfolio"
                className="bg-gradient-to-l from-orange-600 to-red-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all text-white text-center"
              >
                استعرض أعمالي ←
              </Link>

              <Link
                to="/contact"
                className="border border-stone-700 px-8 py-4 rounded-xl hover:bg-stone-800 transition-all text-white text-center"
              >
                تواصل معي ←
              </Link>
            </motion.div>

            {/* تم حذف قسم روابط التواصل كما طلبت */}
          </div>

          {/* الأزرار */}

          {/* روابط التواصل */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 md:mt-20 flex flex-wrap gap-6 md:gap-10 text-stone-500 text-xs md:text-sm tracking-widest justify-center md:justify-start"
          >
            <a
              href="https://www.behance.net/abdulrasamhan1"
              className="hover:text-white transition-colors"
            >
              B E H A N C E
            </a>
            <a
              href="https://www.instagram.com/abdoosamhan?igsh=ZjBheGIwd3BieWJh"
              className="hover:text-white transition-colors"
            >
              I N S T A G R A M
            </a>
            <a
              href="https://www.linkedin.com/in/abdulrahman-samhan-72925a3ba?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              className="hover:text-white transition-colors"
            >
              L I N K E D I N
            </a>
          </motion.div>
        </div>
      </div>
      {/* النبذة الآن داخل الـ div الرئيسي ولن تسبب خطأ */}
      {/* الأقسام الأخرى - لو واحد فيهم فيه خطأ، الصفحة مش هتبيض بالكامل */}
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <ClientsAndPartners />
    </div>
  );
}

export default Home;
