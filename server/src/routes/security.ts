import { Router, Request, Response } from 'express';
import { Users } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password} = req.body;

  const user = await Users.findOne({
    where: { username },
  });

  const userId = user?.id;

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username, userId }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export { router as securityRoutes };
