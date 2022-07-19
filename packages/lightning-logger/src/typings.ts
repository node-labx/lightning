import Transport from './transport/Transport';

export type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface CoreLoggerOptions {
  /**
   * The name of the logger. Default: `undefined`.
   */
  name?: string;

  level?: Level;

  transports?: Array<Transport>;

  /**
   * Enables logging. Default: `true`.
   */
  enabled?: boolean;
}

export interface ConsoleLoggerOptions extends CoreLoggerOptions {}

export interface FileLoggerOptions extends CoreLoggerOptions {
  file: string;
}

export interface LoggerOptions extends CoreLoggerOptions {
  enableConsole?: boolean;
  enableFile?: boolean;
  file?: string;
}

export interface TransportOptions {
  // The name of the transport
  name?: string;

  // Level of messages that this transport should log
  level?: Level;

  enabled?: boolean;
}

export interface ConsoleTransportOptions extends TransportOptions {}

export interface FileTransportOptions extends TransportOptions {
  file: string;

  // log file encoding. Default: `utf-8`
  encoding?: BufferEncoding;
}

export interface FileStreamTransportOptions extends TransportOptions {}

export interface StreamTransportOptions extends TransportOptions {
  stream: NodeJS.WritableStream;
  eol?: string;
}

export interface HttpTransportOptions extends TransportOptions {}

export interface LogData {
  level: Level;
  pid: number;
  timestamp: number;
  datetime: string;
  hostIp: string;
  tags: {
    [key: string]: any;
  };
  location: string;
  msg?: string;
  message?: string;
  stack?: string;
  splats?: any[];
  [key: string]: any;
}
