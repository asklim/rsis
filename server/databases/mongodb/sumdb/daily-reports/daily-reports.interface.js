/* eslint-disable no-unused-vars */

const ERR_MSG = "daily-report storage class: method not implemented.";

const IA_DailyReports = require("../../../../applogic/daily-reports/storage.interface-abstract");

module.exports = class IDailyReports extends IA_DailyReports {

    static createOne = require( './dr-create-one' );

    static readById = require( './dr-read-by-id' );
    static readByQuery = require( './dr-read-by-query' );

    static updateOne = require( './dr-update-one' );

    static deleteById = require( './dr-delete-by-id' );

};
