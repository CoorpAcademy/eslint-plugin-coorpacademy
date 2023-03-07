module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['css-modules'],
  rules: {
    'css-modules/no-undef-class': 'error',
    'css-modules/no-unused-class': 'error'
  }
};
