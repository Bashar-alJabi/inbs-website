import type { Locale } from '@/lib/site';
import type { ServiceSlug } from '@/content/services';
import { businessmenDetailContent } from './service-details';

export type ServiceArea = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly string[];
};
export type ServiceDetailText = {
  readonly eyebrow: string; readonly heroLead: string; readonly discover: string; readonly photoCaption: string;
  readonly overviewEyebrow: string; readonly overviewTitle: string; readonly overviewLead: string; readonly overviewBody: string;
  readonly offeringsEyebrow: string; readonly offeringsTitle: string; readonly offeringsLead: string;
  readonly offerings: readonly ServiceArea[];
  readonly processEyebrow: string; readonly processTitle: string; readonly processLead: string;
  readonly steps: readonly { readonly title: string; readonly description: string }[];
  readonly closingEyebrow: string; readonly closingTitle: string; readonly closingText: string;
  readonly closingPrimary: string; readonly closingSecondary: string; readonly back: string;
};

// Content is editorial organization of the owner's service list, not a promise
// of an approval, regulated outcome, price, fixed timeline, or license.
const otherServices = {
  'real-estate-services': {
    en: {
      eyebrow:'INBS / REAL ESTATE',heroLead:'A property decision is personal. Explore buying, selling and advisory support shaped around your priorities, requirements and budget.',
      photoCaption:'PROPERTY / DUBAI',overviewTitle:'Find a direction that fits your next move.',
      overviewLead:'A clearer starting point for a property search, a sale or an important real estate decision.',
      overviewBody:'We bring together property brokerage and tailored consultation to help you explore options, understand what matters to you and discuss the steps involved in a transaction.',
      offeringsTitle:'Property support, from search to transaction.',
      offeringsLead:'Different goals call for different conversations. Choose the area that fits the decision in front of you.',
      offerings:[
        {number:'01',title:'Property brokerage',description:'Explore brokerage services for people seeking to buy or sell property.',items:['Property sales and purchase enquiries','Discussing available options','Coordinating brokerage-related enquiries']},
        {number:'02',title:'Tailored property advice',description:'Make your requirements and priorities the starting point of the conversation.',items:['Property consultations','Requirements and budget discussion','Comparing options against your needs']},
        {number:'03',title:'Transaction coordination',description:'Get help navigating the practical stages of a purchase or sale.',items:['Sale and purchase process guidance','Transaction coordination enquiries','Support with next-step planning']},
      ],
      processTitle:'Your property goals come first.',
      processLead:'Begin with your needs. We can help identify the property service most relevant to your enquiry.',
      steps:[{title:'Describe your goal',description:'Tell us whether you are buying, selling or exploring possibilities.'},{title:'Review your requirements',description:'Share the location, budget and priorities that shape your decision.'},{title:'Discuss next steps',description:'Explore the appropriate brokerage, advice or transaction service.'}],
      closingTitle:'A clearer property journey begins here.',closingText:'Share your real estate requirements to start a conversation about your next move.',
    },
    ar: {
      eyebrow:'INBS / الخدمات العقارية',heroLead:'القرار العقاري خطوة مهمة. استكشف خدمات الوساطة والاستشارات والبيع والشراء بما يناسب أولوياتك واحتياجاتك وميزانيتك.',
      photoCaption:'العقارات / دبي',overviewTitle:'خطوتك العقارية تبدأ من احتياجاتك.',
      overviewLead:'نقطة بداية أوضح للبحث عن عقار أو بيعه أو اتخاذ قرار عقاري مهم.',
      overviewBody:'نجمع خدمات الوساطة والاستشارة العقارية لمساعدتك في استكشاف الخيارات ومناقشة ما يناسبك والخطوات المرتبطة بالمعاملة.',
      offeringsTitle:'خدمات عقارية من البحث إلى إتمام الإجراءات.',
      offeringsLead:'لكل هدف عقاري متطلباته. اختر المجال الأقرب لاحتياجك.',
      offerings:[
        {number:'01',title:'الوساطة العقارية',description:'خدمات وساطة للأشخاص الراغبين في شراء العقارات أو بيعها.',items:['استفسارات البيع والشراء','مناقشة الخيارات العقارية المتاحة','التنسيق في خدمات الوساطة']},
        {number:'02',title:'الاستشارات العقارية',description:'تحديد متطلباتك وأولوياتك قبل البحث عن الخيار المناسب.',items:['استشارات متخصصة','مناقشة الميزانية والاحتياجات','مقارنة الخيارات بحسب متطلباتك']},
        {number:'03',title:'متابعة المعاملات',description:'المساعدة في فهم المراحل العملية لعمليات البيع والشراء.',items:['مناقشة إجراءات البيع والشراء','استفسارات تنسيق المعاملات','تحديد الخطوات التالية']},
      ],
      processTitle:'هدفك العقاري هو نقطة البداية.',
      processLead:'شاركنا احتياجك لنناقش نوع الخدمة العقارية المناسبة.',
      steps:[{title:'حدد هدفك',description:'أخبرنا إن كنت ترغب بالشراء أو البيع أو استكشاف الفرص.'},{title:'شاركنا متطلباتك',description:'وضح الموقع والميزانية والأولويات المهمة لك.'},{title:'ناقش الخطوة التالية',description:'تعرّف إلى مجال الوساطة أو الاستشارة أو متابعة المعاملة المناسب.'}],
      closingTitle:'ابدأ رحلتك العقارية بخطوة واضحة.',closingText:'شاركنا متطلباتك العقارية لبدء الحوار حول خياراتك.',
    },
  },
  'website-services': {
    en: {
      eyebrow:'INBS / DIGITAL SERVICES',heroLead:'Your digital presence should look considered and feel effortless. Explore websites, visual identity and user experience designed around your business.',
      photoCaption:'DESIGN / DIGITAL',overviewTitle:'A digital presence with purpose.',
      overviewLead:'Design is most effective when it supports how people experience and understand your business.',
      overviewBody:'From website design to visual identity and the way visitors move through a page, our digital service areas focus on building a coherent experience around your needs.',
      offeringsTitle:'Design that works together.',
      offeringsLead:'Three connected disciplines shape the experience people have with your brand online.',
      offerings:[
        {number:'01',title:'Website design',description:'Websites that present your business clearly and make information easy to find.',items:['Website design tailored to requirements','Clear page presentation','User-friendly layouts']},
        {number:'02',title:'Visual identity',description:'A distinct visual direction that reflects your brand.',items:['Brand visual identity development','Consistent graphic direction','Design tailored to the business']},
        {number:'03',title:'User experience',description:'Thoughtful navigation and interaction across digital experiences.',items:['User-experience improvement','Navigation and interaction review','Ease-of-use considerations']},
      ],
      processTitle:'Begin with the idea behind the website.',
      processLead:'A useful digital conversation starts with what you need your online presence to achieve.',
      steps:[{title:'Share your vision',description:'Tell us about your business, audience and digital requirements.'},{title:'Define the direction',description:'Discuss the website, identity and user-experience needs that matter most.'},{title:'Explore the design scope',description:'Review the next steps and services relevant to your project.'}],
      closingTitle:'Give your next digital idea a starting point.',closingText:'Tell us about the website or visual identity you have in mind.',
    },
    ar: {
      eyebrow:'INBS / الخدمات الرقمية',heroLead:'حضورك الرقمي يستحق تصميمًا واضحًا وتجربة سلسة. استكشف خدمات المواقع الإلكترونية والهوية البصرية وتجربة المستخدم بما يلائم أعمالك.',
      photoCaption:'التصميم / الرقمي',overviewTitle:'حضور رقمي يخدم هدفًا واضحًا.',
      overviewLead:'التصميم الجيد يساعد الجمهور على فهم نشاطك والتفاعل معه بسهولة.',
      overviewBody:'من تصميم المواقع إلى الهوية البصرية وطريقة تنقل الزوار، ترتبط مجالات خدماتنا الرقمية ببناء تجربة متناسقة حول احتياجات مشروعك.',
      offeringsTitle:'عناصر تصميم تعمل بتناغم.',
      offeringsLead:'ثلاثة مجالات مترابطة تصنع طريقة ظهور علامتك وتجربة زوارك.',
      offerings:[
        {number:'01',title:'تصميم المواقع الإلكترونية',description:'تصميم مواقع واضحة وسهلة الاستخدام تراعي طبيعة نشاطك.',items:['تصميم حسب متطلبات العمل','عرض واضح للمحتوى','واجهات سهلة الاستخدام']},
        {number:'02',title:'الهوية البصرية',description:'تطوير اتجاه بصري يعكس شخصية علامتك التجارية.',items:['تطوير الهوية البصرية','تناسق العناصر التصميمية','تصميم يراعي طبيعة النشاط']},
        {number:'03',title:'تجربة المستخدم',description:'الاهتمام بالتنقل والتفاعل داخل الموقع.',items:['تحسين تجربة المستخدم','مراجعة أسلوب التنقل والتفاعل','تعزيز سهولة الاستخدام']},
      ],
      processTitle:'ابدأ بالفكرة وراء الموقع.',
      processLead:'أخبرنا بالهدف الذي تريده من حضورك الرقمي.',
      steps:[{title:'شاركنا فكرتك',description:'عرفنا بنشاطك وجمهورك ومتطلباتك الرقمية.'},{title:'حدد الاتجاه',description:'ناقش احتياجات الموقع والهوية وتجربة المستخدم.'},{title:'استكشف نطاق العمل',description:'تعرّف إلى الخدمات والخطوات المناسبة لمشروعك.'}],
      closingTitle:'أعطِ فكرتك الرقمية نقطة انطلاق.',closingText:'شاركنا تفاصيل الموقع أو الهوية البصرية التي تفكر بها.',
    },
  },
  'typing-services': {
    en: {
      eyebrow:'INBS / DOCUMENT SERVICES',heroLead:'From everyday forms to company documents, explore typing, printing and document preparation services for a wide range of needs.',
      photoCaption:'DOCUMENTS / SERVICES',overviewTitle:'Details matter in every document.',
      overviewLead:'Paperwork can involve several formats, authorities and supporting requirements.',
      overviewBody:'Our typing and document service categories cover general and computer typing, company publications, official forms, contracts, copies and specialized document formats.',
      offeringsTitle:'The right document, for the right purpose.',
      offeringsLead:'Find the type of typing, printing or document preparation service relevant to your request.',
      offerings:[
        {number:'01',title:'Typing & official forms',description:'Typing services for everyday and authority-related documentation.',items:['Regular and computer typing','Labour and passport system forms','Emirates ID and residency applications','Vehicle renewal forms and citizens’ passport renewals']},
        {number:'02',title:'Business printing',description:'Printed material for company communications and business needs.',items:['Advertising print materials','Corporate print materials','Company stamps']},
        {number:'03',title:'Contracts & copies',description:'Documentation services for agreements and specialized reproduction.',items:['Partnership contract typing and attestation enquiries','Copying in different formats','Contractor company plans and drawings']},
      ],
      processTitle:'Tell us which document you need.',
      processLead:'Begin with the form or print requirement so the relevant service can be identified.',
      steps:[{title:'Identify the document',description:'Share the type of form, contract, print or copy required.'},{title:'Review the requirements',description:'Discuss the format, information or documents relevant to the request.'},{title:'Arrange the service',description:'Discuss the available typing, printing or preparation next steps.'}],
      closingTitle:'Make your next document request easier.',closingText:'Contact us with your typing or printing requirements.',
    },
    ar: {
      eyebrow:'INBS / خدمات الطباعة',heroLead:'من النماذج اليومية إلى مستندات الشركات، استكشف خدمات الطباعة وإعداد الوثائق ونسخها لمجموعة واسعة من الاحتياجات.',
      photoCaption:'المستندات / الخدمات',overviewTitle:'التفاصيل مهمة في كل مستند.',
      overviewLead:'تتعدد صيغ المعاملات والمستندات والجهات المرتبطة بها.',
      overviewBody:'تشمل مجالات خدمات الطباعة الطباعة العادية والكمبيوترية والمطبوعات الخاصة بالشركات والنماذج الرسمية والعقود والنسخ بمختلف أشكاله.',
      offeringsTitle:'المستند المناسب لكل غرض.',
      offeringsLead:'اختر نوع الطباعة أو إعداد الوثائق الذي يناسب طلبك.',
      offerings:[
        {number:'01',title:'الطباعة والنماذج الرسمية',description:'خدمات الطباعة للمستندات العامة والمعاملات المرتبطة بالجهات المختصة.',items:['الطباعة العادية والكمبيوترية','نماذج نظام العمل والعمال والجوازات','نماذج الهوية الإماراتية والإقامات','نماذج تجديد السيارات وجوازات المواطنين']},
        {number:'02',title:'مطبوعات الشركات',description:'مواد مطبوعة للتواصل والاحتياجات التجارية.',items:['المطبوعات الإعلانية','المطبوعات الخاصة بالشركات','الأختام الخاصة بالشركات']},
        {number:'03',title:'العقود والنسخ',description:'خدمات الوثائق والاتفاقيات والنسخ المتخصص.',items:['طباعة عقود الشراكة والاستفسارات المتعلقة بتصديقها','النسخ بمختلف أنواعه','نسخ خرائط شركات المقاولات']},
      ],
      processTitle:'ابدأ بتحديد المستند المطلوب.',
      processLead:'تحديد نوع النموذج أو المطبوع يساعد على توجيه الطلب.',
      steps:[{title:'حدد المستند',description:'أخبرنا بنوع النموذج أو العقد أو المطبوع أو النسخة المطلوبة.'},{title:'راجع المتطلبات',description:'ناقش الصيغة والمعلومات والمرفقات اللازمة.'},{title:'نسّق الخدمة',description:'تعرّف إلى الخطوة المناسبة للطباعة أو الإعداد أو النسخ.'}],
      closingTitle:'خطوتك التالية تبدأ بمستند واضح.',closingText:'تواصل معنا بشأن متطلبات الطباعة أو تجهيز الوثائق.',
    },
  },
  'tourism-services': {
    en: {
      eyebrow:'INBS / TRAVEL SERVICES',heroLead:'From travel documents to stays and experiences, explore tourism arrangements connected to your next journey.',
      photoCaption:'TRAVEL / JOURNEYS',overviewTitle:'Bring the pieces of your journey together.',
      overviewLead:'Travel planning can involve visas, transport, accommodation and the experiences in between.',
      overviewBody:'Our tourism-related service areas include travel visa enquiries, flights, hotel bookings, tourist transport and adventure arrangements, along with tourism authority-related services.',
      offeringsTitle:'Travel support beyond the ticket.',
      offeringsLead:'A selection of travel-related arrangements for individuals, citizens and business travellers.',
      offerings:[
        {number:'01',title:'Travel & visa arrangements',description:'Tourism and business travel documentation enquiries.',items:['Tourist visa services','Business travel visa arrangements','Tourist visa enquiries for citizens','Tourism authority-related services']},
        {number:'02',title:'Transport & accommodation',description:'Practical arrangements for arriving, moving and staying.',items:['Airport limousine arrangements','Tourist car rentals','Hotel and serviced apartment reservations','Travel ticket arrangements for citizens']},
        {number:'03',title:'Experiences & activities',description:'Explore leisure activities as part of your trip.',items:['Safari reservations','Adventure bookings','Tourist activity enquiries']},
      ],
      processTitle:'Start with where you want to go.',
      processLead:'The details of your journey help determine which travel service to discuss.',
      steps:[{title:'Share your plans',description:'Tell us your destination, dates and type of journey.'},{title:'Explore arrangements',description:'Discuss visas, transport, accommodation or experiences relevant to your trip.'},{title:'Confirm next steps',description:'Review availability and the relevant booking or application route.'}],
      closingTitle:'Your next journey starts with a plan.',closingText:'Tell us about the travel arrangements you are considering.',
    },
    ar: {
      eyebrow:'INBS / الخدمات السياحية',heroLead:'من وثائق السفر إلى الإقامة والتجارب السياحية، استكشف ترتيبات الخدمات المرتبطة برحلتك القادمة.',
      photoCaption:'السفر / الرحلات',overviewTitle:'اجمع تفاصيل رحلتك في مسار واحد.',
      overviewLead:'قد يشمل التخطيط للسفر التأشيرات والتنقل والإقامة والأنشطة السياحية.',
      overviewBody:'تغطي مجالات خدماتنا السياحية الاستفسارات المتعلقة بالتأشيرات وتذاكر السفر والفنادق والنقل السياحي والمغامرات والخدمات المرتبطة بالجهات السياحية.',
      offeringsTitle:'خدمات سياحية تتجاوز حجز التذكرة.',
      offeringsLead:'ترتيبات سفر متنوعة للأفراد والمواطنين ورجال الأعمال.',
      offerings:[
        {number:'01',title:'السفر والتأشيرات',description:'استفسارات وثائق السفر والسياحة ورحلات الأعمال.',items:['خدمات التأشيرات السياحية','تأشيرات سفر رجال الأعمال','التأشيرات السياحية للمواطنين','الخدمات المرتبطة بدائرة السياحة']},
        {number:'02',title:'النقل والإقامة',description:'ترتيبات الوصول والتنقل والإقامة خلال الرحلة.',items:['خدمات الليموزين من المطار وإليه','تأجير السيارات السياحية','حجز الفنادق والشقق الفندقية','تذاكر السفر السياحي للمواطنين']},
        {number:'03',title:'التجارب والأنشطة',description:'استكشف الأنشطة والرحلات الترفيهية.',items:['حجوزات السفاري','حجوزات المغامرات','استفسارات الأنشطة السياحية']},
      ],
      processTitle:'ابدأ بالوجهة التي تفكر بها.',
      processLead:'تفاصيل رحلتك تساعد في تحديد الخدمة السياحية المناسبة.',
      steps:[{title:'شاركنا خطتك',description:'أخبرنا بوجهتك وموعد السفر وطبيعة الرحلة.'},{title:'استكشف الترتيبات',description:'ناقش التأشيرات والنقل والإقامة أو الأنشطة المناسبة.'},{title:'حدد الخطوة التالية',description:'راجع التوفر ومتطلبات الحجز أو التقديم ذات الصلة.'}],
      closingTitle:'رحلتك القادمة تبدأ بخطة.',closingText:'شاركنا تفاصيل السفر والترتيبات التي تفكر بها.',
    },
  },
} as const;

const remainingServices = {
  'financial-services': {
    en: {
      eyebrow:'INBS / FINANCIAL SERVICES',heroLead:'A clearer view of your numbers supports a clearer business decision. Explore accounting, audit-related and financial advisory service areas.',
      photoCaption:'FINANCE / BUSINESS',overviewTitle:'Clarity around the numbers that matter.',
      overviewLead:'Accounting systems and financial reviews are an important part of understanding business activity.',
      overviewBody:'Our financial service categories cover monthly accounting, internal and statutory audit-related enquiries, monitoring, accounting systems and selected business and insurance advice.',
      offeringsTitle:'Organized around financial clarity.',
      offeringsLead:'Explore support areas connected to your business accounts, reporting and operational decisions.',
      offerings:[
        {number:'01',title:'Accounting & reporting',description:'Services related to recording and reviewing financial activity.',items:['Monthly accounting','Accounting monitoring and review','Accounting systems']},
        {number:'02',title:'Audit-related services',description:'Enquiries about internal and statutory financial reviews.',items:['Internal accounting audits','Statutory audit enquiries','Financial controls and reviews']},
        {number:'03',title:'Business & insurance guidance',description:'Related advisory areas alongside your financial requirements.',items:['Free zone company setup consultations','Insurance service enquiries']},
      ],
      processTitle:'Begin with the financial requirement.',
      processLead:'Different accounting and audit needs call for different information and qualified providers.',
      steps:[{title:'Describe the need',description:'Tell us whether you need accounting, an audit-related service, systems or advice.'},{title:'Clarify the scope',description:'Discuss the business context and relevant documents.'},{title:'Explore next steps',description:'Determine which service or qualified provider may be appropriate.'}],
      closingTitle:'Bring more clarity to your next decision.',closingText:'Share the financial or accounting support your business is looking for.',
    },
    ar: {
      eyebrow:'INBS / الخدمات المالية',heroLead:'وضوح الأرقام يساعد في وضوح قرارات الأعمال. استكشف مجالات المحاسبة والتدقيق والاستشارات المالية المرتبطة بنشاطك.',
      photoCaption:'المالية / الأعمال',overviewTitle:'صورة أوضح للأرقام المهمة.',
      overviewLead:'الأنظمة المحاسبية والمراجعات المالية جزء أساسي من فهم نشاط الأعمال.',
      overviewBody:'تشمل مجالات خدماتنا المحاسبة الشهرية والاستفسارات المتعلقة بالتدقيق القانوني والداخلي والمراقبة والأنظمة المحاسبية وبعض الاستشارات والتأمين.',
      offeringsTitle:'خدمات منظمة حول الوضوح المالي.',
      offeringsLead:'استكشف المجالات المتعلقة بحسابات شركتك والتقارير والقرارات التشغيلية.',
      offerings:[
        {number:'01',title:'المحاسبة والتقارير',description:'خدمات مرتبطة بتسجيل النشاط المالي ومراجعته.',items:['المحاسبة الشهرية','المراقبة والمراجعة الحسابية','الأنظمة المحاسبية']},
        {number:'02',title:'الخدمات المتعلقة بالتدقيق',description:'استفسارات المراجعة المالية الداخلية والقانونية.',items:['التدقيق المحاسبي الداخلي','التدقيق المحاسبي القانوني','مراجعة الرقابة الحسابية']},
        {number:'03',title:'استشارات الأعمال والتأمين',description:'مجالات استشارية مرتبطة باحتياجاتك المالية.',items:['استشارات تأسيس شركات المناطق الحرة','الاستفسارات المتعلقة بخدمات التأمين']},
      ],
      processTitle:'ابدأ بتحديد احتياجك المالي.',
      processLead:'تختلف متطلبات المحاسبة والتدقيق بحسب الحالة والجهة المهنية المختصة.',
      steps:[{title:'اشرح احتياجك',description:'حدد ما إذا كنت تبحث عن المحاسبة أو التدقيق أو الأنظمة أو الاستشارة.'},{title:'وضح النطاق',description:'ناقش طبيعة النشاط والمستندات ذات الصلة.'},{title:'استكشف الخطوة التالية',description:'ناقش نوع الخدمة أو الجهة المهنية المناسبة لطلبك.'}],
      closingTitle:'امنح قرارك القادم صورة أوضح.',closingText:'شاركنا نوع الدعم المالي أو المحاسبي الذي تبحث عنه.',
    },
  },
  'consultation-services': {
    en: {
      eyebrow:'INBS / CONSULTATION',heroLead:'Better questions lead to better direction. Explore feasibility, market research, company formation and systems-related consultation.',
      photoCaption:'INSIGHT / DIRECTION',overviewTitle:'A thoughtful starting point for important decisions.',
      overviewLead:'Before taking a business step, it helps to understand the market, the requirements and the systems around it.',
      overviewBody:'Our consultation categories cover feasibility studies, market surveys, quantity surveying, company formation advice and the review of business systems and internal processes.',
      offeringsTitle:'Explore the questions behind the decision.',
      offeringsLead:'These advisory areas provide a starting point for discussing the information your next move requires.',
      offerings:[
        {number:'01',title:'Market & feasibility',description:'Research-oriented enquiries for assessing business ideas and markets.',items:['Market surveys and research','Project feasibility studies']},
        {number:'02',title:'Business formation advice',description:'Consultation on setting up and structuring a company.',items:['Company formation consultations','Online business enquiries across relevant areas']},
        {number:'03',title:'Systems & measurement',description:'Review-oriented service areas for operations and projects.',items:['System analysis','Internal systems review','Quantity surveying']},
      ],
      processTitle:'Start with the question you want answered.',
      processLead:'Define the decision or challenge first, then identify the information needed.',
      steps:[{title:'Explain the challenge',description:'Share the business question, project or process you are considering.'},{title:'Identify the scope',description:'Discuss whether research, feasibility, formation or systems review is most relevant.'},{title:'Explore an approach',description:'Determine the information and next steps appropriate to your enquiry.'}],
      closingTitle:'Turn an open question into a starting point.',closingText:'Tell us the idea, decision or operational challenge you want to discuss.',
    },
    ar: {
      eyebrow:'INBS / الاستشارات',heroLead:'الأسئلة الدقيقة تقود إلى اتجاه أوضح. استكشف دراسات الجدوى وبحوث الأسواق وتأسيس الشركات والاستشارات المتعلقة بالأنظمة.',
      photoCaption:'المعرفة / التوجيه',overviewTitle:'بداية مدروسة للقرارات المهمة.',
      overviewLead:'قبل اتخاذ خطوة في الأعمال، من المفيد فهم السوق والمتطلبات والأنظمة المرتبطة بها.',
      overviewBody:'تشمل مجالات الاستشارات دراسة الجدوى واستطلاعات الأسواق ومحاسبة الكميات واستشارات تأسيس الشركات وتحليل النظم ومراجعة العمليات الداخلية.',
      offeringsTitle:'استكشف الأسئلة وراء القرار.',
      offeringsLead:'مجالات استشارية تساعد على مناقشة المعلومات اللازمة لخطوتك القادمة.',
      offerings:[
        {number:'01',title:'الأسواق والجدوى',description:'استفسارات بحثية حول الأفكار التجارية والأسواق.',items:['استطلاعات وبحوث الأسواق','دراسات جدوى المشاريع']},
        {number:'02',title:'استشارات تأسيس الشركات',description:'مناقشة احتياجات تأسيس الشركات وتنظيمها.',items:['استشارات إنشاء الشركات','الرد الإلكتروني على استفسارات رجال الأعمال']},
        {number:'03',title:'الأنظمة والقياس',description:'مجالات مراجعة العمليات والأنظمة والمشاريع.',items:['تحليل الأنظمة','مراجعة النظم الداخلية','محاسبة الكميات']},
      ],
      processTitle:'ابدأ بالسؤال الذي تريد الإجابة عنه.',
      processLead:'حدد القرار أو التحدي أولًا لتوضيح المعلومات المطلوبة.',
      steps:[{title:'اشرح التحدي',description:'شاركنا السؤال التجاري أو المشروع أو العملية التي تفكر بها.'},{title:'حدد نطاق الاستشارة',description:'ناقش إن كان المطلوب بحثًا أو جدوى أو تأسيسًا أو مراجعة أنظمة.'},{title:'استكشف النهج',description:'تعرّف إلى المعلومات والخطوات الممكنة لطلبك.'}],
      closingTitle:'حوّل السؤال إلى نقطة انطلاق.',closingText:'شاركنا الفكرة أو القرار أو التحدي الذي تريد مناقشته.',
    },
  },
  'customs-services': {
    en: {
      eyebrow:'INBS / CUSTOMS',heroLead:'Cargo movements involve documents, service providers and customs requirements. Explore customs processing and connected coordination services.',
      photoCaption:'TRADE / MOVEMENT',overviewTitle:'Navigate the details around every shipment.',
      overviewLead:'Customs-related transactions often sit alongside shipping, communications and insurance arrangements.',
      overviewBody:'Our listed customs service areas include clearing different types of customs transactions and enquiries connected to shipping, telecommunications and insurance.',
      offeringsTitle:'The services surrounding customs clearance.',
      offeringsLead:'Find the area most relevant to your customs or trade-related enquiry.',
      offerings:[
        {number:'01',title:'Customs transactions',description:'Services related to customs documentation and transaction clearance.',items:['Different types of customs transaction clearance','Customs processing enquiries']},
        {number:'02',title:'Shipping coordination',description:'Shipping-related enquiries connected to customs requirements.',items:['Shipping services','Coordination around shipment requirements']},
        {number:'03',title:'Supporting services',description:'Additional service areas associated with commercial activity.',items:['du and telecommunications services','Insurance services']},
      ],
      processTitle:'Begin with the shipment and its documents.',
      processLead:'The type of goods and transaction determines the requirements to discuss.',
      steps:[{title:'Describe the shipment',description:'Share the goods, route and customs question you have.'},{title:'Discuss the documents',description:'Identify the relevant transaction and supporting information.'},{title:'Explore coordination',description:'Discuss customs, shipping or related service enquiries.'}],
      closingTitle:'A customs enquiry deserves a clear next step.',closingText:'Share the type of customs transaction or shipping support you need.',
    },
    ar: {
      eyebrow:'INBS / الخدمات الجمركية',heroLead:'تتطلب حركة البضائع وثائق وتنسيقًا وإجراءات جمركية. استكشف خدمات تخليص المعاملات والخدمات المرتبطة بها.',
      photoCaption:'التجارة / الحركة',overviewTitle:'تفاصيل كل شحنة تستحق اهتمامًا.',
      overviewLead:'ترتبط المعاملات الجمركية أحيانًا بالشحن والاتصالات والتأمين.',
      overviewBody:'تشمل مجالات خدماتنا تخليص أنواع مختلفة من المعاملات الجمركية والاستفسارات المرتبطة بالشحن والاتصالات والتأمين.',
      offeringsTitle:'خدمات مرتبطة بالتخليص الجمركي.',
      offeringsLead:'حدد المجال الأقرب إلى طلبك الجمركي أو التجاري.',
      offerings:[
        {number:'01',title:'المعاملات الجمركية',description:'خدمات مرتبطة بوثائق وإجراءات التخليص الجمركي.',items:['تخليص أنواع المعاملات الجمركية','استفسارات الإجراءات الجمركية']},
        {number:'02',title:'تنسيق الشحن',description:'استفسارات الشحن المرتبطة بالمتطلبات الجمركية.',items:['خدمات الشحن','التنسيق حول احتياجات الشحنة']},
        {number:'03',title:'الخدمات المساندة',description:'مجالات إضافية مرتبطة بالأنشطة التجارية.',items:['خدمات دو والاتصالات','خدمات التأمين']},
      ],
      processTitle:'ابدأ بتفاصيل الشحنة ووثائقها.',
      processLead:'نوع البضاعة والمعاملة يساعد على تحديد المتطلبات ذات الصلة.',
      steps:[{title:'صف الشحنة',description:'شاركنا طبيعة البضائع ومسارها واستفسارك الجمركي.'},{title:'ناقش الوثائق',description:'تعرّف إلى المعاملة والمعلومات المرتبطة بها.'},{title:'استكشف التنسيق',description:'ناقش خدمات الجمارك أو الشحن أو الخدمات المساندة.'}],
      closingTitle:'ابدأ معاملتك الجمركية بخطوة أوضح.',closingText:'شاركنا نوع المعاملة الجمركية أو الدعم المرتبط بالشحن.',
    },
  },
  'cargo-services': {
    en: {
      eyebrow:'INBS / CARGO & LOGISTICS',heroLead:'From moving goods by sea or air to storage and handling, explore logistics services across the stages of a shipment.',
      photoCaption:'CARGO / LOGISTICS',overviewTitle:'Every shipment has more than one moving part.',
      overviewLead:'Freight transport, clearance, packing and storage all have a role in how goods move.',
      overviewBody:'Our cargo service areas cover sea and air freight, customs clearance, packaging, several storage formats, container handling, insurance and shipping-line agency enquiries.',
      offeringsTitle:'From departure to handling and storage.',
      offeringsLead:'Explore the cargo-related services relevant to the way your goods need to move.',
      offerings:[
        {number:'01',title:'Freight & maritime services',description:'Moving goods through sea and air freight channels.',items:['Sea freight for goods','Air freight for goods','Shipping-line agency services']},
        {number:'02',title:'Customs & protection',description:'Related enquiries for shipment documentation and protection.',items:['Customs transaction clearance','Cargo insurance services','Packing goods for transport']},
        {number:'03',title:'Storage options',description:'Different storage environments for different cargo requirements.',items:['Silo storage','Refrigerated storage','General warehouse storage']},
        {number:'04',title:'Container operations',description:'Handling activities surrounding cargo containers.',items:['Container loading','Container unloading']},
      ],
      processTitle:'Tell us what needs to move.',
      processLead:'Cargo type, route and handling needs shape the service conversation.',
      steps:[{title:'Describe the cargo',description:'Share the goods, origin, destination and timing you have in mind.'},{title:'Identify handling needs',description:'Discuss transport mode, clearance, storage, packaging or insurance.'},{title:'Explore the arrangement',description:'Review the available logistics services and next steps.'}],
      closingTitle:'Keep your next shipment moving forward.',closingText:'Tell us about your freight, storage or cargo-handling requirements.',
    },
    ar: {
      eyebrow:'INBS / خدمات الشحن',heroLead:'من نقل البضائع بحرًا وجوًا إلى التخزين والمناولة، استكشف الخدمات اللوجستية المرتبطة بمراحل الشحنة.',
      photoCaption:'الشحن / الخدمات اللوجستية',overviewTitle:'كل شحنة تتضمن أكثر من خطوة.',
      overviewLead:'النقل والتخليص والتغليف والتخزين عناصر مترابطة في حركة البضائع.',
      overviewBody:'تشمل مجالات خدمات الشحن النقل البحري والجوي والتخليص الجمركي والتغليف وأنواع التخزين ومناولة الحاويات والتأمين والوكالات الملاحية.',
      offeringsTitle:'من النقل إلى المناولة والتخزين.',
      offeringsLead:'استكشف خدمات الشحن وفقًا لطبيعة البضائع ومسارها.',
      offerings:[
        {number:'01',title:'النقل والشحن البحري',description:'نقل البضائع عبر قنوات الشحن البحرية والجوية.',items:['الشحن البحري للبضائع','الشحن الجوي للبضائع','خدمات وكيل الخطوط الملاحية']},
        {number:'02',title:'الجمارك والحماية',description:'خدمات مرتبطة بوثائق الشحنة وحمايتها.',items:['تخليص المعاملات الجمركية','خدمات تأمين البضائع','حزم البضائع وتغليفها']},
        {number:'03',title:'خيارات التخزين',description:'بيئات تخزين متعددة تناسب أنواعًا مختلفة من البضائع.',items:['التخزين في الصوامع','التخزين المبرد','التخزين في المخازن العامة']},
        {number:'04',title:'مناولة الحاويات',description:'عمليات مرتبطة بتجهيز الحاويات والتعامل معها.',items:['تحميل حاويات الشحن','تفريغ حاويات الشحن']},
      ],
      processTitle:'ابدأ بإخبارنا ما الذي تريد شحنه.',
      processLead:'نوع البضاعة ومسارها ومتطلبات مناولتها تحدد مجالات الخدمة المناسبة.',
      steps:[{title:'صف البضاعة',description:'شاركنا طبيعة الشحنة ونقطة الانطلاق والوجهة والموعد المتوقع.'},{title:'حدد احتياجاتها',description:'ناقش النقل والتخليص والتخزين والتغليف أو التأمين.'},{title:'استكشف الترتيبات',description:'تعرّف إلى الخدمات اللوجستية المتاحة والخطوات التالية.'}],
      closingTitle:'خطوة أوضح لشحنتك القادمة.',closingText:'شاركنا متطلبات النقل أو التخزين أو مناولة البضائع.',
    },
  },
  'citizenship-and-immigration-services': {
    en: {
      eyebrow:'INBS / IMMIGRATION SERVICES',heroLead:'Explore residency and citizenship-by-investment programme enquiries across selected destinations, with attention to the requirements of each route.',
      photoCaption:'RESIDENCY / DESTINATIONS',overviewTitle:'Different destinations. Different requirements.',
      overviewLead:'Investment-based residency and citizenship pathways are not interchangeable.',
      overviewBody:'Our listed service covers enquiries about investment-linked residency and citizenship programmes in selected countries. Each destination has distinct eligibility, documentation, investment and regulatory requirements that must be verified with the relevant programme authority and qualified professionals.',
      offeringsTitle:'Explore destinations by programme type.',
      offeringsLead:'The following destinations reflect the programmes listed by INBS. Programme availability and eligibility must be verified before any application or commitment.',
      offerings:[
        {number:'01',title:'Caribbean programme enquiries',description:'Discuss investment-linked citizenship programme information for selected Caribbean destinations.',items:['Saint Kitts and Nevis','Commonwealth of Dominica','Saint Lucia','Grenada','Antigua and Barbuda']},
        {number:'02',title:'Other citizenship pathways',description:'Explore programme-related enquiries for additional jurisdictions.',items:['Vanuatu','Türkiye']},
        {number:'03',title:'European residence pathways',description:'Discuss investment-linked residence route enquiries where applicable.',items:['Portugal','Spain','Greece']},
      ],
      processTitle:'Start with your destination and circumstances.',
      processLead:'Citizenship and residence rules change; a programme must be checked before any decision.',
      steps:[{title:'Share your objective',description:'Tell us whether your interest is residency or citizenship and which country you are considering.'},{title:'Discuss requirements',description:'Explore programme status, eligibility questions and documentation considerations.'},{title:'Verify next steps',description:'Confirm current rules and any professional or government assessment required.'}],
      closingTitle:'Start with the right questions.',closingText:'Contact us about the destinations and programme categories you want to explore.',
    },
    ar: {
      eyebrow:'INBS / الجنسية والهجرة',heroLead:'استكشف الاستفسارات المتعلقة ببرامج الإقامة والمواطنة المرتبطة بالاستثمار في وجهات مختارة، مع مراعاة متطلبات كل برنامج.',
      photoCaption:'الإقامة / الوجهات',overviewTitle:'وجهات مختلفة، ومتطلبات مختلفة.',
      overviewLead:'مسارات الإقامة والمواطنة عبر الاستثمار ليست متطابقة.',
      overviewBody:'تشمل خدماتنا الاستفسارات حول برامج الإقامة والمواطنة المرتبطة بالاستثمار في دول محددة. تختلف شروط الأهلية والوثائق والاستثمار والأنظمة بين الدول، ويجب التحقق منها لدى الجهات المختصة والخبراء المرخصين.',
      offeringsTitle:'استكشف الوجهات وفق نوع البرنامج.',
      offeringsLead:'تعكس الوجهات التالية قائمة البرامج التي تقدم INBS استفسارات بشأنها. يجب التأكد من توفر البرنامج والأهلية قبل أي تقديم أو التزام.',
      offerings:[
        {number:'01',title:'استفسارات برامج الكاريبي',description:'مناقشة معلومات برامج المواطنة المرتبطة بالاستثمار في وجهات من الكاريبي.',items:['سانت كيتس ونيفيس','كومنولث دومينيكا','سانت لوسيا','غرينادا','أنتيغوا وباربودا']},
        {number:'02',title:'مسارات مواطنة أخرى',description:'استفسارات مرتبطة ببرامج جهات إضافية.',items:['فانواتو','تركيا']},
        {number:'03',title:'مسارات الإقامة الأوروبية',description:'استفسارات مسارات الإقامة المرتبطة بالاستثمار عند انطباقها.',items:['البرتغال','إسبانيا','اليونان']},
      ],
      processTitle:'ابدأ بالوجهة وظروفك الشخصية.',
      processLead:'تتغير قواعد الإقامة والمواطنة ويجب التأكد من حالة البرنامج قبل اتخاذ أي قرار.',
      steps:[{title:'حدد هدفك',description:'أخبرنا إن كنت تبحث عن الإقامة أو المواطنة والوجهة التي تفكر بها.'},{title:'ناقش المتطلبات',description:'استكشف حالة البرنامج وشروط الأهلية والوثائق المطلوبة.'},{title:'تحقق من الخطوات',description:'تأكد من القواعد الحالية والتقييمات المهنية أو الحكومية المطلوبة.'}],
      closingTitle:'ابدأ بالأسئلة الصحيحة.',closingText:'تواصل معنا بشأن الوجهات وفئات البرامج التي ترغب باستكشافها.',
    },
  },
} as const;

// Shared editorial labels keep the same visual structure and action semantics,
// while every service supplies its own descriptive copy and offering groups.
const common = {
  en: {
    discover:'Explore the support available',overviewEyebrow:'THE BIG PICTURE',
    offeringsEyebrow:'AREAS OF SERVICE',processEyebrow:'HOW TO START',closingEyebrow:'LET’S CONNECT',
    closingPrimary:'Start this service',closingSecondary:'Explore all services',back:'All services',
  },
  ar: {
    discover:'استكشف مجالات خدماتنا',overviewEyebrow:'نظرة شاملة',
    offeringsEyebrow:'مجالات الخدمة',processEyebrow:'كيف تبدأ؟',closingEyebrow:'لنبقَ على تواصل',
    closingPrimary:'ابدأ الخدمة',closingSecondary:'استكشف جميع الخدمات',back:'جميع الخدمات',
  },
} as const;

type OtherSlug = Exclude<ServiceSlug, 'businessmen-services'>;
const combined = { ...otherServices, ...remainingServices };

export const serviceDetailContent: Record<ServiceSlug, Record<Locale, ServiceDetailText>> = {
  'businessmen-services': businessmenDetailContent,
  ...Object.fromEntries(
    (Object.keys(combined) as OtherSlug[]).map(slug => [slug, {
      en: { ...common.en, ...combined[slug].en },
      ar: { ...common.ar, ...combined[slug].ar },
    }]),
  ) as Record<OtherSlug, Record<Locale, ServiceDetailText>>,
};
