
const UUID = require( 'uuid' );

const injectedCreateOne = require( './ib-create-one.js' );
const injectedReadOne = require( './ib-read-one.js' );
const injectedUpdateOne = require( './ib-update-one' );
const injectedDeleteById = require( './ib-delete-by-id' );

const IA_ItemsBalances = require('../../../../applogic/items-balances/storage.interface-abstract');

const db = require( '../../..' ).getDB( 'sum' );
let MongoModel = db.model( 'ItemsBalances' );

module.exports = class IItemsBalances extends IA_ItemsBalances {

    static setModel (modelInterface=MongoModel) {
        MongoModel = modelInterface;
    }
    static getModel () {
        return MongoModel;
    }

    static createOne = injectedCreateOne( IItemsBalances );

    static readOne = injectedReadOne( IItemsBalances );

    static async readById (reportId) {

        let filtering = UUID.validate( reportId )
            ? { uuid: reportId }
            : { _id: reportId };

        return await IItemsBalances.readOne( filtering );
    }

    static async readByQuery ({
        agent,
        onDate,
        filial = 'filial1',
        creator = 'mainsm'
    }) {
        let filtering = { agent, onDate, filial, creator };
        return await IItemsBalances.readOne( filtering );
    }

    static updateOne = injectedUpdateOne( IItemsBalances );

    static deleteById = injectedDeleteById( IItemsBalances );

};
