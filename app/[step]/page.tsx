import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookingApp, { type Screen } from '../booking-app';

const screens:Record<string,string>={servicos:'Escolha seus serviços',agenda:'Escolha dia e horário',revisao:'Seus dados e revisão',sobre:'O salão', 'como-funciona':'Como agendar'};
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(screens).map(step=>({step}))}
export async function generateMetadata({params}:{params:Promise<{step:string}>}):Promise<Metadata>{const {step}=await params;return {title:`${screens[step]||'Forma'} | Forma — Salão Feminino`}}
export default async function StepPage({params}:{params:Promise<{step:string}>}){
 const {step}=await params;
 if(!screens[step])notFound();
 return <BookingApp step={step as Screen}/>;
}
