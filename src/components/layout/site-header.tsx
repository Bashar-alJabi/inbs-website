'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Languages, Menu, Moon, Sun, X, House, Building2, BriefcaseBusiness, Users, Newspaper, UserRoundSearch, Phone, ShieldCheck, FileText, Compass } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { pages, alternateLocale, type Locale } from '@/lib/site';

const featured=['about','services','why-inbs','team'];
const drawerIcons = [Building2,BriefcaseBusiness,ShieldCheck,Users,Newspaper,UserRoundSearch,Phone,FileText,FileText] as const;
export function SiteHeader({locale}:{locale:Locale}){
 const pathname=usePathname();
 const menuButtonRef=useRef<HTMLButtonElement>(null);
 const drawerRef=useRef<HTMLElement>(null);
 const [scrolled,setScrolled]=useState(false);
 const [open,setOpen]=useState(false);
 const [theme,setTheme]=useState<'light'|'dark'>(()=>typeof window==='undefined'?'light':localStorage.getItem('inbs-theme')==='dark'?'dark':'light');
 const home=locale==='ar'?'الرئيسية':'Home';
 const other=alternateLocale(locale);
 const otherPath='/'+[other,...pathname.split('/').filter(Boolean).slice(1)].join('/');
 useEffect(()=>{
   const onScroll=()=>setScrolled(window.scrollY>55);
   onScroll();window.addEventListener('scroll',onScroll,{passive:true});
   return ()=>window.removeEventListener('scroll',onScroll);
 },[]);
 useEffect(()=>{const stored=localStorage.getItem('inbs-theme');const next=stored==='dark'||stored==='light'?stored:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=next},[]);
 useEffect(()=>{
  if(!open)return;
  const drawer=drawerRef.current;
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const focusable=()=>Array.from(drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')??[]);
  focusable()[0]?.focus();
  const key=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){setOpen(false);return;}
   if(event.key!=='Tab')return;
   const items=focusable();if(!items.length)return;
   const first=items[0],last=items[items.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  document.addEventListener('keydown',key);
  return()=>{document.removeEventListener('keydown',key);(previous??menuButtonRef.current)?.focus();};
 },[open]);
 const toggleTheme=()=>{const next=theme==='dark'?'light':'dark';setTheme(next);document.documentElement.dataset.theme=next;localStorage.setItem('inbs-theme',next)};
 const onHome=pathname===`/${locale}`;const transparent=onHome&&!scrolled&&!open;
 return <header className={`inbs-header ${transparent?'is-transparent':'is-solid'}`}><div className="site-shell inbs-header-inner">
  <Link href={`/${locale}`} className="inbs-brand" aria-label="INBS home"><Image src="/brand/inbs-logo.png" alt="INBS" width={152} height={76} priority/></Link>
  <nav className="inbs-primary-nav" aria-label={locale==='ar'?'التنقل الرئيسي':'Main navigation'}>
   <Link className={onHome?'active':''} href={`/${locale}`}>{home}</Link>
   {featured.map(slug=>{const page=pages.find(p=>p.slug===slug)!;return <Link className={pathname===`/${locale}/${slug}`?'active':''} key={slug} href={`/${locale}/${slug}`}>{page[locale]}</Link>})}
  </nav>
  <div className="inbs-header-actions">
   <Link className="inbs-contact-button" href={`/${locale}/contact`}>{locale==='ar'?'تواصل معنا':'Contact us'}<ArrowUpRight size={17}/></Link>
   <Link href={otherPath} className="inbs-icon-button" aria-label={locale==='ar'?'Switch to English':'التبديل إلى العربية'} title={locale==='ar'?'English':'العربية'}><motion.span whileHover={{rotate:-13,scale:1.13}}><Languages size={20}/></motion.span></Link>
   <button type="button" className="inbs-icon-button" onClick={toggleTheme} aria-label={theme==='dark'?'Switch to light mode':'Switch to dark mode'} title={theme==='dark'?'Light mode':'Dark mode'}>{theme==='dark'?<motion.span key="sun" initial={{rotate:70,opacity:0,scale:.5}} animate={{rotate:0,opacity:1,scale:1}}><Sun size={21}/></motion.span>:<motion.span key="moon" initial={{rotate:-70,opacity:0,scale:.5}} animate={{rotate:0,opacity:1,scale:1}}><Moon size={21}/></motion.span>}</button>
   <button type="button" ref={menuButtonRef} className="inbs-icon-button inbs-menu-trigger" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="inbs-drawer" aria-label={locale==='ar'?(open?'إغلاق القائمة':'فتح القائمة'):(open?'Close menu':'Open menu')}>{open?<X size={23}/>:<Menu size={23}/>}</button>
  </div>
 </div>
 <AnimatePresence>{open&&<><motion.button className="inbs-drawer-backdrop" type="button" aria-label={locale==='ar'?'إغلاق التنقل':'Close navigation'} onClick={()=>setOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.aside ref={drawerRef} id="inbs-drawer" className="inbs-drawer" role="dialog" aria-modal="true" aria-label={locale==='ar'?'قائمة الصفحات':'Site navigation'} initial={{x:locale==='ar'?'-100%':'100%'}} animate={{x:0}} exit={{x:locale==='ar'?'-100%':'100%'}} transition={{duration:.38,ease:[.22,1,.36,1]}}>
 <div className="inbs-drawer-top"><Link href={`/${locale}`} onClick={()=>setOpen(false)} aria-label="INBS home"><Image src="/brand/inbs-logo.png" alt="INBS" width={142} height={72}/></Link><button className="inbs-drawer-close" onClick={()=>setOpen(false)} type="button" aria-label={locale==='ar'?'إغلاق':'Close'}><X size={22}/></button></div>
 <nav aria-label={locale==='ar'?'كل الصفحات':'All pages'}><Link className={onHome?'active':''} onClick={()=>setOpen(false)} href={`/${locale}`}><House size={19}/>{home}</Link>{pages.filter(p=>p.slug!=='privacy-policy'&&p.slug!=='terms').map((p)=>{const Icon=drawerIcons[pages.indexOf(p)]??Compass;return <Link className={pathname===`/${locale}/${p.slug}`?'active':''} onClick={()=>setOpen(false)} key={p.slug} href={`/${locale}/${p.slug}`}><Icon size={19}/>{p[locale]}</Link>})}</nav>
 <div className="inbs-drawer-bottom"><a href="mailto:info@inbs-uae.com">info@inbs-uae.com</a><span>Dubai · UAE</span></div>
 </motion.aside></>}</AnimatePresence></header>
}
