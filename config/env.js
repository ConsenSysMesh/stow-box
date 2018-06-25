// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;
require('dotenv').load()

function getClientEnvironment(publicUrl) {
  var processEnv = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      'NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      'PUBLIC_URL': JSON.stringify(publicUrl),

      // Other Env variables
      'LINNIA_ETH_PROVIDER': JSON.stringify(process.env.LINNIA_ETH_PROVIDER),
      'LINNIA_IPFS_HOST': JSON.stringify(process.env.LINNIA_IPFS_HOST),
      'LINNIA_IPFS_PORT': JSON.stringify(process.env.LINNIA_IPFS_PORT),
      'LINNIA_IPFS_PROTOCOL': JSON.stringify(process.env.LINNIA_IPFS_PROTOCOL),
      'LINNIA_CONTRACT_GAS': JSON.stringify(process.env.LINNIA_CONTRACT_GAS),
      'LINNIA_HUB_ADDRESS': JSON.stringify(process.env.LINNIA_HUB_ADDRESS),
      'LINNIA_SERVER_HOST': JSON.stringify(process.env.LINNIA_SERVER_HOST),
      'LINNIA_SERVER_PORT': JSON.stringify(process.env.LINNIA_SERVER_PORT)
    });
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;
