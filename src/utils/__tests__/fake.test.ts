import { randomId } from '../fake';

describe('random id', () => {
  it('even number', () => {
    const str = randomId(4);
    expect(str).toHaveLength(4);
  });

  it('odd number', () => {
    const str = randomId(5);
    expect(str).toHaveLength(5);
  });
});
