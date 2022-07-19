function isType(type: string) {
  return function(val: unknown): boolean {
    return Object.prototype.toString.call(val).toLowerCase() === `[object ${type}]`;
  };
}
export const isDate = isType('date');
export const isRegExp = isType('regexp');

export const isString = (val: unknown): val is string => typeof val === 'string';
export const isNumber = (val: unknown): val is number => typeof val === 'number';
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';
export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined';
export const isBigint = (val: unknown): val is bigint => typeof val === 'bigint';
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';

export const isNull = (val: unknown): val is null => val === null;
export const isFunction = (val: unknown) => typeof val === 'function';
export const isNullOrUndefined = (val: unknown) => val == null;

export function isPrimitive(val: unknown) {
  const type = typeof val;
  return (
    val === null ||
    ['number', 'string', 'boolean', 'undefined', 'symbol', 'bigint'].indexOf(type) > -1
  );
}

export function isClass(fn: unknown) {
  if (typeof fn !== 'function') {
    return false;
  }
  return Function.prototype.toString.call(fn).indexOf('class ') > -1;
}

export function isPlainObject<Value = unknown>(
  value: unknown,
): value is Record<PropertyKey, Value> {
  // From: https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
}
