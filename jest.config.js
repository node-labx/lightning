/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: './config/jest.preset.js',
  projects: ['./packages/*/jest.config.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
