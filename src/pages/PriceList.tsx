import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PriceList = () => {
  const { language } = useLanguage();

  const priceCategories = [
  {
    category: "Consultation & Examinations",
    categoryAr: "الاستشارات والفحوصات",
    services: [
      { name: "GP Examination", nameAr: "كشفية طبيب عام", price: "100 SAR" },
      { name: "Specialist Examination", nameAr: "كشفية طبيب أخصائي", price: "200 SAR" },
      { name: "Consultant Examination", nameAr: "كشفية طبيب استشاري", price: "300 SAR" },
      { name: "Medical Reports (Seha Platform)", nameAr: "خدمة تقارير طبية منصة الصحة", price: "0 SAR" },
      { name: "Follow-up Visit", nameAr: "مراجعة", price: "0 SAR" },
      { name: "Case Study and Treatment Planning & 3D Imaging Show Up", nameAr: "دراسة حالة وخطة علاجية وعمل تصور ثلاثي الأبعاد", price: "300 SAR" },
      { name: "Case Study and Treatment Planning & 3D Imaging", nameAr: "دراسة حالة وعمل تصور", price: "500 SAR" }
    ]
  },
  {
    category: "Whitening & Cosmetic Procedures",
    categoryAr: "تبييض وتجميل الأسنان",
    services: [
      { name: "Zoom Whitening (Dental Office)", nameAr: "تبييض أسنان زوم (عيادة)", price: "1500 SAR" },
      { name: "Zoom Whitening (Home)", nameAr: "تبييض أسنان زوم (منزلي)", price: "800 SAR" },
      { name: "Prophylactic Polishing", nameAr: "تلميع أسنان (بروفيلاك)", price: "50 SAR" },
      { name: "Prophy Jet Polishing", nameAr: "تلميع أسنان (بروفي جت)", price: "400 SAR" },
      { name: "Cosmetic Teeth Reshaping", nameAr: "نحت أسنان تجميلي", price: "100 SAR" },
      { name: "Lip Enhancement (Botox)", nameAr: "تجميل شفة بوتوكس", price: "3000 SAR" },
      { name: "Lip Enhancement (Filler)", nameAr: "تجميل شفة فيلر", price: "3000 SAR" },
      { name: "Facial Dimples", nameAr: "غمازات خدود تجميلية", price: "3000 SAR" },
      { name: "Hollywood Smile", nameAr: "ابتسامة هوليود", price: "9999 SAR" },
      { name: "Bollywood Smile", nameAr: "ابتسامة بوليود", price: "5000 SAR" },
      { name: "Everbrite Teeth Cleaning", nameAr: "تنظيف اسنان ايفربرات", price: "390 SAR" },
      { name: "Veneers (16 Teeth)", nameAr: "فينيرز (16 سن)", price: "9999 SAR" },
      { name: "Lumineers (16 Teeth)", nameAr: "لومينيرز (16 سن)", price: "9999 SAR" },
      { name: "Lumeneers (8 Teeth)", nameAr: "لومينيرز (8 أسنان)", price: "4999 SAR" },
      { name: "Veneers (8 Teeth)", nameAr: "فينيرز (8 أسنان)", price: "4999 SAR" },
      { name: "One Esthetic Veneer", nameAr: "وجه فينير تجميلي", price: "900 SAR" },
      { name: "One Esthetic Lumineer", nameAr: "وجه لومينير تجميلي", price: "900 SAR" },
      { name: "One Crystal Adhesion", nameAr: "تركيب كرستالة", price: "300 SAR" },
      { name: "Direct Veneer Removal and Polishing (One Jaw, 8 Units)", nameAr: "إزالة فينير مباشر وتلميع فك واحد (8 وحدات)", price: "400 SAR" },
      { name: "Direct Veneer Removal and Polishing (Two Jaws, 16 Units)", nameAr: "إزالة فينير مباشر وتلميع فكين (16 وحدة)", price: "700 SAR" },
      { name: "Veneer Cementation", nameAr: "تثبيت فينير", price: "100 SAR" }
    ]
  },
  {
    category: "Cleaning & Preventive Care",
    categoryAr: "تنظيف الأسنان والرعاية الوقائية",
    services: [
      { name: "Deep Scaling", nameAr: "تنظيف عميق", price: "300 SAR" },
      { name: "Scaling (One Session)", nameAr: "تنظيف جير (جلسة واحدة)", price: "150 SAR" },
      { name: "Prophylaxis Offer (Cleaning 89)", nameAr: "عرض تنظيف الأسنان بـ 89", price: "89 SAR" },
      { name: "Topical Fluoride Gel (Per Jaw)", nameAr: "جلسة فلورايد وقائية للفك الواحد", price: "100 SAR" },
      { name: "Topical Varnish Fluoride (One Session)", nameAr: "جلسة فلورايد فارنيش", price: "200 SAR" },
      { name: "Oral Hygiene Instructions", nameAr: "تعليمات العناية الفموية", price: "0 SAR" },
      { name: "Fissure Sealant (Per Tooth)", nameAr: "جلسة حماية تسوس أسنان خلفية بمادة عازلة للسن الواحد", price: "100 SAR" },
      { name: "Silver Diamine Fluoride (Single Tooth)", nameAr: "تطبيق مادة فلورايد الفضه للسن الواحد", price: "150 SAR" },
      { name: "Scaling and Root Planning & Polishing", nameAr: "تنظيف وتلميع الاسنان وازالة الرواسب الجيرية", price: "150 SAR" }
    ]
  },
  {
    category: "Fillings & Restorations",
    categoryAr: "الحشوات والترميمات",
    services: [
      { name: "Composite Filling Repair", nameAr: "ترميم حشوة تجميلية قديمة", price: "200 SAR" },
      { name: "Anterior Composite Filling (One Surface)", nameAr: "حشوة تجميلية كومبوزيت سن أمامي سطح واحد", price: "200 SAR" },
      { name: "Anterior Composite Filling (Multi-Surfaces)", nameAr: "حشوة تجميلية كومبوزيت سن أمامي أكثر من سطح واحد", price: "300 SAR" },
      { name: "Posterior Composite Filling (One Surface)", nameAr: "حشوة تجميلية كومبوزيت سن خلفي سطح واحد", price: "200 SAR" },
      { name: "Posterior Composite Filling (Multi-Surfaces)", nameAr: "حشوة تجميلية كومبوزيت سن خلفي أكثر من سطح واحد", price: "300 SAR" },
      { name: "Amalgam Filling", nameAr: "حشوة فضية (أملغم)", price: "300 SAR" },
      { name: "Golden Filling", nameAr: "حشوة ذهبية", price: "500 SAR" },
      { name: "Inlay & Onlay (Zircon)", nameAr: "حشوة انلاي أو اونلاي زركون", price: "900 SAR" },
      { name: "Glass Ionomer Filling", nameAr: "حشوة زجاجية", price: "150 SAR" },
      { name: "Polishing Restoration", nameAr: "تلميع حشوات", price: "50 SAR" },
      { name: "Dycal", nameAr: "مادة دايكال", price: "50 SAR" },
      { name: "Temporary Filling", nameAr: "حشوة مؤقتة", price: "50 SAR" },
      { name: "One Post + Core (Build Up)", nameAr: "بناء سن + دعامة واحدة", price: "300 SAR" },
      { name: "Additional Post Per Tooth", nameAr: "إضافة وتد للحشوة", price: "100 SAR" },
      { name: "Temporary Cementation", nameAr: "تثبيت مؤقت", price: "50 SAR" },
      { name: "Polishing & Restoration Adjustment", nameAr: "تلميع وتعديل الحشوات", price: "50 SAR" }
    ]
  },
  {
    category: "Crowns, Veneers & Bridges",
    categoryAr: "التيجان والقشور والجسور",
    services: [
      { name: "Metal Crown", nameAr: "تاج سن معدن", price: "300 SAR" },
      { name: "Temporary Acrylic Crown (Clinic)", nameAr: "تاج أكريلك مؤقت", price: "100 SAR" },
      { name: "Temporary Acrylic Crown (Lab)", nameAr: "قيمة تاج أكريلك مؤقت", price: "20 SAR" },
      { name: "Porcelain Crown (Precious Alloy)", nameAr: "تاج بورسلان طبي", price: "600 SAR" },
      { name: "E-max / In-Ceram / Impress Crown", nameAr: "تاج اي ماكس أو انسيرام أو امبرس", price: "1000 SAR" },
      { name: "Zircon Crown", nameAr: "تاج سن زيركون", price: "800 SAR" },
      { name: "Miraland Bridge", nameAr: "جسر مريلاند", price: "2000 SAR" },
      { name: "Crown Re-Cementation", nameAr: "إعادة إلصاق تاج واحد", price: "100 SAR" },
      { name: "Crown or Bridge Adjustment (Without Re-Cementation)", nameAr: "تعديل تركيبة بدون إعادة إلصاق", price: "100 SAR" },
      { name: "Crown or Bridge Adjustment (With Re-Cementation)", nameAr: "تعديل تركيبة مع إعادة إلصاق", price: "100 SAR" },
      { name: "Bridge Removal", nameAr: "نزع جسر قديم", price: "100 SAR" },
      { name: "E-max / In-Ceram / Impress Lab Cost", nameAr: "قيمة تاج اي ماكس أو انسيرام", price: "300 SAR" },
      { name: "Metal Crown Lab Cost", nameAr: "قيمة تاج سن معدن", price: "60 SAR" },
      { name: "One Esthetic Veneer Lab", nameAr: "قيمة وجه فينير تجميلي", price: "250 SAR" },
      { name: "One Esthetic Lumineer Lab", nameAr: "قيمة وجه لومينير تجميلي", price: "300 SAR" }
    ]
  },
  {
    category: "Root Canal & Endodontics",
    categoryAr: "علاج العصب والجذور",
    services: [
      { name: "Microscopic Root Canal Treatment", nameAr: "علاج العصب الميكروسكوبي", price: "1000 SAR" },
      { name: "Anterior Root Canal (Single Canal)", nameAr: "علاج عصب سن أمامي (قناة واحدة)", price: "500 SAR" },
      { name: "Necrotic Root Canal (Multiple Sessions)", nameAr: "علاج عصب سن عفن (عدة جلسات)", price: "1000 SAR" },
      { name: "Pulpotomy (Adult)", nameAr: "علاج عصب تحفظي لا يشمل القنوات العصبية", price: "500 SAR" },
      { name: "Partial Pulpectomy", nameAr: "علاج عصب تحفظي يشمل جزء من القنوات العصبية", price: "400 SAR" },
      { name: "Anterior Apexification & Apexogenesis", nameAr: "علاج عصب لسن غير مكتمل النمو أمامي", price: "500 SAR" },
      { name: "Posterior Apexification & Apexogenesis", nameAr: "علاج عصب لسن غير مكتمل النمو خلفي", price: "700 SAR" },
      { name: "Abscess Remedy", nameAr: "ضمادة خراج سن", price: "300 SAR" },
      { name: "Root Canal Irrigation (Emergency)", nameAr: "غسل وإرواء الأقنية (طوارئ)", price: "300 SAR" },
      { name: "Re-treatment (One Tooth)", nameAr: "إعادة علاج عصب سن واحد", price: "1500 SAR" },
      { name: "Third Molar Root Canal", nameAr: "سحب عصب ضرس العقل", price: "1200 SAR" },
      { name: "Premolar Root Canal (Multiple Canals)", nameAr: "علاج عصب سن خلفي (متعدد القنوات - ضواحك)", price: "700 SAR" },
      { name: "Molar Root Canal (Multiple Canals)", nameAr: "علاج عصب سن خلفي (متعدد القنوات - أضراس)", price: "900 SAR" },
      { name: "Emergency Pulp Extirpation + Temporary Filling", nameAr: "نزع لب سن طارئ مع حشوة مؤقتة", price: "300 SAR" }
    ]
  },
  {
    category: "Implants & Surgical Procedures",
    categoryAr: "الزرعات والإجراءات الجراحية",
    services: [
      { name: "Simple Extraction", nameAr: "خلع سن بسيط", price: "150 SAR" },
      { name: "Complex Extraction", nameAr: "خلع سن جراحي", price: "300 SAR" },
      { name: "Surgical Extraction with Bone Removal", nameAr: "خلع جراحي مع إزالة عظم", price: "400 SAR" },
      { name: "Wisdom Tooth Extraction (Surgical)", nameAr: "خلع ضرس العقل جراحي", price: "500 SAR" },
      { name: "Wisdom Tooth Extraction (Simple)", nameAr: "خلع ضرس العقل بسيط", price: "300 SAR" },
      { name: "Tooth Sectioning", nameAr: "قطع سن", price: "200 SAR" },
      { name: "Implant (Noble / Straumann)", nameAr: "زرع سن نوبل أو ستراومان", price: "2500 SAR" },
      { name: "Implant (Korean / Local)", nameAr: "زرع سن كوري أو محلي", price: "1500 SAR" },
      { name: "Implant Crown (Zircon)", nameAr: "تاج زرعة زيركون", price: "1000 SAR" },
      { name: "Bone Grafting", nameAr: "زراعة عظم", price: "800 SAR" },
      { name: "Sinus Lift (Internal)", nameAr: "رفع جيب أنفي داخلي", price: "700 SAR" },
      { name: "Sinus Lift (External)", nameAr: "رفع جيب أنفي خارجي", price: "1500 SAR" },
      { name: "Suture Removal", nameAr: "إزالة غرز", price: "100 SAR" },
      { name: "Apicoectomy", nameAr: "استئصال قمة الجذر", price: "1000 SAR" },
      { name: "Cyst Removal", nameAr: "إزالة كيس", price: "800 SAR" }
    ]
  },
  {
    category: "Gum & Periodontal Treatments",
    categoryAr: "علاج اللثة وأمراض دواعم السن",
    services: [
      { name: "Scaling & Polishing (Full Mouth)", nameAr: "تنظيف وتلميع الأسنان (الفم كامل)", price: "250 SAR" },
      { name: "Deep Cleaning (Per Quadrant)", nameAr: "تنظيف عميق (لكل ربع)", price: "300 SAR" },
      { name: "Periodontal Surgery (Per Quadrant)", nameAr: "جراحة لثة (لكل ربع)", price: "800 SAR" },
      { name: "Gingivectomy (Per Tooth)", nameAr: "قص لثة (لكل سن)", price: "200 SAR" },
      { name: "Gingivectomy (Full Arch)", nameAr: "قص لثة (نصف الفك)", price: "800 SAR" },
      { name: "Gingival Curettage", nameAr: "كحت وتنظيف اللثة", price: "300 SAR" },
      { name: "Crown Lengthening", nameAr: "تطويل تاج السن", price: "600 SAR" },
      { name: "Gum Depigmentation", nameAr: "إزالة تصبغات اللثة", price: "500 SAR" },
      { name: "Gingival Graft", nameAr: "ترقيع لثة", price: "900 SAR" }
    ]
  },
  {
    category: "Orthodontics (Braces & Aligners)",
    categoryAr: "تقويم الأسنان",
    services: [
      { name: "Consultation & Assessment", nameAr: "استشارة وفحص تقويم", price: "100 SAR" },
      { name: "Orthodontic Records (X-rays, Photos, Study Models)", nameAr: "ملفات تقويم الأسنان (أشعة، صور، نماذج)", price: "300 SAR" },
      { name: "Metal Braces (Full Mouth)", nameAr: "تقويم معدني للفكّين", price: "4000 SAR" },
      { name: "Ceramic Braces (Full Mouth)", nameAr: "تقويم خزفي للفكّين", price: "5000 SAR" },
      { name: "Self-Ligating Braces", nameAr: "تقويم ذاتي الإغلاق", price: "5500 SAR" },
      { name: "Lingual Braces", nameAr: "تقويم داخلي (لساني)", price: "7000 SAR" },
      { name: "Clear Aligners (Invisalign / Others)", nameAr: "تقويم شفاف (إنفزلاين أو غيره)", price: "6000 SAR" },
      { name: "Retainer (Removable)", nameAr: "مثبت متحرك", price: "300 SAR" },
      { name: "Retainer (Fixed)", nameAr: "مثبت ثابت", price: "400 SAR" },
      { name: "Replacement of Retainer", nameAr: "تبديل مثبت", price: "200 SAR" },
      { name: "Orthodontic Follow-up Visit", nameAr: "زيارة متابعة تقويم", price: "100 SAR" },
      { name: "Emergency Braces Repair", nameAr: "إصلاح طارئ للتقويم", price: "150 SAR" }
    ]
  },
  {
    category: "Pediatric Dentistry",
    categoryAr: "طب أسنان الأطفال",
    services: [
      { name: "Child Dental Consultation", nameAr: "استشارة أسنان للأطفال", price: "100 SAR" },
      { name: "Fluoride Application", nameAr: "تطبيق الفلورايد", price: "150 SAR" },
      { name: "Fissure Sealant (Per Tooth)", nameAr: "سد الشقوق (لكل سن)", price: "100 SAR" },
      { name: "Milk Tooth Filling", nameAr: "حشو سن لبني", price: "150 SAR" },
      { name: "Pulpotomy (Baby Tooth)", nameAr: "علاج لب سن لبني", price: "300 SAR" },
      { name: "Stainless Steel Crown (Baby Tooth)", nameAr: "تاج فولاذي للسن اللبني", price: "350 SAR" },
      { name: "Extraction of Milk Tooth", nameAr: "خلع سن لبني", price: "150 SAR" },
      { name: "Space Maintainer", nameAr: "حافظ مسافة", price: "400 SAR" },
      { name: "Behavior Management / Sedation", nameAr: "إدارة السلوك / التهدئة", price: "200 – 500 SAR" },
      { name: "Fluoride + Polishing Package", nameAr: "حزمة الفلورايد + تلميع", price: "250 SAR" }
    ]
  },
  {
    category: "Teeth Whitening & Cosmetic Treatments",
    categoryAr: "تبييض الأسنان والعلاجات التجميلية",
    services: [
      { name: "Home Whitening Kit", nameAr: "طقم تبييض منزلي", price: "700 SAR" },
      { name: "In-Clinic Whitening (ZOOM / Laser)", nameAr: "تبييض في العيادة (زووم / ليزر)", price: "1000 SAR" },
      { name: "Whitening Touch-Up Session", nameAr: "جلسة تبييض متابعة", price: "300 SAR" },
      { name: "Composite Veneer (Per Tooth)", nameAr: "فينير كمبوزيت (لكل سن)", price: "500 SAR" },
      { name: "Porcelain Veneer (Per Tooth)", nameAr: "فينير خزفي (لكل سن)", price: "1000 SAR" },
      { name: "Hollywood Smile Package (Full Arch)", nameAr: "ابتسامة هوليوود (نصف الفك)", price: "10 000 SAR" },
      { name: "Gum Contouring (Laser)", nameAr: "تشكيل اللثة بالليزر", price: "600 SAR" },
      { name: "Tooth Jewellery", nameAr: "ترصيع الأسنان بالمجوهرات", price: "400 SAR" }
    ]
  },
  {
    category: "General & X-Ray Services",
    categoryAr: "الخدمات العامة والأشعة",
    services: [
      { name: "Initial Consultation", nameAr: "استشارة أولية", price: "100 SAR" },
      { name: "Follow-Up Visit", nameAr: "زيارة متابعة", price: "50 SAR" },
      { name: "Intraoral X-Ray", nameAr: "أشعة داخل الفم", price: "50 SAR" },
      { name: "OPG (Full Mouth X-Ray)", nameAr: "أشعة بانورامية للفم كامل", price: "200 SAR" },
      { name: "CBCT Scan (Per Jaw)", nameAr: "تصوير CBCT للفك", price: "400 SAR" },
      { name: "Certificate of Dental Fitness", nameAr: "شهادة لياقة أسنان", price: "150 SAR" },
      { name: "Dental Cleaning Package", nameAr: "باقة تنظيف الأسنان", price: "350 SAR" },
      { name: "Emergency Consultation", nameAr: "استشارة طارئة", price: "150 SAR" },
      { name: "Pain Management / Medication", nameAr: "علاج الألم / الأدوية", price: "100 SAR" }
    ]
  }
];


  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pricelist.jpg"
            alt="Transparent Pricing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-background/70" />
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              {language === "ar" ? "التسعير الشفاف" : "Transparent Pricing"}
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-primary">
              {language === "ar"
                ? "أسعار واضحة ومنافسة"
                : "Clear and Competitive Pricing"}
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {language === "ar"
                ? "اكتشف أسعارنا لجميع خدمات الأسنان والعناية الطبية. نحن ملتزمون بتقديم أسعار عادلة وجودة عالية."
                : "Discover our transparent pricing for all dental and medical services. We’re committed to fair pricing with the highest quality care."}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <div className="flex-1 container mx-auto px-4 pt-12 pb-20">
        <div className="space-y-10 max-w-5xl mx-auto">
          {priceCategories.map((category, index) => (
            <Card
              key={index}
              className="shadow-md border border-muted/30 hover:shadow-xl transition"
            >
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                  {language === "ar"
                    ? category.categoryAr
                    : category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-2/3">
                        {language === "ar" ? "الخدمة" : "Service"}
                      </TableHead>
                      <TableHead className="text-right">
                        {language === "ar" ? "السعر" : "Price"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.services.map((service, idx) => (
                      <TableRow
                        key={idx}
                        className="hover:bg-primary/5 transition"
                      >
                        <TableCell className="font-medium">
                          {language === "ar"
                            ? service.nameAr
                            : service.name}
                        </TableCell>
                        <TableCell className="text-right text-primary font-semibold">
                          {service.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {language === "ar"
              ? "* الأسعار تقريبية وقد تختلف حسب الحالة الفردية. يرجى الاتصال بنا للحصول على عرض أسعار دقيق."
              : "* Prices are approximate and may vary based on individual cases. Please contact us for an accurate quote."}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PriceList;
