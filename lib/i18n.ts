/* ───────────────────────────────────────────────────────────────
 * i18n — English / Arabic translations for the entire site
 * ─────────────────────────────────────────────────────────────── */

export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

export const dict = {
  en: {
    nav: {
      brand: "TJD Portfolio · 2026",
      about: "About",
      experience: "Experience",
      works: "Works",
      gallery: "Gallery",
      contact: "Contact",
      langTitle: "Switch to Arabic"
    },
    hero: {
      eyebrow: "— A Portfolio Film By —",
      take: "SCENE 01 · TAKE 26 · REC",
      titleA: "TAHA JASIM",
      titleB: "MOHAMMED",
      tag1: "Mechatronics Engineer",
      tag2: "Graphic Designer",
      tag3: "Photographer",
      tag4: "Developer",
      metaLocation: "Location",
      metaLocationValue: "MOSUL, IQ",
      metaFormat: "2.39 : 1 · 24FPS",
      metaDesigner: "Designer",
      metaDesignerValue: "T · j · D",
      scrollCue: "SCROLL TO SEE THE GREATNESS"
    },
    about: {
      eyebrow: "Chapter One · The Engineer-Designer",
      title: "A discipline of two minds.",
      photoLabel: "01 / 04",
      p1: "I'm Taha — a Mechatronics Engineering student at the University of Mosul, and a working graphic designer since 2023. My world sits at the intersection of circuits and composition, of motors and meaning.",
      pull: "I build <em>machines</em> that move<br/>and <em>identities</em> that don't.",
      p2: "I've designed the Al-Bu'rah Engineering magazine for the University of Mosul, shipped Android apps in the COVID era, and led visual identities for clients across Iraq. I read Arabic, Turkish, English — and the schematic.",
      stats: {
        years: "Years designing",
        certs: "Certifications",
        languages: "Languages"
      }
    },
    education: {
      eyebrow: "Chapter Two · The Foundation",
      title: "Education.",
      uomYear: "2024 — Ongoing",
      uomTitle: "University of Mosul",
      uomLoc: "Mechatronics Engineering · Mosul, Iraq",
      uomBody:
        "Studying the convergence of mechanical, electronic, and software systems — the engineering of intelligent machines.",
      schYear: "2018 — 2024",
      schTitle: "Nineveh Secondary\nSchool for Outstanding Students",
      schLoc: "Mosul, Iraq · Top of class",
      schBody:
        "Honored by the Nineveh Directorate of Education. Awarded full exemption from final exams in 5th preparatory."
    },
    experience: {
      eyebrow: "Chapter Three · The Reel",
      title: "Experience.",
      items: [
        {
          when: "07/2023\n— Present",
          role: "Graphic Designer · Remote",
          h: "Independent Visual Practice",
          bullets: [
            "Designed and fully produced the Al-Bu'rah Engineering magazine for the University of Mosul — layout, typography, visual identity.",
            "Designed posters and social media systems for Shams Al-Adab, Mustafa's Math, Hosh Al-Khan, DDM Channel, and Alajwad Honey."
          ]
        },
        {
          when: "01/2022\n— 02/2023",
          role: "UI Designer · Remote",
          h: "Product Interfaces in Adobe XD",
          p: "Designed multi-screen UI/UX flows for client products, including a complete ordering interface for Anas Chicken."
        },
        {
          when: "07/2019\n— 05/2022",
          role: "No-Code Android Developer · Remote",
          h: "Apps for the Pandemic",
          p: "Shipped multiple Android apps using Sketchware, including a school communication app used to deliver homework and announcements remotely during COVID-19."
        },
        {
          when: "06/2019\n— Present",
          role: "Microsoft Office Specialist · Remote",
          h: "Documents, Reports, Presentations",
          p: "Long-running freelance practice producing reports, documents, and decks in Word and PowerPoint."
        },
        {
          when: "10/2024\n— Present",
          role: "Math Tutor · Volunteer",
          h: "Telegram Channel for 6th Preparatory",
          p: "Manage a free Telegram channel supporting sixth preparatory students in mathematics with practice questions, answered queries, and exam prep guidance."
        }
      ]
    },
    skills: {
      eyebrow: "Chapter Four · The Toolkit",
      title: "Skills.",
      cats: {
        design: "Design",
        code: "Engineering & Code",
        soft: "Soft Skills"
      },
      design: [
        { name: "Adobe Illustrator", value: 92 },
        { name: "Adobe XD", value: 88 },
        { name: "Adobe InDesign", value: 85 },
        { name: "Canva", value: 95 },
        { name: "Photography & Editing", value: 82 }
      ],
      code: [
        { name: "C++", value: 72 },
        { name: "Python", value: 68 },
        { name: "Sketchware (no-code Android)", value: 85 },
        { name: "Video Editing", value: 62 }
      ],
      soft: [
        { name: "Team Management", value: 88 },
        { name: "Effective Communication", value: 92 },
        { name: "Problem Solving", value: 90 },
        { name: "Emotional Intelligence", value: 87 }
      ],
      radar: [
        { label: "Design", v: 0.92 },
        { label: "UI/UX", v: 0.86 },
        { label: "Branding", v: 0.84 },
        { label: "Engineering", v: 0.7 },
        { label: "Code", v: 0.68 },
        { label: "Comms", v: 0.92 },
        { label: "Leadership", v: 0.86 },
        { label: "Photography", v: 0.8 }
      ]
    },
    works: {
      eyebrow: "Chapter Five · The Catalogue",
      title: "My Works.",
      labels: {
        view: "Open case",
        close: "Close",
        role: "Role",
        client: "Client",
        year: "Year",
        tools: "Tools",
        highlights: "Highlights",
        story: "Story"
      },
      items: [
        {
          tag: "Editorial · 2024",
          h: "Al-Bu'rah Engineering Magazine",
          p: "Full editorial design for U. of Mosul",
          year: "2024",
          role: "Editorial designer & art director",
          client: "University of Mosul",
          tools: ["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop"],
          color: "warm",
          summary:
            "Designed and produced the full Al-Bu'rah engineering magazine for the University of Mosul — a multi-section editorial with custom typography system, modular grids, and a visual identity that reads cinematic on print.",
          highlights: [
            "End-to-end editorial system: cover, masthead, modular page templates.",
            "Custom Latin–Arabic typographic pairing tuned for technical text.",
            "Color systems coded per chapter with consistent halftone treatment.",
            "Print-ready prepress output handed off to production."
          ]
        },
        {
          tag: "UI · 2022",
          h: "Anas Chicken Ordering App",
          p: "Full mobile flow in Adobe XD",
          year: "2022",
          role: "UI / UX designer",
          client: "Anas Chicken (F&B)",
          tools: ["Adobe XD", "Adobe Illustrator"],
          color: "cool",
          summary:
            "Designed the complete ordering experience for the Anas Chicken mobile app — from menu browsing to checkout, including category screens, item detail, cart, and order tracking.",
          highlights: [
            "Full screen flow covering 18 distinct states.",
            "Custom illustration set tuned for fast scanning at thumbnail size.",
            "Reusable component library for cards, chips, and CTAs.",
            "Designed in both Arabic (RTL) and English (LTR)."
          ]
        },
        {
          tag: "Mobile · 2020",
          h: "School Communications App",
          p: "Shipped during COVID lockdown",
          year: "2019 — 2022",
          role: "No-code Android developer",
          client: "Local schools",
          tools: ["Sketchware", "Firebase", "Adobe XD"],
          color: "warm",
          summary:
            "During the pandemic I shipped multiple Android apps via Sketchware, including a school-communications app used to deliver homework, announcements, and grades to students remotely.",
          highlights: [
            "Reached real students who lost classroom access during COVID.",
            "Push announcements and class-by-class homework delivery.",
            "Built without a traditional codebase using a no-code Android stack.",
            "Iterated weekly with teacher feedback for the full school year."
          ]
        },
        {
          tag: "Branding · Ongoing",
          h: "Client Identity Systems",
          p: "Logos, palettes, social templates",
          year: "2023 — Present",
          role: "Brand & visual designer",
          client: "Multiple — Shams Al-Adab, Mustafa's Math, Hosh Al-Khan, DDM, Alajwad Honey",
          tools: ["Adobe Illustrator", "Canva", "Adobe Photoshop"],
          color: "neon",
          summary:
            "Independent visual practice building identity systems for Iraqi clients across food, education, and media — logos, color palettes, social templates, and printed collateral.",
          highlights: [
            "Five live identity systems shipped and in use.",
            "Per-client visual languages with reusable social templates.",
            "Bilingual logotype work tuned for Arabic + Latin.",
            "Posters and campaign visuals produced under ongoing retainers."
          ]
        }
      ]
    },
    gallery: {
      eyebrow: "Chapter Six · The Exhibition",
      title: "Gallery.",
      hint: "Each frame represents a piece of my visual practice — magazines, identities, posters, and photographs.",
      filters: {
        all: "All",
        design: "Design",
        photo: "Photography",
        ui: "UI"
      },
      labels: [
        "MAGAZINE",
        "IDENTITY",
        "POSTER",
        "PHOTO",
        "EDITORIAL",
        "BRAND",
        "INTERFACE",
        "CAMPAIGN",
        "TYPE"
      ]
    },
    certs: {
      eyebrow: "Chapter Seven · The Credentials",
      title: "Certifications.",
      items: [
        { h: "TOT Course (40 hrs)", iss: "Meshkat Education" },
        { h: "Elements of AI for Business", iss: "University of Helsinki · 4 wks" },
        { h: "Youth Lead Dialogue", iss: "United Nations · Virtual" },
        { h: "Turkish Language Course", iss: "Turkmen Brotherhood Club · 72 hrs" },
        { h: "English Language Course", iss: "Dar Al-Hikma Center · 40 hrs" },
        { h: "Adobe Illustrator", iss: "Mosul Space · 20 hrs" },
        { h: "MS Office Course", iss: "C.G.T. · 20 hrs" },
        { h: "MS Excel Course", iss: "Y.S.P. · 20 hrs" },
        { h: "Digital Marketing Fundamentals", iss: "Workshop" },
        { h: "German Language (Basics)", iss: "I.V.O. · 2 wks" },
        { h: "Engineering Sustainability", iss: "University of Mosul" },
        { h: "Noor Art Magazine", iss: "Participation" }
      ]
    },
    languages: {
      eyebrow: "Chapter Eight · Five Tongues",
      title: "Languages.",
      items: [
        { code: "AR", name: "Arabic", level: "Native" },
        { code: "TR", name: "Turkish", level: "B2 · 1st place 2022" },
        { code: "EN", name: "English", level: "B2" },
        { code: "FR", name: "French", level: "Basics" },
        { code: "DE", name: "German", level: "Basics" }
      ]
    },
    contact: {
      eyebrow: "Final Scene · The Call Sheet",
      title: "Let's roll the next one.",
      lead: "Open to collaborations, design commissions, internships in mechatronics, and conversations with people who care about craft.",
      labels: {
        email: "E-mail",
        phone: "Phone",
        linkedin: "LinkedIn",
        github: "GitHub",
        web: "Web"
      },
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Transmission →",
        sent: "SENT."
      }
    },
    footer: {
      end: "END OF WEBSITE · TAHA JASIM MOHAMMED · MOSUL · IRAQ",
      credits: "Directed, designed, and engineered by Taha Jasim Mohammed"
    }
  },

  ar: {
    nav: {
      brand: "بورتفوليو TJD · ٢٠٢٦",
      about: "نبذة",
      experience: "الخبرة",
      works: "الأعمال",
      gallery: "المعرض",
      contact: "التواصل",
      langTitle: "Switch to English"
    },
    hero: {
      eyebrow: "— بورتفوليو من إخراج —",
      take: "مشهد ٠١ · لقطة ٢٦ · تسجيل",
      titleA: "طه جاسم",
      titleB: "محمد",
      tag1: "مهندس ميكاترونكس",
      tag2: "مصمم جرافيك",
      tag3: "مصور",
      tag4: "مطور",
      metaLocation: "الموقع",
      metaLocationValue: "الموصل، العراق",
      metaFormat: "2.39 : 1 · ٢٤ إطار/ث",
      metaDesigner: "المصمم",
      metaDesignerValue: "T · j · D",
      scrollCue: "انزل لترى البقية"
    },
    about: {
      eyebrow: "الفصل الأول · المهندس المصمم",
      title: "تخصصٌ بعقلين.",
      photoLabel: "٠١ / ٠٤",
      p1: "أنا طه — طالب هندسة ميكاترونكس في جامعة الموصل، ومصمم جرافيك محترف منذ عام ٢٠٢٣. عالمي يقع عند تقاطع الدوائر مع التركيب، والمحركات مع المعنى.",
      pull: "أبني <em>آلاتٍ</em> تتحرك<br/>و<em>هوياتٍ</em> ثابتة.",
      p2: "صممت مجلة البُعرة الهندسية لجامعة الموصل، وأطلقت تطبيقات أندرويد في زمن كوفيد، وقدت هويات بصرية لعملاء عبر العراق. أقرأ العربية والتركية والإنجليزية — والمخطط الكهربائي.",
      stats: {
        years: "سنوات تصميم",
        certs: "شهادة",
        languages: "لغات"
      }
    },
    education: {
      eyebrow: "الفصل الثاني · الأساس",
      title: "التعليم.",
      uomYear: "٢٠٢٤ — حتى الآن",
      uomTitle: "جامعة الموصل",
      uomLoc: "هندسة الميكاترونكس · الموصل، العراق",
      uomBody:
        "أدرس تقاطع الأنظمة الميكانيكية والإلكترونية والبرمجية — هندسة الآلات الذكية.",
      schYear: "٢٠١٨ — ٢٠٢٤",
      schTitle: "إعدادية المتميزين\nفي نينوى",
      schLoc: "الموصل، العراق · الأوائل",
      schBody:
        "تكريم من مديرية تربية نينوى. منحت إعفاءً كاملاً من الامتحانات النهائية في الخامس الإعدادي."
    },
    experience: {
      eyebrow: "الفصل الثالث · الشريط",
      title: "الخبرة.",
      items: [
        {
          when: "٠٧/٢٠٢٣\n— حتى الآن",
          role: "مصمم جرافيك · عن بُعد",
          h: "ممارسة بصرية مستقلة",
          bullets: [
            "صممت وأنتجت مجلة البُعرة الهندسية كاملةً لجامعة الموصل — التخطيط والطباعة والهوية البصرية.",
            "صممت ملصقات وأنظمة سوشيال ميديا لشمس الأدب، رياضيات مصطفى، حوش الخان، قناة DDM، وعسل الأجواد."
          ]
        },
        {
          when: "٠١/٢٠٢٢\n— ٠٢/٢٠٢٣",
          role: "مصمم واجهات · عن بُعد",
          h: "واجهات منتجات في Adobe XD",
          p: "صممت تدفقات واجهات متعددة الشاشات لعملاء، منها واجهة طلب كاملة لمطعم أنس تشيكن."
        },
        {
          when: "٠٧/٢٠١٩\n— ٠٥/٢٠٢٢",
          role: "مطور أندرويد بدون كود · عن بُعد",
          h: "تطبيقات لزمن الجائحة",
          p: "أطلقت عدة تطبيقات أندرويد عبر Sketchware، منها تطبيق تواصل مدرسي استُخدم لتسليم الواجبات والإعلانات عن بُعد خلال كوفيد-١٩."
        },
        {
          when: "٠٦/٢٠١٩\n— حتى الآن",
          role: "أخصائي مايكروسوفت أوفيس · عن بُعد",
          h: "وثائق وتقارير وعروض",
          p: "ممارسة حرّة طويلة في إنتاج التقارير والوثائق والعروض ببرامج Word وPowerPoint."
        },
        {
          when: "١٠/٢٠٢٤\n— حتى الآن",
          role: "معلم رياضيات · تطوع",
          h: "قناة تيليجرام للسادس الإعدادي",
          p: "أدير قناة تيليجرام مجانية تدعم طلاب السادس الإعدادي بأسئلة تدريبية وإجابات وتوجيه استعدادًا للامتحانات."
        }
      ]
    },
    skills: {
      eyebrow: "الفصل الرابع · العُدّة",
      title: "المهارات.",
      cats: {
        design: "تصميم",
        code: "هندسة وبرمجة",
        soft: "مهارات شخصية"
      },
      design: [
        { name: "Adobe Illustrator", value: 92 },
        { name: "Adobe XD", value: 88 },
        { name: "Adobe InDesign", value: 85 },
        { name: "Canva", value: 95 },
        { name: "تصوير ومعالجة", value: 82 }
      ],
      code: [
        { name: "C++", value: 72 },
        { name: "Python", value: 68 },
        { name: "Sketchware (أندرويد بلا كود)", value: 85 },
        { name: "مونتاج فيديو", value: 62 }
      ],
      soft: [
        { name: "إدارة فريق", value: 88 },
        { name: "تواصل فعّال", value: 92 },
        { name: "حل المشكلات", value: 90 },
        { name: "الذكاء العاطفي", value: 87 }
      ],
      radar: [
        { label: "تصميم", v: 0.92 },
        { label: "واجهات", v: 0.86 },
        { label: "هويات", v: 0.84 },
        { label: "هندسة", v: 0.7 },
        { label: "برمجة", v: 0.68 },
        { label: "تواصل", v: 0.92 },
        { label: "قيادة", v: 0.86 },
        { label: "تصوير", v: 0.8 }
      ]
    },
    works: {
      eyebrow: "الفصل الخامس · الفهرس",
      title: "أعمالي.",
      labels: {
        view: "افتح التفاصيل",
        close: "إغلاق",
        role: "الدور",
        client: "العميل",
        year: "السنة",
        tools: "الأدوات",
        highlights: "أبرز النقاط",
        story: "القصة"
      },
      items: [
        {
          tag: "تحرير · ٢٠٢٤",
          h: "مجلة البُعرة الهندسية",
          p: "تصميم تحريري كامل لجامعة الموصل",
          year: "٢٠٢٤",
          role: "مصمم تحريري ومدير فني",
          client: "جامعة الموصل",
          tools: ["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop"],
          color: "warm",
          summary:
            "صممت وأنتجت مجلة البُعرة الهندسية كاملة لجامعة الموصل — إخراج تحريري متعدد الأقسام بنظام طباعي مخصص وشبكات معيارية وهوية بصرية سينمائية الوقع على الورق.",
          highlights: [
            "نظام تحريري شامل: غلاف، ترويسة، وقوالب صفحات معيارية.",
            "توافق طباعي عربي-لاتيني مضبوط للنص الهندسي.",
            "أنظمة ألوان مرمّزة حسب الفصول مع معالجة هافتون متسقة.",
            "إخراج جاهز للطباعة وتسليم لدور الانتاج."
          ]
        },
        {
          tag: "واجهات · ٢٠٢٢",
          h: "تطبيق طلب أنس تشيكن",
          p: "تدفق محمول كامل في Adobe XD",
          year: "٢٠٢٢",
          role: "مصمم واجهات وتجربة استخدام",
          client: "أنس تشيكن (مطاعم)",
          tools: ["Adobe XD", "Adobe Illustrator"],
          color: "cool",
          summary:
            "صممت تجربة الطلب الكاملة لتطبيق أنس تشيكن — من تصفح القائمة حتى الدفع، وتشمل شاشات الفئات وتفصيل الأصناف والسلة وتتبع الطلب.",
          highlights: [
            "تدفق شاشات كامل يغطي ١٨ حالة مختلفة.",
            "حزمة رسومات مخصصة مضبوطة للقراءة السريعة بحجم صغير.",
            "مكتبة مكوّنات قابلة للإعادة للبطاقات والرقائع والأزرار.",
            "تصميم ثنائي اللغة (عربي/إنجليزي) وثنائي الاتجاه."
          ]
        },
        {
          tag: "محمول · ٢٠٢٠",
          h: "تطبيق تواصل مدرسي",
          p: "أُطلق خلال إغلاق كوفيد",
          year: "٢٠١٩ — ٢٠٢٢",
          role: "مطور أندرويد بدون كود",
          client: "مدارس محلية",
          tools: ["Sketchware", "Firebase", "Adobe XD"],
          color: "warm",
          summary:
            "خلال جائحة كوفيد أطلقت عدة تطبيقات أندرويد عبر Sketchware، منها تطبيق تواصل مدرسي استُخدم لتسليم الواجبات والإعلانات والدرجات للطلاب عن بُعد.",
          highlights: [
            "وصل إلى طلاب فعليين فقدوا الوصول للصفوف أثناء كوفيد.",
            "إعلانات فورية وتسليم واجبات منفصل حسب الصف الدراسي.",
            "بني بدون كود تقليدي باستخدام بناء أندرويد بدون برمجة.",
            "تطوير أسبوعي بردود فعل المعلمين لسنة دراسية كاملة."
          ]
        },
        {
          tag: "هوية · مستمر",
          h: "أنظمة هوية للعملاء",
          p: "شعارات وألوان وقوالب اجتماعية",
          year: "٢٠٢٣ — حتى الآن",
          role: "مصمم هوية وعلامة بصرية",
          client: "عدة عملاء — شمس الأدب، رياضيات مصطفى، حوش الخان، قناة DDM، عسل الأجواد",
          tools: ["Adobe Illustrator", "Canva", "Adobe Photoshop"],
          color: "neon",
          summary:
            "ممارسة بصرية مستقلة تبني أنظمة هوية لعملاء عراقيين في الطعام والتعليم والإعلام — شعارات وألوان وقوالب اجتماعية ومواد مطبوعة.",
          highlights: [
            "خمسة أنظمة هوية حيّة تُستخدم ميدانيًّا.",
            "لغات بصرية خاصة بكل عميل بقوالب سوشيال قابلة للإعادة.",
            "عمل على شعارات ثنائية اللغة مضبوطة للعربي واللاتيني.",
            "ملصقات وحملات بصرية تنتج تحت عقود دائمة."
          ]
        }
      ]
    },
    gallery: {
      eyebrow: "الفصل السادس · المعرض",
      title: "المعرض.",
      hint: "كل إطار يمثل قطعة من ممارستي البصرية — مجلات، هويات، ملصقات، وصور.",
      filters: {
        all: "الكل",
        design: "تصميم",
        photo: "تصوير",
        ui: "واجهات"
      },
      labels: [
        "مجلة",
        "هوية",
        "ملصق",
        "صورة",
        "تحرير",
        "علامة",
        "واجهة",
        "حملة",
        "خط"
      ]
    },
    certs: {
      eyebrow: "الفصل السابع · الشهادات",
      title: "الشهادات.",
      items: [
        { h: "دورة TOT (٤٠ ساعة)", iss: "أكاديمية مشكاة" },
        { h: "أساسيات الذكاء الاصطناعي للأعمال", iss: "جامعة هلسنكي · ٤ أسابيع" },
        { h: "حوار الشباب القيادي", iss: "الأمم المتحدة · افتراضي" },
        { h: "دورة اللغة التركية", iss: "نادي الإخاء التركماني · ٧٢ ساعة" },
        { h: "دورة اللغة الإنجليزية", iss: "مركز دار الحكمة · ٤٠ ساعة" },
        { h: "Adobe Illustrator", iss: "Mosul Space · ٢٠ ساعة" },
        { h: "دورة MS Office", iss: "C.G.T. · ٢٠ ساعة" },
        { h: "دورة MS Excel", iss: "Y.S.P. · ٢٠ ساعة" },
        { h: "أساسيات التسويق الرقمي", iss: "ورشة" },
        { h: "أساسيات اللغة الألمانية", iss: "I.V.O. · أسبوعان" },
        { h: "الاستدامة الهندسية", iss: "جامعة الموصل" },
        { h: "مجلة نور للفن", iss: "مشاركة" }
      ]
    },
    languages: {
      eyebrow: "الفصل الثامن · خمس ألسنة",
      title: "اللغات.",
      items: [
        { code: "AR", name: "العربية", level: "اللغة الأم" },
        { code: "TR", name: "التركية", level: "B2 · المركز الأول ٢٠٢٢" },
        { code: "EN", name: "الإنجليزية", level: "B2" },
        { code: "FR", name: "الفرنسية", level: "أساسيات" },
        { code: "DE", name: "الألمانية", level: "أساسيات" }
      ]
    },
    contact: {
      eyebrow: "المشهد الأخير · ورقة النداء",
      title: "هيا نصوّر التالي.",
      lead: "متاح للتعاون والتكليفات التصميمية والتدريب في الميكاترونكس، ومتاح للحديث مع كل من يهتم بالحرفة.",
      labels: {
        email: "بريد",
        phone: "هاتف",
        linkedin: "لينكدإن",
        github: "جيت‌هاب",
        web: "الموقع"
      },
      form: {
        name: "الاسم",
        email: "البريد",
        message: "الرسالة",
        send: "إرسال البث →",
        sent: "تم الإرسال."
      }
    },
    footer: {
      end: "نهاية الموقع · طه جاسم محمد · الموصل · العراق",
      credits: "إخراج وتصميم وهندسة: طه جاسم محمد"
    }
  }
};

export type Dict = (typeof dict)["en"];
