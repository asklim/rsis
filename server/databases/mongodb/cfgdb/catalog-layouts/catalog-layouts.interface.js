//const debug = require( 'debug' )( 'db:config:catalogLayouts' );
//const log = consoleLogger( 'db:cfg' );

module.exports = class ICatalogLayouts {

    static createOne = require( './create-one' );

    static readById = require( './read-by-id' );
    static readByQuery = require( './read-by-query' );

    static updateOne = require( './update-one' );

    static deleteLast = require( './delete-last' );
    static deleteById = require( './delete-by-id' );

};
