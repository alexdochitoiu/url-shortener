export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/main/utils/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/main/interfaces/$1",
    "^@dtos/(.*)$": "<rootDir>/src/main/dtos/$1",
    "^@models/(.*)$": "<rootDir>/src/main/models/$1",
    "^@repositories/(.*)$": "<rootDir>/src/main/repositories/$1",
    "^@services/(.*)$": "<rootDir>/src/main/services/$1",
    "^@controllers/(.*)$": "<rootDir>/src/main/controllers/$1",
    "^@validators/(.*)$": "<rootDir>/src/main/validators/$1",
  },
};
