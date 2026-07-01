import { Link, useLocation } from "react-router-dom";
import { Mail, Briefcase, Settings, Home, User, Rocket } from "lucide-react"; // تم حذف Star
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // إضافة تأثير اللون عند التمرير
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "تواصل", path: "/contact", icon: <Mail size={20} /> },
    { name: "أعمالي", path: "/portfolio", icon: <Briefcase size={20} /> },
    { name: "الخدمات", path: "/services", icon: <Settings size={20} /> },

    { name: "من انا ", path: "/about", icon: <User size={20} /> },

    { name: "الرئيسية", path: "/", icon: <Home size={20} /> },
  ];

  return (
    <>
      {/* 1. نسخة الموبايل */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a] 
      p-3 shadow-[0_-5px_20px_rgba(0,0,0,0.3)] z-50 flex justify-around items-center
       border-t border-stone-800"
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className="relative flex flex-col items-center gap-1 w-full py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-stone-800 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={`relative z-10 transition-colors ${isActive ? "text-orange-500" : "text-stone-500"}`}
              >
                {link.icon}
              </div>
              <span
                className={`relative z-10 text-[10px] font-bold ${isActive ? "text-white" : "text-stone-500"}`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
        {/* إضافة زر لنبدأ مشروعك في الموبايل */}
        <Link
          to="/project"
          className="flex flex-col items-center gap-1 w-full py-2 text-orange-500"
        >
          <Rocket size={20} />
          <span className="text-[10px] font-bold">لنبدأ</span>
        </Link>
      </nav>

      {/* 2. نسخة سطح المكتب مع تأثير اللون عند التمرير */}
      <nav
        className={`hidden md:flex justify-between items-center py-4 px-8 fixed top-4 left-6 right-6 z-50 transition-all duration-500 rounded-2xl border border-white/5 ${isScrolled ? "bg-[#050505]/80 backdrop-blur-xl shadow-2xl" : "bg-transparent border-transparent"}`}
      >
        {/* زر "لنبدأ مشروعك" - ستايل بريميوم */}
        <Link
          to="/project"
          className="group flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm font-black tracking-tight"
        >
          <span>لنبدأ مشروعك</span>
          {/* الأيقونة مع تأثير حركة بسيط عند الـ hover */}
      
        </Link>

        {/* الروابط - ستايل نظيف */}
        <div className="flex items-center gap-8 font-medium text-stone-400">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-300 ${location.pathname === link.path ? "text-orange-500" : "hover:text-white"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* اللوجو */}
        <div className="text-2xl font-black text-white cursor-pointer group">
          AS
          <span className="text-orange-600 group-hover:text-red-500 transition-colors">
            .
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
