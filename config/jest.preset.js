/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/fixtures/'],
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': 'esbuild-jest',
  },
  verbose: true,
  testTimeout: 15000,
};
