import { Request } from 'express';
import { Types } from 'mongoose';

// User interface for the database model
export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dream interface for the database model
export interface IDream {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  content: string;
  date: Date;
  mood: 'happy' | 'sad' | 'scared' | 'confused' | 'excited' | 'neutral';
  tags: string[];
  isLucid: boolean;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extended Request with user info (after auth middleware)
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
