import type {Locale} from '@/lib/site';
import type {ServiceSlug} from '@/content/services';

type EditorialPhoto = {
  readonly src: string;
  readonly after: number;
  readonly size?: 'wide';
  readonly caption: Record<Locale,string>;
  readonly alt: Record<Locale,string>;
};

/**
 * Editorial photography inside AREAS OF SERVICE only.
 * Stable local WebP paths make future photo replacement independent of code changes.
 * No implied INBS clients, assets, employees or project portfolio.
 */
export const serviceEditorialPhotos = {
  'businessmen-services': [
    {src:'/images/services/editorial/businessmen-services-01.webp',after:1,caption:{en:'BUSINESS / CONNECTIONS',ar:'الأعمال / التواصل'},alt:{en:'Business professionals discussing documents around an office table.',ar:'مهنيون يناقشون مستندات خلال اجتماع عمل.'}},
    {src:'/images/services/editorial/businessmen-services-02.webp',after:5,size:'wide',caption:{en:'BUSINESS / COLLABORATION',ar:'الأعمال / التعاون'},alt:{en:'Professionals greeting one another during a business meeting.',ar:'مهنيون يتصافحون خلال اجتماع عمل.'}},
  ],
  'real-estate-services': [
    {src:'/images/services/editorial/real-estate-services-01.webp',after:1,caption:{en:'PROPERTY / ARCHITECTURE',ar:'العقارات / العمارة'},alt:{en:'Geometric exterior of a contemporary residential building.',ar:'واجهة هندسية لمبنى سكني حديث.'}},
    {src:'/images/services/editorial/real-estate-services-02.webp',after:3,size:'wide',caption:{en:'SPACES / POSSIBILITY',ar:'المساحات / الإمكانات'},alt:{en:'Bright modern apartment interior with clean contemporary furnishings.',ar:'مساحة داخلية مشرقة لشقة عصرية بأثاث حديث.'}},
  ],
  'website-services': [
    {src:'/images/services/editorial/website-services-01.webp',after:1,caption:{en:'DESIGN / IN PROGRESS',ar:'التصميم / قيد العمل'},alt:{en:'Graphic designer working on a laptop.',ar:'مصمم جرافيك يعمل على حاسوب محمول.'}},
    {src:'/images/services/editorial/website-services-02.webp',after:3,size:'wide',caption:{en:'DIGITAL / WORKSPACE',ar:'الرقمي / مساحة العمل'},alt:{en:'A bright organized desk with computer equipment.',ar:'مكتب منظم ومشرق مع أجهزة حاسوب.'}},
  ],
  'typing-services': [
    {src:'/images/services/editorial/typing-services-01.webp',after:1,caption:{en:'PRINT / DETAIL',ar:'الطباعة / التفاصيل'},alt:{en:'Printing equipment processing sheets of paper.',ar:'معدات طباعة صناعية تطبع أوراقًا.'}},
    {src:'/images/services/editorial/typing-services-02.webp',after:3,size:'wide',caption:{en:'DOCUMENTS / WORKSPACE',ar:'المستندات / مساحة العمل'},alt:{en:'Office worker typing at a keyboard beside paperwork.',ar:'موظف يكتب على لوحة مفاتيح بجانب مستندات.'}},
  ],
  'tourism-services': [
    {src:'/images/services/editorial/tourism-services-01.webp',after:1,caption:{en:'DISCOVER / DUBAI',ar:'اكتشف / دبي'},alt:{en:'Desert safari vehicle travelling through dunes at sunset.',ar:'سيارة سفاري تسير بين الكثبان الرملية عند الغروب.'}},
    {src:'/images/services/editorial/tourism-services-02.webp',after:3,size:'wide',caption:{en:'STAY / EXPLORE',ar:'الإقامة / الاستكشاف'},alt:{en:'Bright modern hotel room with a city view.',ar:'غرفة فندقية حديثة ومشرقة تطل على المدينة.'}},
  ],
  'financial-services': [
    {src:'/images/services/editorial/financial-services-01.webp',after:1,caption:{en:'FINANCE / FOCUS',ar:'المالية / التركيز'},alt:{en:'Accountant reviewing documents with a calculator.',ar:'محاسب يراجع مستندات باستخدام آلة حاسبة.'}},
    {src:'/images/services/editorial/financial-services-02.webp',after:3,size:'wide',caption:{en:'NUMBERS / PLANNING',ar:'الأرقام / التخطيط'},alt:{en:'A calculator with financial notes and cash on a desk.',ar:'آلة حاسبة مع أوراق مالية ونقود على مكتب.'}},
  ],
  'consultation-services': [
    {src:'/images/services/editorial/consultation-services-01.webp',after:1,caption:{en:'IDEAS / DISCUSSION',ar:'الأفكار / النقاش'},alt:{en:'Two professionals discussing information during a meeting.',ar:'مهنيان يناقشان معلومات خلال اجتماع.'}},
    {src:'/images/services/editorial/consultation-services-02.webp',after:3,size:'wide',caption:{en:'STRATEGY / TOGETHER',ar:'الاستراتيجية / التعاون'},alt:{en:'A group of colleagues discussing work around a table.',ar:'مجموعة من الزملاء تناقش العمل حول طاولة.'}},
  ],
  'customs-services': [
    {src:'/images/services/editorial/customs-services-01.webp',after:1,caption:{en:'TRADE / PORTS',ar:'التجارة / الموانئ'},alt:{en:'Cargo vessel and freight containers at a commercial port.',ar:'سفينة شحن وحاويات في ميناء تجاري.'}},
    {src:'/images/services/editorial/customs-services-02.webp',after:3,size:'wide',caption:{en:'LOGISTICS / PORTS',ar:'الخدمات اللوجستية / الموانئ'},alt:{en:'Stacks of freight containers at an industrial harbor.',ar:'صفوف من حاويات الشحن في ميناء صناعي.'}},
  ],
  'cargo-services': [
    {src:'/images/services/editorial/cargo-services-01.webp',after:1,caption:{en:'FREIGHT / SEA',ar:'الشحن / البحر'},alt:{en:'Cargo ship loaded with containers at an industrial harbor.',ar:'سفينة محملة بالحاويات في ميناء صناعي.'}},
    {src:'/images/services/editorial/cargo-services-02.webp',after:3,caption:{en:'CARGO / STORAGE',ar:'البضائع / التخزين'},alt:{en:'Warehouse shelves filled with organized boxes.',ar:'رفوف مستودع مليئة بصناديق مرتبة.'}},
  ],
  'citizenship-and-immigration-services': [
    {src:'/images/services/editorial/citizenship-and-immigration-services-01.webp',after:1,caption:{en:'JOURNEYS / DOCUMENTS',ar:'الرحلات / الوثائق'},alt:{en:'A passport placed beside travel luggage.',ar:'جواز سفر بجانب حقيبة سفر.'}},
    {src:'/images/services/editorial/citizenship-and-immigration-services-02.webp',after:3,size:'wide',caption:{en:'DESTINATIONS / EUROPE',ar:'الوجهات / أوروبا'},alt:{en:'Lisbon city skyline at dusk by the waterfront.',ar:'أفق مدينة لشبونة عند الغسق قرب الواجهة البحرية.'}},
  ],
} as const satisfies Record<ServiceSlug, readonly EditorialPhoto[]>;

