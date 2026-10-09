import type { Ticket, Priority } from './types';
export const priorities:Priority[]=['Baixa','Média','Alta','Crítica'];
export const statusList=['Aberto','Em andamento','Resolvido'] as const;
export const formatDate=(iso:string)=>new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(iso));
export function summarize(tickets:Ticket[]){return {total:tickets.length,open:tickets.filter(t=>t.status==='Aberto').length,inProgress:tickets.filter(t=>t.status==='Em andamento').length,resolved:tickets.filter(t=>t.status==='Resolvido').length,critical:tickets.filter(t=>t.priority==='Crítica'&&t.status!=='Resolvido').length};}
export function filterTickets(tickets:Ticket[],query:string,status:string,priority:string){const q=query.trim().toLocaleLowerCase('pt-BR');return tickets.filter(t=>(!q||[t.id,t.title,t.description,t.assignee,t.requester,t.category].some(v=>v.toLocaleLowerCase('pt-BR').includes(q)))&&(status==='Todos'||t.status===status)&&(priority==='Todas'||t.priority===priority));}
