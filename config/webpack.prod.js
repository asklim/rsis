// Do this as the first thing so that any code reading it 
// knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const configFactory = require( '../config/webpack.config-factory.js' );
const webpackConfig = configFactory( 'production' );

module.exports = webpackConfig;
