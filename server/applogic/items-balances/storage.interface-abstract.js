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
    async createOne (body) {
        throw new Error( ERR_MSG );
    }

    async readById (documentId) {
        throw new Error( ERR_MSG );
    }

    async readByQuery (query) {
        throw new Error( ERR_MSG );
    }

    async updateOne (documentId, body) {
        throw new Error( ERR_MSG );
    }

    async deleteById (documentId) {
        throw new Error( ERR_MSG );
    }
};
