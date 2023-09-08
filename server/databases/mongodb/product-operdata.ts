import { Schema } from 'mongoose';

import { ITEM_GID } from './schema.paths-definitions';


const productOperDataItem = new Schema({

    gid: ITEM_GID,

    /* FIELDS FROM CURRENT WEEK DATA */
    total: {},
    usd0: {},
    rur0: {},
    byr0: {},
    retail: {},
    regular: {},
    staffp: {},

});

export default productOperDataItem;
