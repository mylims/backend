import { verify, sign } from 'jsonwebtoken';

import { User } from '../generated/graphql';

const secret = 'catpack';

export function getUserFromToken(token: string) {
  if (!token) return null;
  try {
    const user = verify(token, secret);
    return user;
  } catch (e) {
    return null;
  }
}

export function createToken(user: User) {
  return sign(user, secret);
}
