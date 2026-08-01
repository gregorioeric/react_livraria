const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7808";

async function parseResponse(res) {
  // Porque usar.catch() aqui?
  // Porque se a resposta não for um JSON válido,
  // o método json() lançará um erro. Usando .catch(),
  // podemos capturar esse erro e retornar um objeto
  // vazio em vez de quebrar a aplicação.
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Ocorreu um erro inesperado!");
  }

  return data;
}

export async function loginRequest(user_email, user_password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ user_email, user_password }),
  });

  return parseResponse(res);
}

export async function googleLoginRequest(credential) {
  const res = await fetch(`${API_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ credential }),
  });

  return parseResponse(res);
}

export async function registerRequest(payload) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return parseResponse(res);
}

export async function logoutRequest() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return parseResponse(res);
}
