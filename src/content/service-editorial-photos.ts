import type {Locale} from '@/lib/site';
import type {ServiceSlug} from '@/content/services';

type EditorialPhoto = {
  readonly id: number;
  readonly after: number;
  readonly size?: 'wide';
  readonly caption: Record<Locale,string>;
  readonly alt: Record<Locale,string>;
};

/**
 * Editorial photography inside AREAS OF SERVICE only.
 * Each photo ID resolves to the documented Pexels source.
 * No implied INBS clients, assets, employees or project portfolio.
 */
export const serviceEditorialPhotos = {
  'businessmen-services': [
    {id:7433848,after:1,caption:{en:'BUSINESS / CONNECTIONS',ar:'الأعمال / التواصل'},alt:{en:'Business professionals discussing documents around an office table.',ar:'مهنيون يناقشون مستندات خلال اجتماع عمل.'}},
  ],
  'real-estate-services': [
    {id:12283947,after:1,caption:{en:'PROPERTY / ARCHITECTURE',ar:'العقارات / العمارة'},alt:{en:'Geometric exterior of a contemporary residential building.',ar:'واجهة هندسية لمبنى سكني حديث.'}},
    {id:8142052,after:3,size:'wide',caption:{en:'SPACES / POSSIBILITY',ar:'المساحات / الإمكانات'},alt:{en:'Bright modern apartment interior with clean contemporary furnishings.',ar:'مساحة داخلية مشرقة لشقة عصرية بأثاث حديث.'}},
  ],
  'website-services': [
    {id:12902996,after:1,caption:{en:'DESIGN / IN PROGRESS',ar:'التصميم / قيد العمل'},alt:{en:'Graphic designer working on a laptop.',ar:'مصمم جرافيك يعمل على حاسوب محمول.'}},
    {id:450035,after:3,size:'wide',caption:{en:'DIGITAL / WORKSPACE',ar:'الرقمي / مساحة العمل'},alt:{en:'A bright organized desk with computer equipment.',ar:'مكتب منظم ومشرق مع أجهزة حاسوب.'}},
  ],
  'typing-services': [
    {id:9550363,after:1,caption:{en:'PRINT / DETAIL',ar:'الطباعة / التفاصيل'},alt:{en:'Printing equipment processing sheets of paper.',ar:'معدات طباعة صناعية تطبع أوراقًا.'}},
  ],
  'tourism-services': [
    {id:28730135,after:1,caption:{en:'DISCOVER / DUBAI',ar:'اكتشف / دبي'},alt:{en:'Desert safari vehicle travelling through dunes at sunset.',ar:'سيارة سفاري تسير بين الكثبان الرملية عند الغروب.'}},
    {id:39894364,after:3,size:'wide',caption:{en:'STAY / EXPLORE',ar:'الإقامة / الاستكشاف'},alt:{en:'Bright modern hotel room with a city view.',ar:'غرفة فندقية حديثة ومشرقة تطل على المدينة.'}},
  ],
  'financial-services': [
    {id:8297220,after:1,caption:{en:'FINANCE / FOCUS',ar:'المالية / التركيز'},alt:{en:'Accountant reviewing documents with a calculator.',ar:'محاسب يراجع مستندات باستخدام آلة حاسبة.'}},
  ],
  'consultation-services': [
    {id:8067939,after:1,caption:{en:'IDEAS / DISCUSSION',ar:'الأفكار / النقاش'},alt:{en:'Two professionals discussing information during a meeting.',ar:'مهنيان يناقشان معلومات خلال اجتماع.'}},
  ],
  'customs-services': [
    {id:6595777,after:1,caption:{en:'TRADE / PORTS',ar:'التجارة / الموانئ'},alt:{en:'Cargo vessel and freight containers at a commercial port.',ar:'سفينة شحن وحاويات في ميناء تجاري.'}},
  ],
  'cargo-services': [
    {id:1544372,after:1,caption:{en:'FREIGHT / SEA',ar:'الشحن / البحر'},alt:{en:'Cargo ship loaded with containers at an industrial harbor.',ar:'سفينة محملة بالحاويات في ميناء صناعي.'}},
    {id:5156696,after:3,caption:{en:'CARGO / STORAGE',ar:'البضائع / التخزين'},alt:{en:'Warehouse shelves filled with organized boxes.',ar:'رفوف مستودع مليئة بصناديق مرتبة.'}},
  ],
  'citizenship-and-immigration-services': [
    {id:14547467,after:1,caption:{en:'JOURNEYS / DOCUMENTS',ar:'الرحلات / الوثائق'},alt:{en:'A passport placed beside travel luggage.',ar:'جواز سفر بجانب حقيبة سفر.'}},
    {id:10959397,after:3,size:'wide',caption:{en:'DESTINATIONS / EUROPE',ar:'الوجهات / أوروبا'},alt:{en:'Lisbon city skyline at dusk by the waterfront.',ar:'أفق مدينة لشبونة عند الغسق قرب الواجهة البحرية.'}},
  ],
} as const satisfies Record<ServiceSlug, readonly EditorialPhoto[]>;

/** Source files use the Pexels CDN; dimensions are optimized by Next/Image. */
export const pexelsImage = (id:number)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
