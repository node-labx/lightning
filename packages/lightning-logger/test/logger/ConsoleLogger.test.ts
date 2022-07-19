import ConsoleLogger from '../../src/logger/ConsoleLogger';

test('ConsoleLogger#new ConsoleLogger()', () => {
  const logger = new ConsoleLogger();
  const transport = logger.getTransport('defaultConsoleTransport');

  expect(logger.name).toBe('ConsoleLogger');
  expect(logger.level).toBe('info');
});
