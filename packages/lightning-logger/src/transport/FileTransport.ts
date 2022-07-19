import fs from 'fs';
import path from 'path';
import SonicBoom from 'sonic-boom';
import { FileTransportOptions, LogData } from '../typings';
import { assign } from '../util/helper';
import Transport from './Transport';

export default class FileTransport extends Transport {
  options: FileTransportOptions;
  sonic: SonicBoom;

  constructor(options: FileTransportOptions) {
    super(options);
    this.options = assign(
      {
        encoding: 'utf-8',
      },
      options,
    );

    this.sonic = new SonicBoom({
      dest: this.options.file,
      minLength: 0,
      sync: false,
      mkdir: true,
    });
    this.sonic.setMaxListeners(1000);
  }

  log(data: LogData) {
    const msg = JSON.stringify(data);

    this.write(msg);
  }

  write(msg: string) {
    this.sonic.write(msg);
  }

  close(): void {}
}
