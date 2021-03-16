module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          "_assets": "./src/assets",
          "_apis": "./src/api",
          "_atoms": "./src/components/atoms",
          "_molecules": "./src/components/molecules",
          "_organisms": "./src/components/organisms",
          "_components": "./src/components",
          "_navigations": "./src/navigations",
          "_screens": "./src/screens",
          "_containers": "./src/containers",
          "_models": "./src/models",
          "_view_models": "./src/view_models",
          "_services": "./src/services",
          "_styles": "./src/styles",
          "_utils": "./src/utils",
          "_store": "./src/store",
          "_constants": "./src/constants",
        },
      },
    },
  },
};
