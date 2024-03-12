const aliases = require('module-alias-jest/register');

module.exports = {
    notify: false,
    verbose: false,
    preset: 'ts-jest',
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
    ]
    //notifyMode: "always",
    // testEnvironment: 'node',
    // roots: [
    //     "<rootDir>/."
    // ],
    // setupFiles: [],
    // setupFilesAfterEnv: [],
    // testMatch: [
    //     //"**/__tests__/**/*.[jt]s?(x)",
    //     //"**/?(*.)+(spec|test).[jt]s?(x)",
    //     "<rootDir>/spec/**/?(*.)+(spec|test).[jt]s?(x)",
    //     "<rootDir>/(.*)/__tests__/?(*.)+(spec|test).[jt]s?(x)",
    //     "<rootDir>/**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"
    // ],
    // transform: {
    //     "\\.[jt]sx?$": 'ts-jest',
    //     // "\\.[jt]sx?$": "babel-jest",
    // },
    // transformIgnorePatterns: [
    //     "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    //     "^.+\\.module\\.(css|sass|scss)$"
    // ],
    // // modulePaths: [
    // // ],
    // moduleNameMapper: {
    //     "^react-native$": "react-native-web",
    //     "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    // },
    // moduleFileExtensions: [
    //     "web.js",
    //     "js",
    //     "web.ts",
    //     "ts",
    //     "web.tsx",
    //     "tsx",
    //     "json",
    //     "web.jsx",
    //     "jsx",
    //     "node"
    // ]
    , moduleNameMapper: aliases.jest
};
