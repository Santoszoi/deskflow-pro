import type {Ticket,TicketInput} from './types';
const base=(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API=`${base}/api/tickets`;
async function request<T>(url:string,options?:RequestInit):Promise<T>{const response=await fetch(url,{...options,headers:{'Content-Type':'application/json',...options?.headers}});if(!response.ok){let msg=`Erro HTTP ${response.status}`;try{const body=await response.json();msg=body.error||msg;}catch{}throw new Error(msg);}return response.json() as Promise<T>;}
export const ticketApi={list:()=>request<Ticket[]>(API),create:(data:TicketInput)=>request<Ticket>(API,{method:'POST',body:JSON.stringify(data)}),update:(id:string,data:Partial<TicketInput>)=>request<Ticket>(`${API}/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify(data)}),remove:(id:string)=>request<{ok:boolean}>(`${API}/${encodeURIComponent(id)}`,{method:'DELETE'})};
