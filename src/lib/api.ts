import type {Ticket,TicketInput} from './types';
const base=(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API=`${base}/api/tickets`;
const demo=import.meta.env.PROD && !base;
const key='deskflow-pro-demo-tickets-v1';
function initial():Ticket[]{const now=new Date().toISOString();return [
['DF-1001','Configurar acesso à VPN','Acesso','Alta','Em andamento','Ana Oliveira'],
['DF-1002','Notebook não inicia','Hardware','Crítica','Aberto','Carlos Silva'],
['DF-1003','Instalação de software','Software','Média','Resolvido','Fernanda Lima'],
['DF-1004','Lentidão na rede Wi-Fi','Redes','Média','Em andamento','Beatriz Souza']
].map(([id,title,category,priority,status,requester])=>({id,title,description:'Chamado fictício para demonstração',category,priority:priority as Ticket['priority'],status:status as Ticket['status'],requester,assignee:'Marcos',createdAt:now,updatedAt:now}));}
function read():Ticket[]{const raw=localStorage.getItem(key);if(raw){try{const items=JSON.parse(raw) as Ticket[];if(Array.isArray(items))return items;}catch{}}const items=initial();localStorage.setItem(key,JSON.stringify(items));return items;}
function write(items:Ticket[]){localStorage.setItem(key,JSON.stringify(items));}
async function request<T>(url:string,options?:RequestInit):Promise<T>{const response=await fetch(url,{...options,headers:{'Content-Type':'application/json',...options?.headers}});if(!response.ok){let msg=`Erro HTTP ${response.status}`;try{const body=await response.json();msg=body.error||msg;}catch{}throw new Error(msg);}return response.json() as Promise<T>;}
export const ticketApi=demo?{
list:async()=>read(),
create:async(data:TicketInput)=>{const items=read();const id=`DF-${Math.max(1000,...items.map(t=>Number(t.id.replace('DF-',''))||1000))+1}`;const now=new Date().toISOString();const item:Ticket={...data,id,createdAt:now,updatedAt:now};write([item,...items]);return item;},
update:async(id:string,data:Partial<TicketInput>)=>{const items=read();const i=items.findIndex(t=>t.id===id);if(i<0)throw new Error('Chamado não encontrado');items[i]={...items[i],...data,updatedAt:new Date().toISOString()};write(items);return items[i];},
remove:async(id:string)=>{write(read().filter(t=>t.id!==id));return {ok:true};}
}:{
list:()=>request<Ticket[]>(API),create:(data:TicketInput)=>request<Ticket>(API,{method:'POST',body:JSON.stringify(data)}),update:(id:string,data:Partial<TicketInput>)=>request<Ticket>(`${API}/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify(data)}),remove:(id:string)=>request<{ok:boolean}>(`${API}/${encodeURIComponent(id)}`,{method:'DELETE'})};
