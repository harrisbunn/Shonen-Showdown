import { Router } from 'express';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Users } from '../../models/userModel.js';
import { PasswordChange } from '../../models/passwordChange.js';

const router = Router();

// POST / - Create a new user
router.post('/', async (req: Request, res: Response) => {
    try {
      const newUser = req.body;
  
      newUser.password = await bcrypt.hash(req.body.password, 10);
  
      const userData = await Users.create(newUser);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
});


// PUT /change-password - Change user password
router.put('/change-password', async (req: Request, res: Response) => {
    try {
      const { userId, password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const passwordChange = await PasswordChange.create({
        userId,
        password: hashedPassword,
      });
  
      res.status(200).json(passwordChange);
    } catch (err) {
      res.status(400).json(err);
    }
});

export { router as userRoutes };