
import procurement from './procurement-handler-get';

/**
 * @usage GET /api/dataset/:providerId/:datasetId
 */
export default function routerApiDataset (router) {

    const route = '/dataset';

    [
        [`${route}/procurement/:weekId`, procurement],
    ].
    forEach( (item) => {
        router.get( item[0], item[1] );
    });
};
