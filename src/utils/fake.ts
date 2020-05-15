import crypto from 'crypto';

export function randomId(len: number) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .substring(0, len)
    .toString();
}
