module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    uni: 'readonly'
  },
  'extends': [
    // 'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    //'@vue/standard'
  ],
  rules: {
    'vue/no-parsing-error': ['error', { 'x-invalid-end-tag': false }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/singleline-html-element-content-newline': 'off',
    // 'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    "vue/html-indent": ["error", 4]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
