'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Languages, Menu, Moon, Sun, X, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { pages, alternateLocale, type Locale } from '@/lib/site';

const featured=['about','services','why-inbs','team'];
export function SiteHeader({locale}:{locale:Locale}){
 const pathname=usePathname();
 const [scrolled,setScrolled]=useState(false);
 const [open,setOpen]=useState(false);
 const [theme,setTheme]=useState<'light'|'dark'>('light');
 const home=locale==='ar'?'الرئيسية':'Home';
 const other=alternateLocale(locale);
 const otherPath='/'+[other,...pathname.split('/').filter(Boolean).slice(1)].join('/');
 useEffect(()=>{
   const onScroll=()=>setScrolled(window.scrollY>55);
   onScroll();window.addEventListener('scroll',onScroll,{passive:true});
   return ()=>window.removeEventListener('scroll',onScroll);
 },[]);
 useEffect(()=>{const stored=localStorage.getItem('inbs-theme');const next=stored==='dark'||stored==='light'?stored:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');setTheme(next);document.documentElement.dataset.theme=next},[]);
 useEffect(()=>{if(!open)return;const key=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false)};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[open]);
 useEffect(()=>setOpen(false),[pathname]);
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
   <Link href={otherPath} className="inbs-icon-button" aria-label={locale==='ar'?'Switch to English':'التبديل إلى العربية'} title={locale==='ar'?'English':'العربية'}><Languages size={20}/></Link>
   <button type="button" className="inbs-icon-button" onClick={toggleTheme} aria-label={theme==='dark'?'Switch to light mode':'Switch to dark mode'} title={theme==='dark'?'Light mode':'Dark mode'}>{theme==='dark'?<Sun size={21}/>:<Moon size={21}/>}</button>
   <button type="button" className="inbs-icon-button inbs-menu-trigger" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="inbs-drawer" aria-label={open?'Close menu':'Open menu'}>{open?<X size={23}/>:<Menu size={23}/>}</button>
  </div>
 </div>
 <AnimatePresence>{open&&<><motion.button className="inbs-drawer-backdrop" type="button" aria-label="Close navigation" onClick={()=>setOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.aside id="inbs-drawer" className="inbs-drawer" role="dialog" aria-modal="true" aria-label={locale==='ar'?'قائمة الصفحات':'Site navigation'} initial={{x:locale==='ar'?'-100%':'100%'}} animate={{x:0}} exit={{x:locale==='ar'?'-100%':'100%'}} transition={{duration:.38,ease:[.22,1,.36,1]}}>
 <div className="inbs-drawer-top"><span>INBS / {locale==='ar'?'القائمة':'MENU'}</span><button onClick={()=>setOpen(false)} type="button" aria-label="Close"><X size={22}/></button></div>
 <nav aria-label={locale==='ar'?'كل الصفحات':'All pages'}><Link href={`/${locale}`}>{home}<ChevronRight size={20}/></Link>{pages.map(p=><Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}<ChevronRight size={20}/></Link>)}</nav>
 <div className="inbs-drawer-bottom"><a href="mailto:info@inbs-uae.com">info@inbs-uae.com</a><span>Dubai · UAE</span></div>
 </motion.aside></>}</AnimatePresence></header>
}
