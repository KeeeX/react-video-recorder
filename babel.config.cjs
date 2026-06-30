module.exports = {
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"],
    },
  },
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        displayName: true,
        fileName: true,
      },
    ],
  ],
  presets: ["@babel/preset-react", "@babel/preset-env"],
};
