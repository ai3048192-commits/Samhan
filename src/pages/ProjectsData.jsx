import { useParams } from "react-router-dom";

// هنا افترضنا أن كل مشروع له مصفوفة صور ومعلومات
const projectsData = {
  1: {
    title: "هوية بصرية - تصميم الأشبال",
    description:
      "هذا المشروع يعكس رؤية العلامة التجارية في الدمج بين العراقة والحداثة.",
    pdfLink: "/files/presentation.pdf",
    pdfPreviewImg:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2000&auto=format&fit=crop",
    heroImg:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2400&auto=format&fit=crop",
    items: [
      {
        img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop",
        title: "الشعار الرئيسي",
        desc: "تصميم هندسي يعتمد على النسبة الذهبية.",
      },
      {
        img: "https://images.unsplash.com/photo-1636955720970-13d80d28509c?q=80&w=1600&auto=format&fit=crop",
        title: "بطاقات الأعمال",
        desc: "طباعة فاخرة على ورق مقوى.",
      },
      {
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
        title: "واجهة الموقع",
        desc: "تجربة مستخدم تفاعلية وسلسة.",
      },
      {
        img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop",
        title: "دليل الهوية",
        desc: "قواعد استخدام الشعار والألوان والمساحات.",
      },
      {
        img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1600&auto=format&fit=crop",
        title: "التغليف",
        desc: "تصميم عبوات يعكس فخامة المنتج.",
      },
      {
        img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1600&auto=format&fit=crop",
        title: "اللوحات الإرشادية",
        desc: "نظام بصري للفروع والمعارض.",
      },
      {
        img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=1600&auto=format&fit=crop",
        title: "المطبوعات التسويقية",
        desc: "بروشورات وكتالوجات بطابع موحّد.",
      },
      {
        img: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1600&auto=format&fit=crop",
        title: "الحضور الرقمي",
        desc: "تطبيق الهوية على منصات السوشيال ميديا.",
      },
    ],
  },
};

export default function ProjectsData() {
  const { id } = useParams();
  const project = projectsData[id];

  if (!project)
    return (
      <div className="bg-[#0b0a08] min-h-screen flex items-center justify-center">
        <p className="text-[#e8e1d3] text-2xl font-medium">المشروع غير موجود</p>
      </div>
    );

  return (
    <div className="bg-[#0b0a08] min-h-screen text-[#e8e1d3]" dir="rtl">
      {/* ===== الهيرو: صورة كاملة + العنوان والوصف فوقها ===== */}
      <section className="relative w-full h-[58vh]  overflow-hidden">
        <img
          src={project.heroImg}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        {/* تدرّج لإظهار النص بوضوح */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-[#0b0a08]/60 to-[#0b0a08]/20" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0b0a08]/10 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6  pb-32 ">
          <span className="text-[#c98a4b] tracking-[0.3em] text-xs md:text-sm font-semibold uppercase mb-5">
            معرض المشروع
          </span>
          <h1 className="text-4xl md:text-7xl font-black leading-[1.05] max-w-4xl mb-6 text-[#f6f1e7]">
            {project.title}
          </h1>
          <p className="text-[#cfc6b3] text-lg md:text-2xl max-w-2xl font-light">
            {project.description}
          </p>
        </div>
      </section>

      {/* ===== شبكة الصور الثماني ===== */}
      <section className="px-6 md:px-20 py-20 md:py-28">
        <div className="flex items-baseline justify-between mb-14 border-b border-[#e8e1d3]/10 pb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f6f1e7]">
            تفاصيل التنفيذ
          </h2>
          <span className="text-[#8a8170] text-sm">
            {project.items.length} عناصر
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e8e1d3]/10">
          {project.items.map((item, index) => (
            <div
              key={index}
              className="group relative bg-[#0b0a08] overflow-hidden"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-[#0b0a08]/10 to-transparent" />
                <span className="absolute top-5 right-5 text-xs tracking-widest text-[#f6f1e7]/70 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-7 md:p-9">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#f6f1e7]">
                  {item.title}
                </h3>
                <p className="text-[#a39a87] text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== معاينة عرض المشروع (صورة غلاف بصيغة PDF) ===== */}
      <section className="px-6 md:px-20 pb-32">
        <div className="flex items-baseline justify-between mb-10 border-b border-[#e8e1d3]/10 pb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f6f1e7]">
            عرض المشروع
          </h2>
          <span className="text-[#8a8170] text-sm">PDF</span>
        </div>

        <a
          href={project.pdfLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full rounded-3xl overflow-hidden border border-[#e8e1d3]/10"
        >
          <img
            src={project.pdfPreviewImg}
            alt={`غلاف عرض ${project.title}`}
            className="w-full h-[50vh] md:h-[80vh] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-[#0b0a08]/30 to-transparent" />

          {/* شارة PDF */}
          <span className="absolute top-5 right-5 md:top-7 md:right-7 bg-[#0b0a08]/80 backdrop-blur-sm text-[#c98a4b] text-xs md:text-sm font-bold tracking-widest px-4 py-2 rounded-full border border-[#c98a4b]/30">
            PDF
          </span>

          {/* دعوة لفتح المعاينة */}
          <div className="absolute bottom-6 right-6 left-6 md:bottom-9 md:right-9 md:left-auto flex items-center gap-3">
            <span className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#c98a4b] text-[#0b0a08] shrink-0 transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[#f6f1e7] text-base md:text-lg font-bold">
              عرض البريزنتيشن كاملة
            </span>
          </div>
        </a>
      </section>



      {/* مساحة فارغة أسفل الصفحة حتى لا يغطي الزر الثابت المحتوى */}
      <div className="h-28" />
    </div>
  );
}