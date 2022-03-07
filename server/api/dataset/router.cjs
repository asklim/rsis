
const procurement = require('./get-procurement.cjs');

/**
 * @usage /api/dataset/:providerId/:datasetId
 */
module.exports = function (router) {

    const route = '/dataset';

    [
        [`${route}/procurement/:weekId`, procurement],
    ].
    forEach( (item) => {
        router.get( item[0], item[1] );
    });
};

