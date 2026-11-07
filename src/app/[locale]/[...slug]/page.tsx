import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/site';

/** All catalog pages now have dedicated routes; unknown URLs are genuine 404s. */
export default async function UnknownPage({params}:{params:Promise<{locale:string;slug:string[]}>}){
 const {locale}=await params;
 if(!isLocale(locale))notFound();
 notFound();
}
