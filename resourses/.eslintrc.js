module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          "assets": "./src/assets",
          "apis": "./src/api",
          "atoms": "./src/components/atoms",
          "molecules": "./src/components/molecules",
          "organisms": "./src/components/organisms",
          "components": "./src/components",
          "navigations": "./src/navigations",
          "screens": "./src/screens",
          "containers": "./src/containers",
          "models": "./src/models",
          "view_models": "./src/view_models",
          "services": "./src/services",
          "styles": "./src/styles",
          "utils": "./src/utils",
          "store": "./src/store",
          "constants": "./src/constants",
        },
      },
    },
  },
};
