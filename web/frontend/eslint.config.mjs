import path from 'node:path';
import url from 'node:url';
import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import cssPlugin from 'eslint-plugin-css';
import jestDom from 'eslint-plugin-jest-dom';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
// TODO: import tailwind from "eslint-plugin-tailwindcss";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

export default antfu(
  {
    react: true,
    typescript: {
      tsconfigPath: './tsconfig.json',
      filesTypeAware: ['**/*.tsx'],
      languageOptions: {
        globals: {
          ...globals.es2024,
          ...globals.browser,
          ...globals.node,
        },
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: __dirname,
        },
      },
    },
    jsonc: true,
    language: 'typescript',
    autoRenamePlugins: true,

    lessOpinionated: true,
    isInEditor: false,

    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },

    formatters: {
      css: true,
      prettier: false,
      stylelint: true,
      markdown: false,
    },

    ignores: [
      'public/**/*',
      'migrations/**/*',
      'node_modules/**/*',
      'dist/**/*',
      '.next/**/*',
      'next-env.d.ts',
      'eslint.config.mjs',
      'prettier.config.mjs',
      // v4 config 필요없음
      // 'tailwind.config.ts',
      // '**/*.{css,scss,less,sass}',
    ],
  },
  {
    files: ['**/*.{tsx, ts, js, jsx}'],

    plugins: {
      '@next/next': nextPlugin,
    },

    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'antfu/no-top-level-await': 'off', // Allow top-level await
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
      'react/prefer-destructuring-assignment': 'off', // Disable destructuring recommendation
      'node/prefer-global/process': 'off', // Allow using `process.env`
      'test/padding-around-all': 'error', // Add padding in test files
      'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles
    },
  },
  {
    files: ['**/*.test.ts?(x)'],
    ...testingLibrary.configs['flat/react'],
    ...jestDom.configs['flat/recommended'],
  },
  {
    files: ['**/*.spec.ts', '**/*.e2e.ts'],
    ...playwright.configs['flat/recommended'],
  },
  {
    files: ['**/*.{css,less,scss}'],
    ...cssPlugin.configs['flat/recommended'],
  },
  {
    /* 공통 적용 */
    files: ['**/*.{ts,tsx}'],
    rules: {
      'style/indent': ['error', 2, { SwitchCase: 1 }], // Use 2 spaces for indentation
      'style/brace-style': 'off',
      'style/jsx-indent-props': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'node/prefer-global/process': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-call': 'off',
      'ts/no-unsafe-member-access': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'regexp/no-unused-capturing-group': 'warn',
      'ts/no-floating-promises': 'warn',
      'style/multiline-ternary': 'off',
      'ts/strict-boolean-expressions': 'off',
      'no-console': 'off',
      'no-alert': 'off',
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: 'always',
          ObjectPattern: { multiline: true, minProperties: 2 },
          ImportDeclaration: { multiline: true, minProperties: 4 },
          ExportDeclaration: { multiline: true, minProperties: 4 },
        },
      ],
      'perfectionist/no-unknown': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            ['react', 'next'],

            'type',
            ['parent-type', 'sibling-type', 'index-type'],

            ['custom-type'],

            ['internal-type'],

            'builtin',
            'external',

            ['custom-lib', 'custom-api', 'custom-hook', 'custom-store'],

            ['custom-comp'],

            ['custom-app', 'custom-src'],

            ['internal'],

            ['custom-style'],

            ['custom-public'],

            ['parent', 'sibling', 'index'],
            'side-effect',
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              next: ['^next.*$', '^next-.+', '^next/$'],
              react: 'react',

              'custom-api': ['^@api/.+', '^@api-.+'],
              'custom-hook': ['^@hook/.+', '^@hook-.+'],
              'custom-util': ['^@util/.+', '^@util-.+'],
              'custom-lib': ['^@lib/.+', '^@lib-.+'],

              'custom-store': ['^@store/.+', '^@store-.+'],
              'custom-constant': ['^@const/.+', '^@const-.+'],
              'custom-common': ['^@common/.+', '^@common-.+'],

              'custom-comp': ['^@comp/.+', '^@comp-.+'],

              'custom-app': ['^@app/.+', '^@app-.+'],
              'custom-src': ['^@src/.+', '^@src-.+'],

              'custom-public': ['^@public/.+', '^@public-.+'],

              'custom-style': ['^@st/.+', '^@st-.+'],
            },
            type: {
              next: ['^next.*$', '^next-.+', '^next/$'],
              react: 'react',
              'custom-type': ['^@types/$', '^@types-.+'],
            },
          },
          type: 'natural',
          order: 'asc',
          specialCharacters: 'keep',
          internalPattern: ['^@.+', '^@/.+', '^~/.+'],
          newlinesBetween: 'always',
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.es2024,
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    ignores: ['next.config.ts', 'tsconfig.json'],
  },
  {
    // NOTE: Prettier
    files: ['**/*.{ts,tsx, css,less,scss}'],
    ...eslintPluginPrettier,
  },
);

/**/
