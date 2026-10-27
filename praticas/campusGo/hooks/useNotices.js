import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
export function useNotices() {
  const [notices, setNotices] = useState([]); const [isLoading, setLoading] = useState(true); const [error, setError] = useState(null);
  const reload = useCallback(async () => { setLoading(true); setError(null); try { setNotices(await api.list('posts?_limit=10')); } catch (e) { setError(e.message || 'Não foi possível carregar os avisos.'); } finally { setLoading(false); } }, []);
  useEffect(() => { reload(); }, [reload]);
  return { notices, isLoading, error, reload };
}
