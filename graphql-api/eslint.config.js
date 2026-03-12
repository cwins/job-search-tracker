import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      prettierConfigRecommended
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          tsconfigRootDir: '.'
        }
      }
    }
  }
]);
