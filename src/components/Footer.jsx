import React from 'react';
import { FiFileText, FiDownload, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaWhatsapp, FaTiktok, FaYoutube, FaBehance, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer dir="rtl" className="bg-[#050505] text-[#A3A3A3] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* شبكة المعلومات المكثفة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* 1. البراند ونبذة */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white">سمحان<span className="text-orange-500">.</span></h3>
            <p className="text-sm leading-relaxed text-[#737373]">
              استوديو تقني متكامل، ندمج بين التفكير الإبداعي والتنفيذ البرمجي الدقيق لنصنع منتجات رقمية عالمية.
            </p>
            <div className="flex gap-4 pt-2">
              {[FaInstagram, FaLinkedin, FaBehance, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-orange-500 hover:text-white transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. الخدمات (معلومات أكثر) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">خدماتنا</h4>
            <ul className="space-y-3 text-sm">
              {['تطوير المواقع', 'تطبيقات الجوال', 'هوية بصرية', 'تجربة المستخدم (UX)', 'تسويق رقمي'].map((item) => (
                <li key={item} className="hover:text-orange-500 transition-colors cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* 3. التواصل (معلومات أكثر) */}
          <div className="space-y-4 text-sm">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">التواصل</h4>
            <a href="mailto:info@samhan.dev" className="flex items-center gap-3 hover:text-white transition">
              <FiMail size={16} className="text-orange-500" /> info@samhan.dev
            </a>
            <a href="tel:+201000000000" className="flex items-center gap-3 hover:text-white transition">
              <FiPhone size={16} className="text-orange-500" /> +20 100 000 0000
            </a>
            <div className="flex items-center gap-3">
              <FiMapPin size={16} className="text-orange-500" /> القاهرة، مصر
            </div>
          </div>

          {/* 4. كارت التحميل الفاجر */}
          <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/5">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">ملفاتنا</h4>
            <p className="text-xs text-[#737373] mb-6">احصل على ملفنا التعريفي (Portfolio) واطلع على أحدث أعمالنا.</p>
            <a 
              href="/Samhan_Portfolio.pdf" 
              download="Samhan_Portfolio.pdf"
              className="flex items-center justify-between bg-orange-500 text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-all"
            >
              تحميل PDF <FiDownload size={16} />
            </a>
          </div>
        </div>

        {/* الشريط السفلي */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-[#404040]">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لسمحان — الاستوديو التقني</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>سياسة الخصوصية</span>
            <span>شروط الاستخدام</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;