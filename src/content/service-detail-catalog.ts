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
