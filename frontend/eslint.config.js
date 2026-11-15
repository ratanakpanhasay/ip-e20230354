
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
  // Ignore generated files
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Recommended JavaScript rules
  js.configs.recommended,

  // Recommended TypeScript rules
  ...tseslint.configs.recommended,

  // Essential Vue 3 rules
  ...pluginVue.configs['flat/essential'],

  // Enable TypeScript inside Vue components
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // Recognize browser and Node.js globals
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
)
