import eslintConfig from "@keeex/eslint-config";

export default await eslintConfig({
  environments: "weblibrary",
  mocha: false,
  react: true,
  typescript: false,
});
