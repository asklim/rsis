import createError from 'http-errors';

import createSafeGetter from '../../server/heroku-no-sleep/create-safe-getter';

import tryGetResource, {
    XTimesResponse
} from '../../server/heroku-no-sleep/try-get-resource-x-times';


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

const optionsWhenError = {
    attempts: 5,
    interval: 500,
    getter: createSafeGetter( FAKE_URL, fakeErrorGetter, undefined ),
    apiUrl: FAKE_URL
};

const optionsWhenPass = {
    attempts: 5,
    interval: 500,
    apiUrl: FAKE_URL,
    getter: createSafeGetter( FAKE_URL, fakeAxiosGetter )
};

const tryGetOkResponse1 = {
    ok: true,
    response: axiosResponse( FAKE_URL ),
    // ms: 418, // response time is different !!!
    attempt: 1
};


test('01/try get resource, but error',
    async () => {
        try {
            const result = await tryGetResource( optionsWhenError );
            console.log('result t01\n', result); // Наверно не срабатывает
        }
        catch (e) {
            const err = e as XTimesResponse;
            console.log('err t01\n', err);
            //{ attempt: 5, message: 'No response from http://fakeUrl, 5 times.' }
            expect( err ).not.toBeUndefined();
            expect( err instanceof Object ).toBeTruthy(  );
            expect( Object.keys( err ).length ).toEqual( 5 );
            expect( typeof err.message === 'string').toBeTruthy();
            expect( typeof err.reason === 'string').toBeTruthy();
            expect( typeof err.attempt === 'number').toBeTruthy();
            expect( typeof err.ms === 'number').toBeTruthy();
        }
    }
);

test('02/get good axios response in first time',
    async () => {
        const result = await tryGetResource( optionsWhenPass );
        delete result.ms
        expect( result ).toEqual( tryGetOkResponse1 );
    }
);

jest.setTimeout( 30_000 );

test('03/try get resource, without getter (real Axios to FAKE_URL) == InternalServerError',
    //[LOGGER]: Error: http://fakeUrl : InternalServerError: Internal Server Error (27149ms)
    async () => {
        try {
            const result = await tryGetResource( {
                attempts: 2,
                interval: 100,
                apiUrl: FAKE_URL
            } );
            console.log('result t03\n', result); // не срабатывает
        }
        catch (e) {
            const err = e as XTimesResponse;
            console.log('err t03\n', err);
            expect( err ).toBeDefined();
            expect( err instanceof Object ).toBeTruthy();
            expect( err instanceof Error ).toBeFalsy();
            expect( typeof err.message === 'string').toBeTruthy();
            expect( typeof err.reason === 'string').toBeTruthy();
            expect( typeof err.attempt === 'number').toBeTruthy();
            expect( typeof err.ms === 'number').toBeTruthy();
            expect( Object.keys( err ).length ).toEqual( 5 );
        }
    }
);
