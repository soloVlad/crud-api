module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  "extends": "standard-with-typescript",
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-var-requires': false,
    '@typescript-eslint/indent': [
      'error',
      2
    ],
    '@typescript-eslint/linebreak-style': [
      'error',
      'unix'
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single'
    ],
    '@typescript-eslint/semi': [
      'error',
      'always'
    ],
    '@typescript-eslint/eol-last': [
      'error',
      'always'
    ],
    '@typescript-eslint/comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never',
    }],
    '@typescript-eslint/max-len': ['warn', {
      'code': 100,
      'ignoreStrings': true,
      'ignoreUrls': true,
    }],
  },
  "ignorePatterns": [
    ".eslintrc.js",
    "node_modules",
    "dist"
  ],
};
