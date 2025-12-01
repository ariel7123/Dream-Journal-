import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dreamRoutes from './routes/dreamRoutes.js';

// Connect to database
connectDB();

const app: Express = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, // Allow cookies
  })
);

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 Dream Journal API is running!',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dreams', dreamRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   🌙 Dream Journal Server                     ║
║   Running on port ${PORT}                        ║
║   Environment: ${process.env.NODE_ENV || 'development'}                    ║
║                                               ║
╚═══════════════════════════════════════════════╝
  `);
});

export default app;
