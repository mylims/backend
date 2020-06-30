import { Role } from '../../generated/graphql';
import { createToken, hashing, getUserFromToken } from '../auth';
import { randomId } from '../fake';

const user = {
  name: 'test',
  email: 'test',
  role: 'ADMIN' as Role,
};

describe('auth functions', () => {
  it('salt and hash', () => {
    const salt = randomId(16);
    expect(salt).toHaveLength(16);
    const pass = 'test';
    const hash = hashing(pass, salt);
    expect(hash).not.toBe(hashing('other', salt));
    expect(hash).not.toBe(hashing(pass, randomId(16)));
  });

  it('jwt tokens', () => {
    const token = createToken(user);
    const fromToken = getUserFromToken(token);
    expect(fromToken).not.toBeNull();
    const { name, email, role } = JSON.parse(JSON.stringify(fromToken));
    expect(name).toBe(user.name);
    expect(email).toBe(user.email);
    expect(role).toBe(user.role);
  });
});
