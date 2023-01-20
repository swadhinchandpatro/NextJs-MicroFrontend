/** @type {import('next').NextConfig} */
const deps = require('./package.json').dependencies;

const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');
const { withSentryConfig } = require("@sentry/nextjs");

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  devtool: process.env.NODE_ENV !== 'production'  ? 'eval-cheap-module-source-map' : 'source-map', 
  silent: true // Suppresses all logs
  
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const moduleExports = {

  webpack : (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          remotes: {
            remote: 'remote@http://localhost:3001/remoteEntry.js', //url for the remote app
          },
          filename: './static/remoteEntry.js',
          /*
            * useService - This method used for calling HOST APIS
            * constants - This exposes constant file for the host 
            * fetchBaseQuery - This is the utility file that has many functions 
            * like customQueryFn , Axios Http Client 
            * federatedMiddlewareReducers - These are the middleware and reducers which are going to be exposed to remote for RTK-Query and Redux use.
            * loadState - Load state is the utility function used in remote side.
          */
          exposes: {
              "./useService": "./src/services/",
              "./constants": "./src/services/constants",
              "./fetchBaseQuery": "./src/utility/rtkQuery/fetchBaseQuery",
              "./federatedMiddlewareReducers": "./src/redux/store/federatedMiddlewareReducers",
              "./loadState": "./src/utility/reduxStatePersist/loadState"
          },
          shared: {
            react: {
              eager:true,
              requiredVersion: false,
              singleton: true,
            },
            'react-redux': {
              singleton: true,
              requiredVersion: deps["react-redux"], // eslint-disable-line @typescript-eslint/no-unsafe-assignment
            },
          },
          extraOptions: {
            skipSharingNextInternals: true,
          },
        }),
      );
    }
    return config;
  },
   
         
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: false,
  },
  productionBrowserSourceMaps: true,
  // swcMinify: true,
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
