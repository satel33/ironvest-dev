module.exports = {
   root: true,
   env: {
      browser: true,
      node: true,
   },
   parserOptions: {
      parser: '@babel/eslint-parser',
      requireConfigFile: false,
   },
   extends: ['plugin:nuxt/recommended'],
   plugins: ['prettier'],
   rules: {
      // "prettier/prettier": ["error"],
      // "vue/html-indent": ["error", 3],
      // "vue/singleline-html-element-content-newline": 0,
      // 'vue/multi-word-component-names': 'off',
      // "vue/component-name-in-template-casing": ["error", "PascalCase"],
      // "vue/valid-v-slot": [
      //    "error",
      //    {
      //       allowModifiers: true
      //    }
      // ]
   },
   globals: {},
}
