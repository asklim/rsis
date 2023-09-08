
// import { AxiosError } from 'axios';
import createSafeGetter from '../../server/heroku-no-sleep/create-safe-getter';

import createError from 'http-errors';

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


test('01/get resource error', async () => {
    const getter = createSafeGetter( FAKE_URL, fakeErrorGetter );
    const result = await getter();
    expect( result ).toBeDefined();
    expect( result instanceof Error ).toBeTruthy();
});

it('02/get good axios response', async () => {
    const result = axiosResponse( FAKE_URL );
    const getter = createSafeGetter( FAKE_URL, fakeAxiosGetter );
    expect( await getter() ).toEqual( result );
});
