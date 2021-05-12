
const { 
    callbackError400,
    callbackError405,
} = require( '../../../helpers' );

const 
    readOne = require( './read-one' )
    ,createOne = require( './create-one' )
    //,updateOne = require( './update-one' ),
    //,deleteOne = require( './delete-one' )
;

//const ctrlCatalogs = require('./catalogs');
const ctrlCatalogExcel = require('./catalogs4excel');
const ctrlCatalogWeb = require('./catalogs4web');

const catalog = '/config/catalog-layout';

module.exports = function ( router ) { 

    /**  
     * api for Excel Catalogs: /api/config/catalog-layout/excel
    **/

    const catalogExcel = `${catalog}/excel`;

    router.get( catalogExcel, ctrlCatalogExcel.catalogReadOne);
    router.post( catalogExcel, ctrlCatalogExcel.catalogCreateOne);
    router.put( catalogExcel, ctrlCatalogExcel.catalogUpdateOne);
    router.delete( catalogExcel, ctrlCatalogExcel.catalogDeleteOne); 


    /**  
     * api for Web Catalogs: /api/config/catalog-layout/web
    **/

    const catalogWeb = `${catalog}/web`;

    router.get( catalogWeb, ctrlCatalogWeb.catalogReadOne );

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
