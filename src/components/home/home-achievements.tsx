'use client';
import {useEffect,useRef,useState} from 'react';
import {useInView,useReducedMotion} from 'motion/react';
import {Reveal} from './motion-elements';
import {motion} from 'motion/react';
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
 <Reveal className="inbs-achievements-heading"><span className="inbs-achievements-eyebrow">{locale==='ar'?'إنجازاتنا بالأرقام':'INBS IN NUMBERS'}</span><h2 id="inbs-achievements-title"><span>{locale==='ar'?'خبرة تمتد':'Experience'}</span><span>{locale==='ar'?'عبر السنوات.':'in numbers.'}</span></h2></Reveal>
 <div className="inbs-achievements-grid">{facts.map((fact,i)=><motion.div key={fact.en} className="inbs-achievement" initial={reduced?false:{opacity:0,y:45,scale:.96}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,amount:.18}} transition={{duration:.75,delay:i*.13,ease:[.22,1,.36,1]}}><strong dir="ltr"><Count value={fact.value} active={visible} reduced={reduced}/></strong><span className="inbs-achievement-caption">{fact[locale]}</span><span className="inbs-achievement-line" aria-hidden="true"/></motion.div>)}</div>
 </div></section>;
}