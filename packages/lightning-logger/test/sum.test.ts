import sum from '../src/sum';

test('add 1+1=2', () => {
  expect(sum(1, 2)).toBe(3);
});
