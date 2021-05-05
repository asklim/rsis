const { Schema } = require( 'mongoose' );


const GID_PATH_DEFINITION = {
    // (g)lobal id - id of product in Nomenklature -
    // Firma`s Global Product Catalog
    type: Schema.Types.Number,
    min: 2101000000,
    max: 2199999999,
    required: true,
    set: v => Math.round(v),
    unique: true,
};

const LID_PATH_DEFINITION = {
    // (l)ocal id - line`s numbers in ExcelClient
    // range: 1000 .. 1507 .. 1680
    type: Schema.Types.Number,
    min: 1000,
    max: 1680,
    required: true,
    set: v => Math.round(v),
    unique: true,
};


module.exports = {
    
    GID_PATH_DEFINITION,
    LID_PATH_DEFINITION,

};
