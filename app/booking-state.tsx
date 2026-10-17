'use client';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { availableTimes } from './availability';
import { DRAFT_KEY, RESERVATIONS_KEY, parseReservations, type Reservation } from './reservations';

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
 const [reservations,setReservations]=useState<Reservation[]>([]);
 const [storageReady,setStorageReady]=useState(false);
 const [storageIssue,setStorageIssue]=useState('');
 const [saving,setSaving]=useState(false);
 const [completedId,setCompletedId]=useState('');
 const chosen=services.filter(service=>selected.includes(service.id));
 const total=chosen.reduce((sum,service)=>sum+service.price,0);
 const minutes=chosen.reduce((sum,service)=>sum+service.time,0);
 const duration=minutes||60;
 const today=clock.day;
 const filtered=useMemo(()=>services.filter(service=>(category==='Todos'||service.category===category)&&service.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase())),[category,query]);
 useEffect(()=>{
  try{
   setReservations(parseReservations(localStorage.getItem(RESERVATIONS_KEY)));
   const raw=localStorage.getItem(DRAFT_KEY);
   if(raw){try{const draft=JSON.parse(raw);if(Array.isArray(draft.selected))setSelected(draft.selected.filter((id:unknown)=>services.some(service=>service.id===id)));if(typeof draft.name==='string')setName(draft.name.slice(0,80));if(typeof draft.phone==='string')setPhone(draft.phone.slice(0,15));if(typeof draft.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(draft.date))setDate(draft.date);if(typeof draft.time==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.time))setTime(draft.time)}catch{/* Ignore an unreadable draft without changing saved reservations. */}}
  }catch{setStorageIssue('Não foi possível carregar os dados deste navegador. Verifique se o armazenamento local está permitido e recarregue a página.')}
  setStorageReady(true);
  function sync(event:StorageEvent){if(event.key===RESERVATIONS_KEY||event.key===null){try{setReservations(parseReservations(localStorage.getItem(RESERVATIONS_KEY)));setStorageIssue('')}catch{setStorageIssue('Não foi possível atualizar suas reservas locais. Recarregue a página.')}}}
  window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);
 },[]);
 useEffect(()=>{
  if(!storageReady)return;
  try{localStorage.setItem(DRAFT_KEY,JSON.stringify({selected,name,phone,date,time}))}
  catch{setStorageIssue('O navegador não permitiu salvar seus dados. Libere o armazenamento local para reservar.')}
 },[selected,name,phone,date,time,storageReady]);
 useEffect(()=>{
  function update(){
   const now=new Date();
   const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
   const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now);
   setClock({day,minute:Number(parts.find(part=>part.type==='hour')?.value)*60+Number(parts.find(part=>part.type==='minute')?.value)});
  }
  update();const timer=setInterval(update,60000);return()=>clearInterval(timer);
 },[]);
 useEffect(()=>{if(storageReady&&time&&today&&!availableTimes(date,duration,today,clock.minute,reservations).includes(time)){setTime('');setCopied(false)}},[date,duration,today,clock.minute,time,reservations,storageReady]);
 function chooseDate(value:string){setDate(value);setTime('');setError('');setCopied(false)}
 function chooseTime(value:string){setTime(value);setError('');setCopied(false)}
 function toggle(id:number){setSelected(previous=>previous.includes(id)?previous.filter(value=>value!==id):[...previous,id]);setCompletedId('');setError('');setCopied(false)}
 async function locked<T,>(action:()=>T):Promise<T>{return navigator.locks?navigator.locks.request('forma-reservations',action):action()}
 async function reserve(){
  if(saving||!storageReady)return null;
  setError('');
  if(!name.trim()){setError('Informe seu nome para reservar.');return null}
  if(!/^[1-9]{2}\d{8,9}$/.test(phone.replace(/\D/g,''))){setError('Informe um telefone válido com DDD.');return null}
  if(!chosen.length||!date||!time){setError('Escolha os serviços, a data e o horário.');return null}
  setSaving(true);
  try{return await locked(()=>{
   const current=parseReservations(localStorage.getItem(RESERVATIONS_KEY));
   if(!availableTimes(date,duration,today,clock.minute,current).includes(time)){setReservations(current);setTime('');setError('Este horário não está mais disponível neste navegador. Escolha outro.');return null}
   const reservation:Reservation={id:crypto.randomUUID(),createdAt:new Date().toISOString(),date,time,duration:minutes,total,name:name.trim(),phone,services:chosen.map(({id,name,price,time})=>({id,name,price,time}))};
   const updated=[reservation,...current];
   localStorage.setItem(RESERVATIONS_KEY,JSON.stringify(updated));
   setReservations(updated);setCompletedId(reservation.id);setSelected([]);setDate('');setTime('');setStorageIssue('');
   return reservation;
  })}catch{setError('Não foi possível salvar a reserva neste navegador. Nenhuma reserva foi confirmada. Verifique o armazenamento local e tente novamente.');return null}finally{setSaving(false)}
 }
 async function cancelReservation(id:string){
  if(saving||!storageReady)return false;
  setSaving(true);setError('');
  try{return await locked(()=>{const updated=parseReservations(localStorage.getItem(RESERVATIONS_KEY)).filter(item=>item.id!==id);localStorage.setItem(RESERVATIONS_KEY,JSON.stringify(updated));setReservations(updated);setStorageIssue('');return true})}
  catch{setError('Não foi possível cancelar. A reserva continua salva neste navegador.');return false}finally{setSaving(false)}
 }
 return {category,setCategory,query,setQuery,selected,chosen,total,minutes,duration,today,clock,filtered,name,setName,date,time,phone,setPhone,copied,setCopied,error,setError,chooseDate,chooseTime,toggle,reservations,storageReady,storageIssue,saving,completedId,reserve,cancelReservation};
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
