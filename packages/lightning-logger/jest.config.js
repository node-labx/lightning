/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: '../../config/jest.preset.js',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/transport/FileStreamTransport.ts',
    '<rootDir>/src/transport/StreamTransport.ts',
    '<rootDir>/src/transport/HttpTransport.ts',
  ],
  rootDir: __dirname,
};
