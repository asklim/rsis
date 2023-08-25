const { Schema } = require('mongoose');

const PATH_DEFINITION = require('./schema.paths-definitions');


const productOperDataItem = new Schema({

    gid: PATH_DEFINITION.ITEM_GID,

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
