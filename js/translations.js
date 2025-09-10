// =============================================================================
// TRANSLATIONS MODULE
// =============================================================================
// This module handles all internationalization (i18n) functionality for the 
// Tarek Zhran Portfolio website, supporting both English and Arabic languages.

/**
 * Translation dictionary containing all text content for both supported languages
 * @namespace translations
 */
const translations = {
  // English translations
  en: {
    // Navigation
    'home': 'Home',
    'about': 'About',
    'experience': 'Experience',
    'education': 'Education',
    'skills': 'Skills',
    'products': 'Products',
    'contact': 'Contact',
    
    // Hero Section
    'availableForOpportunities': 'Available for Opportunities',
    'heroHeadline': 'Business Development & Digital Transformation Leader',
    'heroSubheadline': 'Driving operational excellence and digital innovation in healthcare and business.',
    'yearsExperience': 'Years Experience',
    'leadershipRoles': 'Leadership Roles',
    'certifications': 'Certifications',
    'aboutTarek': 'About Tarek',
    'getInTouch': 'Get in Touch',
    'scrollToExplore': 'Scroll to explore',
    
    // About Section
    'aboutMe': 'About Me',
    'getToKnowMe': 'Get to Know Me',
    'aboutSubtitle': 'Discover my background, expertise, and passion for business development.',
    'aboutBio1': 'I\'m a seasoned Business Development and Digital Transformation Leader with over 12 years of experience driving operational excellence in healthcare and financial management. My expertise lies in strategic planning, process optimization, and implementing cutting-edge digital solutions that transform organizations.',
    'aboutBio2': 'Throughout my career, I\'ve successfully led cross-functional teams, managed complex projects, and delivered measurable results that align with organizational goals. I\'m passionate about innovation, continuous improvement, and creating sustainable competitive advantages through digital transformation.',
    'aboutBio3': 'Currently, I\'m focused on leveraging data-driven insights and emerging technologies to solve complex business challenges and create value for stakeholders. My approach combines strategic thinking with hands-on execution to deliver impactful solutions.',
    
    // Experience Section
    'careerJourney': 'Career Journey',
    'professionalExperience': 'Professional Experience',
    'experienceSubtitle': 'Explore my professional background and key achievements.',
    'businessDevelopmentManager': 'Business Development Manager',
    'healthTechSolutions': 'HealthTech Solutions',
    'businessDevelopmentManagerDesc': 'Leading business development initiatives in the healthcare technology sector, focusing on digital transformation and operational excellence.',
    'digitalTransformationLead': 'Digital Transformation Lead',
    'mediCareGroup': 'MediCare Group',
    'digitalTransformationLeadDesc': 'Spearheaded digital transformation initiatives across multiple healthcare facilities, improving efficiency and patient outcomes.',
    'operationsManager': 'Operations Manager',
    'financeFirstCorp': 'FinanceFirst Corporation',
    'operationsManagerDesc': 'Managed financial operations and process optimization, resulting in 25% cost reduction and improved service delivery.',
    'businessAnalyst': 'Business Analyst',
    'globalSolutionsLtd': 'Global Solutions Ltd',
    'businessAnalystDesc': 'Analyzed business processes and recommended improvements that increased operational efficiency by 30%.',
    
    // Education Section
    'academicBackground': 'Academic Background',
    'educationCertifications': 'Education & Certifications',
    'educationSubtitle': 'My educational qualifications and professional certifications.',
    'mbaBusinessAdmin': 'MBA - Business Administration',
    'cairoUniversity': 'Cairo University',
    'mbaBusinessAdminDesc': 'Specialized in strategic management and digital business transformation.',
    'bscFinancialManagement': 'B.Sc. - Financial Management',
    'ainShamsUniversity': 'Ain Shams University',
    'bscFinancialManagementDesc': 'Graduated with honors, focusing on financial analysis and risk management.',
    'digitalTransformationCert': 'Digital Transformation Certificate',
    'mitProfessionalEducation': 'MIT Professional Education',
    'digitalTransformationCertDesc': 'Advanced certification in digital business strategies and transformation frameworks.',
    'pmpCertification': 'Project Management Professional (PMP)',
    'pmi': 'PMI',
    'pmpCertificationDesc': 'Certified project management professional with expertise in agile methodologies.',
    
    // Skills Section
    'expertise': 'Expertise',
    'professionalSkills': 'Professional Skills',
    'skillsSubtitle': 'My core competencies and areas of expertise.',
    'businessDevelopment': 'Business Development',
    'strategicPlanning': 'Strategic Planning',
    'marketAnalysis': 'Market Analysis',
    'partnershipDevelopment': 'Partnership Development',
    'digitalTransformation': 'Digital Transformation',
    'processAutomation': 'Process Automation',
    'dataAnalytics': 'Data Analytics',
    'cloudSolutions': 'Cloud Solutions',
    'healthcareManagement': 'Healthcare Management',
    'healthcareOperations': 'Healthcare Operations',
    'regulatoryCompliance': 'Regulatory Compliance',
    'patientExperience': 'Patient Experience',
    'financialManagement': 'Financial Management',
    'financialAnalysis': 'Financial Analysis',
    'budgetManagement': 'Budget Management',
    'riskAssessment': 'Risk Assessment',
    
    // Products Section
    'myProducts': 'My Products',
    'featuredProducts': 'Featured Products',
    'productsSubtitle': 'Explore my professional products and services.',
    'businessStrategyConsulting': 'Business Strategy Consulting',
    'businessStrategyConsultingDesc': 'Comprehensive business strategy development and implementation services.',
    'digitalTransformationPackage': 'Digital Transformation Package',
    'digitalTransformationPackageDesc': 'End-to-end digital transformation solutions for businesses.',
    'healthcareManagementSystem': 'Healthcare Management System',
    'healthcareManagementSystemDesc': 'Specialized healthcare management solutions for medical facilities.',
    'financialOptimizationService': 'Financial Optimization Service',
    'financialOptimizationServiceDesc': 'Financial analysis and optimization services for businesses.',
    'marketResearchAnalysis': 'Market Research & Analysis',
    'marketResearchAnalysisDesc': 'Comprehensive market research and competitive analysis services.',
    'teamBuildingLeadership': 'Team Building & Leadership Training',
    'teamBuildingLeadershipDesc': 'Professional team building and leadership development programs.',
    'more': 'More',
    'contactViaWhatsApp': 'Contact via WhatsApp',
    'specifications': 'Specifications',
    'keyFeatures': 'Key Features',
    'description': 'Description',
    'price': 'Price',
    'productDetails': 'Product Details',
    
    // Contact Section
    'getInTouch': 'Get In Touch',
    'contactMe': 'Contact Me',
    'contactSubtitle': 'Have a project in mind or want to discuss opportunities? Reach out!',
    'email': 'Email',
    'phone': 'Phone',
    'whatsapp': 'WhatsApp',
    'location': 'Location',
    'connect': 'Connect',
    'name': 'Name',
    'subject': 'Subject',
    'message': 'Message',
    'sendMessage': 'Send Message',
    'cairoEgypt': 'Cairo, Egypt',
    
    // Footer
    'quickLinks': 'Quick Links',
    'resources': 'Resources',
    'privacyPolicy': 'Privacy Policy',
    'termsOfService': 'Terms of Service',
    'downloadCV': 'Download CV',
    'copyright': '© 2024 Tarek Zhran. All rights reserved.',
    
    // Form Validation
    'fieldRequired': 'This field is required',
    'invalidEmail': 'Please enter a valid email address',
    
    // Notifications
    'success': 'Success',
    'error': 'Error',
    'messageSent': 'Your message has been sent successfully!',
    'messageFailed': 'Failed to send your message. Please try again.',
    'unexpectedError': 'An unexpected error occurred. Please try again.'
  },
  
  // Arabic translations
  ar: {
    // Navigation
    'home': 'الرئيسية',
    'about': 'عن طارق',
    'experience': 'الخبرة',
    'education': 'التعليم',
    'skills': 'المهارات',
    'products': 'المنتجات',
    'contact': 'تواصل معي',
    
    // Hero Section
    'availableForOpportunities': 'متاح للفرص',
    'heroHeadline': 'قائد تطوير الأعمال والتحول الرقمي',
    'heroSubheadline': 'قيادة التميز التشغيلي والابتكار الرقمي في الرعاية الصحية والأعمال.',
    'yearsExperience': 'سنوات خبرة',
    'leadershipRoles': 'مناصب قيادية',
    'certifications': 'شهادات',
    'aboutTarek': 'عن طارق',
    'getInTouch': 'تواصل معي',
    'scrollToExplore': 'اسحب للاستكشاف',
    
    // About Section
    'aboutMe': 'عني',
    'getToKnowMe': 'تعرف علي',
    'aboutSubtitle': 'اكتشف خلفيتي، خبرتي، وشغفي بتطوير الأعمال.',
    'aboutBio1': 'أنا قائد متمرس في تطوير الأعمال والتحول الرقمي مع أكثر من 12 عامًا من الخبرة في قيادة التميز التشغيلي في مجالات الرعاية الصحية والإدارة المالية. تكمن خبرتي في التخطيط الاستراتيجي، وتحسين العمليات، وتنفيذ حلول رقمية متطورة تحول المؤسسات.',
    'aboutBio2': 'طوال مسيرتي المهنية، قمت بقيادة فرق متعددة التخصصات بنجاح، وإدارة مشاريع معقدة، وتحقيق نتائج قابلة للقياس تتماشى مع أهداف المؤسسة. أنا متحمس للابتكار، والتحسين المستمر، وإنشاء مزايا تنافسية مستدامة من خلال التحول الرقمي.',
    'aboutBio3': 'حاليًا، أنا مركّز على الاستفادة من الرؤى المستندة إلى البيانات والتقنيات الناشئة لحل التحديات التجارية المعقدة وإنشاء قيمة لأصحاب المصلحة. يجمع نهجي بين التفكير الاستراتيجي والتنفيذ العملي لتقديم حلول مؤثرة.',
    
    // Experience Section
    'careerJourney': 'المسيرة المهنية',
    'professionalExperience': 'الخبرة المهنية',
    'experienceSubtitle': 'استكشف خلفيتي المهنية وإنجازاتي الرئيسية.',
    'businessDevelopmentManager': 'مدير تطوير الأعمال',
    'healthTechSolutions': 'حلول التقنية الصحية',
    'businessDevelopmentManagerDesc': 'قيادة مبادرات تطوير الأعمال في قطاع تقنية الرعاية الصحية، مع التركيز على التحول الرقمي والتميز التشغيلي.',
    'digitalTransformationLead': 'قائد التحول الرقمي',
    'mediCareGroup': 'مجموعة ميديكير',
    'digitalTransformationLeadDesc': 'قيادي مبادرات التحول الرقمي عبر عدة مرافق صحية، مما حسّن الكفاءة ونتائج المرضى.',
    'operationsManager': 'مدير العمليات',
    'financeFirstCorp': 'شركة فايننس فيرست',
    'operationsManagerDesc': 'إدارة العمليات المالية وتحسين العمليات، مما أدى إلى تقليل التكاليف بنسبة 25% وتحسين تقديم الخدمات.',
    'businessAnalyst': 'محلل أعمال',
    'globalSolutionsLtd': 'حلول عالمية المحدودة',
    'businessAnalystDesc': 'تحليل العمليات التجارية وإجراء توصيات للتحسينات التي زادت الكفاءة التشغيلية بنسبة 30%.',
    
    // Education Section
    'academicBackground': 'الخلفية الأكاديمية',
    'educationCertifications': 'التعليم والشهادات',
    'educationSubtitle': 'مؤهلاتي التعليمية والشهادات المهنية.',
    'mbaBusinessAdmin': 'مصنف ماجستير في إدارة الأعمال',
    'cairoUniversity': 'جامعة القاهرة',
    'mbaBusinessAdminDesc': 'متخصص في الإدارة الاستراتيجية والتحول الرقمي للأعمال.',
    'bscFinancialManagement': 'بكالوريوس في إدارة الماليات',
    'ainShamsUniversity': 'جامعة عين شمس',
    'bscFinancialManagementDesc': 'تخرجت بمرتبة الشرف، مع التركيز على التحليل المالي وإدارة المخاطر.',
    'digitalTransformationCert': 'شهادة التحول الرقمي',
    'mitProfessionalEducation': 'تعليم MIT المهني',
    'digitalTransformationCertDesc': 'شهادة متقدمة في استراتيجيات الأعمال الرقمية وإطارات التحول.',
    'pmpCertification': 'محترف إدارة المشاريع (PMP)',
    'pmi': 'معهد إدارة المشاريع',
    'pmpCertificationDesc': 'محترف معتمد في إدارة المشاريع مع خبرة في منهجيات أجايل.',
    
    // Skills Section
    'expertise': 'الخبرة',
    'professionalSkills': 'المهارات المهنية',
    'skillsSubtitle': 'كفاءاتي الأساسية ومجالات خبرتي.',
    'businessDevelopment': 'تطوير الأعمال',
    'strategicPlanning': 'التخطيط الاستراتيجي',
    'marketAnalysis': 'تحليل السوق',
    'partnershipDevelopment': 'تطوير الشراكات',
    'digitalTransformation': 'التحول الرقمي',
    'processAutomation': 'أتمتة العمليات',
    'dataAnalytics': 'تحليل البيانات',
    'cloudSolutions': 'حلول السحابة',
    'healthcareManagement': 'إدارة الرعاية الصحية',
    'healthcareOperations': 'عمليات الرعاية الصحية',
    'regulatoryCompliance': 'الامتثال التنظيمي',
    'patientExperience': 'تجربة المريض',
    'financialManagement': 'الإدارة المالية',
    'financialAnalysis': 'التحليل المالي',
    'budgetManagement': 'إدارة الميزانية',
    'riskAssessment': 'تقييم المخاطر',
    
    // Products Section
    'myProducts': 'منتجاتي',
    'featuredProducts': 'المنتجات المميزة',
    'productsSubtitle': 'استكشف منتجاتي وخدماتي المهنية.',
    'businessStrategyConsulting': 'استشارات استراتيجية الأعمال',
    'businessStrategyConsultingDesc': 'خدمات شاملة لتطوير وتنفيذ استراتيجيات الأعمال.',
    'digitalTransformationPackage': 'حزمة التحول الرقمي',
    'digitalTransformationPackageDesc': 'حلول التحول الرقمي الشاملة للأعمال.',
    'healthcareManagementSystem': 'نظام إدارة الرعاية الصحية',
    'healthcareManagementSystemDesc': 'حلول إدارة الرعاية الصحية المتخصصة للمرافق الطبية.',
    'financialOptimizationService': 'خدمة تحسين المالية',
    'financialOptimizationServiceDesc': 'خدمات التحليل والتحسين المالي للأعمال.',
    'marketResearchAnalysis': 'بحث وتحليل السوق',
    'marketResearchAnalysisDesc': 'خدمات بحث السوق وتحليل المنافسة الشاملة.',
    'teamBuildingLeadership': 'بناء الفريق وتدريب القيادة',
    'teamBuildingLeadershipDesc': 'برامج بناء الفريق وتطوير القيادة المهنية.',
    'more': 'المزيد',
    'contactViaWhatsApp': 'تواصل عبر الواتساب',
    'specifications': 'المواصفات',
    'keyFeatures': 'المميزات الرئيسية',
    'description': 'الوصف',
    'price': 'السعر',
    'productDetails': 'تفاصيل المنتج',
    
    // Contact Section
    'getInTouch': 'تواصل معي',
    'contactMe': 'تواصل معي',
    'contactSubtitle': 'هل لديك مشروع في الاعتبار أو ترغب في مناقشة الفرص؟ تواصل معي!',
    'email': 'البريد الإلكتروني',
    'phone': 'الهاتف',
    'whatsapp': 'واتساب',
    'location': 'الموقع',
    'connect': 'تواصل',
    'name': 'الاسم',
    'subject': 'الموضوع',
    'message': 'الرسالة',
    'sendMessage': 'إرسال الرسالة',
    'cairoEgypt': 'القاهرة، مصر',
    
    // Footer
    'quickLinks': 'روابط سريعة',
    'resources': 'الموارد',
    'privacyPolicy': 'سياسة الخصوصية',
    'termsOfService': 'شروط الخدمة',
    'downloadCV': 'تحميل السيرة الذاتية',
    'copyright': '© 2024 طارق زهران. جميع الحقوق محفوظة.',
    
    // Form Validation
    'fieldRequired': 'هذا الحقل مطلوب',
    'invalidEmail': 'يرجى إدخال عنوان بريد إلكتروني صالح',
    
    // Notifications
    'success': 'نجاح',
    'error': 'خطأ',
    'messageSent': 'تم إرسال رسالتك بنجاح!',
    'messageFailed': 'فشل في إرسال رسالتك. يرجى المحاولة مرة أخرى.',
    'unexpectedError': 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
  }
};

/**
 * Retrieves a translated string for a given key and language
 * @param {string} key - The translation key to look up
 * @param {string} [lang='en'] - The language code ('en' or 'ar')
 * @returns {string} The translated string or the key if not found
 * @example
 * getTranslation('home', 'en'); // Returns 'Home'
 * getTranslation('home', 'ar'); // Returns 'الرئيسية'
 */
function getTranslation(key, lang = 'en') {
  return translations[lang][key] || key;
}

/**
 * Translates all elements with data-i18n attributes on the page
 * @param {string} [lang='en'] - The language code ('en' or 'ar')
 * @example
 * translatePage('ar'); // Translates all elements to Arabic
 */
function translatePage(lang = 'en') {
  // Translate text content elements
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = getTranslation(key, lang);
  });
  
  // Translate placeholder texts for form inputs
  const inputs = document.querySelectorAll('[data-i18n-placeholder]');
  inputs.forEach(input => {
    const key = input.getAttribute('data-i18n-placeholder');
    input.placeholder = getTranslation(key, lang);
  });
}

// Export for use in other modules (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translations, getTranslation, translatePage };
}