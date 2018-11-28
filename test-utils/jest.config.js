module.exports = {
    moduleFileExtensions: [
        "js",
        "html"
    ],
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.html$": "<rootDir>/html-loader.js"
    },
    setupTestFrameworkScriptFile: "<rootDir>/init.js",

}