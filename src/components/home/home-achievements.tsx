'use client';
import {useEffect,useRef,useState} from 'react';
import {useInView,useReducedMotion} from 'motion/react';
import {Reveal} from './motion-elements';
import type {Locale} from '@/lib/site';
const facts=[{value:25,en:'Years of experience',ar:'سنوات الخبرة'},{value:30,en:'Awards achieved',ar:'الجوائز المحققة'},{value:85,en:'Projects completed',ar:'المشاريع المنجزة'},{value:25320,en:'Happy clients',ar:'العملاء السعداء'}] as const;
function Count({value,active,reduced}:{value:number;active:boolean;reduced:boolean|null}){
 const [n,setN]=useState(0);
 useEffect(()=>{if(!active||reduced)return;let frame=0;const start=performance.now();const tick=(now:number)=>{const t=Math.min((now-start)/1800,1);setN(Math.round(value*(1-(1-t)**3)));if(t<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[active,reduced,value]);
 return <>{(reduced?value:n).toLocaleString('en-US')}+</>;
}
export function HomeAchievements({locale}:{locale:Locale}){
 const ref=useRef<HTMLElement>(null),visible=useInView(ref,{once:true,amount:.2}),reduced=useReducedMotion();
 return <section ref={ref} className="inbs-achievements" aria-labelledby="inbs-achievements-title"><div className="site-shell inbs-achievements-inner">
 <Reveal className="inbs-achievements-heading"><span className="inbs-achievements-eyebrow">{locale==='ar'?'إنجازاتنا بالأرقام':'INBS IN NUMBERS'}</span><h2 id="inbs-achievements-title">{locale==='ar'?'خبرة تمتد عبر السنوات.':'Experience in numbers.'}</h2></Reveal>
 <div className="inbs-achievements-grid">{facts.map((fact,i)=><div key={fact.en} className="inbs-achievement"><span className="inbs-achievement-index">0{i+1}</span><strong dir="ltr"><Count value={fact.value} active={visible} reduced={reduced}/></strong><span className="inbs-achievement-caption">{fact[locale]}</span></div>)}</div>
 </div></section>;
}