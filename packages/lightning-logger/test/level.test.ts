import { LevelValues, LevelLabel } from '../src/level';

test('# LevelValues', () => {
  expect(LevelValues).toEqual({
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  });
});

test('# LevelLabel', () => {
  expect(LevelLabel.TRACE).toBe('trace');
  expect(LevelLabel.DEBUG).toBe('debug');
  expect(LevelLabel.INFO).toBe('info');
  expect(LevelLabel.WARN).toBe('warn');
  expect(LevelLabel.ERROR).toBe('error');
  expect(LevelLabel.FATAL).toBe('fatal');
});
