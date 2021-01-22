// Do this as the first thing so that any code reading it 
// knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const configFactory = require( './webpack.config-factory.js' );
const webpackConfig = configFactory( 'development' );

//console.log( webpackConfig );

module.exports = webpackConfig;
