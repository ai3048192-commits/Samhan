import { Link, useLocation } from "react-router-dom";
import { Mail, Briefcase, Edit, Home, User, Lock, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [logo, setLogo] = useState("");

  // 1. التحقق من هوية الأدمن عبر Supabase Auth وتحديث الحالة تلقائياً
  useEffect(() => {
    const checkAdminStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAdmin(user?.email === "abdulrahmansamhan1@gmail.com");
    };

    checkAdminStatus();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(session?.user?.email === "abdulrahmansamhan1@gmail.com");
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. جلب اللوجو من قاعدة البيانات
  useEffect(() => {
    const fetchLogo = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "logo_url")
        .single();
      if (data) setLogo(data.value);
    };
    fetchLogo();
  }, []);

  // 3. مستمع التمرير (Scroll)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "تواصل", path: "/contact", icon: <Mail size={20} /> },
    { name: "أعمالي", path: "/portfolio", icon: <Briefcase size={20} /> },
    { name: "الخدمات", path: "/services", icon: <Edit size={20} /> },
    { name: "من أنا", path: "/about", icon: <User size={20} /> },
    { name: "الرئيسية", path: "/", icon: <Home size={20} /> },
  ];

  return (
    <>
      {/* نسخة الموبايل */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] w-[calc(100%-2rem)] max-w-[420px] flex items-center justify-between px-3 py-2 bg-[#080808]/90 backdrop-blur-2xl border border-white/[0.08] rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95)]">
        {/* الجانب الأيمن */}
        <div className="flex items-center gap-1">
          {navLinks.slice(0, 2).map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative p-3 rounded-2xl transition-all duration-300 group flex items-center justify-center ${
                  isActive
                    ? "text-orange-400 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                    : "text-stone-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {React.cloneElement(link.icon, {
                  size: 20,
                  className:
                    "transition-transform group-hover:scale-110 flex-shrink-0",
                })}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* الزر العائم في المنتصف */}
        <Link
          to="/project"
          className="relative -mt-8 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 border-[4px] border-[#080808] shadow-[0_10px_25px_rgba(249,115,22,0.4)] group transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Plus
            size={24}
            className="text-white transition-transform group-hover:rotate-90 duration-300 flex-shrink-0"
          />
        </Link>

        {/* الجانب الأيسر */}
        <div className="flex items-center gap-1">
          {navLinks.slice(2).map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative p-3 rounded-2xl transition-all duration-300 group flex items-center justify-center ${
                  isActive
                    ? "text-orange-400 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                    : "text-stone-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {React.cloneElement(link.icon, {
                  size: 20,
                  className:
                    "transition-transform group-hover:scale-110 flex-shrink-0",
                })}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]" />
                )}
              </Link>
            );
          })}

          {/* زر الأدمن */}
          {isAdmin && (
            <a
              href="https://dashboard22-blush.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-3 rounded-2xl text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300 group shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center justify-center"
              title="لوحة التحكم"
            >
              <Lock
                size={18}
                className="transition-transform group-hover:scale-110 flex-shrink-0"
              />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border-2 border-[#080808]" />
            </a>
          )}
        </div>
      </nav>

      {/* نسخة سطح المكتب */}
      <nav
        className={`hidden md:flex fixed top-4 inset-x-20 z-[999] transition-all duration-500 rounded-full py-4 px-8 justify-between items-center ${isScrolled ? "bg-[#050505]/80 backdrop-blur-xl border border-white/5 shadow-2xl" : "bg-transparent"}`}
      >
        <Link
          to="/project"
          className="bg-white text-black px-6 py-2.5 rounded-full font-black text-sm hover:bg-orange-600 hover:text-white transition-all shadow-md"
        >
          لنبدأ مشروعك
        </Link>

        <div className="flex items-center gap-8 font-medium text-stone-400">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={
                location.pathname === link.path
                  ? "text-orange-500"
                  : "hover:text-white transition-colors"
              }
            >
              {link.name}
            </Link>
          ))}

          {/* إذا كان هو الأدمن يظهر زر لوحة التحكم، وإذا لم يكن مسجلاً بهذا الإيميل لا يظهر أي شيء نهائياً */}
          {isAdmin && (
            <a
              href="https://dashboard22-blush.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 font-bold flex items-center gap-2 bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20 hover:bg-green-500/20 transition-all"
            >
              <Lock size={16} /> لوحة التحكم
            </a>
          )}
        </div>

        <div>
          {logo ? (
            <img src={logo} alt="Logo" className="h-12 object-contain" />
          ) : (
            <div className="text-4xl font-black text-white tracking-tighter">
              AS<span className="text-orange-600">.</span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
