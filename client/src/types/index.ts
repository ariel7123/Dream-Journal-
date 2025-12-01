// User type
export interface User {
  id: string;
  email: string;
  name: string;
}

// Dream type
export interface Dream {
  _id: string;
  user: string;
  title: string;
  content: string;
  date: string;
  mood: 'happy' | 'sad' | 'scared' | 'confused' | 'excited' | 'neutral';
  tags: string[];
  isLucid: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Context type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
}
