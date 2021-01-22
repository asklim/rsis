// Do this as the first thing so that any code reading it 
// knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const paths = require( './paths' );
const webpack = require( 'webpack' );

const configFactory = require( './webpack.config-factory.js' );
const webpackConfig = configFactory( 'development' );


const hmrConfig = { 

    ...webpackConfig,
    stats: {
        preset: 'normal', //'minimal', 
        colors: true,
    },
    devServer: {
        contentBase: paths.appBuild,
        hot: true,
    },
    entry: [
        // MUST BE 2 entrypoints
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        'react-hot-loader/patch',
        paths.appIndexJs
    ],
    optimization: {},
    plugins: [
        ...webpackConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
    ],    
};

hmrConfig.resolve.alias = {
    ...webpackConfig.resolve.alias,
    'react-dom': '@hot-loader/react-dom',
};

//console.log( 'hmrConfig.resolve.alias:\n', hmrConfig.resolve.alias );

module.exports = hmrConfig;
