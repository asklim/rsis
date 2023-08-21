declare function _exports(webpackEnv: any): {
    bail: boolean;
    devtool: string | boolean;
    entry: any[];
    mode: string;
    module: {
        rules: ({
            test: RegExp;
            include: RegExp;
            type: string;
            use: any[];
            oneOf?: undefined;
        } | {
            oneOf: ({
                test: RegExp;
                type: string;
                generator: {
                    filename: string;
                };
                include?: undefined;
                exclude?: undefined;
                loader?: undefined;
                options?: undefined;
                use?: undefined;
                sideEffects?: undefined;
            } | {
                test: RegExp;
                include: any;
                exclude: RegExp;
                loader: string;
                options: {
                    presets: string[];
                    plugins: any[];
                    cacheDirectory: boolean;
                    babelrc?: undefined;
                    configFile?: undefined;
                    compact?: undefined;
                    cacheCompression?: undefined;
                    sourceMaps?: undefined;
                    name?: undefined;
                };
                type?: undefined;
                generator?: undefined;
                use?: undefined;
                sideEffects?: undefined;
            } | {
                test: RegExp;
                exclude: RegExp;
                loader: string;
                options: {
                    babelrc: boolean;
                    configFile: boolean;
                    compact: boolean;
                    cacheDirectory: boolean;
                    cacheCompression: boolean;
                    sourceMaps: boolean;
                    presets?: undefined;
                    plugins?: undefined;
                    name?: undefined;
                };
                type?: undefined;
                generator?: undefined;
                include?: undefined;
                use?: undefined;
                sideEffects?: undefined;
            } | {
                test: RegExp;
                exclude: RegExp;
                use: (string | {
                    loader: string;
                    options?: undefined;
                } | {
                    loader: string;
                    options: any;
                })[];
                sideEffects: boolean;
                type?: undefined;
                generator?: undefined;
                include?: undefined;
                loader?: undefined;
                options?: undefined;
            } | {
                test: RegExp;
                use: (string | {
                    loader: string;
                    options?: undefined;
                } | {
                    loader: string;
                    options: any;
                })[];
                type?: undefined;
                generator?: undefined;
                include?: undefined;
                exclude?: undefined;
                loader?: undefined;
                options?: undefined;
                sideEffects?: undefined;
            } | {
                loader: string;
                exclude: RegExp[];
                options: {
                    name: string;
                    presets?: undefined;
                    plugins?: undefined;
                    cacheDirectory?: undefined;
                    babelrc?: undefined;
                    configFile?: undefined;
                    compact?: undefined;
                    cacheCompression?: undefined;
                    sourceMaps?: undefined;
                };
                test?: undefined;
                type?: undefined;
                generator?: undefined;
                include?: undefined;
                use?: undefined;
                sideEffects?: undefined;
            })[];
            test?: undefined;
            include?: undefined;
            type?: undefined;
            use?: undefined;
        })[];
    };
    node: {};
    optimization: {
        minimizer: (string | CssMinimizerPlugin<CssMinimizerPlugin.CssNanoOptionsExtended>)[];
        splitChunks: {
            chunks: string;
        };
    };
    output: {
        path: string;
        filename: string;
        assetModuleFilename: string;
        chunkFilename: string;
        publicPath: any;
        devtoolModuleFilenameTemplate: (info: any) => string;
        globalObject: string;
    };
    performance: boolean | {
        maxEntrypointSize: number;
        maxAssetSize: number;
    };
    plugins: any[];
    resolve: {
        modules: string[];
        extensions: string[];
        alias: {
            src?: undefined;
            'react-dom$': string;
            'scheduler/tracing': string;
            'react-native': string;
        } | {
            src: string;
            'react-dom$': string;
            'scheduler/tracing': string;
            'react-native': string;
        };
        plugins: any[];
        fallback: {
            buffer: boolean;
            stream: string;
            crypto: boolean;
            https: string;
            path: boolean;
            http: string;
            url: string;
            fs: boolean;
            util: string;
        };
    };
    resolveLoader: {
        plugins: any[];
    };
    stats: string;
    watchOptions: {
        aggregateTimeout: number;
        ignored: string[];
    };
};
export = _exports;
import CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
