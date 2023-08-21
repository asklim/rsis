declare function _exports(buildOptions: any): {
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
export = _exports;
