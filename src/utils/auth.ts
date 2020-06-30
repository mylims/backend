import { createHmac } from 'crypto';

import { verify, sign } from 'jsonwebtoken';

import { Role } from '../generated/graphql';

interface User {
  name: string;
  email: string;
  role: Role;
}

const secret = 'catpack';
const expiration = '7d';

export function getUserFromToken(token: string) {
  if (!token) return null;
  try {
    const user = verify(token, secret, { maxAge: expiration });
    return user;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return null;
  }
}

export function createToken(user: User) {
  return sign(user, secret, { expiresIn: expiration });
}

export function hashing(password: string, salt: string) {
  return createHmac('sha512', salt).update(password).digest('hex');
}
