const base = process.env.EXPO_PUBLIC_API_URL;
if (!base) console.warn('EXPO_PUBLIC_API_URL não definida');
async function request(path, options) {
  const response = await fetch(`${base}/${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
  return response.json();
}
export const api = { list: path => request(path), create: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }) };
