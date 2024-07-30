/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  roots: ['<rootDir>/test'],
  testEnvironment: '<rootDir>/prisma/prismaTestEnvironment.js',
  testEnvironmentOptions: {
    verboseQuery: true,
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}

export default config
