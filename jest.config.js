module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  "snapshotSerializers": [
    "<rootDir>/node_modules/enzyme-to-json/serializer"
  ],
  "resolver": "jest-pnp-resolver",
  "setupFiles": [
    "react-app-polyfill/jsdom",
    "<rootDir>/config/jest/setupTests.js"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^constants(.*)$": "<rootDir>/src/constants$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^actions(.*)$": "<rootDir>/src/actions$1",
    "^routes(.*)$": "<rootDir>/src/routes$1",
    "^client(.*)$": "<rootDir>/src/client",
    "^api(.*)$": "<rootDir>/src/api",
    "^helpers(.*)$": "<rootDir>/src/helpers",
    "^images(.*)$": "<rootDir>/src/images$1",
    "^reducers(.*)$": "<rootDir>/src/reducers$1"
  },
  "moduleFileExtensions": [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ]
};
