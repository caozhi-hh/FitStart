const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 通用请求函数
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// 器械 API
export const equipmentApi = {
  getAll: (category?: string) => {
    const params = category ? `?category=${category}` : '';
    return request<any[]>(`/equipment${params}`);
  },
  getById: (id: string) => request<any>(`/equipment/${id}`),
  getCategories: () => request<string[]>('/equipment/categories/list'),
};

// 食谱 API
export const recipeApi = {
  getAll: (type?: string) => {
    const params = type ? `?type=${type}` : '';
    return request<any[]>(`/recipes${params}`);
  },
  getById: (id: string) => request<any>(`/recipes/${id}`),
  getTypes: () => request<string[]>('/recipes/types/list'),
};

// 训练计划 API
export const workoutApi = {
  getAll: (level?: string) => {
    const params = level ? `?level=${level}` : '';
    return request<any[]>(`/workout-plans${params}`);
  },
  getById: (id: string) => request<any>(`/workout-plans/${id}`),
};

// 文章 API
export const articleApi = {
  getAll: (category?: string) => {
    const params = category ? `?category=${category}` : '';
    return request<any[]>(`/articles${params}`);
  },
  getById: (id: string) => request<any>(`/articles/${id}`),
  create: (data: any) => request<any>('/articles', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// 认证 API
export const authApi = {
  register: (data: { username: string; email: string; password: string }) =>
    request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  me: () => request<any>('/auth/me'),
};

// AI 助手 API（待实现）
export const aiApi = {
  chat: (message: string) =>
    request<{ response: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
};
