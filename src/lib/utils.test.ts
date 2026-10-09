import {describe,it,expect} from 'vitest';
import {filterTickets,summarize} from './utils';
import type {Ticket} from './types';
const ticket=(id:string,status:Ticket['status'],priority:Ticket['priority']):Ticket=>({id,title:`Chamado ${id}`,description:'Problema na rede',category:'Redes',status,priority,assignee:'Marcos',requester:'Ana',createdAt:'2026-10-01T12:00:00Z',updatedAt:'2026-10-01T12:00:00Z'});
const data=[ticket('DF-1','Aberto','Crítica'),ticket('DF-2','Em andamento','Média'),ticket('DF-3','Resolvido','Alta')];
describe('sumarização dos chamados',()=>{it('calcula os indicadores corretamente',()=>{expect(summarize(data)).toEqual({total:3,open:1,inProgress:1,resolved:1,critical:1});});it('trata lista vazia',()=>{expect(summarize([]).total).toBe(0);});});
describe('filtros de chamados',()=>{it('filtra por status e prioridade',()=>{expect(filterTickets(data,'','Aberto','Crítica')).toHaveLength(1);});it('busca sem diferenciar maiúsculas',()=>{expect(filterTickets(data,'CHAMADO DF-2','Todos','Todas')[0].id).toBe('DF-2');});it('retorna todos sem filtros',()=>{expect(filterTickets(data,'','Todos','Todas')).toHaveLength(3);});});
