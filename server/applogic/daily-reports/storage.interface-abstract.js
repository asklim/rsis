/* eslint-disable no-unused-vars */

const ERR_MSG = "daily-report storage class: method not implemented.";


module.exports = class IA_DailyReports {

    static createOne = async function (body) { throw new Error( ERR_MSG ); }

    static readById = async function (documentId) { throw new Error( ERR_MSG ); }

    static readByQuery = async function ({ filial, onDate }) {
        throw new Error( ERR_MSG );
    }

    static updateOne = async function (documentId, body) { throw new Error( ERR_MSG ); }

    static deleteById = async function (documentId) { throw new Error( ERR_MSG ); }


};
