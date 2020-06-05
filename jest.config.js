module.exports = {
  automock: false,
  unmockedModulePathPatterns: ["<rootDir>/node_modules/*"],
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  watchPlugins: ["jest-watch-yarn-workspaces"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false,
    },
  },
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "node"],
  testMatch: ["**/__tests__/*.test.+(ts|tsx)"],
  collectCoverage: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  prettierPath: "prettier",
};
