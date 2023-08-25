const {
    presets,
    plugins
} = require('./src/babel.config.cjs');

module.exports = function (api) {
    api.cache.forever();
    return {
        presets,
        plugins
    };
};
