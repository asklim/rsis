//"use strict";
const ctrlCatalogs = require('../../controllers/catalogs');
const ctrlCatalogExcel = require('../../controllers/catalogs4excel');
const ctrlCatalogWeb = require('../../controllers/catalogs4web');

const catalogs = '/config/catalogs';

/**  
 * api for Excel Catalogs: /api/config/catalogs/v1. 
 **/
const setCatalogs4ExcelRoutes = ( router ) => {

  let catalogExcel = catalogs+'/v1';
   
  router.get(catalogExcel, ctrlCatalogExcel.catalogReadOne);
  router.post(catalogExcel, ctrlCatalogExcel.catalogCreateOne);
  router.put(catalogExcel, ctrlCatalogExcel.catalogUpdateOne);
  router.delete(catalogExcel, ctrlCatalogExcel.catalogDeleteOne); 
};

/**  
 * api for Web Catalogs: /api/config/catalogs/v2
 **/
const setCatalogs4WebRoutes = ( router ) => { 

  let catalogWeb = catalogs+'/v2';
  router.get(catalogWeb, ctrlCatalogWeb.catalogReadOne);
};
 

module.exports = function ( router ) { 

  setCatalogs4ExcelRoutes( router );
  setCatalogs4WebRoutes( router );

   /*  get all catalogs (list?) */
  router.get(catalogs, ctrlCatalogs.catalogsAllClients);
};