import fs from 'fs';
import path from 'path';
import { FileTransportOptions, LogData } from '../typings';
import { assign } from '../util/helper';
import Transport from './Transport';

/* istanbul ignore next */
export default class FileTransport extends Transport {
  options: FileTransportOptions;
  private stream: fs.WriteStream;

  constructor(options: FileTransportOptions) {
    super(options);
    this.options = assign(
      {
        encoding: 'utf-8',
      },
      options,
    );

    const dirname = path.dirname(this.options.file);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, {
        recursive: true,
      });
    }

    this.stream = fs.createWriteStream(this.options.file, {
      encoding: this.options.encoding,
      flags: 'a',
    });
  }

  log(data: LogData) {
    // const msg = JSON.stringify(data);
    let msg = '{';
    for (let item in data) {
      msg += `"${item}":"${data[item]}",`;
    }
    msg += '}';

    this.write(msg);
  }

  write(msg: string) {
    this.stream.write(msg + '\n');
  }

  close(): void {
    this.stream.end(() => {
      console.log('stream end.');
    });
  }
}
