import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import JWTMiddleware from '../auth/JWT.middleware';

type LoginInput = {
  username: string;
  password: string;
};

async function login({ username, password }: LoginInput): Promise<string> {
  const user = await UserModel.findOne({ where: { username } });

  if (!user) {
    throw new Error('Username or password invalid');
  }

  const isPasswordValid = await bcrypt.compare(password, user.get('password') as string);

  if (!isPasswordValid) {
    throw new Error('Username or password invalid');
  }

  const token = JWTMiddleware
    .sign({ id: user.get('id') as number, username: user.get('username') as string });

  return token;
}

export default {
  login,
};
