
const useDevHMR = async (
    express,
    logger
) => {
    const webpack = (await import('webpack')).default;
    const devHMRConfig = (await import('./webpack.devhmr')).default;
    const webpackDevMW = (await import('webpack-dev-middleware')).default;
    const webpackHotMW = (await import('webpack-hot-middleware')).default;
    const compiler = webpack( devHMRConfig );

    const wdmOption = {
        publicPath: devHMRConfig.output.publicPath,
    };
    logger.debug('webpack-dev-middleware (wdm) config: ', wdmOption );
    express.use( webpackDevMW( compiler, wdmOption ));
    express.use( webpackHotMW( compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
};

export default useDevHMR;
