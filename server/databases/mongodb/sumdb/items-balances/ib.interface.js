
const UUID = require('uuid');

const createOne = require('./ib-create-one.js');
const find = require('./ib-find');
const readOne = require('./ib-read-one.js');
const updateOne = require('./ib-update-one');
const deleteById = require('./ib-delete-by-id');

const IA_ItemsBalances = require('../../../../applogic/items-balances/storage.interface-abstract');

const db = require('../../..').getDB('sum');
let MongoModel = db?.model('ItemsBalances');

module.exports = class IItemsBalancesStorage extends IA_ItemsBalances {

    constructor (modelInterface=MongoModel) {
        super();
        this.setModel( modelInterface );
        this.createOne = createOne;
        this.find = find;
        this.deleteById = deleteById;
        this.readOne = readOne;
        this.updateOne = updateOne;
    }

    setModel (modelInterface) {
        this._mongoModel = modelInterface;
    }
    getModel () {
        return this._mongoModel;
    }

    async readById (reportId) {

        let filtering = UUID.validate( reportId ) ?
            { uuid: reportId }
            : { _id: reportId };

        return await this.readOne( filtering );
    }

    async readByQuery ({
        agent,
        onDate,
        filial = 'filial1',
        creator = 'mainsm'
    }) {
        const filtering = { agent, onDate, filial, creator };
        return await this.readOne( filtering );
    }

};
