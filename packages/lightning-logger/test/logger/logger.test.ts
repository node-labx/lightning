import Logger from '../../src/logger/Logger';
import ConsoleTransport from '../../src/transport/ConsoleTransport';
import FileTransport from '../../src/transport/FileTransport';

test('new Logger', () => {
  const logger = new Logger({
    name: 'my-name',
  });
  expect(logger.name).toBe('my-name');
  expect(logger.level).toBe('info');
  expect(logger.getTransport('defaultConsoleTransport')).toBeInstanceOf(ConsoleTransport);
  expect(logger.getTransport('defaultFileTransport')).toBeInstanceOf(FileTransport);
});

test('# enableConsole', () => {
  const logger = new Logger({
    enableConsole: false,
  });
  expect(logger.getTransport('defaultConsoleTransport')).toBeUndefined();
});

test('enableFile', () => {
  const logger = new Logger({
    enableFile: false,
  });
  expect(logger.getTransport('defaultFileTransport')).toBeUndefined();
});

test('', () => {
  const logger = new Logger();
  // console.log(logger);
});
