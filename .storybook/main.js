/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    //"../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@whitespace/storybook-addon-html",
  ],
  docs: {
    autodocs: true
  },
  //staticDirs:["../public"],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  }
};
export default config;