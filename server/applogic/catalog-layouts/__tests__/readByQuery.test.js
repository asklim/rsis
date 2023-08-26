const {
    createMongoDBConnections,
    databasesShutdown,
} = require('../../../databases');

const CatalogLayouts = require('..');

beforeAll( async () => {
    await createMongoDBConnections();
});

afterAll( async () => {
    await databasesShutdown('jest end', () => {});
});


describe('read catalog-layout', () => {

    test('read LAST doc from catalog.layouts collection', async function () {
        const last = await CatalogLayouts.
            // @ts-ignore
            readByQuery({
                client: 'excel',
                list: 'coffeeTea'
            });
        expect( last ).not.toBeNull;

    });
});
