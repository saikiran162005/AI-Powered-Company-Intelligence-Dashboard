import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { environment } from '../config/environment';

export const corsMiddleware = cors({
  origin: environment.cors.origin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
});
