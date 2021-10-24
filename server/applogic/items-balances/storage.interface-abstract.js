/* eslint-disable no-unused-vars */

const ERR_MSG = "items-balances storage class: method not implemented.";


module.exports = class IA_ItemBalances {

    static createOne = async function (body) { throw new Error( ERR_MSG ); }

    static readById = async function (documentId) { throw new Error( ERR_MSG ); }

    static readByQuery = async function (query) { throw new Error( ERR_MSG ); }

    static updateOne = async function (documentId, body) { throw new Error( ERR_MSG ); }

    static deleteById = async function (documentId) { throw new Error( ERR_MSG ); }


};
