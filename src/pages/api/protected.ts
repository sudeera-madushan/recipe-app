import { authenticate } from '../../middleware/auth';

function handler(req: any, res: any) {
  res.status(200).json({ message: 'Authorized', user: req.user });
}

export default authenticate(handler);