import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
export function useNotices() {
  const [notices, setNotices] = useState([]); const [isLoading, setLoading] = useState(true); const [error, setError] = useState(null);
  const reload = useCallback(async () => { setLoading(true); setError(null); try { const posts = await api.list('posts?_limit=10'); const demoText = [
    { title: 'Organize seus prazos acadêmicos', body: 'Anote datas de provas e entregas na aba Tarefas para acompanhar suas atividades durante o semestre.' },
    { title: 'Planeje sua semana de estudos', body: 'Reserve um período para revisar os conteúdos das disciplinas e manter sua rotina organizada.' },
    { title: 'Acompanhe suas atividades', body: 'Use o CampusGo para registrar tarefas importantes e marcar o que já foi concluído.' },
    { title: 'Consulte os canais oficiais', body: 'Para informações sobre matrícula, calendário e serviços, confira os canais oficiais do IESB.' },
    { title: 'Organização faz diferença', body: 'Divida trabalhos maiores em etapas menores e acompanhe os prazos com antecedência.' },
    { title: 'Cuide do seu planejamento', body: 'Reserve alguns minutos para revisar suas tarefas e compromissos da semana.' },
    { title: 'Acompanhe seu orçamento', body: 'A aba Bolso apresenta um resumo demonstrativo para ajudar no acompanhamento das despesas.' },
    { title: 'Mantenha suas tarefas atualizadas', body: 'Marque as atividades concluídas e revise sua lista sempre que seus planos mudarem.' },
    { title: 'Uma rotina mais organizada', body: 'Reúna lembretes e atividades acadêmicas para consultar tudo com mais facilidade.' },
    { title: 'Bem-vindo ao CampusGo', body: 'Este aplicativo reúne ferramentas demonstrativas para apoiar a organização da rotina universitária.' },
  ]; setNotices(posts.map((post, index) => ({ ...post, ...demoText[index % demoText.length] }))); } catch (e) { setError(e.message || 'Não foi possível carregar os avisos.'); } finally { setLoading(false); } }, []);
  useEffect(() => { reload(); }, [reload]);
  return { notices, isLoading, error, reload };
}
