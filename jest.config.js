/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./test-setup.ts'],
    silent: false,
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
