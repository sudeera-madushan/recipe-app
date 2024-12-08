import { signToken } from '../../utils/jwt';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    
    if (username === 'test' && password === 'password') {
      const token = signToken({ id: 1, username: 'test' });
      return res.status(200).json({ token });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
