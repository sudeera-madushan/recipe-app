import { verifyToken } from '../utils/jwt';

export const authenticate = (handler: any) => (req: any, res: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = verifyToken(token);
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
