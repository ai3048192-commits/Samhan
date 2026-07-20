import heroImage from "../assets/سمحان.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AboutPreview from "../pages/AboutPreview";
import ServicesPreview from "../pages/ServicesPreview";
import PortfolioPreview from "../pages/PortfolioPreview";
import ClientsAndPartners from "../pages/ClientsAndPartners";
import ClientPage from "../pages/ClientPage";

function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-hidden">
      {/* القسم الرئيسي */}
      <section
        className="min-h-screen w-full flex flex-col md:flex-row-reverse items-center justify-center p-6 md:px-24 md:py-20 gap-16 relative"
        dir="rtl"
      >
        {/* توهج خلفي هادئ */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/5 blur-[150px] rounded-full pointer-events-none" />

        {/* 1. الصورة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          {/* توهج ديناميكي ينبض خلف الصورة */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-orange-600/30 blur-[100px] rounded-full"
          />

          {/* الصورة بحركة طفو بطيئة جداً وانسيابية */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-64 h-64 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(234,88,12,0.3)]"
          >
            <img
              src={heroImage}
              alt="سمحان"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[2000ms] ease-in-out"
            />
          </motion.div>
        </motion.div>
        {/* 2. النصوص والأزرار مع توهج برتقالي قوي */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-lg text-center md:text-right flex flex-col items-center md:items-start w-full relative"
        >
          {/* توهج برتقالي قوي وواضح خلف النصوص */}
          <div className="absolute -top-20 -right-20 w-[350px] h-[350px] bg-orange-600/30 blur-[120px] rounded-full pointer-events-none" />

          {/* العنوان مع ظل برتقالي خفيف ليعطي إضاءة */}
          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter relative z-10 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            Graphic
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              Designer
            </span>
          </h1>

          {/* الفقرة */}
          <p className="text-stone-300 text-lg md:text-xl mb-10 leading-relaxed max-w-md font-medium text-center md:text-right relative z-10">
            أصمم هويات بصرية تروي قصة علامتك التجارية. <br />
            دمجتُ بين الفن الرقمي والاستراتيجية لأصنع لك حضوراً لا يُنسى.
          </p>

          {/* الأزرار */}
          <div className="w-full flex flex-col md:flex-row gap-4 justify-center md:justify-start relative z-10">
            <Link
              to="/portfolio"
              className="px-10 py-4 bg-orange-600 text-white rounded-full font-bold transition-all duration-500 hover:bg-white hover:text-black shadow-[0_0_20px_rgba(234,88,12,0.6)] text-center"
            >
              استعرض أعمالي
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border border-orange-600/50 rounded-full font-medium text-white hover:bg-orange-600 transition-all duration-300 text-center"
            >
              تواصل معي
            </Link>
          </div>

          {/* روابط التواصل */}
          <div className="mt-12 flex gap-8 text-stone-400 text-[12px] font-bold uppercase tracking-[0.3em] justify-center md:justify-start w-full relative z-10">
            <a
              href="https://www.behance.net/abdulrasamhan1"
              target="_blank"
              className="hover:text-orange-400 transition-colors duration-300 underline underline-offset-8 decoration-orange-600/50"
            >
Behance            </a>
            <a
              href="https://www.instagram.com/abdoosamhan"
              target="_blank"
              className="hover:text-orange-400 transition-colors duration-300 underline underline-offset-8 decoration-orange-600/50"
            >
              instagram
            </a>
            <a
              href="https://www.linkedin.com/in/abdulrahman-samhan-72925a3ba/"
              target="_blank"
              className="hover:text-orange-400 transition-colors duration-300 underline underline-offset-8 decoration-orange-600/50"
            >
linkedin            </a>
          </div>
        </motion.div>
      </section>

      {/* الأقسام الأخرى */}
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <ClientsAndPartners />
      <ClientPage />
    </div>
  );
}

export default Home;
