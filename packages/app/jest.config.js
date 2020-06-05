const config = require("../../jest.config.js");

module.exports = {
  ...config,
  moduleNameMapper: {
    "^@this/domain(.*)": "<rootDir>/src/domain$1",
    "^@this/container-component(.*)": "<rootDir>/src/container-component$1",
    "^@this/view-component(.*)": "<rootDir>/src/view-component$1",
    "^@this/infra(.*)": "<rootDir>/src/infra$1",
  },
};
