import {
  isBoolean,
  isClass,
  isDate,
  isFunction,
  isNull,
  isNullOrUndefined,
  isNumber,
  isPlainObject,
  isPrimitive,
  isRegExp,
  isString,
  isSymbol,
  isUndefined,
} from '../../src/util/is-type';

test('# isDate', () => {
  expect(isDate(new Date())).toBeTruthy();
  expect(isDate(undefined)).toBeFalsy();
  expect(isDate(null)).toBeFalsy();
  expect(isDate(123)).toBeFalsy();
  expect(isDate('abc')).toBeFalsy();
});

test('# isRegExp', () => {
  const reg = /abc/g;
  expect(isRegExp(reg)).toBeTruthy();
});

test('# isString', () => {
  expect(isString('abc')).toBeTruthy();
});

test('# isNumber', () => {
  expect(isNumber(123)).toBeTruthy();
});

test('# isBoolean', () => {
  expect(isBoolean(true)).toBeTruthy();
  expect(isBoolean(false)).toBeTruthy();
});

test('# isUndefined', () => {
  expect(isUndefined(undefined)).toBeTruthy();
  expect(isUndefined(null)).toBeFalsy();
});

test('# isSymbol', () => {
  expect(isSymbol(Symbol('abc'))).toBeTruthy();
});

test('# isNull', () => {
  expect(isNull(null)).toBeTruthy();
});

test('# isFunction', () => {
  expect(isFunction(() => {})).toBeTruthy();
});

test('# isNullOrUndefined', () => {
  expect(isNullOrUndefined(null)).toBeTruthy();
  expect(isNullOrUndefined(undefined)).toBeTruthy();
});

test('# isPrimitive', () => {
  expect(isPrimitive(123)).toBeTruthy();
  expect(isPrimitive('abc')).toBeTruthy();
  expect(isPrimitive(true)).toBeTruthy();
  expect(isPrimitive(false)).toBeTruthy();
  expect(isPrimitive(undefined)).toBeTruthy();
  expect(isPrimitive(Symbol('abc'))).toBeTruthy();
});

test('# isClass', () => {
  class Person {}
  expect(isClass(Person)).toBeTruthy();
});

test('# isPlainObject', () => {
  expect(isPlainObject({})).toBeTruthy();
  expect(isPlainObject(new Object())).toBeTruthy();

  expect(isPlainObject(null)).toBeFalsy();
  expect(isPlainObject(undefined)).toBeFalsy();
  expect(isPlainObject('abc')).toBeFalsy();
  expect(isPlainObject(Symbol('abc'))).toBeFalsy();
  expect(isPlainObject(123)).toBeFalsy();
  expect(isPlainObject(true)).toBeFalsy();
  expect(isPlainObject(false)).toBeFalsy();
  expect(isPlainObject([])).toBeFalsy();
  expect(isPlainObject(() => {})).toBeFalsy();
  expect(isPlainObject(class Peson {})).toBeFalsy();
  expect(isPlainObject(Object.create(class Person {}))).toBeFalsy();
});
