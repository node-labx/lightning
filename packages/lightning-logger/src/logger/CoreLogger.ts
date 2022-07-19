// @ts-ignore
import { version } from '../../package.json';
import Transport from '../transport/Transport';
import { CoreLoggerOptions, Level, LogData } from '../typings';
import { assign, datetimeFormat, getStackFilePath } from '../util/helper';
import { isPlainObject, isString } from '../util/is-type';
import { pid, hostIp } from '../meta';
import { LevelLabel, LevelValues } from '../level';

export default class CoreLogger {
  static readonly version = version;
  readonly version: string = version;
  readonly name?: string;
  readonly level: Level;

  // A logger can contains multi transports.
  private transports: Map<string, Transport>;
  options: CoreLoggerOptions;

  constructor(options: CoreLoggerOptions = {}) {
    this.options = assign(
      {
        level: LevelLabel.INFO,
        name: this.constructor.name,
      },
      options,
    );

    this.name = this.options.name;
    this.level = this.options.level!;
    this.transports = new Map();
  }

  addTransport(name: string, transport: Transport): CoreLogger {
    if (this.getTransport(name)) {
      throw new Error(`transport "${name}" has exists.`);
    }
    this.transports.set(name, transport);
    return this;
  }

  removeTransport(name: string) {
    return this.transports.delete(name);
  }

  getTransport(name: string) {
    return this.transports.get(name);
  }

  disableTransport(name: string) {
    this.transports.get(name)?.disable();
  }

  enableTransport(name: string) {
    this.transports.get(name)?.enable();
  }

  reloadTransport(name: string) {
    this.getTransport(name)?.reload();
  }

  reloadAllTransports() {
    for (const transport of this.transports.values()) {
      transport.reload();
    }
  }

  closeTransport(name: string) {
    this.getTransport(name)?.close();
  }

  closeAllTransports() {
    for (const transport of this.transports.values()) {
      transport.close();
    }
  }

  /**
   * Send log to all transports
   */
  log(level: Level, ...args: any[]) {
    if (LevelValues[level] < LevelValues[this.level]) {
      return;
    }

    const now = Date.now();
    const logData: LogData = {
      level,
      pid,
      timestamp: now,
      datetime: datetimeFormat(now),
      hostIp,
      tags: {},
      location: getStackFilePath(3),
    };

    if (args.length === 0) {
      throw new Error('Param cannot be empty');
    } else if (args.length === 1) {
      const value = args[0];
      if (value instanceof Error) {
        logData.message = value.message;
        logData.stack = value.stack;
        logData.msg = logData.message;
      } else if (isString(value)) {
        logData.msg = value;
      } else if (isPlainObject(value)) {
        logData.tags = Object.assign(logData.tags, value);
      } else {
        throw new Error('param error');
      }
    } else if (args.length === 2) {
      if (isString(args[0]) && args[1] instanceof Error) {
        logData.msg = args[0];
        logData.message = args[1].message;
        logData.stack = args[1].stack;
      } else if (isString(args[0]) && isPlainObject(args[1])) {
        logData.msg = args[0];
        logData.tags = Object.assign(logData.tags, args[1]);
      } else {
        logData.msg = args[0];
        logData.splats = [args[1]];
      }
    } else {
      if (isString(args[0])) {
        logData.msg = args[0];
        logData.splats = args.slice(1);
      } else {
        throw new Error('param error');
      }
    }

    for (const transport of this.transports.values()) {
      transport.log(logData);
    }
  }

  trace(...args: any[]) {
    return this.log(LevelLabel.TRACE, ...args);
  }

  debug(...args: any[]) {
    return this.log(LevelLabel.DEBUG, ...args);
  }

  info(msg: string): void;
  info(error: Error): void;
  info(obj: { [key: string]: any }): void;
  info(msg: string, error: Error): void;
  info(msg: string, obj: { [key: string]: any }): void;
  info(msg: string, ...splat: any[]): void;
  info(...args: any[]) {
    return this.log(LevelLabel.INFO, ...args);
  }

  warn(...args: any[]) {
    return this.log(LevelLabel.WARN, ...args);
  }

  error(...args: any[]) {
    return this.log(LevelLabel.ERROR, ...args);
  }

  fatal(...args: any[]) {
    return this.log(LevelLabel.FATAL, ...args);
  }
}
