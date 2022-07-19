import FileTransport from '../transport/FileTransport';
import { FileLoggerOptions } from '../typings';
import { assign } from '../util/helper';
import CoreLogger from './CoreLogger';

export default class FileLogger extends CoreLogger {
  options: FileLoggerOptions;

  constructor(options: FileLoggerOptions) {
    super(options);
    this.options = assign({}, options);
    this.addTransport(
      'defaultFileTransport',
      new FileTransport({
        file: this.options.file,
      }),
    );
  }
}
