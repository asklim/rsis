/* eslint-disable no-unused-vars */

const ERR_MSG = "items-balances storage class: method not implemented.";


module.exports = class IA_ItemBalances {

    /**
     *
     * @param {Object} body
     * @param {String} body.filial
     * @param {String} body.agent
     * @param {String} body.creator
     * @param {String} body.onDate - ISO date
     * @param {Map<String,Object>} body.items
     */
    static createOne = async function (body) {
        throw new Error( ERR_MSG );
    };

    static readById = async function (documentId) {
        throw new Error( ERR_MSG );
    };

    static readByQuery = async function (query) {
        throw new Error( ERR_MSG );
    };

    static updateOne = async function (documentId, body) {
        throw new Error( ERR_MSG );
    };

    static deleteById = async function (documentId) {
        throw new Error( ERR_MSG );
    };


};
