/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  parser: 'typescript',
  arrowParens: 'always',
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
  // v4 config 필요없음
  // tailwindConfig: './tailwind.config.ts',
  tailwindAttributes: ['tw'],
  tailwindFunctions: ['cva'],
  tailwindPreserveWhiteSpace: true,
  tailwindPreserveDuplicates: true,

  // .css도 prettier 적용
  overrides: [
    {
      files: ['*.css'],
      options: {
        parser: 'css',
      },
    },
  ],
};

export default config;
