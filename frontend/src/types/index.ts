// 器械类型
export interface Equipment {
  id: string;
  name: string;
  category: string;
  target_muscle: string;
  description: string;
  instructions: string;
  common_mistakes: string;
  image_url?: string;
  video_url?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// 食谱类型
export interface Recipe {
  id: string;
  name: string;
  type: string;
  description: string;
  ingredients: string;
  steps: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image_url?: string;
  prep_time: number;
}

// 训练计划类型
export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  days_per_week: number;
  schedule: Record<string, DaySchedule>;
}

export interface DaySchedule {
  name: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  note?: string;
}

// 文章类型
export interface Article {
  id: string;
  user_id?: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  cover_image_url?: string;
  views: number;
  likes: number;
  created_at: string;
  updated_at?: string;
}

// 用户类型
export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
}

// API 响应类型
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
