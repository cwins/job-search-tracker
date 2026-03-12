export type AuthUser = {
  id: string;
  username: string;
};

async function jsonFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    credentials: 'include'
  });

  const data = (await res.json().catch(() => ({}))) as T;
  if (!res.ok) {
    throw Object.assign(new Error('Request failed'), { status: res.status, data });
  }

  return data;
}

export async function signup(username: string, password: string) {
  return jsonFetch<{ user: AuthUser }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}

export async function login(username: string, password: string) {
  return jsonFetch<{ user: AuthUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}

export async function logout() {
  return jsonFetch<{ ok: true }>('/auth/logout', { method: 'POST' });
}

export async function me() {
  return jsonFetch<{ user: AuthUser | null }>('/auth/me', { method: 'GET' });
}
