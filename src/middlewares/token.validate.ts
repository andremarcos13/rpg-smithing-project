import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export default class ValidateToken {
  public checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      jwt.verify(token as string, JWT_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}