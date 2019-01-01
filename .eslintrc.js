module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'indent': 'off',
    'comma-spacing': 'off',
    'space-before-function-paren': 'off',
    'semi': 'off',
    'padded-blocks': 'off',
    'no-trailing-spaces': 'off',
    'spaced-comment': 'off',
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
    'no-unused-vars': 'off',
    'brace-style': 'off',
    'no-multiple-empty-lines': 'off',
    'curly': 'off',
    'no-useless-constructor': 'off',
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-multi-spaces': 'off',
    'no-return-assign': 'off',
    'no-undef': 'off',
    'eqeqeq': 'off',
    'no-mixed-operators': 'off',
    'no-unused-expressions': 'off',
    'template-curly-spacing': 'off',
    'no-unneeded-ternary': 'off',
    'quotes': 'off',
    'one-var': 'off',
    'keyword-spacing': 'off',
    'space-before-blocks': 'off',
    'no-useless-escape': 'off',
    'space-in-parens': 'off',
    'no-useless-return': 'off',
    'standard/no-callback-literal': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-unused-vars': 'off',
    'vue/require-v-for-key': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
