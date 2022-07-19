import { LevelLabel, LevelValues } from '../level';
import { Level, LogData, TransportOptions } from '../typings';
import { assign } from '../util/helper';

export default class Transport {
  options: TransportOptions;

  constructor(options: TransportOptions) {
    this.options = assign(
      {
        level: LevelLabel.INFO,
        name: this.constructor.name,
        enabled: true,
      },
      options,
    );
  }

  get enabled() {
    return this.options.enabled;
  }

  enable() {
    this.options.enabled = true;
  }

  disable() {
    this.options.enabled = false;
  }

  shouldLog(level: Level) {
    if (!this.options.enabled) {
      return false;
    }

    return LevelValues[level] >= LevelValues[this.options.level!];
  }

  /**
   * will close the exists write stream and create a new one.
   */
  reload(): void {}

  /**
   * close Transport
   */
  close(): void {}

  /**
   * Transport log method
   */
  log(data: LogData) {}

  /**
   * write log to file, stdout/stderr and network.
   */
  write(data: string): void {}
}
