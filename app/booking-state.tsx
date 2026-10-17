'use client';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { availableTimes } from './availability';

export const services = [
 {id:1,name:'Corte & finalização',category:'Cabelo',price:85,time:60,image:'corte',description:'Um novo corte, com a sua personalidade.'},
 {id:3,name:'Hidratação profunda',category:'Cabelo',price:90,time:60,image:'lavagem',description:'Uma pausa para renovar seus fios.'},
 {id:4,name:'Manicure & pedicure',category:'Unhas',price:65,time:75,image:'unhas',description:'Cuidado completo, até os pequenos detalhes.'},
 {id:6,name:'Escova modelada',category:'Cabelo',price:60,time:45,image:'escova',description:'Movimento e leveza para o seu dia.'},
];
export const money=(value:number)=>value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

function useBookingState(){
 const [category,setCategory]=useState('Todos');
 const [query,setQuery]=useState('');
 const [selected,setSelected]=useState<number[]>([]);
 const [name,setName]=useState('');
 const [date,setDate]=useState('');
 const [time,setTime]=useState('');
 const [phone,setPhone]=useState('');
 const [copied,setCopied]=useState(false);
 const [error,setError]=useState('');
 const [clock,setClock]=useState({day:'',minute:0});
 const chosen=services.filter(service=>selected.includes(service.id));
 const total=chosen.reduce((sum,service)=>sum+service.price,0);
 const minutes=chosen.reduce((sum,service)=>sum+service.time,0);
 const duration=minutes||60;
 const today=clock.day;
 const filtered=useMemo(()=>services.filter(service=>(category==='Todos'||service.category===category)&&service.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase())),[category,query]);
 useEffect(()=>{
  function update(){
   const now=new Date();
   const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
   const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now);
   setClock({day,minute:Number(parts.find(part=>part.type==='hour')?.value)*60+Number(parts.find(part=>part.type==='minute')?.value)});
  }
  update();const timer=setInterval(update,60000);return()=>clearInterval(timer);
 },[]);
 useEffect(()=>{if(time&&today&&!availableTimes(date,duration,today,clock.minute).includes(time)){setTime('');setCopied(false)}},[date,duration,today,clock.minute,time]);
 function chooseDate(value:string){setDate(value);setTime('');setError('');setCopied(false)}
 function chooseTime(value:string){setTime(value);setError('');setCopied(false)}
 function toggle(id:number){setSelected(previous=>previous.includes(id)?previous.filter(value=>value!==id):[...previous,id]);setError('');setCopied(false)}
 return {category,setCategory,query,setQuery,selected,chosen,total,minutes,duration,today,clock,filtered,name,setName,date,time,phone,setPhone,copied,setCopied,error,setError,chooseDate,chooseTime,toggle};
}
const BookingContext=createContext<ReturnType<typeof useBookingState>|null>(null);
export function BookingProvider({children}:{children:ReactNode}){
 const booking=useBookingState();
 return <BookingContext.Provider value={booking}>{children}</BookingContext.Provider>;
}
export function useBooking(){
 const booking=useContext(BookingContext);
 if(!booking)throw new Error('BookingProvider is required');
 return booking;
}
