// 根据环境自动选择 API 地址
const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// 器械 API
export const equipmentApi = {
  getAll: (category?: string) => {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    return fetchApi<Equipment[]>(`/equipment${params}`);
  },
  getById: (id: string) => fetchApi<Equipment>(`/equipment/${id}`),
  getCategories: () => fetchApi<string[]>('/equipment/categories/list'),
};

// 食谱 API
export const recipesApi = {
  getAll: (type?: string) => {
    const params = type ? `?type=${encodeURIComponent(type)}` : '';
    return fetchApi<Recipe[]>(`/recipes${params}`);
  },
  getById: (id: string) => fetchApi<Recipe>(`/recipes/${id}`),
  getTypes: () => fetchApi<string[]>('/recipes/types/list'),
};

// 训练计划 API
export const workoutPlansApi = {
  getAll: (level?: string) => {
    const params = level ? `?level=${encodeURIComponent(level)}` : '';
    return fetchApi<WorkoutPlan[]>(`/workout-plans${params}`);
  },
  getById: (id: string) => fetchApi<WorkoutPlan>(`/workout-plans/${id}`),
};

// 文章 API
export const articlesApi = {
  getAll: (category?: string, limit = 20, offset = 0) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    params.append('limit', String(limit));
    params.append('offset', String(offset));
    return fetchApi<Article[]>(`/articles?${params}`);
  },
  getById: (id: string) => fetchApi<Article>(`/articles/${id}`),
  create: (data: Partial<Article>) =>
    fetchApi<Article>('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  like: (id: string) =>
    fetchApi<Article>(`/articles/${id}/like`, { method: 'POST' }),
};

// 认证 API
export const authApi = {
  register: (username: string, email: string, password: string) =>
    fetchApi<{ message: string; token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),
  login: (email: string, password: string) =>
    fetchApi<{ message: string; token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// 导入类型
import type { Equipment, Recipe, WorkoutPlan, Article, User } from '../types';
