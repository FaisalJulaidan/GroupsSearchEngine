const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  // webpack: {
  //   configure: (webpackConfig, { env, paths }) => {
  //     paths.appBuild = webpackConfig.output.path = path.resolve(
  //       __dirname,
  //       '../backend/frontend_build/',
  //     );
  //     return webpackConfig;
  //   },
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#2438c3' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
