const config = {
  verbose: true,
  setupFilesAfterEnv: [require.resolve('regenerator-runtime/runtime')],
  testMatch: ['**/packages/shopmost/src/**/tests/unit/*.[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.shopmost/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/core/node_modules/'
  ]
}

module.exports = config;
