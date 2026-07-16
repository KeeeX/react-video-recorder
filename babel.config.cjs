module.exports = {
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        displayName: true,
        fileName: true,
      },
    ],
  ],
  presets: [["@babel/preset-env", {modules: false}], "@babel/preset-react"],
};
