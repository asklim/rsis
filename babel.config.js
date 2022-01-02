module.exports = function (api) {

    const presets = [
        [ "@babel/preset-env",
            {
                targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                    node: "current",
                }
            }
        ],
        "@babel/preset-typescript",
        [ "@babel/react",
            {
                "pragma": "dom",          // default pragma is React.createElement
                "pragmaFrag": "DomFrag",  // default is React.Fragment
                "throwIfNamespace": false // defaults to true
            }
        ]
    ];

    const plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-syntax-dynamic-import",
        "react-hot-loader/babel",
        [ "module-resolver",
            {
                "root": ["./src"]
            }
        ]
    ];

    api.cache.forever();

    return {
        presets,
        plugins
    };
};