import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  const adminUser = { username: 'admin', win: 0, loss: 0, tie: 0, password: 'password' };
  const testUser = { username: 'test', win: 0, loss: 0, tie: 0, password: 'password' };

  const hashedUsers = await Promise.all([adminUser, testUser].map(async (user) => {
    return {
      ...user,
      password: await bcrypt.hash(user.password, 10) // Async hash for bcrypt
    };
  }));

    await User.bulkCreate(hashedUsers);
};

export const addUser = async (_username: string, _password: string) => {
  const newUser =  [{ username: _username, win: 0, loss: 0, tie: 0, password: _password}];

  const hashedUsers = await newUser.map(user => {
      return {
        ...user,
        password: bcrypt.hashSync(user.password, 10)
      }
    });

  await User.bulkCreate(hashedUsers);
};
