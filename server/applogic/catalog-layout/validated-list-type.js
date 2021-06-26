

/**
 * Проверяет listType в запросе req
 * @param {String} req.query.listType
 * @returns valid listType in lowercase
 * @returns undefined - if listType is not valid
 */

module.exports = function validatedListType( listType = 'main' ) {

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

