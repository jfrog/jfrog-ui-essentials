module.exports = {
    coverageReporters: ['html'],
    coverageDirectory: "<rootDir>/jest-coverage",
    collectCoverageFrom: [
        "<rootDir>/src/**/*.js",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    setupTestFrameworkScriptFile: "./jest.init.js",
    globals: {
        NODE_ENV: "test"
    },
    transform: {
        "^.+\\.html?$": "html-loader-jest",
        "^.+\\.js$": "babel-jest"
    },
    modulePaths: [
        "src/"
    ],
    moduleNameMapper: {
        "(.*)\\.html": "<rootDir>/src/$1.html",
        "^@/(.*)$": "<rootDir>/src/$1"
    }
}