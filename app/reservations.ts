export type Reservation = {
 id:string; createdAt:string; date:string; time:string; duration:number; total:number;
 name:string; phone:string;
 services:{id:number;name:string;price:number;time:number}[];
};
export const RESERVATIONS_KEY='forma.reservations.v1';
export const DRAFT_KEY='forma.draft.v1';
export function parseReservations(raw:string|null):Reservation[]{
 if(raw===null)return [];
 const data:unknown=JSON.parse(raw);
 if(!Array.isArray(data)||!data.every(isReservation))throw new Error('Invalid reservation storage');
 return data;
}
function isReservation(value:unknown):value is Reservation{
 if(!value||typeof value!=='object')return false;
 const item=value as Reservation;
 return typeof item.id==='string'&&typeof item.createdAt==='string'&&typeof item.name==='string'&&typeof item.phone==='string'
  &&typeof item.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(item.date)&&!Number.isNaN(new Date(`${item.date}T12:00:00Z`).getTime())
  &&typeof item.time==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(item.time)
  &&Number.isFinite(item.duration)&&item.duration>0&&item.duration<=540&&Number.isFinite(item.total)&&item.total>=0
  &&Array.isArray(item.services)&&item.services.length>0&&item.services.every(service=>typeof service.name==='string'&&Number.isFinite(service.id)&&Number.isFinite(service.price)&&service.price>=0&&Number.isFinite(service.time)&&service.time>0);
}
