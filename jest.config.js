module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.html?$': 'html-loader-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
      "^vue$": "vue/dist/vue.js"
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/src/**/*.(spec|test).(js)'
  ],
  testURL: 'http://localhost/',
  setupFiles: ["./src/jest-setup.js"],
  collectCoverage: false,
  collectCoverageFrom: ["**/src/**/*.{js,vue}", "!**/node_modules/**"],
    "transformIgnorePatterns": [
        "node_modules/(?!vue-select|vue-multiselect|codemirror|bootstrap|vue-virtual-scroller|jf-tooltipster|pc-bootstrap4-datetimepicker|@fortawesome|billboard.js)"
    ]
}
