const { 
    //icwd, 
    consoleLogger,
    //send200Ok,
    //send400BadRequest,
    //send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-config:' );

const db = require( '../../../databases' ).getDB( 'config' );

const ProductsCatalog = db.model( 'ProductsCatalog' );

const sendJSONresponse = function (res, status, content) {
    //console.log(`catalogs for excel:`, content);  
    res.status(status);
    res.json(content);
};

let testArr = [[2019011001, 2056], [2019011002, 2046]];


/** 
 * Read a agent info by the id
 * @name readOne
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * GET /api/config/catalog-layout/excel/:catalogId? 
 **/

module.exports = function excelCatalogLayoutReadOne (req, res) {

    if (req.query && Object.keys(req.query).length != 0) {

        var query = req.query;
        query.client = 'excel'; //req.params.client;

        ProductsCatalog
        .findOne(
            query, 
            function (err, list) {

                if( err ) {
                    log.error( err );
                    return send500ServerError( res, err );
                } 

                if( !list ) {
                    sendJSONresponse(res, 404, {
                        'message': 'list not found. Wrong query.'
                    });
                    return;
                } 

                console.log(`List's length = ${list.items.length} [0]: ${list.items[0]}`);
                sendJSONresponse(res, 200, list.items);    
            }
        );
    } 
    else {
        sendJSONresponse(res, 200, testArr );
    }
};

