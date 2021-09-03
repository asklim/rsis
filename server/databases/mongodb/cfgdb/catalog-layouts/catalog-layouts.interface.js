//const debug = require( 'debug' )( 'db:config:catalogLayouts' );
//const log = consoleLogger( 'db:cfg' );

module.exports = class ICatalogLayouts {

    static createOne = require( './cl-create-one' );

    static readById = require( './cl-read-by-id' );
    static readByQuery = require( './cl-read-by-query' );

    static updateOne = require( './cl-update-one' );

    static deleteLast = require( './cl-delete-last' );
    static deleteById = require( './cl-delete-by-id' );

};
