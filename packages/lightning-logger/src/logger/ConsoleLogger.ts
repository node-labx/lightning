import ConsoleTransport from '../transport/ConsoleTransport';
import { ConsoleLoggerOptions } from '../typings';
import CoreLogger from './CoreLogger';

export default class ConsoleLogger extends CoreLogger {
  constructor(options: ConsoleLoggerOptions = {}) {
    super(options);
    this.addTransport('defaultConsoleTransport', new ConsoleTransport());
  }
}
