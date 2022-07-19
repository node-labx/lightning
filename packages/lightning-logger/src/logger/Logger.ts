import CoreLogger from './CoreLogger';
import ConsoleTransport from '../transport/ConsoleTransport';
import FileTransport from '../transport/FileTransport';
import { LoggerOptions } from '../typings';
import { assign } from '../util/helper';
import path from 'path';

export default class Logger extends CoreLogger {
  options: LoggerOptions;

  constructor(options?: LoggerOptions) {
    super(options);
    this.options = assign(
      {
        enableConsole: true,
        enableFile: true,
        file: path.join(process.cwd(), './log/1.log'),
      },
      options,
    );

    if (this.options.enableConsole) {
      this.addTransport('defaultConsoleTransport', new ConsoleTransport());
    }
    if (this.options.enableFile) {
      this.addTransport(
        'defaultFileTransport',
        new FileTransport({
          file: this.options.file!,
        }),
      );
    }
  }
}
