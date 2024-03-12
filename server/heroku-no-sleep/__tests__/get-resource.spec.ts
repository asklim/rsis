
// import { AxiosError } from 'axios';
import createSafeGetter from '../create-safe-getter';

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

describe(
    'create Resource-Getter testing ...',
    () => {
        test('01/ must be get resource-getting Error', async () => {
            const getter = createSafeGetter( FAKE_URL, fakeErrorGetter );
            const expected = await getter();
            expect( expected ).toBeDefined();
            expect( expected instanceof Error ).toBeTruthy();
        });

        it('02/ must be good axios response', async () => {
            const result = axiosResponse( FAKE_URL );
            const getter = createSafeGetter( FAKE_URL, fakeAxiosGetter );
            const expected = await getter();
            expect( expected ).toEqual( result );
        });
    }
);
