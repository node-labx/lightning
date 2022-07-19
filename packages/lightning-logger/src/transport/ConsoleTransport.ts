import { ConsoleTransportOptions, LogData } from '../typings';
import Transport from './Transport';

let write: (msg: string) => void;
if (typeof process.stdout?.write === 'function') {
  write = process.stdout.write.bind(process.stdout);
} else {
  console.warn(
    `Unsupport operating environment, process.stdout must be a tty or stream. \n' +
      "Now lightning-logger's console output just use console.log().`,
  );
  write = console.log.bind(console);
}

export default class ConsoleTransport extends Transport {
  constructor(options: ConsoleTransportOptions = {}) {
    super(options);
  }

  log(data: LogData) {
    const tags = Object.keys(data.tags).reduce((prev, cur) => {
      return prev + `${cur}=${data.tags[cur]} `;
    }, '');
    const msg = `${data.level.toUpperCase()} ${data.datetime} ${data.location} ${
      data.hostIp
    } ${tags}${data.msg}\n`;

    this.write(msg);
  }

  write(data: string): void {
    write(data);
  }
}
