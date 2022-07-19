import { Transport } from '../../src/index';

test('enabled & enable & disable', () => {
  const transport = new Transport({});

  expect(transport.enabled).toBeTruthy();
  transport.disable();
  expect(transport.enabled).toBeFalsy();
  transport.enable();
  expect(transport.enabled).toBeTruthy();
  expect(transport.enabled).toBeTruthy();
});

test('shouldLog', () => {
  const transport = new Transport({
    level: 'warn',
  });
  expect(transport.shouldLog('info')).toBeFalsy();
  expect(transport.shouldLog('warn')).toBeTruthy();
  expect(transport.shouldLog('error')).toBeTruthy();
});
