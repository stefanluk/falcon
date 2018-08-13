// eslint-disable-next-line import/no-extraneous-dependencies
const esLint = require('@deity/eslint-config-falcon');

module.exports = {
  ...esLint.rules['prettier/prettier'][1],

  overrides: [
    {
      files: ['.eslintrc'],
      options: { parser: 'json' }
    }
  ]
};
