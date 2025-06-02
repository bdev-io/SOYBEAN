// TODO: npx @eslint/config-inspector 로 설정 확인가능

import url from 'node:url';

import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import eslintPluginPlugin from 'eslint-plugin-eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import regexpPlugin from 'eslint-plugin-regexp';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  // register all of the plugins up-front
  {
    // note - intentionally uses computed syntax to make it easy to sort the keys
    /* eslint-disable no-useless-computed-key */
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      ['eslint-comments']: eslintCommentsPlugin,
      ['eslint-plugin']: eslintPluginPlugin,
      // https://github.com/import-js/eslint-plugin-import/issues/2948
      ['import']: fixupPluginRules(importPlugin),
      ['jest']: jestPlugin,
      ['jsdoc']: jsdocPlugin,
      ['jsx-a11y']: jsxA11yPlugin,
      ['regexp']: regexpPlugin,
      ['sonarjs']: sonarjsPlugin,
      ['unicorn']: unicornPlugin,
    },
    /* eslint-enable no-useless-computed-key */
  },
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      '.nx/',
      '.yarn/',
      '**/jest.config.js',
      '**/node_modules/**',
      '**/dist/**',
      '**/fixtures/**',
      '**/coverage/**',
      '**/__snapshots__/**',
      '**/.docusaurus/**',
      '**/build/**',
      '.nx/*',
      '.yarn/*',
      'node_modules',
      'dist',
      'test',
      'prisma',
      '@types',
      '**/src/**/*.spec.ts',
      '**/bin/*.spec.ts',
      '**/src/**/*.e2e-spec.ts',
      '*.spec.ts',
      '*.spec.tsx',
      '*.test.ts',
      '*.test.tsx',
      '*.e2e-spec.ts',
      '*.e2e-spec.tsx',
      'eslint.config.mjs'
    ],
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx', '**/*.e2e-spec.ts', '**/*.e2e-spec.tsx'],
    rules: {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  },

  // extends ...
  eslint.configs.recommended,
  // NOTE : 존나 빡센거 원할때, 이거 활성화.
  //...tseslint.configs.strictTypeChecked,

  ...tseslint.configs.recommendedTypeChecked,

  ...tseslint.configs.stylisticTypeChecked,
  jsdocPlugin.configs['flat/recommended-typescript-error'],

  // base config
  {
    languageOptions: {
      globals: {
        ...globals.es2020,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    rules: {
      'no-console': 'warn',
      'no-namespace': 'off',
      'indent': ['error', 2],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/extensions': 'off',
      'no-await-in-loop': 'off',
      'no-restricted-syntax': 'off',
      'no-underscore-dangle': 'off',
      'object-curly-newline': 'off',
      'class-methods-use-this': 'off',

      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'no-process-exit': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',

      'import/no-default-export': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',

      // HACK : 여기부터는, 기본 설정
      '@typescript-eslint/interface-name-prefix': 'off',
      // TODO: https://github.com/typescript-eslint/typescript-eslint/issues/8538
      '@typescript-eslint/no-confusing-void-expression': 'off',

      //
      // our plugin :D
      //

      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 5,
        },
      ],
      // TODO: enable it once we drop support for TS<5.0
      // https://github.com/typescript-eslint/typescript-eslint/issues/10065
      '@typescript-eslint/consistent-type-exports': [
        'off', // 'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: true },
      ],
      'no-constant-condition': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-literal-enum-member': [
        'error',
        {
          allowBitwiseExpressions: true,
        },
      ],
      '@typescript-eslint/prefer-string-starts-ends-with': [
        'error',
        {
          allowSingleElementEquality: 'always',
        },
      ],
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'all',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignoreConditionalTests: true,
          ignorePrimitives: true,
        },
      ],
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allow: ['/package\\.json$'],
        },
      ],


      //
      // eslint-base
      //

      curly: ['error', 'all'],
      eqeqeq: [
        'error',
        'always',
        {
          null: 'never',
        },
      ],
      'logical-assignment-operators': 'error',
      'no-else-return': 'error',
      'no-mixed-operators': 'error',
      'no-process-exit': 'error',
      'no-fallthrough': [
        'error',
        { commentPattern: '.*intentional fallthrough.*' },
      ],
      'no-implicit-coercion': ['error', { boolean: false, number: false }],
      'no-lonely-if': 'error',
      'no-unreachable-loop': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-var': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'operator-assignment': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-template': 'error',
      radix: 'error',

      //
      // eslint-plugin-eslint-comment
      //

      // require a eslint-enable comment for every eslint-disable comment
      'eslint-comments/disable-enable-pair': [
        'error',
        {
          allowWholeFile: true,
        },
      ],
      // disallow a eslint-enable comment for multiple eslint-disable comments
      'eslint-comments/no-aggregating-enable': 'error',
      // disallow duplicate eslint-disable comments
      'eslint-comments/no-duplicate-disable': 'error',
      // disallow eslint-disable comments without rule names
      'eslint-comments/no-unlimited-disable': 'warn',
      // disallow unused eslint-disable comments
      'eslint-comments/no-unused-disable': 'error',
      // disallow unused eslint-enable comments
      'eslint-comments/no-unused-enable': 'error',
      // disallow ESLint directive-comments
      'eslint-comments/no-use': [
        'error',
        {
          allow: [
            'eslint-disable',
            'eslint-disable-line',
            'eslint-disable-next-line',
            'eslint-enable',
            'global',
          ],
        },
      ],

      //
      // eslint-plugin-import
      //
      // enforces consistent type specifier style for named imports
      'import/consistent-type-specifier-style': 'error',
      // disallow non-import statements appearing before import statements
      'import/first': 'error',
      // Require a newline after the last import/require in a group
      'import/newline-after-import': 'error',
      // Forbid import of modules using absolute paths
      'import/no-absolute-path': 'error',
      // disallow AMD require/define
      'import/no-amd': 'error',
      // disallow imports from duplicate paths
      'import/no-duplicates': 'error',
      // Forbid the use of extraneous packages
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          peerDependencies: true,
          optionalDependencies: false,
        },
      ],
      // Forbid mutable exports
      'import/no-mutable-exports': 'error',
      // Prevent importing the default as if it were named
      'import/no-named-default': 'off',
      // Prohibit named exports
      'import/no-named-export': 'off', // we want everything to be a named export
      // Forbid a module from importing itself
      'import/no-self-import': 'error',
      // Require modules with a single export to use a default export
      'import/prefer-default-export': 'off', // we want everything to be named

      //
      // eslint-plugin-jsdoc
      //

      // We often use @remarks or other ad-hoc tag names
      'jsdoc/check-tag-names': 'off',
      // https://github.com/gajus/eslint-plugin-jsdoc/issues/1169
      'jsdoc/check-param-names': 'off',
      'jsdoc/informative-docs': 'off',
      // https://github.com/gajus/eslint-plugin-jsdoc/issues/1175
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-yields': 'off',
      'jsdoc/tag-lines': 'off',

      'regexp/no-dupe-disjunctions': 'error',
      'regexp/no-useless-character-class': 'error',
      'regexp/no-useless-flag': 'error',
      'regexp/no-useless-lazy': 'error',
      'regexp/no-useless-non-capturing-group': 'error',
      'regexp/prefer-quantifier': 'error',
      'regexp/prefer-question-quantifier': 'error',
      'regexp/prefer-w': 'error',

      'sonarjs/no-duplicated-branches': 'error',

      //
      // eslint-plugin-unicorn
      //

      'unicorn/no-length-as-slice-end': 'error',
      'unicorn/no-lonely-if': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-single-promise-in-promise-methods': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-export-from': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'unicorn/prefer-structured-clone': 'error',

      //
      // eslint-plugin-module-bindings-newline
      //

      'object-curly-newline': ['error', {
        ObjectExpression: "always",
        ObjectPattern: { "multiline": true, "minProperties": 2 },
        ImportDeclaration: { "multiline": true, "minProperties": 4 },
        ExportDeclaration: { "multiline": true, "minProperties": 4 },
      }],
    },
  },
  {
    files: ['**/*.dto.ts'],
    rules: {
      "indent": 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },
  {
    files: ['**/*.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
    }
  },
  {
    files: ['**/main.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'no-process-exit': 'off',
    }
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off other type-aware rules
      '@typescript-eslint/internal/no-poorly-typed-ts-props': 'off',

      // turn off rules that don't apply to JS code
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    ...perfectionistPlugin.configs['recommended-natural'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'ts/strict-boolean-expressions': 'off',
      ...perfectionistPlugin.configs['recommended-natural'].rules,
      'perfectionist/no-unknown': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-object-types': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-enums': 'off',
      'perfectionist/sort-modules': 'off',
      'perfectionist/sort-imports': ['error', {
        groups: [
          ['nest', 'custom-db'],

          'builtin',

          'type',
          ['parent-type', 'sibling-type', 'index-type'],

          ['custom-type'],

          ['internal-type'],


          'external',

          ['custom-decorator', 'custom-config', 'custom-constant', 'custom-error'],

          ['custom-util', 'custom-common', 'custom-src'],

          ['custom-root'],

          ['internal'],


          ['parent', 'sibling', 'index'],
          'side-effect',
          'object',
          'unknown',
        ],
        customGroups: {
          value: {
            'nest': ['^@nestjs.*$', '^@nestjs-.+', '^@nestjs/$'],
            'custom-type': ['^@types/$', '^@types-.+'],
            'custom-config': ['^@config/.+', '^@config-.+'],
            'custom-constant': ['^@constant/.+', '^@constant-.+'],
            'custom-error': ['^@error/.+', '^@error-.+'],
            'custom-util': ['^@util/.+', '^@util-.+'],
            'custom-decorator': ['^@decorator/.+', '^@decorator-.+'],
            'custom-db': ['^@db/.+', '^@db-.+'],
            'custom-common': ['^@common/.+', '^@common-.+'],
            'custom-src': ['^@src/.+', '^@src-.+'],
            'custom-root': ['^@root/.+', '^@root-.+'],
          },
          type: {
            'nest': ['^@nestjs.*$', '^@nestjs-.+', '^@nestjs/$'],
            'custom-type': ['^@types/$', '^@types-.+'],
          },
        },
        type: 'natural',
        order: 'asc',
        specialCharacters: 'keep',
        internalPattern: ['^@.+/.*', '^@/.*', '^~/.*'],
        partitionByComment: false,
        partitionByNewLine: false,
        newlinesBetween: 'always',
      }],
    },
  },
);
