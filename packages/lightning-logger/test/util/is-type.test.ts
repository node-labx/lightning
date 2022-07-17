import { isDate, isRegExp, isString } from '../../src/util/is-type';

test('# isDate', () => {
  const date = new Date();
  expect(isDate(date)).toBeTruthy();
});

test('# isRegExp', () => {
  const reg = /abc/g;
  expect(isRegExp(reg)).toBeTruthy();
});

test('# isString', () => {
  expect(isString('abc')).toBeTruthy();
});
