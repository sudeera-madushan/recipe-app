// utils/jwt.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const signToken = (payload: any, options = {}) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h', ...options });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
