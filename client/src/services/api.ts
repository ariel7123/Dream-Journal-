const API_URL = "/api";

// Helper function to get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Helper function to make API requests
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

// Auth API
export const authAPI = {
  register: (name: string, email: string, password: string) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request("/auth/me"),
};

// Dreams API
export const dreamsAPI = {
  getAll: () => request("/dreams"),

  getOne: (id: string) => request(`/dreams/${id}`),

  create: (dream: {
    title: string;
    content: string;
    date?: string;
    mood?: string;
    tags?: string[];
    isLucid?: boolean;
  }) =>
    request("/dreams", {
      method: "POST",
      body: JSON.stringify(dream),
    }),

  update: (
    id: string,
    dream: Partial<{
      title: string;
      content: string;
      date: string;
      mood: string;
      tags: string[];
      isLucid: boolean;
      isFavorite: boolean;
    }>
  ) =>
    request(`/dreams/${id}`, {
      method: "PUT",
      body: JSON.stringify(dream),
    }),

  delete: (id: string) =>
    request(`/dreams/${id}`, {
      method: "DELETE",
    }),

  toggleFavorite: (id: string) =>
    request(`/dreams/${id}/favorite`, {
      method: "PATCH",
    }),
};
