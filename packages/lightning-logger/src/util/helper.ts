import path from 'path';

const prepareStackTrace = (dummyObject: any, v8StackTrace: NodeJS.CallSite[]) => {
  let filepath = '-';
  let lineno = '-' as string | number;

  const frame = v8StackTrace[Error.stackTraceLimit - 1];
  if (frame) {
    const filename = frame.getFileName() || '';
    filepath = path.relative(process.cwd(), filename);
    lineno = frame.getLineNumber() as number;
  }

  return `${filepath}:${lineno}`;
};

export function getStackFilePath(callSiteFrameIndex: number = 0): string {
  const oldLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = callSiteFrameIndex;
  const dummyObject = {} as any;

  const v8Handler = Error.prepareStackTrace;
  Error.prepareStackTrace = prepareStackTrace;
  Error.captureStackTrace(dummyObject, getStackFilePath);

  // 避免 v8 懒加载
  // tslint:disable-next-line:no-unused-expression
  dummyObject.stack;
  Error.prepareStackTrace = v8Handler;
  Error.stackTraceLimit = oldLimit;

  return dummyObject.stack;
}

function leftPad(num: number) {
  if (num < 10) {
    return '0' + num;
  } else {
    return String(num);
  }
}

// YYYY-MM-DD HH:mm:ss,SSS
export function datetimeFormat(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return `${year}-${leftPad(month)}-${leftPad(day)} ${leftPad(hours)}:${leftPad(minutes)}:${leftPad(
    seconds,
  )},${milliseconds}`;
}

// Like `Object.assign`, but don't copy `undefined` value
export function assign(target: any, ...sources: any[]) {
  if (!target) {
    return {};
  }
  sources.forEach(source => {
    if (!source) {
      return;
    }
    Object.keys(source).forEach(key => {
      if (source[key] !== undefined && source[key] !== null) {
        target[key] = source[key];
      }
    });
  });
  return target;
}
