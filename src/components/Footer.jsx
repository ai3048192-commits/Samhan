import React, { useState, useEffect } from "react";
import {
  FiDownload,
  FiMail,
  FiMapPin,
  FiPhone,
  FiExternalLink,
} from "react-icons/fi";

import {
  FaBehance,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

const Footer = () => {
  const [footerLogo, setFooterLogo] = useState(null);
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // 1. جلب اللوجو بأمان بدون استخدام .single() لتجنب الأخطاء
      const { data: logoData } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "logo_url")
        .limit(1);

      if (logoData && logoData.length > 0) {
        setFooterLogo(logoData[0].value);
      }

      // 2. جلب روابط السوشيال ميديا وتحويل المنصة لحروف صغيرة لضمان التوافق
      const { data, error } = await supabase
        .from("social_links")
        .select("platform, url");
      if (error) {
        console.error("خطأ في جلب روابط السوشيال ميديا:", error);
      }
      if (data) {
        const formatted = {};
        data.forEach((item) => {
          if (item.platform && item.url) {
            formatted[item.platform.trim().toLowerCase()] = item.url.trim();
          }
        });
        setSocialLinks(formatted);
      }
    };
    fetchData();
  }, []);

  // مصفوفة منصات التواصل الاجتماعي
  const socialIcons = [
    { name: "instagram", icon: FaInstagram },
    { name: "behance", icon: FaBehance },
    { name: "linkedin", icon: FaLinkedin },
    { name: "whatsapp", icon: FaWhatsapp },
    { name: "youtube", icon: FaYoutube },
    { name: "facebook", icon: FaFacebook },
    { name: "tiktok", icon: FaTiktok },
  ];

  // معلومات التواصل المباشر
  const contactItems = [
    {
      type: "email",
      label: "abdulrahmansamhan1@gmail.com",
      href: null,
      icon: FiMail,
    },
    {
      type: "phone",
      label: "01001254587",
      href: "https://wa.me/201001254587",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: FiPhone,
    },
    {
      type: "location",
      label: "القاهرة، مصر",
      href: null,
      icon: FiMapPin,
    },
  ];

  return (
    <footer
      dir="rtl"
      className="relative bg-[#020202] text-[#858585] pt-24 pb-10 border-t border-white/[0.05] overflow-hidden"
    >
      {/* خط إضاءة علوي خفيف */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* شبكة الفوتر الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-20 items-start">
          {/* 1. البراند + نبذة تعريفية + أيقونات السوشيال ميديا */}
          <div className="lg:col-span-4 space-y-6">
            {footerLogo ? (
              <img
                src={footerLogo}
                alt="Logo"
                className="h-16 w-auto object-contain brightness-200"
              />
            ) : (
              <h3 className="text-4xl font-black text-white tracking-tighter">
                سمحان<span className="text-orange-500">.</span>
              </h3>
            )}
            <p className="text-sm leading-relaxed text-[#666] max-w-[280px]">
              نصمم تجارب بصرية فريدة تحول علامتك التجارية إلى أيقونة لا تُنسى في
              عالم الجرافيك.
            </p>

            {/* السوشيال ميديا بألوان مخصصة عند التحويم */}
            <div className="flex flex-wrap gap-2.5">
              {socialIcons.map((item, i) => {
                const link = socialLinks[item.name];
                if (!link) return null;

                const hoverColorClass =
                  item.name === "instagram"
                    ? "hover:bg-pink-600 hover:border-pink-600 hover:shadow-lg hover:shadow-pink-600/30"
                    : item.name === "behance"
                      ? "hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/30"
                      : item.name === "linkedin"
                        ? "hover:bg-sky-600 hover:border-sky-600 hover:shadow-lg hover:shadow-sky-600/30"
                        : item.name === "whatsapp"
                          ? "hover:bg-emerald-600 hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-600/30"
                          : item.name === "youtube"
                            ? "hover:bg-red-600 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/30"
                            : item.name === "facebook"
                              ? "hover:bg-blue-700 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-700/30"
                              : item.name === "tiktok"
                                ? "hover:bg-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-800/30"
                                : "hover:bg-orange-500 hover:border-orange-500";

                return (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] text-stone-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 ${hoverColorClass}`}
                  >
                    <item.icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 2. بيانات الاتصال */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-[2px] after:bg-orange-500">
              تواصل معنا
            </h4>

            <div className="space-y-2.5">
              {contactItems.map((item, index) => {
                const IconComponent = item.icon;
                const Component = item.href ? "a" : "div";

                return (
                  <Component
                    key={index}
                    href={item.href}
                    className="group/item relative flex items-center justify-between p-3.5 rounded-2xl bg-[#0e0e10] hover:bg-[#141417] border border-stone-800/60 hover:border-orange-500/50 transition-all duration-300 shadow-md block"
                  >
                    {/* إضاءة جانبية عند الهوفر */}
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-orange-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-r-2xl" />

                    <div className="relative z-10 flex flex-col text-right pl-2 ">
                      <span className=" text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-0.5 group-hover/item:text-stone-400 transition-colors">
                        {item.type === "email"
                          ? "البريد الإلكتروني"
                          : item.type === "phone"
                            ? "الهاتف"
                            : "العنوان"}
                      </span>
                      <span className="text-xs text-stone-200 group-hover/item:text-white transition-colors font-semibold tracking-wide break-all">
                        {item.label}
                      </span>
                    </div>

                    <div className="relative z-10 w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover/item:scale-105 group-hover/item:bg-orange-500 group-hover/item:text-white transition-all duration-300 shrink-0">
                      <IconComponent size={16} />
                    </div>
                  </Component>
                );
              })}
            </div>
          </div>

          {/* 3. سابقة الأعمال والملف التعريفي (أونلاين + تنزيل PDF) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#121215] to-[#0a0a0c] p-6 rounded-[2rem] border border-stone-800/80 shadow-2xl relative overflow-hidden group">
            {/* إضاءة خلفية ناعمة */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-orange-500/10 blur-[50px] rounded-full group-hover:bg-orange-500/20 transition-all duration-500 pointer-events-none" />

            <h4 className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-1.5">
              Portfolio 2026
            </h4>
            <h3 className="text-white text-base font-bold mb-2">
              سابقة أعمال احترافية
            </h3>
            <p className="text-stone-400 text-xs mb-5 leading-relaxed">
              استعرض مهاراتنا في الهوية البصرية، تصميم السوشيال ميديا، وتصميم
              الواجهات.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {/* زر البورتفليو أونلاين */}
              <a
                href="#"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold text-xs hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all duration-300"
              >
                البورتفليو أونلاين <FiExternalLink size={13} />
              </a>

              {/* زر تنزيل الملف التعريفي PDF */}
              <a
                href="/Samhan_Portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-3 bg-[#18181c] hover:bg-white text-stone-200 hover:text-black border border-stone-800 hover:border-white rounded-xl font-bold text-xs transition-all duration-300"
              >
                تنزيل الملف التعريفي <FiDownload size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* الشريط السفلي (Copyright & Links) */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.04] text-[11px] tracking-wider text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-stone-300 font-semibold">سمحان</span> — جميع
              الحقوق محفوظة
            </p>
          </div>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a
              href="#privacy"
              className="relative hover:text-white transition-colors duration-300 py-1 after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[1px] after:bg-orange-500 hover:after:w-full after:transition-all after:duration-300"
            >
              سياسة الخصوصية
            </a>
            <span className="text-stone-700">•</span>
            <a
              href="#terms"
              className="relative hover:text-white transition-colors duration-300 py-1 after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[1px] after:bg-orange-500 hover:after:w-full after:transition-all after:duration-300"
            >
              شروط الاستخدام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
