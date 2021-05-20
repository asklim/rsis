
const { 
    callbackError400,
    callbackError405,
} = require( '../../../helpers' );

const 
    readOne = require( './read-one' ),
    createOne = require( './create-one' )
    //,updateOne = require( './update-one' ),
    //,deleteOne = require( './delete-one' )
;

const catalog = '/config/catalog-layout';

module.exports = function ( router ) {

    /** 
     * get all catalogs (list?) 
    **/

    const catalogs = `${catalog}s`;
    const catalogsWithId = `${catalogs}/:catalogId`;

    router.get( catalogsWithId, readOne );

    router.get( catalogs, readOne );
    router.post( catalogs, createOne );
    router.put( catalogs, callbackError405 );
    router.delete( catalogs, callbackError405 );


    router.all( `${catalog}/*`, callbackError400 );
    router.all( `${catalogs}/*`, callbackError400 );
};
