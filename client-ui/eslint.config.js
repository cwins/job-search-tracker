import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
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
    },
    rules: {
      'react-refresh/only-export-components': 'warn'
    }
  }
]);
