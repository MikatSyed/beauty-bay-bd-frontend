export interface Language {
  code: string
  name: string
  flag: string
  dir: "ltr" | "rtl"
}

export interface Translations {
  [key: string]: {
    nav: {
      features: string
      marketplace: string
      whatWeServe: string
      testimonials: string
      contact: string
    }
    user: {
      loading: string
      unknownUser: string
      username: string
      profile: string
      dashboard: string
      logout: string
      login: string
    }
    accessibility: {
      userAvatar: string
      changeLanguage: string
      toggleMenu: string
    }
    hero: {
      imageAlt: string
      headlinePart1: string
      headlineHighlight1: string
      headlinePart2: string
      headlineHighlight2: string
      description: string
      sellButton: string
      findButton: string
      farmersStat: string
      customersStat: string
      deliveryStat: string
    }
    featuresSection: {
      title: string
      description: string
      cards: { title: string; description: string }[]
    }
    howItWorksTimeline: {
      title: string
      description: string
      getStartedButton: string
      steps: { title: string; description: string }[]
    }
    whoWeWorkWith: {
      title: string
      description: string
      partners: {
        title: string
        description: string
      }[]
    }
    featuredFarmers: {
      sectionTitle: string
      sectionDescription: string
      loadingMessage: string
      noFarmersFound: string
      previousFarmer: string
      nextFarmer: string
      farmerImageAlt: string // For dynamic alt text
      noPhoneProvided: string
      produceTypes: string
      status: string
      verified: string
      notVerified: string
      approved: string
      pendingApproval: string
      shopProductsButton: string // For dynamic button text
      viewFullProfileButton: string
      goToFarmer: string // For dynamic aria-label
      joinCommunityTitle: string
      joinCommunityDescription: string
      applyToBecomeFarmerButton: string
      farmers: { name: string; location: string; description: string }[] // Keep existing farmer data structure
      viewProfileButton: string // Keep existing
      allFarmersButton: string // Keep existing
      produceTypesMap: { [key: string]: string } // Added for produce type localization
      farmSizeLabel: string // Added for farm size label
      farmSizeUnitsMap: { [key: string]: string } // Added for farm size units
      notApplicable: string // Added for N/A localization
    }
    seasonalProduce: {
      title: string
      description: string
      loadingMessage: string
      errorLoadingCrops: string
      noSeasonalProduceFound: string
      currentSeasonLabel: string
      seasons: {
        Spring: string
        Summer: string
        Fall: string
        Winter: string
      }
      previousProduce: string
      nextProduce: string
      goToProduce: string
      nutritionHighlightsTitle: string
      farmToTableTipTitle: string
      recipeIdeaTitle: string
      findLocalSourcesButton: string
      viewRecipesButton: string
      seasonalCalendarCard: {
        title: string
        description: string
        buttonText: string
      }
      seasonalRecipesCard: {
        title: string
        description: string
        buttonText: string
      }
      nutritionGuideCard: {
        title: string
        description: string
        buttonText: string
      }
    }
    testimonials: {
      title: string
      description: string
      loadingMessage: string
      errorLoadingTestimonials: string
      noTestimonialsFound: string
      previousTestimonial: string
      nextTestimonial: string
      goToTestimonial: string
      anonymousUser: string
      defaultRole: string
    }
    newsletter: {
      title: string
      description: string
      placeholder: string
      buttonText: string
      submitting: string
      successMessage: string
      errorMessage: string
      imageAlt: string
      imageOverlayHeadline: string
      imageOverlayDescription: string
      badgeTitle: string
      badgeDescription: string
      formTitle: string
      formDescription: string
      nameLabel: string
      namePlaceholder: string
      emailLabel: string
      emailPlaceholder: string
      validationError: string
      submissionError: string
      addNameOption: string
      subscribeButton: string
      privacyPolicyTextPart1: string
      privacyPolicyLink: string
      privacyPolicyTextPart2: string
      thankYouTitle: string
      thankYouDescription: string
      subscribeAnotherEmailButton: string
      benefits: { title: string; description: string }[]
    }
    footer: {
      companyDescriptionTitle: string
      companyDescription: string
      address: string
      email: string
      phone: string
      companyTitle: string
      companyLinks: { label: string; href: string }[]
      customerTitle: string
      customerLinks: { label: string; href: string }[]
      farmerTitle: string
      farmerLinks: { label: string; href: string }[]
      legalTitle: string
      legalLinks: { label: string; href: string }[]
      whyChooseFruto: string
      trustBadges: { title: string; description: string }[]
      testimonialQuote: string
      testimonialAuthor: string
      testimonialLocation: string
      readMoreTestimonials: string
      getAppTitle: string
      getAppDescription: string
      copyright: string
      madeWith: string
      inLocation: string
    }
  }
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿", dir: "ltr" },
]

export const translations: Translations = {
  en: {
    nav: {
      features: "Features",
      marketplace: "Marketplace",
      whatWeServe: "What We Serve",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    user: {
      loading: "Loading...",
      unknownUser: "Unknown User",
      username: "User",
      profile: "Profile",
      dashboard: "Dashboard",
      logout: "Log out",
      login: "Login",
    },
    accessibility: {
      userAvatar: "user avatar",
      changeLanguage: "Change language",
      toggleMenu: "Toggle menu",
    },
    hero: {
      imageAlt: "Fresh produce and farmers in Uzbekistan",
      headlinePart1: "Bridging",
      headlineHighlight1: "Fields",
      headlinePart2: "and",
      headlineHighlight2: "Futures",
      description:
        "Fruto bridges the gap between Uzbekistan's farmers and buyers, creating a transparent marketplace for quality agricultural products.",
      sellButton: "Start Selling",
      findButton: "Find Fresh Produce",
      farmersStat: "Farmers on Platform",
      customersStat: "Happy Customers",
      deliveryStat: "Delivery Partners",
    },
    featuresSection: {
      title: "Why Choose Fruto",
      description: "Experience the difference of farm-fresh produce delivered directly to your door",
      cards: [
        {
          title: "Direct Farmer Connection",
          description: "Buyers connect directly with trusted farmers — no middlemen, just fair and transparent trade.",
        },
        {
          title: "Empowering Local Farmers",
          description:
            "Farmers gain access to more buyers across Uzbekistan and earn fair prices for their quality produce.",
        },
        {
          title: "Trusted Platform Reliability",
          description:
            "Fruto ensures quality assurance, transparent pricing, and a consistent, secure supply chain for all users.",
        },
      ],
    },
    howItWorksTimeline: {
      title: "How Fruto Works",
      description:
        "From farm to table in just a few simple steps. Here's how we connect you directly with local farmers.",
      getStartedButton: "Get Started Today",
      steps: [
        {
          title: "Browse Local Farmers",
          description:
            "Explore profiles of farmers in your area and discover the fresh, seasonal produce they're currently harvesting.",
        },
        {
          title: "Select Fresh Items",
          description:
            "Add farm-fresh produce to your basket, knowing exactly which farm each item comes from and when it was harvested.",
        },
        {
          title: "Place Your Order",
          description:
            "Complete your purchase directly with farmers, ensuring they receive fair compensation for their hard work.",
        },
        {
          title: "Receive Fresh Delivery",
          description:
            "Your order is delivered straight from the farm to your doorstep, often within 24 hours of harvest.",
        },
        {
          title: "Enjoy Farm-Fresh Quality",
          description:
            "Experience the superior taste and nutrition of truly fresh produce while supporting local agriculture.",
        },
      ],
    },
    whoWeWorkWith: {
      title: "Who do we work with?",
      description:
        "Fruto connects various stakeholders in the fresh produce ecosystem to build a more efficient and sustainable supply chain.",
      partners: [
        {
          title: "Growers & Landowners",
          description:
            "Commercial farmers, greenhouse owners, independent growers, and cooperatives—all bringing the best straight from the source.",
        },
        {
          title: "Buyers",
          description:
            "Hotels, restaurants, hospitals, supermarkets, retail chains, families, and food lovers—all seeking truly fresh, local harvests.",
        },
        {
          title: "Delivery Pros",
          description:
            "Flexible, on-demand professionals—choose your schedule, move what matters, and help build a fresher future.",
        },
      ],
    },
    featuredFarmers: {
      sectionTitle: "Meet Our Farmers",
      sectionDescription:
        "Get to know the passionate people behind your food. Each farmer in our network is committed to sustainable practices and exceptional quality.",
      loadingMessage: "Loading farmers...",
      noFarmersFound: "No farmers found.",
      previousFarmer: "Previous farmer",
      nextFarmer: "Next farmer",
      farmerImageAlt: "{farmerName}'s farm",
      noPhoneProvided: "No phone provided",
      produceTypes: "Produce Types",
      status: "Status",
      verified: "Verified",
      notVerified: "Not Verified",
      approved: "Approved",
      pendingApproval: "Pending Approval",
      shopProductsButton: "Shop {farmerFirstName}'s Products",
      viewFullProfileButton: "View Full Profile",
      goToFarmer: "Go to farmer {index}",
      joinCommunityTitle: "Join Our Community of Exceptional Farmers",
      joinCommunityDescription:
        "Are you a farmer committed to sustainable practices and exceptional quality? Partner with Fruto to connect directly with customers who value your craft.",
      applyToBecomeFarmerButton: "Apply to Become a Fruto Farmer",
      farmers: [
        {
          name: "Green Valley Farms",
          location: "Fergana Valley",
          description: "Specializing in organic fruits and vegetables, committed to sustainable farming practices.",
        },
        {
          name: "Sunny Meadow Produce",
          location: "Samarkand Region",
          description: "Known for their heirloom tomatoes and sweet melons, grown with traditional methods.",
        },
        {
          name: "Mountain Fresh Organics",
          location: "Tashkent Province",
          description: "Providing high-altitude berries and herbs, ensuring unique flavors and purity.",
        },
      ],
      viewProfileButton: "View Profile",
      allFarmersButton: "View All Farmers",
      produceTypesMap: {
        lettuce: "Lettuce",
        tomatoes: "Tomatoes",
        carrots: "Carrots",
        rice: "Rice",
        vegetables: "Vegetables",
        mango: "Mango",
      },
      farmSizeLabel: "Farm size",
      farmSizeUnitsMap: {
        acres: "acres",
        hectares: "hectares", // Example for other units
      },
      notApplicable: "N/A",
    },
    seasonalProduce: {
      title: "What's In Season Now",
      description:
        "Discover the freshest, most flavorful produce available right now. Eating seasonally means better taste, higher nutrition, and supporting local farmers.",
      loadingMessage: "Loading seasonal produce...",
      errorLoadingCrops: "Error loading crops: {errorMessage}",
      noSeasonalProduceFound: "No seasonal produce found.",
      currentSeasonLabel: "{season} Harvest",
      seasons: {
        Spring: "Spring",
        Summer: "Summer",
        Fall: "Fall",
        Winter: "Winter",
      },
      previousProduce: "Previous produce",
      nextProduce: "Next produce",
      goToProduce: "Go to produce {index}",
      nutritionHighlightsTitle: "Nutrition Highlights",
      farmToTableTipTitle: "Farm to Table Tip",
      recipeIdeaTitle: "Recipe Idea",
      findLocalSourcesButton: "Find Local Sources",
      viewRecipesButton: "View Recipes",
      seasonalCalendarCard: {
        title: "Seasonal Calendar",
        description: "Explore what's in season throughout the year and plan your meals around nature's calendar.",
        buttonText: "View Calendar",
      },
      seasonalRecipesCard: {
        title: "Seasonal Recipes",
        description: "Discover delicious ways to prepare and enjoy the season's bounty with our curated recipes.",
        buttonText: "Browse Recipes",
      },
      nutritionGuideCard: {
        title: "Nutrition Guide",
        description: "Learn about the health benefits of seasonal eating and how to maximize nutrition in your meals.",
        buttonText: "Read Guide",
      },
    },
    testimonials: {
      title: "What Our Users Say",
      description: "Hear from the farmers, buyers, and logistics providers who use Fruto every day.",
      loadingMessage: "Loading testimonials...",
      errorLoadingTestimonials: "Failed to load testimonials: {errorMessage}",
      noTestimonialsFound: "No testimonials found.",
      previousTestimonial: "Previous testimonial",
      nextTestimonial: "Next testimonial",
      goToTestimonial: "Go to testimonial {index}",
      anonymousUser: "Anonymous",
      defaultRole: "Fruto User",
    },
    newsletter: {
      title: "Stay Fresh with Our Newsletter",
      description:
        "Get updates on new seasonal produce, featured farmers, and exclusive offers delivered to your inbox.",
      placeholder: "Enter your email",
      buttonText: "Subscribe",
      submitting: "Subscribing...",
      successMessage: "Thank you for subscribing!",
      errorMessage: "Please enter a valid email address.",
      imageAlt: "Fresh produce from local farmers",
      imageOverlayHeadline: "Join over 15,000 food enthusiasts",
      imageOverlayDescription: "Discover the joy of truly fresh, local food",
      badgeTitle: "Weekly Updates",
      badgeDescription: "Seasonal picks & tips",
      formTitle: "Stay Fresh with Fruto Updates",
      formDescription:
        "Subscribe to our newsletter and be the first to know about seasonal harvests, special offers, and tips for making the most of your farm-fresh produce.",
      nameLabel: "Your Name",
      namePlaceholder: "Jane Smith",
      emailLabel: "Your Email",
      emailPlaceholder: "jane@example.com",
      validationError: "Please enter a valid email address",
      submissionError: "Something went wrong. Please try again.",
      addNameOption: "I'd like to add my name (optional)",
      subscribeButton: "Subscribe Now",
      privacyPolicyTextPart1: "By subscribing, you agree to our ",
      privacyPolicyLink: "Privacy Policy",
      privacyPolicyTextPart2: ". We'll never share your information, and you can unsubscribe at any time.",
      thankYouTitle: "Thank You for Subscribing!",
      thankYouDescription:
        "You're now part of our community of food enthusiasts. Check your inbox soon for fresh updates and exclusive offers.",
      subscribeAnotherEmailButton: "Subscribe another email",
      benefits: [
        {
          title: "Weekly Harvest Updates",
          description:
            "Stay informed about what's fresh and in season each week, so you can plan your meals around the best available produce.",
        },
        {
          title: "Exclusive Offers",
          description:
            "Receive special discounts, early access to limited harvests, and exclusive promotions only available to our subscribers.",
        },
        {
          title: "Seasonal Recipes",
          description:
            "Get inspired with delicious, chef-created recipes designed to showcase the unique flavors of seasonal produce.",
        },
      ],
    },
    footer: {
      companyDescriptionTitle: "Fresh Food, Direct from Farmers",
      companyDescription:
        "Fruto connects you with local farmers for the freshest seasonal produce. Support sustainable agriculture while enjoying better quality food.",
      address: "123 Farm Lane, Portland, OR 97201",
      email: "hello@fruto.com",
      phone: "(503) 555-1234",
      companyTitle: "Company",
      companyLinks: [
        { label: "About Us", href: "/about" },
        { label: "Our Mission", href: "/mission" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Contact", href: "/contact" },
      ],
      customerTitle: "For Customers",
      customerLinks: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Browse Farmers", href: "/farmers" },
        { label: "Seasonal Guide", href: "/seasonal-guide" },
        { label: "Recipes", href: "/recipes" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
      farmerTitle: "For Farmers",
      farmerLinks: [
        { label: "Join as a Farmer", href: "/become-a-farmer" },
        { label: "Farmer Resources", href: "/farmer-resources" },
        { label: "Success Stories", href: "/farmer-stories" },
        { label: "Pricing", href: "/farmer-pricing" },
        { label: "FAQ", href: "/farmer-faq" },
      ],
      legalTitle: "Legal",
      legalLinks: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "Sitemap", href: "/sitemap" },
      ],
      whyChooseFruto: "Why Choose Fruto",
      trustBadges: [
        { title: "Secure Payments", description: "All transactions are encrypted and secure" },
        { title: "Verified Farmers", description: "Every farmer is personally vetted for quality" },
        { title: "Award Winning", description: "Recognized for innovation in food systems" },
      ],
      testimonialQuote:
        '"Fruto has completely changed how my family eats. We\'re discovering incredible produce we never knew existed, and the difference in flavor compared to supermarket options is remarkable."',
      testimonialAuthor: "Emily Chen",
      location: "Portland, OR",
      readMoreTestimonials: "Read more testimonials",
      getAppTitle: "Get the Fruto App",
      getAppDescription: "Shop fresh produce on the go and track your deliveries in real-time.",
      copyright: "Fruto. All rights reserved.",
      madeWith: "Made with",
      inLocation: "in Portland, OR",
    },
  },
  ar: {
    nav: {
      features: "الميزات",
      marketplace: "السوق",
      whatWeServe: "من نخدم",
      testimonials: "الشهادات",
      contact: "اتصل بنا",
    },
    user: {
      loading: "جاري التحميل...",
      unknownUser: "مستخدم غير معروف",
      username: "مستخدم",
      profile: "الملف الشخصي",
      dashboard: "لوحة التحكم",
      logout: "تسجيل الخروج",
      login: "تسجيل الدخول",
    },
    accessibility: {
      userAvatar: "صورة المستخدم الرمزية",
      changeLanguage: "تغيير اللغة",
      toggleMenu: "تبديل القائمة",
    },
    hero: {
      imageAlt: "منتجات طازجة ومزارعون في أوزبكستان",
      headlinePart1: "ربط",
      headlineHighlight1: "الحقول",
      headlinePart2: "و",
      headlineHighlight2: "المستقبل",
      description:
        "يربط فروتو الفجوة بين مزارعي أوزبكستان والمشترين، مما يخلق سوقًا شفافًا للمنتجات الزراعية عالية الجودة.",
      sellButton: "ابدأ البيع",
      findButton: "ابحث عن المنتجات الطازجة",
      farmersStat: "مزارعون على المنصة",
      customersStat: "عملاء سعداء",
      deliveryStat: "شركاء التوصيل",
    },
    featuresSection: {
      title: "لماذا تختار فروتو",
      description: "جرب الفرق في المنتجات الطازجة من المزرعة التي يتم توصيلها مباشرة إلى باب منزلك",
      cards: [
        {
          title: "اتصال مباشر بالمزارع",
          description: "يتصل المشترون مباشرة بالمزارعين الموثوق بهم - لا وسطاء، فقط تجارة عادلة وشفافة.",
        },
        {
          title: "تمكين المزارعين المحليين",
          description:
            "يحصل المزارعون على وصول إلى المزيد من المشترين في جميع أنحاء أوزبكستان ويكسبون أسعارًا عادلة لمنتجاتهم عالية الجودة.",
        },
        {
          title: "موثوقية المنصة الموثوقة",
          description: "يضمن فروتو ضمان الجودة، والتسعير الشفاف، وسلسلة إمداد متسقة وآمنة لجميع المستخدمين.",
        },
      ],
    },
    howItWorksTimeline: {
      title: "كيف يعمل فروتو",
      description: "من المزرعة إلى المائدة في بضع خطوات بسيطة. إليك كيف نربطك مباشرة بالمزارعين المحليين.",
      getStartedButton: "ابدأ اليوم",
      steps: [
        {
          title: "تصفح المزارعين المحليين",
          description: "استكشف ملفات تعريف المزارعين في منطقتك واكتشف المنتجات الطازجة الموسمية التي يحصدونها حاليًا.",
        },
        {
          title: "اختر العناصر الطازجة",
          description:
            "أضف المنتجات الطازجة من المزرعة إلى سلتك، مع معرفة المزرعة التي يأتي منها كل عنصر ومتى تم حصاده.",
        },
        {
          title: "قدم طلبك",
          description: "أكمل عملية الشراء مباشرة مع المزارعين، مما يضمن حصولهم على تعويض عادل لعملهم الشاق.",
        },
        {
          title: "استلم توصيلًا طازجًا",
          description: "يتم توصيل طلبك مباشرة من المزرعة إلى باب منزلك، غالبًا في غضون 24 ساعة من الحصاد.",
        },
        {
          title: "استمتع بجودة المزرعة الطازجة",
          description: "جرب المذاق والتغذية الفائقة للمنتجات الطازجة حقًا مع دعم الزراعة المحلية.",
        },
      ],
    },
    whoWeWorkWith: {
      title: "مع من نعمل؟",
      description: "يربط فروتو مختلف أصحاب المصلحة في نظام المنتجات الطازجة لبناء سلسلة توريد أكثر كفاءة واستدامة.",
      partners: [
        {
          title: "المزارعون وأصحاب الأراضي",
          description:
            "المزارعون التجاريون، أصحاب البيوت الزجاجية، المزارعون المستقلون، والتعاونيات—جميعهم يقدمون الأفضل مباشرة من المصدر.",
        },
        {
          title: "المشترون",
          description:
            "الفنادق، المطاعم، المستشفيات، محلات السوبر ماركت، سلاسل البيع بالتجزئة، العائلات، ومحبي الطعام—جميعهم يبحثون عن محاصيل طازجة ومحلية حقًا.",
        },
        {
          title: "محترفو التوصيل",
          description: "محترفون مرنون وعند الطلب—اختر جدولك الزمني، انقل ما يهم، وساعد في بناء مستقبل أكثر انتعاشًا.",
        },
      ],
    },
    featuredFarmers: {
      sectionTitle: "قابل مزارعينا",
      sectionDescription:
        "تعرف على الأشخاص الشغوفين وراء طعامك. يلتزم كل مزارع في شبكتنا بالممارسات المستدامة والجودة الاستثنائية.",
      loadingMessage: "جاري تحميل المزارعين...",
      noFarmersFound: "لم يتم العثور على مزارعين.",
      previousFarmer: "المزارع السابق",
      nextFarmer: "المزارع التالي",
      farmerImageAlt: "مزرعة {farmerName}",
      noPhoneProvided: "لم يتم توفير رقم هاتف",
      produceTypes: "أنواع المنتجات",
      status: "الحالة",
      verified: "تم التحقق",
      notVerified: "لم يتم التحقق",
      approved: "معتمد",
      pendingApproval: "بانتظار الموافقة",
      shopProductsButton: "تسوق منتجات {farmerFirstName}",
      viewFullProfileButton: "عرض الملف الشخصي الكامل",
      goToFarmer: "انتقل إلى المزارع {index}",
      joinCommunityTitle: "انضم إلى مجتمعنا من المزارعين المتميزين",
      joinCommunityDescription:
        "هل أنت مزارع ملتزم بالممارسات المستدامة والجودة الاستثنائية؟ شارك مع فروتو للتواصل مباشرة مع العملاء الذين يقدرون حرفتك.",
      applyToBecomeFarmerButton: "تقدم لتصبح مزارع فروتو",
      farmers: [
        {
          name: "مزارع الوادي الأخضر",
          location: "وادي فرغانة",
          description: "متخصصون في الفواكه والخضروات العضوية، ملتزمون بممارسات الزراعة المستدامة.",
        },
        {
          name: "منتجات المروج المشمسة",
          location: "منطقة سمرقند",
          description: "معروفون بطماطمهم القديمة والبطيخ الحلو، المزروعة بالطرق التقليدية.",
        },
        {
          name: "منتجات الجبل العضوية الطازجة",
          location: "مقاطعة طشقند",
          description: "توفير التوت والأعشاب من المرتفعات، مما يضمن نكهات فريدة ونقاء.",
        },
      ],
      viewProfileButton: "عرض الملف الشخصي",
      allFarmersButton: "عرض جميع المزارعين",
      produceTypesMap: {
        lettuce: "خس",
        tomatoes: "طماطم",
        carrots: "جزر",
        rice: "أرز",
        vegetables: "خضروات",
        mango: "مانجو",
      },
      farmSizeLabel: "حجم المزرعة",
      farmSizeUnitsMap: {
        acres: "فدان",
        hectares: "هكتار",
      },
      notApplicable: "غير متوفر",
    },
    seasonalProduce: {
      title: "أبرز المنتجات الموسمية",
      description: "اكتشف ما هو طازج وفي موسمه الآن، مباشرة من المزارع المحلية.",
      loadingMessage: "جاري تحميل المنتجات الموسمية...",
      errorLoadingCrops: "خطأ في تحميل المحاصيل: {errorMessage}",
      noSeasonalProduceFound: "لم يتم العثور على منتجات موسمية.",
      currentSeasonLabel: "حصاد {season}",
      seasons: {
        Spring: "الربيع",
        Summer: "الصيف",
        Fall: "الخريف",
        Winter: "الشتاء",
      },
      previousProduce: "المنتج السابق",
      nextProduce: "المنتج التالي",
      goToProduce: "انتقل إلى المنتج {index}",
      nutritionHighlightsTitle: "أبرز النقاط الغذائية",
      farmToTableTipTitle: "نصيحة من المزرعة إلى المائدة",
      recipeIdeaTitle: "فكرة وصفة",
      findLocalSourcesButton: "ابحث عن مصادر محلية",
      viewRecipesButton: "عرض الوصفات",
      seasonalCalendarCard: {
        title: "التقويم الموسمي",
        description: "استكشف ما هو في موسمه على مدار العام وخطط وجباتك وفقًا لتقويم الطبيعة.",
        buttonText: "عرض التقويم",
      },
      seasonalRecipesCard: {
        title: "وصفات موسمية",
        description: "اكتشف طرقًا لذيذة لإعداد والاستمتاع بمنتجات الموسم من خلال وصفاتنا المنسقة.",
        buttonText: "تصفح الوصفات",
      },
      nutritionGuideCard: {
        title: "دليل التغذية",
        description: "تعرف على الفوائد الصحية للأكل الموسمي وكيفية زيادة التغذية في وجباتك.",
        buttonText: "قراءة الدليل",
      },
    },
    testimonials: {
      title: "ماذا يقول مستخدمونا",
      description: "استمع من المزارعين والمشترين ومقدمي الخدمات اللوجستية الذين يستخدمون فروتو يوميًا.",
      loadingMessage: "جاري تحميل الشهادات...",
      errorLoadingTestimonials: "فشل تحميل الشهادات: {errorMessage}",
      noTestimonialsFound: "لم يتم العثور على شهادات.",
      previousTestimonial: "الشهادة السابقة",
      nextTestimonial: "الشهادة التالية",
      goToTestimonial: "انتقل إلى الشهادة {index}",
      anonymousUser: "مجهول",
      defaultRole: "مستخدم فروتو",
    },
    newsletter: {
      title: "ابق طازجًا مع نشرتنا الإخبارية",
      description:
        "احصل على تحديثات حول المنتجات الموسمية الجديدة، والمزارعين المميزين، والعروض الحصرية التي يتم تسليمها إلى صندوق بريدك الوارد.",
      placeholder: "أدخل بريدك الإلكتروني",
      buttonText: "اشترك",
      submitting: "جاري الاشتراك...",
      successMessage: "شكرا لاشتراكك!",
      errorMessage: "الرجاء إدخال عنوان بريد إلكتروني صالح.",
      imageAlt: "منتجات طازجة من المزارعين المحليين",
      imageOverlayHeadline: "انضم إلى أكثر من 15000 من عشاق الطعام",
      imageOverlayDescription: "اكتشف متعة الطعام الطازج المحلي حقًا",
      badgeTitle: "تحديثات أسبوعية",
      badgeDescription: "اختيارات ونصائح موسمية",
      formTitle: "ابق طازجًا مع تحديثات فروتو",
      formDescription:
        "اشترك في نشرتنا الإخبارية وكن أول من يعرف عن المحاصيل الموسمية الجديدة، والعروض الخاصة، والنصائح للاستفادة القصوى من منتجاتك الطازجة من المزرعة.",
      nameLabel: "اسمك",
      namePlaceholder: "جين سميث",
      emailLabel: "بريدك الإلكتروني",
      emailPlaceholder: "jane@example.com",
      validationError: "الرجاء إدخال عنوان بريد إلكتروني صالح",
      submissionError: "حدث خطأ ما. الرجاء المحاولة مرة أخرى.",
      addNameOption: "أود إضافة اسمي (اختياري)",
      subscribeButton: "اشترك الآن",
      privacyPolicyTextPart1: "بالاشتراك، فإنك توافق على ",
      privacyPolicyLink: "سياسة الخصوصية",
      privacyPolicyTextPart2: ". لن نشارك معلوماتك أبدًا، ويمكنك إلغاء الاشتراك في أي وقت.",
      thankYouTitle: "شكرا لاشتراكك!",
      thankYouDescription:
        "أنت الآن جزء من مجتمعنا من عشاق الطعام. تحقق من صندوق الوارد الخاص بك قريبًا للحصول على تحديثات جديدة وعروض حصرية.",
      subscribeAnotherEmailButton: "اشترك ببريد إلكتروني آخر",
      benefits: [
        {
          title: "تحديثات الحصاد الأسبوعية",
          description:
            "ابق على اطلاع دائم بما هو طازج وفي موسمه كل أسبوع، حتى تتمكن من تخطيط وجباتك حول أفضل المنتجات المتاحة.",
        },
        {
          title: "عروض حصرية",
          description:
            "احصل على خصومات خاصة، وصول مبكر إلى المحاصيل المحدودة، وعروض ترويجية حصرية متاحة فقط لمشتركينا.",
        },
        {
          title: "وصفات موسمية",
          description: "استلهم من الوصفات اللذيذة التي أعدها الطهاة والمصممة لعرض النكهات الفريدة للمنتجات الموسمية.",
        },
      ],
    },
    footer: {
      companyDescriptionTitle: "طعام طازج، مباشرة من المزارعين",
      companyDescription:
        "يربط فروتو بينك وبين المزارعين المحليين للحصول على أطازج المنتجات الموسمية. ادعم الزراعة المستدامة بينما تستمتع بطعام ذي جودة أفضل.",
      address: "123 فارم لين، بورتلاند، أوريغون 97201",
      email: "hello@fruto.com",
      phone: "(503) 555-1234",
      companyTitle: "الشركة",
      companyLinks: [
        { label: "من نحن", href: "/about" },
        { label: "مهمتنا", href: "/mission" },
        { label: "الوظائف", href: "/careers" },
        { label: "الصحافة", href: "/press" },
        { label: "اتصل بنا", href: "/contact" },
      ],
      customerTitle: "للعملاء",
      customerLinks: [
        { label: "كيف يعمل", href: "/how-it-works" },
        { label: "تصفح المزارعين", href: "/farmers" },
        { label: "دليل الموسم", href: "/seasonal-guide" },
        { label: "وصفات", href: "/recipes" },
        { label: "بطاقات الهدايا", href: "/gift-cards" },
      ],
      farmerTitle: "للمزارعين",
      farmerLinks: [
        { label: "انضم كمزارع", href: "/become-a-farmer" },
        { label: "موارد المزارعين", href: "/farmer-resources" },
        { label: "قصص النجاح", href: "/farmer-stories" },
        { label: "التسعير", href: "/farmer-pricing" },
        { label: "الأسئلة الشائعة", href: "/farmer-faq" },
      ],
      legalTitle: "قانوني",
      legalLinks: [
        { label: "شروط الخدمة", href: "/terms" },
        { label: "سياسة الخصوصية", href: "/privacy" },
        { label: "سياسة ملفات تعريف الارتباط", href: "/cookies" },
        { label: "إمكانية الوصول", href: "/accessibility" },
        { label: "خريطة الموقع", href: "/sitemap" },
      ],
      whyChooseFruto: "لماذا تختار فروتو",
      trustBadges: [
        { title: "مدفوعات آمنة", description: "جميع المعاملات مشفرة وآمنة" },
        { title: "مزارعون موثقون", description: "يتم فحص كل مزارع شخصيًا لضمان الجودة" },
        { title: "حائز على جوائز", description: "معترف به للابتكار في أنظمة الغذاء" },
      ],
      testimonialQuote:
        '"لقد غير فروتو تمامًا طريقة تناول عائلتي للطعام. نكتشف منتجات رائعة لم نكن نعرف بوجودها من قبل، والفرق في النكهة مقارنة بخيارات السوبر ماركت رائع."',
      testimonialAuthor: "إميلي تشن",
      location: "بورتلاند، أوريغون",
      readMoreTestimonials: "اقرأ المزيد من الشهادات",
      getAppTitle: "احصل على تطبيق فروتو",
      getAppDescription: "تسوق المنتجات الطازجة أثناء التنقل وتتبع عمليات التسليم في الوقت الفعلي.",
      copyright: "فروتو. جميع الحقوق محفوظة.",
      madeWith: "صنع بـ",
      inLocation: "في بورتلاند، أوريغون",
    },
  },
  uz: {
    nav: {
      features: "Xususiyatlar",
      marketplace: "Bozor",
      whatWeServe: "Kimlarga xizmat qilamiz",
      testimonials: "Fikrlar",
      contact: "Aloqa",
    },
    user: {
      loading: "Yuklanmoqda...",
      unknownUser: "Noma'lum foydalanuvchi",
      username: "Foydalanuvchi",
      profile: "Profil",
      dashboard: "Boshqaruv paneli",
      logout: "Chiqish",
      login: "Kirish",
    },
    accessibility: {
      userAvatar: "foydalanuvchi avatari",
      changeLanguage: "Tilni o'zgartirish",
      toggleMenu: "Menyuni almashtirish",
    },
    hero: {
      imageAlt: "O'zbekistondagi yangi mahsulotlar va fermerlar",
      headlinePart1: "Bog'lash",
      headlineHighlight1: "Dala",
      headlinePart2: "va",
      headlineHighlight2: "Kelajak",
      description:
        "Fruto O'zbekiston fermerlari va xaridorlari o'rtasidagi bo'shliqni bog'lab, sifatli qishloq xo'jaligi mahsulotlari uchun shaffof bozor yaratadi.",
      sellButton: "Sotishni boshlash",
      findButton: "Yangi mahsulot topish",
      farmersStat: "Platformadagi fermerlar",
      customersStat: "Mamnun mijozlar",
      deliveryStat: "Yetkazib berish hamkorlari",
    },
    featuresSection: {
      title: "Nima uchun Frutoni tanlaysiz",
      description: "Fermadan to'g'ridan-to'g'ri eshigingizga yetkazib beriladigan yangi mahsulot farqini his qiling",
      cards: [
        {
          title: "Fermer bilan to'g'ridan-to'g'ri aloqa",
          description:
            "Xaridorlar ishonchli fermerlar bilan to'g'ridan-to'g'ri bog'lanadi - vositachilarsiz, faqat adolatli va shaffof savdo.",
        },
        {
          title: "Mahalliy fermerlarni qo'llab-quvvatlash",
          description:
            "Fermerlar O'zbekiston bo'ylab ko'proq xaridorlarga ega bo'ladi va sifatli mahsulotlari uchun adolatli narxlarni oladi.",
        },
        {
          title: "Ishonchli platforma ishonchliligi",
          description:
            "Fruto barcha foydalanuvchilar uchun sifat kafolati, shaffof narxlar va barqaror, xavfsiz ta'minot zanjirini ta'minlaydi.",
        },
      ],
    },
    howItWorksTimeline: {
      title: "Fruto qanday ishlaydi",
      description:
        "Fermadan dasturxongacha bir necha oddiy qadamda. Mana biz sizni mahalliy fermerlar bilan qanday bog'laymiz.",
      getStartedButton: "Bugun boshlang",
      steps: [
        {
          title: "Mahalliy fermerlarni ko'rib chiqing",
          description:
            "Hududingizdagi fermerlarning profillarini o'rganing va ular hozirda yig'ib olayotgan yangi, mavsumiy mahsulotlarni kashf eting.",
        },
        {
          title: "Yangi mahsulotlarni tanlang",
          description:
            "Har bir mahsulot qaysi fermadan kelganini va qachon yig'ib olinganini bilgan holda, savatingizga yangi mahsulotlarni qo'shing.",
        },
        {
          title: "Buyurtmangizni joylashtiring",
          description:
            "Xaridingizni to'g'ridan-to'g'ri fermerlar bilan yakunlang, bu ularning mashaqqatli mehnati uchun adolatli haq olishini ta'minlaydi.",
        },
        {
          title: "Yangi yetkazib berishni qabul qiling",
          description:
            "Buyurtmangiz to'g'ridan-to'g'ri fermadan eshigingizga yetkaziladi, ko'pincha yig'ib olinganidan keyin 24 soat ichida.",
        },
        {
          title: "Fermadan yangi sifatdan rohatlaning",
          description:
            "Haqiqatan ham yangi mahsulotning yuqori ta'mi va ozuqaviy qiymatini his qiling, shu bilan birga mahalliy qishloq xo'jaligini qo'llab-quvvatlang.",
        },
      ],
    },
    whoWeWorkWith: {
      title: "Biz kimlar bilan ishlaymiz?",
      description:
        "Fruto yangi mahsulotlar ekotizimidagi turli manfaatdor tomonlarni bog'lab, yanada samarali va barqaror ta'minot zanjirini quradi.",
      partners: [
        {
          title: "Dehqonlar va Yer egalari",
          description:
            "Tijorat fermerlari, issiqxona egalari, mustaqil dehqonlar va kooperativlar — barchasi eng yaxshisini to'g'ridan-to'g'ri manbadan olib keladi.",
        },
        {
          title: "Xaridorlar",
          description:
            "Mehmonxonalar, restoranlar, kasalxonalar, supermarketlar, chakana savdo tarmoqlari, oilalar va oziq-ovqat ishqibozlari — barchasi haqiqatan ham yangi, mahalliy hosilni izlaydi.",
        },
        {
          title: "Yetkazib berish mutaxassislari",
          description:
            "Moslashuvchan, talabga javob beradigan mutaxassislar — jadvalingizni tanlang, muhim narsalarni harakatga keltiring va yangi kelajakni qurishga yordam bering.",
        },
      ],
    },
    featuredFarmers: {
      sectionTitle: "Fermerlarimiz bilan tanishing",
      sectionDescription:
        "Oziq-ovqatingiz ortidagi fidoyi insonlar bilan tanishing. Tarmoqimizdagi har bir fermer barqaror amaliyotlar va ajoyib sifatga sodiqdir.",
      loadingMessage: "Fermerlar yuklanmoqda...",
      noFarmersFound: "Fermerlar topilmadi.",
      previousFarmer: "Oldingi fermer",
      nextFarmer: "Keyingi fermer",
      farmerImageAlt: "{farmerName} fermasi",
      noPhoneProvided: "Telefon raqami ko'rsatilmagan",
      produceTypes: "Mahsulot turlari",
      status: "Holat",
      verified: "Tasdiqlangan",
      notVerified: "Tasdiqlanmagan",
      approved: "Tasdiqlangan",
      pendingApproval: "Tasdiqlash kutilmoqda",
      shopProductsButton: "{farmerFirstName} mahsulotlarini xarid qiling",
      viewFullProfileButton: "To'liq profilni ko'rish",
      goToFarmer: "{index}-fermerga o'tish",
      joinCommunityTitle: "Ajoyib fermerlar jamoamizga qo'shiling",
      joinCommunityDescription:
        "Siz barqaror amaliyotlar va ajoyib sifatga sodiq fermermisiz? Fruto bilan hamkorlik qilib, hunaringizni qadrlaydigan mijozlar bilan to'g'ridan-to'g'ri bog'laning.",
      applyToBecomeFarmerButton: "Fruto fermeri bo'lish uchun ariza bering",
      farmers: [
        {
          name: "Yashil Vodiy Fermalari",
          location: "Farg'ona vodiysi",
          description: "Organik meva va sabzavotlarga ixtisoslashgan, barqaror dehqonchilik amaliyotiga sodiq.",
        },
        {
          name: "Quyoshli O'tloq Mahsulotlari",
          location: "Samarqand viloyati",
          description:
            "An'anaviy usullar bilan yetishtirilgan eski navli pomidorlari va shirin qovunlari bilan mashhur.",
        },
        {
          name: "Tog' Yangi Organiklari",
          location: "Toshkent viloyati",
          description: "Noyob ta'mlar va soflikni ta'minlaydigan baland tog' rezavorlari va o'tlarini yetkazib beradi.",
        },
      ],
      viewProfileButton: "Profilni ko'rish",
      allFarmersButton: "Barcha fermerlarni ko'rish",
      produceTypesMap: {
        lettuce: "Salat",
        tomatoes: "Pomidor",
        carrots: "Sabzi",
        rice: "Guruch",
        vegetables: "Sabzavotlar",
        mango: "Mango",
      },
      farmSizeLabel: "Ferma hajmi",
      farmSizeUnitsMap: {
        acres: "akr",
        hectares: "gektar",
      },
      notApplicable: "Mavjud emas",
    },
    seasonalProduce: {
      title: "Mavsumiy mahsulotlar",
      description:
        "Hozirda nima yangi va mavsumda ekanligini, to'g'ridan-to'g'ri mahalliy fermer xo'jaliklaridan bilib oling.",
      loadingMessage: "Mavsumiy mahsulotlar yuklanmoqda...",
      errorLoadingCrops: "Ekinlarni yuklashda xato: {errorMessage}",
      noSeasonalProduceFound: "Mavsumiy mahsulotlar topilmadi.",
      currentSeasonLabel: "{season} hosili",
      seasons: {
        Spring: "Bahor",
        Summer: "Yoz",
        Fall: "Kuz",
        Winter: "Qish",
      },
      previousProduce: "Oldingi mahsulot",
      nextProduce: "Keyingi mahsulot",
      goToProduce: "{index}-mahsulotga o'tish",
      nutritionHighlightsTitle: "Ozuqaviy xususiyatlar",
      farmToTableTipTitle: "Fermadan dasturxongacha maslahat",
      recipeIdeaTitle: "Retsept g'oyasi",
      findLocalSourcesButton: "Mahalliy manbalarni topish",
      viewRecipesButton: "Retseptlarni ko'rish",
      seasonalCalendarCard: {
        title: "Mavsumiy kalendar",
        description:
          "Yil davomida nima mavsumda ekanligini o'rganing va ovqatlaringizni tabiat kalendari bo'yicha rejalashtiring.",
        buttonText: "Kalendarni ko'rish",
      },
      seasonalRecipesCard: {
        title: "Mavsumiy retseptlar",
        description:
          "Mavsumiy mahsulotlarning noyob ta'mlarini namoyish qilish uchun mo'ljallangan mazali, oshpaz tomonidan yaratilgan retseptlar bilan ilhom oling.",
        buttonText: "Retseptlarni ko'rib chiqish",
      },
      nutritionGuideCard: {
        title: "Ozuqaviy qo'llanma",
        description:
          "Mavsumiy ovqatlanishning sog'liqqa foydalari va ovqatlaringizda ozuqaviy qiymatni qanday oshirishni bilib oling.",
        buttonText: "Qo'llanmani o'qish",
      },
    },
    testimonials: {
      title: "Foydalanuvchilarimiz nima deydi",
      description:
        "Frutodan har kuni foydalanadigan fermerlar, xaridorlar va logistika provayderlarining fikrlarini tinglang.",
      loadingMessage: "Fikrlar yuklanmoqda...",
      errorLoadingTestimonials: "Fikrlarni yuklashda xato: {errorMessage}",
      noTestimonialsFound: "Fikrlar topilmadi.",
      previousTestimonial: "Oldingi fikr",
      nextTestimonial: "Keyingi fikr",
      goToTestimonial: "{index}-fikrga o'tish",
      anonymousUser: "Anonim",
      defaultRole: "Fruto foydalanuvchisi",
    },
    newsletter: {
      title: "Bizning axborot byulletenimiz bilan yangi bo'ling",
      description:
        "Yangi mavsumiy mahsulotlar, tanlangan fermerlar va eksklyuziv takliflar haqida yangilanishlarni elektron pochtangizga oling.",
      placeholder: "Elektron pochtangizni kiriting",
      buttonText: "Obuna bo'lish",
      submitting: "Obuna bo'linmoqda...",
      successMessage: "Obuna bo'lganingiz uchun rahmat!",
      errorMessage: "Iltimos, to'g'ri elektron pochta manzilini kiriting.",
      imageAlt: "Mahalliy fermerlardan yangi mahsulotlar",
      imageOverlayHeadline: "15 000 dan ortiq oziq-ovqat ishqibozlariga qo'shiling",
      imageOverlayDescription: "Haqiqatan ham yangi, mahalliy oziq-ovqatning zavqini kashf eting",
      badgeTitle: "Haftalik yangilanishlar",
      badgeDescription: "Mavsumiy tanlovlar va maslahatlar",
      formTitle: "Fruto yangilanishlari bilan yangi bo'ling",
      formDescription:
        "Axborot byulletenimizga obuna bo'ling va mavsumiy hosillar, maxsus takliflar va fermadan yangi mahsulotlaringizdan maksimal darajada foydalanish bo'yicha maslahatlar haqida birinchi bo'lib bilib oling.",
      nameLabel: "Ismingiz",
      namePlaceholder: "Jeyn Smit",
      emailLabel: "Elektron pochtangiz",
      emailPlaceholder: "jane@example.com",
      validationError: "Iltimos, to'g'ri elektron pochta manzilini kiriting",
      submissionError: "Nimadir noto'g'ri ketdi. Iltimos, qayta urinib ko'ring.",
      addNameOption: "Ismimni qo'shishni xohlayman (ixtiyoriy)",
      subscribeButton: "Hozir obuna bo'ling",
      privacyPolicyTextPart1: "Obuna bo'lish orqali siz bizning ",
      privacyPolicyLink: "Maxfiylik siyosatimizga",
      privacyPolicyTextPart2:
        " rozilik bildirasiz. Biz sizning ma'lumotlaringizni hech qachon baham ko'rmaymiz va siz istalgan vaqtda obunani bekor qilishingiz mumkin.",
      thankYouTitle: "Obuna bo'lganingiz uchun rahmat!",
      thankYouDescription:
        "Siz endi bizning oziq-ovqat ishqibozlari hamjamiyatimizning bir qismisiz. Tez orada yangi yangilanishlar va eksklyuziv takliflar uchun pochta qutingizni tekshiring.",
      subscribeAnotherEmailButton: "Boshqa elektron pochta orqali obuna bo'lish",
      benefits: [
        {
          title: "Haftalik hosil yangilanishlari",
          description:
            "Har hafta nima yangi va mavsumda ekanligini, shunda siz ovqatlaringizni eng yaxshi mavjud mahsulotlar atrofida rejalashtirishingiz mumkin.",
        },
        {
          title: "Eksklyuziv takliflar",
          description:
            "Maxsus chegirmalar, cheklangan hosillarga erta kirish va faqat obunachilarimiz uchun mavjud bo'lgan eksklyuziv aksiyalarni oling.",
        },
        {
          title: "Mavsumiy retseptlar",
          description:
            "Mavsumiy mahsulotlarning noyob ta'mlarini namoyish qilish uchun mo'ljallangan mazali, oshpaz tomonidan yaratilgan retseptlar bilan ilhom oling.",
        },
      ],
    },
    footer: {
      companyDescriptionTitle: "Yangi oziq-ovqat, to'g'ridan-to'g'ri fermerlardan",
      companyDescription:
        "Fruto sizni eng yangi mavsumiy mahsulotlar uchun mahalliy fermerlar bilan bog'laydi. Barqaror qishloq xo'jaligini qo'llab-quvvatlang, shu bilan birga yaxshiroq sifatli oziq-ovqatdan bahramand bo'ling.",
      address: "123 Fermer yo'li, Portlend, OR 97201",
      email: "hello@fruto.com",
      phone: "(503) 555-1234",
      companyTitle: "Kompaniya",
      companyLinks: [
        { label: "Biz haqimizda", href: "/about" },
        { label: "Bizning missiyamiz", href: "/mission" },
        { label: "Karyera", href: "/careers" },
        { label: "Matbuot", href: "/press" },
        { label: "Aloqa", href: "/contact" },
      ],
      customerTitle: "Mijozlar uchun",
      customerLinks: [
        { label: "Qanday ishlaydi", href: "/how-it-works" },
        { label: "Fermerlarni ko'rib chiqish", href: "/farmers" },
        { label: "Mavsumiy qo'llanma", href: "/seasonal-guide" },
        { label: "Retseptlar", href: "/recipes" },
        { label: "Sovg'a kartalari", href: "/gift-cards" },
      ],
      farmerTitle: "Fermerlar uchun",
      farmerLinks: [
        { label: "انضم كمزارع", href: "/become-a-farmer" },
        { label: "موارد المزارcien", href: "/farmer-resources" },
        { label: "Muvaffaqiyat hikoyalari", href: "/farmer-stories" },
        { label: "Narxlar", href: "/farmer-pricing" },
        { label: "FAQ", href: "/farmer-faq" },
      ],
      legalTitle: "Huquqiy",
      legalLinks: [
        { label: "Xizmat ko'rsatish shartlari", href: "/terms" },
        { label: "Maxfiylik siyosati", href: "/privacy" },
        { label: "Cookie siyosati", href: "/cookies" },
        { label: "Foydalanish imkoniyati", href: "/accessibility" },
        { label: "Sayt xaritasi", href: "/sitemap" },
      ],
      whyChooseFruto: "Nima uchun Frutoni tanlaysiz",
      trustBadges: [
        { title: "Xavfsiz to'lovlar", description: "Barcha tranzaksiyalar shifrlangan va xavfsiz" },
        { title: "Tasdiqlangan fermerlar", description: "Har bir fermer sifat uchun shaxsan tekshiriladi" },
        { title: "Mukofotga sazovor", description: "Oziq-ovqat tizimlaridagi innovatsiyalar uchun tan olingan" },
      ],
      testimonialQuote:
        "\"Fruto oilamning ovqatlanish usulini butunlay o'zgartirdi. Biz ilgari bilmagan ajoyib mahsulotlarni kashf etmoqdamiz va supermarket variantlariga nisbatan ta'm farqi ajoyib.\"",
      testimonialAuthor: "Emili Chen",
      location: "Portlend, OR",
      readMoreTestimonials: "Ko'proq fikrlarni o'qing",
      getAppTitle: "Fruto ilovasini oling",
      getAppDescription:
        "Yo'lda yangi mahsulotlarni xarid qiling va yetkazib berishlaringizni real vaqtda kuzatib boring.",
      copyright: "Fruto. Barcha huquqlar himoyalangan.",
      madeWith: "Bilan yaratilgan",
      inLocation: "Portlend, OR da",
    },
  },
}
