
/**
 * Проверяет listType в запросе req
 * * return valid listType in lowercase
 * * undefined - if listType is not valid
 * @param {String} listType from req.query
 */
module.exports = function validatedListType( listType = 'main') {

    /* for http requests in api/:
        &type='main' // default
        or, 'meta'
        &type='lid2gid' or,
        &type='short' or,
        &type='photo' or,
        &type='extra'
    */
    const validListTypeValues = [
        'meta', 'main',
        'lid2gid', 'short',
        'photo', 'extra'
    ];
    listType = listType.toLowerCase();

    if( !validListTypeValues.includes( listType )) {
        return void 0;
    }
    return listType;
};
