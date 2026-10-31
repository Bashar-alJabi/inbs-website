'use client';
import {useReducedMotion} from 'motion/react';
import {Reveal} from './motion-elements';
import type {Locale} from '@/lib/site';
const agencies=[{en:'Amer',ar:'آمر'},{en:'Tasheel',ar:'تسهيل'},{en:'Dubai Department of Economy and Tourism',ar:'دائرة الاقتصاد والسياحة بدبي'},{en:'Federal Authority for Identity, Citizenship, Customs & Port Security',ar:'الهيئة الاتحادية للهوية والجنسية والجمارك وأمن المنافذ'},{en:'Dubai Health Authority',ar:'هيئة الصحة بدبي'},{en:'GDRFA Dubai',ar:'الإدارة العامة للإقامة وشؤون الأجانب بدبي'}] as const;
export function HomeInstitutions({locale}:{locale:Locale}){
 const reduced=useReducedMotion();
 return <section className="inbs-institutions" aria-labelledby="inbs-institutions-heading"><div className="site-shell">
  <Reveal className="inbs-institutions-heading"><span className="inbs-institutions-kicker">{locale==='ar'?'جهات مرتبطة بخدماتنا':'RELATED SERVICE AUTHORITIES'}</span><h2 id="inbs-institutions-heading">{locale==='ar'?'جهات ومراكز خدمات نتعامل معها':'Authorities & service centres'}</h2><p>{locale==='ar'?'تشمل خدماتنا إنجاز معاملات لدى جهات حكومية ومراكز خدمات مختلفة في دولة الإمارات.':'Our services include procedures involving government authorities and service centres across the UAE.'}</p></Reveal>
 </div>
 <div className="inbs-institutions-window" aria-label={locale==='ar'?'الجهات ومراكز الخدمات':'Authorities and service centres'}>
  <div className={'inbs-institutions-track'+(reduced?' is-static':'')}>
   {[...agencies,...agencies].map((agency,i)=><div key={i} className="inbs-institutions-name" aria-hidden={i>=agencies.length}><span className="inbs-institutions-emblem" aria-hidden="true"/><span>{agency[locale]}</span></div>)}
  </div>
 </div>
 <div className="site-shell"><p className="inbs-institutions-disclaimer">{locale==='ar'?'تُعرض أسماء الجهات للتعريف بطبيعة المعاملات والخدمات فقط، ولا تعني وجود شراكة أو اعتماد رسمي.':'Names are shown to identify relevant services and procedures, not to imply official partnership or endorsement.'}</p></div>
 </section>;
}