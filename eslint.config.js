import importPlugin from 'eslint-plugin-import';
import promisePlugin from 'eslint-plugin-promise';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

const tsFiles = ['**/*.ts', '**/*.tsx'];

const baseRules = {
  'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
  'no-empty-function': 'off',
  'no-implicit-coercion': ['error', { allow: ['!!'] }],
  'no-return-await': 'error',
  'no-void': ['error', { allowAsStatement: true }],
  'object-shorthand': ['error', 'properties'],
  'require-atomic-updates': 'off',

  'import/order': [
    'error',
    {
      'newlines-between': 'always',
      pathGroups: [
        {
          pattern: '@/**',
          group: 'parent',
          position: 'before',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
    },
  ],
  'import/newline-after-import': 'error',

  'promise/catch-or-return': ['error', { allowFinally: true }],
  'promise/prefer-await-to-callbacks': 'error',
};

export default [
  // Base config for all files
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // Typescript
  {
    files: tsFiles,
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      '@typescript-eslint': typescriptEslint,
    },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
      },
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...baseRules,

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_+$' },
      ],

      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true },
      ],

      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],

      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },

  // 타입 관련 규칙
  {
    files: tsFiles,
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs['recommended-requiring-type-checking'].rules,

      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase'] },
      ],

      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    },
  },
];
