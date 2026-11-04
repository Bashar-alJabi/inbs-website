'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, Moon, Sun, X, House, Building2, BriefcaseBusiness, Users, Newspaper, UserRoundSearch, Phone, FileText, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Locale } from '@/lib/site';
import { routes, type PageSlug } from '@/lib/routes';
import { primaryPages, drawerPages } from '@/content/navigation';
import { LanguageSwitcher } from './language-switcher';
import { layoutContent } from '@/content/layout';
import { companyContact } from '@/content/contact';

/** Icons are keyed by stable route slug, not array position. */
const drawerIcons: Record<PageSlug, LucideIcon> = {
 about: Building2,
 services: BriefcaseBusiness,
 team: Users,
 insights: Newspaper,
 careers: UserRoundSearch,
 contact: Phone,
 legal: FileText,
};
export function SiteHeader({locale}:{locale:Locale}){
 const pathname=usePathname();
 const menuButtonRef=useRef<HTMLButtonElement>(null);
 const drawerRef=useRef<HTMLElement>(null);
 const [scrolled,setScrolled]=useState(false);
 const [open,setOpen]=useState(false);
 const t=layoutContent[locale];
 const home=t.home;
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
  const menuButton=menuButtonRef.current;
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
  return()=>{document.removeEventListener('keydown',key);(previous??menuButton)?.focus();};
 },[open]);
 const toggleTheme=()=>{const current=document.documentElement.dataset.theme==='dark'?'dark':'light';const next=current==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('inbs-theme',next)};
 const onHome=pathname===routes.home(locale);const transparent=onHome&&!scrolled&&!open;
 return <header className={`inbs-header ${transparent?'is-transparent':'is-solid'}`}><div className="site-shell inbs-header-inner">
  <Link href={routes.home(locale)} className="inbs-brand" aria-label="INBS home"><Image src="/brand/inbs-logo.png" alt="INBS" width={152} height={76} priority/></Link>
  <nav className="inbs-primary-nav" aria-label={t.mainNavAria}>
   <Link className={onHome?'active':''} href={routes.home(locale)}>{home}</Link>
   {primaryPages.map(page=><Link className={pathname===routes.page(locale,page.slug)?'active':''} key={page.slug} href={routes.page(locale,page.slug)}>{page[locale]}</Link>)}
  </nav>
  <div className="inbs-header-actions">
   <Link className="inbs-contact-button" href={routes.page(locale,'contact')}>{t.contact}<ArrowUpRight size={17}/></Link>
   <button type="button" className="inbs-icon-button" onClick={toggleTheme} aria-label={t.themeToggleAria} title={t.themeToggleTitle}><motion.span className="inbs-theme-show-dark" whileHover={{rotate:15,scale:1.1}}><Sun size={21}/></motion.span><motion.span className="inbs-theme-show-light" whileHover={{rotate:-15,scale:1.1}}><Moon size={21}/></motion.span></button>
   <LanguageSwitcher locale={locale}/>
   <button type="button" ref={menuButtonRef} className="inbs-icon-button inbs-menu-trigger" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="inbs-drawer" aria-label={open ? t.closeMenu : t.openMenu}>{open?<X size={23}/>:<Menu size={23}/>}</button>
  </div>
 </div>
 <AnimatePresence>{open&&<><motion.button className="inbs-drawer-backdrop" type="button" aria-label={t.closeMenu} onClick={()=>setOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.aside ref={drawerRef} id="inbs-drawer" className="inbs-drawer" role="dialog" aria-modal="true" aria-label={t.drawerAria} initial={{x:locale==='ar'?'-100%':'100%'}} animate={{x:0}} exit={{x:locale==='ar'?'-100%':'100%'}} transition={{duration:.38,ease:[.22,1,.36,1]}}>
 <div className="inbs-drawer-top"><Link href={routes.home(locale)} onClick={()=>setOpen(false)} aria-label="INBS home"><Image src="/brand/inbs-logo.png" alt="INBS" width={142} height={72}/></Link><button className="inbs-drawer-close" onClick={()=>setOpen(false)} type="button" aria-label={t.close}><X size={22}/></button></div>
 <div className="inbs-drawer-network" aria-hidden="true"><svg viewBox="0 0 320 22" preserveAspectRatio="none" focusable="false"><path id="inbs-drawer-network-path" d="M 0 15 H 74 L 91 5 H 165 L 183 15 H 249 L 261 9 H 320" className="inbs-drawer-network-path"/><circle cx="91" cy="5" r="2" className="inbs-drawer-network-node"/><circle cx="261" cy="9" r="2" className="inbs-drawer-network-node"/><circle r="3.1" className="inbs-drawer-network-traveller"><animateMotion dur="8s" repeatCount="indefinite" path="M 0 15 H 74 L 91 5 H 165 L 183 15 H 249 L 261 9 H 320"/></circle></svg></div>
 <nav aria-label={t.allPagesAria}><Link className={onHome?'active':''} onClick={()=>setOpen(false)} href={routes.home(locale)}><House size={19}/>{home}</Link>{drawerPages.map((p)=>{const Icon=drawerIcons[p.slug];return <Link className={pathname===routes.page(locale,p.slug)?'active':''} onClick={()=>setOpen(false)} key={p.slug} href={routes.page(locale,p.slug)}><Icon size={19}/>{p[locale]}</Link>})}</nav>
 <div className="inbs-drawer-bottom"><a href={companyContact.emailHref}>{companyContact.email}</a><span>Dubai · UAE</span></div>
 </motion.aside></>}</AnimatePresence></header>
}
