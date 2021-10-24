/* eslint-disable no-unused-vars */

const ERR_MSG = "items-balances storage class: method not implemented.";

const IA_ItemsBalances = require("../../../../applogic/items-balances/storage.interface-abstract");

module.exports = class IItemsBalances extends IA_ItemsBalances {

    static createOne = require( './ib-create-one' );

    static readById = require( './ib-read-by-id' );
    static readByQuery = require( './ib-read-by-query' );

    static updateOne = require( './ib-update-one' );

    static deleteById = require( './ib-delete-by-id' );

};
