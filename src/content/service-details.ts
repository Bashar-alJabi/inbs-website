import type { Locale } from '@/lib/site';

/**
 * Approved service categories live in services.ts.
 * This file owns only editorial detail-page copy, never slugs or catalog labels.
 */
export const businessmenDetailContent = {
  en: {
    eyebrow: 'INBS / BUSINESS SERVICES',
    heroLead: 'Business moves through many offices, documents and decisions. We help you identify the services and coordination needed to keep each step moving.',
    discover: 'Explore the support available',
    photoCaption: 'CONNECTED SERVICES / DUBAI',
    overviewEyebrow: 'THE BIG PICTURE',
    overviewTitle: 'Business support, connected around you.',
    overviewLead: 'From government and embassy transactions to company administration, our range of services brings related requirements into one conversation.',
    overviewBody: 'Whether you are working through a specific document or managing several ongoing business needs, start by telling us what you need. We can discuss the relevant services and next steps.',
    offeringsEyebrow: 'AREAS OF SERVICE',
    offeringsTitle: 'One point of contact. Many moving parts.',
    offeringsLead: 'Explore the areas covered by our businessmen services. Availability and requirements depend on the type of transaction and the relevant authority.',
    offerings: [
      {
        number: '01', title: 'Government & authority services',
        description: 'Support with company-related transactions and follow-up across public and semi-government entities.',
        items: ['Economic department procedures', 'Dubai Municipality and Dubai Chamber services', 'Dubai Land Department services', 'Free zone transaction follow-up', 'Tasheel and Ejari services'],
      },
      {
        number: '02', title: 'Company administration',
        description: 'Administrative coordination for businesses, owners and their everyday operational requirements.',
        items: ['Company transfers and corporate contracts', 'Corporate bank account opening coordination', 'Corporate correspondence', 'Company and citizen business follow-up'],
      },
      {
        number: '03', title: 'Documentation & legal coordination',
        description: 'Handling documentation-related enquiries and navigating the relevant service channels.',
        items: ['Embassy transaction services', 'Legal translation services', 'Dubai Courts transaction follow-up for citizens', 'Arranging company partnership contracts'],
      },
      {
        number: '04', title: 'People & insurance services',
        description: 'Assistance with employment-related processes and selected insurance enquiries.',
        items: ['Workforce recruitment services for companies', 'Immigration-related services', 'Domestic worker recruitment arrangements for citizens', 'Comprehensive insurance services for citizens'],
      },
      {
        number: '05', title: 'Business connections & events',
        description: 'Additional coordination for business activities beyond routine paperwork.',
        items: ['Conferences and seminars', 'Financial brokerage enquiries', 'Online business enquiries across service areas'],
      },
    ],
    processEyebrow: 'HOW TO START',
    processTitle: 'Start with the requirement, not the paperwork.',
    processLead: 'Every request is different. These are the practical steps to begin a conversation with our team.',
    steps: [
      { title: 'Share your request', description: 'Tell us which service you need, and what stage your business or transaction has reached.' },
      { title: 'Clarify the route', description: 'We discuss the applicable service area, documents and next steps for your enquiry.' },
      { title: 'Coordinate the next step', description: 'Where the service is available, we can discuss the relevant processing or follow-up arrangements.' },
    ],
    closingEyebrow: 'LET’S CONNECT',
    closingTitle: 'Every business step begins with a conversation.',
    closingText: 'Tell us what you need help with and we can discuss the relevant service pathway.',
    closingPrimary: 'Start this service',
    closingSecondary: 'Explore all services',
    back: 'All services',
  },
  ar: {
    eyebrow: 'INBS / خدمات رجال الأعمال',
    heroLead: 'تتطلب إدارة الأعمال التعامل مع جهات ووثائق وإجراءات متعددة. نساعدك في تحديد الخدمات والتنسيق اللازم للمضي في خطواتك.',
    discover: 'استكشف مجالات خدماتنا',
    photoCaption: 'خدمات مترابطة / دبي',
    overviewEyebrow: 'نظرة شاملة',
    overviewTitle: 'خدمات أعمال مترابطة حول احتياجاتك.',
    overviewLead: 'من المعاملات الحكومية والسفارات إلى الإدارة اليومية للشركات، نجمع مجالات خدمة متكاملة ضمن نقطة تواصل واحدة.',
    overviewBody: 'سواء كنت بحاجة إلى إجراء محدد أو متابعة متطلبات عمل متعددة، ابدأ بإخبارنا بما تبحث عنه لنناقش الخدمات ذات الصلة والخطوات التالية.',
    offeringsEyebrow: 'مجالات الخدمة',
    offeringsTitle: 'نقطة تواصل واحدة. وخدمات متعددة.',
    offeringsLead: 'تعرّف إلى المجالات التي تشملها خدمات رجال الأعمال. تختلف المتطلبات وإمكانية تقديم الخدمة بحسب المعاملة والجهة المختصة.',
    offerings: [
      {
        number: '01', title: 'المعاملات الحكومية والجهات الرسمية',
        description: 'خدمات متابعة معاملات الشركات لدى الجهات الحكومية وشبه الحكومية.',
        items: ['إجراءات الدائرة الاقتصادية', 'خدمات بلدية دبي وغرفة تجارة دبي', 'خدمات دائرة الأراضي والأملاك', 'متابعة معاملات المناطق الحرة', 'خدمات تسهيل وإيجاري'],
      },
      {
        number: '02', title: 'إدارة شؤون الشركات',
        description: 'تنسيق المتطلبات الإدارية والتشغيلية للشركات وأصحاب الأعمال.',
        items: ['تحويل الشركات وتنظيم عقود الشركات', 'تنسيق إجراءات فتح الحسابات البنكية للشركات', 'المراسلات الخاصة بالشركات', 'متابعة أعمال الشركات والمواطنين'],
      },
      {
        number: '03', title: 'الوثائق والتنسيق القانوني',
        description: 'خدمات مرتبطة بالمستندات والمعاملات ومتابعتها عبر القنوات المختصة.',
        items: ['إنجاز معاملات السفارات', 'خدمات الترجمة القانونية', 'متابعة معاملات المواطنين في محاكم دبي', 'تنظيم عقود الشراكة للشركات'],
      },
      {
        number: '04', title: 'الموارد البشرية والتأمين',
        description: 'خدمات تتعلق بالاستقدام والهجرة وبعض متطلبات التأمين.',
        items: ['استقدام اليد العاملة للشركات', 'الخدمات المتعلقة بالهجرة', 'ترتيبات استقدام العاملات المنزليات للمواطنين', 'خدمات التأمين الشامل للمواطنين'],
      },
      {
        number: '05', title: 'التواصل والأنشطة التجارية',
        description: 'تنسيق خدمات إضافية تتجاوز المعاملات اليومية.',
        items: ['تنظيم المؤتمرات والندوات', 'الاستفسارات المتعلقة بالوساطة المالية', 'الرد على استفسارات رجال الأعمال إلكترونيًا'],
      },
    ],
    processEyebrow: 'كيف تبدأ؟',
    processTitle: 'ابدأ باحتياجك، وليس بالأوراق.',
    processLead: 'لكل معاملة متطلباتها. هذه خطوات عملية لبدء التواصل مع فريقنا.',
    steps: [
      { title: 'شاركنا طلبك', description: 'أخبرنا بالخدمة التي تحتاجها والمرحلة التي وصل إليها عملك أو معاملتك.' },
      { title: 'تحديد المسار المناسب', description: 'نناقش مجال الخدمة والوثائق والخطوات التي قد تنطبق على استفسارك.' },
      { title: 'تنسيق الخطوة التالية', description: 'بحسب توفر الخدمة، يمكننا مناقشة ترتيبات الإنجاز أو المتابعة المناسبة.' },
    ],
    closingEyebrow: 'لنبقَ على تواصل',
    closingTitle: 'كل خطوة في الأعمال تبدأ بمحادثة.',
    closingText: 'شاركنا احتياجك لنناقش معك مسار الخدمة المناسب.',
    closingPrimary: 'ابدأ الخدمة',
    closingSecondary: 'استكشف جميع الخدمات',
    back: 'جميع الخدمات',
  },
} as const satisfies Record<Locale, {
  eyebrow: string; heroLead: string; discover: string; photoCaption: string;
  overviewEyebrow: string; overviewTitle: string; overviewLead: string; overviewBody: string;
  offeringsEyebrow: string; offeringsTitle: string; offeringsLead: string;
  offerings: readonly {number:string;title:string;description:string;items:readonly string[]}[];
  processEyebrow:string;processTitle:string;processLead:string;
  steps:readonly {title:string;description:string}[];
  closingEyebrow:string;closingTitle:string;closingText:string;closingPrimary:string;closingSecondary:string;back:string;
}>;
