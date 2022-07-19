import { datetimeFormat, getStackFilePath } from '../../src/util/helper';

test('# getStackFilePath', () => {
  expect(getStackFilePath() === '-:-').toBeTruthy();
  expect(getStackFilePath(0) === '-:-').toBeTruthy();
  expect(getStackFilePath(1)).toContain('test/util/helper.test.ts');
});

test('# datetimeFormat', () => {
  expect(datetimeFormat(1658063691453) === '2022-07-17 21:14:51,453').toBeTruthy();
});
