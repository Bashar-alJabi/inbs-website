import type { Locale } from '@/lib/site';
type Slide={image:string;title:string;description:string;button:string;slug:string;related:{label:string;slug:string}[]};
export const heroSlides:Record<Locale,Slide[]>={
 en:[
 {image:'/images/hero-one.jpg',title:'Time is the Basis of Success.',description:'International Network Businessmen Services, established in Dubai in 2003.',button:'Explore Businessmen Services',slug:'businessmen-services',related:[{label:'Businessmen',slug:'businessmen-services'},{label:'Consultation',slug:'consultation-services'},{label:'Financial',slug:'financial-services'}]},
 {image:'/images/hero-two.jpg',title:'Opportunities begin in Dubai.',description:'A connected range of real estate, travel and immigration services.',button:'Explore Real Estate Services',slug:'real-estate-services',related:[{label:'Real Estate',slug:'real-estate-services'},{label:'Tourism',slug:'tourism-services'},{label:'Immigration',slug:'citizenship-and-immigration-services'}]},
 {image:'/images/hero-three.jpg',title:'The services behind your next step.',description:'Practical support across websites, typing, customs and cargo services.',button:'Explore Cargo Services',slug:'cargo-services',related:[{label:'Websites',slug:'website-services'},{label:'Typing',slug:'typing-services'},{label:'Customs',slug:'customs-services'},{label:'Cargo',slug:'cargo-services'}]}
 ],
 ar:[
 {image:'/images/hero-one.jpg',title:'الوقت هو أساس النجاح.',description:'الشبكة العالمية لخدمات رجال الأعمال، تأسست في دبي عام 2003.',button:'اكتشف خدمات رجال الأعمال',slug:'businessmen-services',related:[{label:'رجال الأعمال',slug:'businessmen-services'},{label:'الاستشارات',slug:'consultation-services'},{label:'الخدمات المالية',slug:'financial-services'}]},
 {image:'/images/hero-two.jpg',title:'الفرص تبدأ من دبي.',description:'خدمات مترابطة في العقارات والسياحة والجنسية والهجرة.',button:'اكتشف الخدمات العقارية',slug:'real-estate-services',related:[{label:'العقارات',slug:'real-estate-services'},{label:'السياحة',slug:'tourism-services'},{label:'الجنسية والهجرة',slug:'citizenship-and-immigration-services'}]},
 {image:'/images/hero-three.jpg',title:'خدمات تدعم خطواتك القادمة.',description:'حلول للمواقع الإلكترونية والطباعة والجمارك والشحن.',button:'اكتشف خدمات الشحن',slug:'cargo-services',related:[{label:'المواقع الإلكترونية',slug:'website-services'},{label:'الطباعة',slug:'typing-services'},{label:'الجمارك',slug:'customs-services'},{label:'الشحن',slug:'cargo-services'}]}
 ]};
