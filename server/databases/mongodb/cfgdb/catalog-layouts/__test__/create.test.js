
( async () => {
    await require( 'dotenv' ).config();
})();

const mongoose = require( 'mongoose' );
const catalogLayoutSchema = require( '../catalog-layout.schema' );

const mockNewDoc = require( './mock-new-doc.json');

const MONGOOSE_OPTIONS =  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

//console.log( 'NODE_ENV:', process.env.NODE_ENV ); //NODE_ENV: test

let db;

beforeAll( async () => {
    db = await mongoose.
        createConnection( process.env.MONGO_TESTDB_URI, MONGOOSE_OPTIONS );
    db.model( 'CatalogLayouts', catalogLayoutSchema, 'catalog.layouts' ); 
});

afterAll( async () => {
    await db.close();
});

const IStorage = require( '../catalog-layouts.interface' );

describe( 'create catalog-layout', () => {

    test( 'should create new catalog-layout doc', async () => {

        let upd = await IStorage.createOne( mockNewDoc );
        expect( upd.statusCode ).toEqual( 201 );
        let { uuid } = upd.response; 
        expect( uuid ).not.toBeNull();

        let { client, list } = mockNewDoc;
        let del = await IStorage.deleteLast({ client, list });

        expect( del.statusCode ).toEqual( 204 );
        expect( mockNewDoc ).not.toBeNull();
        expect( mockNewDoc ).toEqual( mockNewDoc );
    });
});

