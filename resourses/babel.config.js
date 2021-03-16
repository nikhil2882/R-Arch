module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    [
      "module-resolver",
      {
        "cwd": "babelrc",
        "root": ["./src"],
        "extensions": [".js"],
        "alias": {
          "_assets": "./src/assets",
          "_apis": "./src/api",
          "_components": "./src/components",
          "_atoms": "./src/components/atoms",
          "_molecules": "./src/components/molecules",
          "_organisms": "./src/components/organisms",
          "_navigations": "./src/navigations",
          "_containers": "./src/containers",
          "_screens": "./src/screens",
          "_models": "./src/models",
          "_view_models": "./src/view_models",
          "_services": "./src/services",
          "_styles": "./src/styles",
          "_utils": "./src/utils",
          "_store": "./src/store",
          "_constants": "./src/constants",
        }
      }
    ]
  ]
};
