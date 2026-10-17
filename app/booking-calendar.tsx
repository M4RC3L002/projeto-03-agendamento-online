'use client';
import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Check } from 'lucide-react';
import { addDays, availableTimes, type BusyPeriod } from './availability';

type Props = { today: string; currentMinute: number; duration: number; date: string; time: string; onDate: (date: string) => void; onTime: (time: string) => void; compact?: boolean; reservations?: readonly BusyPeriod[] };
const fullDate = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString('pt-BR', {timeZone:'UTC',weekday:'long',day:'numeric',month:'long'});

export default function BookingCalendar({today,currentMinute,duration,date,time,onDate,onTime,compact=false,reservations=[]}:Props) {
  const [offset, setOffset] = useState(()=>date&&today?(Number(date.slice(0,4))-Number(today.slice(0,4)))*12+Number(date.slice(5,7))-Number(today.slice(5,7)):0);
  if (!today) return <p role="status">Carregando calendário…</p>;
  const anchor = new Date(`${today}T12:00:00Z`);
  const first = new Date(Date.UTC(anchor.getUTCFullYear(),anchor.getUTCMonth()+offset,1,12));
  const month = first.toISOString().slice(0,7);
  const end = addDays(today,59);
  const days = new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();
  const leading = (first.getUTCDay()+6)%7;
  const times = availableTimes(date,duration,today,currentMinute,reservations);
  const selectedTitle = date ? fullDate(date) : 'Escolha um dia no calendário';
  return <div className={`availability-picker ${compact?'compact':''}`}>
    <div className="calendar-panel">
      <div className="month-bar"><button type="button" aria-label="Mês anterior" disabled={offset===0} onClick={()=>setOffset(v=>v-1)}><ChevronLeft size={18}/></button><h3 aria-live="polite">{first.toLocaleDateString('pt-BR',{timeZone:'UTC',month:'long',year:'numeric'})}</h3><button type="button" aria-label="Próximo mês" disabled={month>=end.slice(0,7)} onClick={()=>setOffset(v=>v+1)}><ChevronRight size={18}/></button></div>
      <div className="weekdays" aria-hidden="true">{['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(day=><span key={day}>{day}</span>)}</div>
      <div className="calendar-days" role="group" aria-label="Dias da agenda demonstrativa">{Array.from({length:leading},(_,i)=><span key={`blank-${i}`} aria-hidden="true"/>)}{Array.from({length:days},(_,i)=>{
        const day=`${month}-${String(i+1).padStart(2,'0')}`;
        const enabled=availableTimes(day,duration,today,currentMinute,reservations).length>0;
        return <button type="button" key={day} disabled={!enabled} aria-label={`${fullDate(day)}${enabled?', horários de demonstração':', sem horários'}`} aria-pressed={date===day} aria-current={day===today?'date':undefined} className={date===day?'day-selected':enabled?'day-available':''} onClick={()=>onDate(day)}>{i+1}{enabled&&<span aria-hidden="true"/>}</button>;
      })}</div>
      <p className="calendar-legend"><span/> Dias com horários de exemplo</p>
    </div>
    <div className="slots-panel"><div className="slots-heading"><CalendarDays size={21}/><div><h3>{selectedTitle}</h3><p>{duration} min de atendimento · horário de Brasília</p></div></div>
      {!date?<div className="slots-empty"><Clock3 size={28}/><p>Um dia para cuidar de você.</p><span>Selecione um dos dias destacados para ver os horários.</span></div>:times.length?<><div className="time-slots-grid" role="group" aria-label="Horários de demonstração">{times.map(slot=><button type="button" key={slot} aria-pressed={time===slot} className={time===slot?'time-selected':''} onClick={()=>onTime(slot)}>{time===slot&&<Check size={14}/>} {slot}</button>)}</div><p className="slot-status" aria-live="polite">{time?`Sua escolha: ${time}. A reserva ainda não foi realizada.`:'Escolha o horário que prefere.'}</p></>:<div className="slots-empty"><Clock3 size={28}/><p>Sem horários para esta duração.</p><span>Escolha outro dia ou ajuste os serviços selecionados.</span></div>}
    </div>
  </div>;
}
