export const getTestimonials = (isArabic: boolean) => [
    {
        id: 1,
        name: isArabic ? "محمد العتيبي" : "Mohammed Al-Otaibi",
        initial: "M",
        rating: 5,
        date: isArabic ? "منذ 3 أسابيع" : "3 weeks ago",
        text: isArabic
            ? "تجربة رائعة في عيادة سمايل للمشاهير. الأطباء محترفون جداً والعيادة نظيفة ومرتبة. أنصح بها بشدة لعلاج الأسنان."
            : "Great experience at Celebrity Smile Clinic. The doctors are very professional and the clinic is clean and tidy. Highly recommend for dental treatment.",
        badge: isArabic ? "مراجعة موثقة" : "Verified Review",
        color: "bg-blue-500"
    },
    {
        id: 2,
        name: isArabic ? "سارة الهاشمي" : "Sarah Al-Hashimi",
        initial: "S",
        rating: 5,
        date: isArabic ? "منذ شهر" : "1 month ago",
        text: isArabic
            ? "دكتورة دعاء كانت ممتازة مع أطفالي. تعامل راقي وخدمة مميزة. شكراً لكم على الاهتمام والرعاية."
            : "Dr. Doaa was excellent with my kids. Classy dealing and distinguished service. Thank you for the care and attention.",
        badge: isArabic ? "عناية الأطفال" : "Pediatric Care",
        color: "bg-pink-500"
    },
    {
        id: 3,
        name: isArabic ? "عبدالله فهد" : "Abdullah Fahad",
        initial: "A",
        rating: 5,
        date: isArabic ? "منذ شهرين" : "2 months ago",
        text: isArabic
            ? "قمت بعمل تقويم لأسناني والنتيجة كانت مذهلة. شكراً للدكتور على المتابعة المستمرة والنتائج الجميلة."
            : "I did orthodontics for my teeth and the result was amazing. Thanks to the doctor for the continuous follow-up and beautiful results.",
        badge: isArabic ? "تقويم الأسنان" : "Orthodontics",
        color: "bg-purple-500"
    },
    {
        id: 4,
        name: isArabic ? "نورة سعد" : "Noura Saad",
        initial: "N",
        rating: 5,
        date: isArabic ? "منذ 3 أشهر" : "3 months ago",
        text: isArabic
            ? "أفضل عيادة أسنان في جدة. الأسعار معقولة والخدمة ممتازة. الاستقبال ودود جداً ومتعاون."
            : "The best dental clinic in Jeddah. Prices are reasonable and service is excellent. The reception is very friendly and cooperative.",
        badge: isArabic ? "خدمة العملاء" : "Customer Service",
        color: "bg-green-500"
    },
    {
        id: 5,
        name: isArabic ? "خالد العمري" : "Khaled Al-Amri",
        initial: "K",
        rating: 5,
        date: isArabic ? "منذ 4 أشهر" : "4 months ago",
        text: isArabic
            ? "زراعة الأسنان كانت ناجحة وبدون ألم يذكر. شكراً للكادر الطبي على احترافيتهم."
            : "Dental implants were successful and with little to no pain. Thanks to the medical staff for their professionalism.",
        badge: isArabic ? "زراعة الأسنان" : "Dental Implants",
        color: "bg-indigo-500"
    },
    {
        id: 6,
        name: isArabic ? "أحمد السالم" : "Ahmed Al-Salem",
        initial: "A",
        rating: 5,
        date: isArabic ? "منذ 5 أشهر" : "5 months ago",
        text: isArabic
            ? "عملت فينير عند الدكتور والنتيجة خيال. الابتسامة تغيرت 180 درجة. شكراً لكم."
            : "I did veneers with the doctor and the result is fantastic. My smile changed 180 degrees. Thank you.",
        badge: isArabic ? "عدسات الأسنان" : "Veneers",
        color: "bg-teal-500"
    },
    {
        id: 7,
        name: isArabic ? "فاطمة نور" : "Fatima Noor",
        initial: "F",
        rating: 5,
        date: isArabic ? "منذ 6 أشهر" : "6 months ago",
        text: isArabic
            ? "علاج العصب كان ممتاز وبدون ألم. الدكتورة يدها خفيفة جداً."
            : "Root canal treatment was excellent and painless. The doctor has a very light hand.",
        badge: isArabic ? "علاج العصب" : "Root Canal",
        color: "bg-red-500"
    },
    {
        id: 8,
        name: isArabic ? "ريم الغامدي" : "Reem Al-Ghamdi",
        initial: "R",
        rating: 5,
        date: isArabic ? "منذ 2 أسابيع" : "2 weeks ago",
        text: isArabic
            ? "تبييض الأسنان عندهم ممتاز والنتيجة فورية. العيادة مريحة والاستقبال رائع."
            : "Their teeth whitening is excellent and the result is immediate. The clinic is comfortable and the reception is great.",
        badge: isArabic ? "تبييض الأسنان" : "Whitening",
        color: "bg-cyan-500"
    },
    {
        id: 9,
        name: isArabic ? "سلطان الحربي" : "Sultan Al-Harbi",
        initial: "S",
        rating: 5,
        date: isArabic ? "منذ 1 شهر" : "1 month ago",
        text: isArabic
            ? "ركبت تلبيسات والحمد لله الشكل طبيعي جداً. شكراً للدكتور على ذوقه واختياره للون المناسب."
            : "I installed crowns and thankfully the shape is very natural. Thanks to the doctor for his taste and choosing the right color.",
        badge: isArabic ? "تلبيسات" : "Crowns",
        color: "bg-orange-500"
    },
    {
        id: 10,
        name: isArabic ? "منى الشهري" : "Mona Al-Shehri",
        initial: "M",
        rating: 5,
        date: isArabic ? "منذ 3 أيام" : "3 days ago",
        text: isArabic
            ? "تنظيف الأسنان كان دقيق جداً والموظفين ودودين. أنصح بالعيادة لكل العائلة."
            : "Teeth cleaning was very thorough and the staff are friendly. I recommend the clinic for the whole family.",
        badge: isArabic ? "تنظيف الأسنان" : "Cleaning",
        color: "bg-lime-500"
    },
    {
        id: 11,
        name: isArabic ? "عمر الزهراني" : "Omar Al-Zahrani",
        initial: "O",
        rating: 5,
        date: isArabic ? "منذ 4 أيام" : "4 days ago",
        text: isArabic
            ? "خلع ضرس العقل كان تجربة سهلة عكس ما توقعت. شكراً للجراح الممتاز."
            : "Wisdom tooth extraction was an easy experience contrary to what I expected. Thanks to the excellent surgeon.",
        badge: isArabic ? "جراحة" : "Surgery",
        color: "bg-amber-500"
    },
    {
        id: 12,
        name: isArabic ? "لينا الدوسري" : "Lina Al-Dossary",
        initial: "L",
        rating: 5,
        date: isArabic ? "منذ 1 أسبوع" : "1 week ago",
        text: isArabic
            ? "أتابع التقويم معهم والنتائج تتحسن في كل زيارة. مواعيد دقيقة وتعامل راقي."
            : "I follow up my braces with them and results differ every visit. Punctual appointments and classy dealing.",
        badge: isArabic ? "تقويم" : "Braces",
        color: "bg-violet-500"
    },
    {
        id: 13,
        name: isArabic ? "حسن المالكي" : "Hassan Al-Malki",
        initial: "H",
        rating: 5,
        date: isArabic ? "منذ 2 أشهر" : "2 months ago",
        text: isArabic
            ? "أطفالي يحبون زيارة العيادة بسبب التعامل اللطيف والهدايا. شكراً لكم."
            : "My kids love visiting the clinic because of the gentle handling and gifts. Thank you.",
        badge: isArabic ? "أطفال" : "Kids",
        color: "bg-blue-400"
    },
    {
        id: 14,
        name: isArabic ? "يوسف العمري" : "Yousef Al-Amri",
        initial: "Y",
        rating: 5,
        date: isArabic ? "منذ 5 أشهر" : "5 months ago",
        text: isArabic
            ? "زراعة فورية ناجحة جداً. لم أتوقع أن تكون بهذه السهولة."
            : "Immediate implant was very successful. Didn't expect it to be this easy.",
        badge: isArabic ? "زراعة" : "Implants",
        color: "bg-indigo-600"
    },
    {
        id: 15,
        name: isArabic ? "عائشة القحطاني" : "Aisha Al-Qahtani",
        initial: "A",
        rating: 5,
        date: isArabic ? "منذ 3 أسابيع" : "3 weeks ago",
        text: isArabic
            ? "العيادة مجهزة بأحدث الأجهزة. شعرت بالراحة والاطمئنان خلال العلاج."
            : "The clinic is equipped with the latest devices. I felt comfortable and reassured during treatment.",
        badge: isArabic ? "عام" : "General",
        color: "bg-rose-500"
    },
    {
        id: 16,
        name: isArabic ? "ماجد السبيعي" : "Majed Al-Subaie",
        initial: "M",
        rating: 5,
        date: isArabic ? "منذ 6 أشهر" : "6 months ago",
        text: isArabic
            ? "ابتسامة هوليود عندهم غير. طبيعية وجميلة جداً. شكراً دكتورة."
            : "Their Hollywood smile is different. Very natural and beautiful. Thanks doctor.",
        badge: isArabic ? "تجميل" : "Cosmetic",
        color: "bg-fuchsia-500"
    },
    {
        id: 17,
        name: isArabic ? "ليلى الجهني" : "Layla Al-Juhani",
        initial: "L",
        rating: 5,
        date: isArabic ? "منذ 4 أشهر" : "4 months ago",
        text: isArabic
            ? "التقويم الشفاف (Invisalign) كان خيار ممتاز. لم يلاحظ أحد أنني أرتدي تقويم."
            : "Invisalign was an excellent choice. No one noticed I was wearing braces.",
        badge: isArabic ? "إنفزلاين" : "Invisalign",
        color: "bg-sky-500"
    },
    {
        id: 18,
        name: isArabic ? "فيصل المطيري" : "Faisal Al-Mutairi",
        initial: "F",
        rating: 5,
        date: isArabic ? "منذ شهر" : "1 month ago",
        text: isArabic
            ? "عالجت التهاب اللثة عندهم والحمد لله تحسن الوضع كثيراً. الأسعار ممتازة."
            : "Treated gum inflammation there and thankfully situation improved a lot. Prices are excellent.",
        badge: isArabic ? "لثة" : "Gums",
        color: "bg-emerald-500"
    },
    {
        id: 19,
        name: isArabic ? "هدى الحربي" : "Huda Al-Harbi",
        initial: "H",
        rating: 5,
        date: isArabic ? "منذ 2 أيام" : "2 days ago",
        text: isArabic
            ? "استقبلوني حالة طارئة في وقت متأخر وكانوا جداً متعاونين. أنقذوني من ألم فظيع."
            : "They accepted me as an emergency case late time and were very cooperative. Saved me from terrible pain.",
        badge: isArabic ? "طوارئ" : "Emergency",
        color: "bg-rose-600"
    },
    {
        id: 20,
        name: isArabic ? "سامي الغامدي" : "Sami Al-Ghamdi",
        initial: "S",
        rating: 5,
        date: isArabic ? "منذ أسبوع" : "1 week ago",
        text: isArabic
            ? "فحص دوري وتنظيف، كل شيء كان تمام. العيادة نظيفة والتعامل راقي."
            : "Routine checkup and cleaning, everything was perfect. Clinic is clean and dealing is classy.",
        badge: isArabic ? "فحص" : "Checkup",
        color: "bg-cyan-600"
    }
];
