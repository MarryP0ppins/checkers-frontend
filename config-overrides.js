const { override, disableEsLint, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  // disable eslint in webpack
  disableEsLint(),

  addPostcssPlugins([
    require('lost')(),
    require('postcss-nested')(),
    require('postcss-preset-env')({
      features: {
        'nesting-rules': true,
      },
      stage: 3,
    }),
  ]),
);
