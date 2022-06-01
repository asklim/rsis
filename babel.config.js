const {
    presets,
    plugins
} = require( './src/babel.config.js' );

module.exports = function (api) {
    api.cache.forever();
    return {
        presets,
        plugins
    };
};
