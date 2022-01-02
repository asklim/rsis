
const createSafeGetter = require('../create-safe-getter');

const createError = require( 'http-errors' );

const FAKE_URL = 'http://fakeUrl';
const axiosResponse = (apiUrl) => ({
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {},
    request: {},
    data: {
        ok: true,
        message: 'app',
        attempt: 1,
        apiUrl
    }
});

const fakeErrorGetter = (apiUrl) => {
    throw new Error( apiUrl + ' : ' + createError(500) );
};

const fakeAxiosGetter = (apiUrl) => {
    const provider = () => new Promise( (resolve) => {
        setTimeout(
            () => resolve( axiosResponse( apiUrl )),
            500
        );
    });
    return provider();
};


test( '01/get resource error', async () => {
    const getter = createSafeGetter( FAKE_URL, fakeErrorGetter );
    expect( await getter() ).toBeUndefined();
});

it( '02/get good axios response', async () => {
    const result = axiosResponse( FAKE_URL );
    const getter = createSafeGetter( FAKE_URL, fakeAxiosGetter );
    expect( await getter() ).toEqual( result );
});

