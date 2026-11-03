'use client';
import { useEffect,useRef,useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence,motion,useReducedMotion } from 'motion/react';
import { ArrowUpRight,ArrowLeft,ArrowRight,Pause,Play } from 'lucide-react';
import { heroSlides } from '@/content/hero';
import type { Locale } from '@/lib/site';

export function HeroExperience({locale}:{locale:Locale}){
 const slides=heroSlides[locale];
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const [pointer,setPointer]=useState<{x:number;y:number}|null>(null);
 const [anchor,setAnchor]=useState<{x:number;y:number}|null>(null);
 const ref=useRef<HTMLElement>(null);
 const buttonRef=useRef<HTMLAnchorElement>(null);
 const reduced=useReducedMotion();
 useEffect(()=>{if(paused||reduced)return;const id=window.setInterval(()=>setActive(n=>(n+1)%slides.length),7500);return()=>window.clearInterval(id)},[paused,reduced,slides.length]);
 useEffect(()=>{
  if(!pointer)return;
  const measure=()=>{const a=ref.current?.getBoundingClientRect();const b=buttonRef.current?.getBoundingClientRect();if(a&&b)setAnchor({x:b.left-a.left+b.width/2,y:b.top-a.top+b.height/2})};
  measure();window.addEventListener('resize',measure);
  return()=>window.removeEventListener('resize',measure);
 },[active,pointer]);
 const onPointerMove=(e:React.PointerEvent<HTMLElement>)=>{
  if(e.pointerType!=='mouse'||reduced)return;
  const box=ref.current?.getBoundingClientRect();if(!box)return;
  setPointer({x:e.clientX-box.left,y:e.clientY-box.top});
  const rect=buttonRef.current?.getBoundingClientRect();
  if(rect)setAnchor({x:rect.left-box.left+rect.width/2,y:rect.top-box.top+rect.height/2});
 };
 const slide=slides[active];
 const path=pointer&&anchor?(()=>{const dx=anchor.x-pointer.x,dy=anchor.y-pointer.y;const bx=pointer.x+dx*.47,by=pointer.y+dy*.55;return `M ${pointer.x} ${pointer.y} Q ${bx-26} ${by-22} ${bx} ${by} T ${anchor.x} ${anchor.y}`})():null;
 return <section ref={ref} className="inbs-hero" aria-label={locale==='ar'?'مقدمة خدماتنا':'Welcome to INBS'} onPointerMove={onPointerMove} onPointerLeave={()=>setPointer(null)}>
  <AnimatePresence initial={false}><motion.div key={active} className="inbs-hero-media" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.15,ease:'easeInOut'}}><Image src={slide.image} alt="" fill priority={active===0} quality={80} sizes="100vw" className="inbs-hero-photo"/></motion.div></AnimatePresence>
  <div className="inbs-hero-shade" aria-hidden="true"/>
  {path&&<svg className="inbs-network-trail" aria-hidden="true"><path d={path} stroke="currentColor" fill="none" strokeWidth="1.4" strokeOpacity=".7"/><circle cx={pointer!.x} cy={pointer!.y} r="3.5" fill="currentColor"/><circle cx={anchor!.x} cy={anchor!.y} r="5" fill="none" stroke="currentColor" strokeWidth="1.3"/><circle cx={pointer!.x+(anchor!.x-pointer!.x)*.47} cy={pointer!.y+(anchor!.y-pointer!.y)*.55} r="2.5" fill="currentColor" fillOpacity=".75"/></svg>}
  <div className="site-shell inbs-hero-layout"><div className="inbs-hero-content">
   <motion.div initial={reduced?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.1}} className="inbs-hero-eyebrow">{locale==='ar'?'الشبكة العالمية لخدمات رجال الأعمال':'INTERNATIONAL NETWORK BUSINESSMEN SERVICES'} <span>· {locale==='ar'?'دبي / ٢٠٠٣':'DUBAI / 2003'}</span></motion.div>
   <AnimatePresence mode="wait"><motion.div key={active} initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.65}} className="inbs-slide">
    <h1>{slide.title}</h1><p>{slide.description}</p>
    <Link ref={buttonRef} className="inbs-hero-cta" href={`/${locale}/services/${slide.slug}`}>{slide.button}<ArrowUpRight size={19}/></Link>
   </motion.div></AnimatePresence>
  </div>
  <div className="inbs-hero-bottom"><motion.div initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.45}} className="inbs-slide-controls"><span>{String(active+1).padStart(2,'0')} <i>/</i> 03</span><button type="button" onClick={()=>setActive(n=>(n+slides.length-1)%slides.length)} aria-label={locale==='ar'?'الشريحة السابقة':'Previous slide'}>{locale==='ar'?<ArrowRight size={18}/>:<ArrowLeft size={18}/>}</button><button type="button" onClick={()=>setActive(n=>(n+1)%slides.length)} aria-label={locale==='ar'?'الشريحة التالية':'Next slide'}>{locale==='ar'?<ArrowLeft size={18}/>:<ArrowRight size={18}/>}</button><button type="button" onClick={()=>setPaused(!paused)} aria-label={locale==='ar'?(paused?'تشغيل الشرائح':'إيقاف الشرائح مؤقتاً'):(paused?'Play slides':'Pause slides')}>{paused?<Play size={17}/>:<Pause size={17}/>}</button></motion.div>
  <AnimatePresence mode="wait"><motion.div key={active} className="inbs-hero-service-strip" initial={reduced?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.45,delay:active===0?.5:0}}>{slide.related.map(s=><Link key={s.slug} href={`/${locale}/services/${s.slug}`}>{s.label}<ArrowUpRight size={13}/></Link>)}</motion.div></AnimatePresence></div>
  </div>
 </section>;
}
