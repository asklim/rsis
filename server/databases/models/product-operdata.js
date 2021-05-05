const { Schema } = require( 'mongoose' );

const {
    GID_PATH_DEFINITION,
    //LID_PATH_DEFINITION,
} = require( './schema.paths-definitions' );


const productOperDataItem = new Schema({

    gid: GID_PATH_DEFINITION,

    /* FIELDS FROM CURRENT WEEK DATA */
    total: {},
    usd0: {},
    rur0: {},
    byr0: {},
    retail: {},
    regular: {},
    staffp: {},

});

module.exports = productOperDataItem;
