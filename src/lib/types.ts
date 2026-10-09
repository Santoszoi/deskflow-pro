export type TicketStatus = 'Aberto' | 'Em andamento' | 'Resolvido';
export type Priority = 'Baixa' | 'Média' | 'Alta' | 'Crítica';
export type Ticket = {id:string;title:string;description:string;category:string;priority:Priority;status:TicketStatus;assignee:string;requester:string;createdAt:string;updatedAt:string};
export type TicketInput = Pick<Ticket,'title'|'description'|'category'|'priority'|'status'|'assignee'|'requester'>;
