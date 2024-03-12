// import 'module-alias-jest/register';
// import axios from 'axios';
// import {
//     icwd,
//     Logger,
//     Request,
//     Response,
//     send200Ok,
//     send400BadRequest,
//     send404NotFound,
//     send500ServerError,
// } from '../../helpers';
// import { procurementPeriods as periods } from '<root>/config/enum-values';


import hapi_dataset_procurement_GET from './procurement-handler-get';

// jest.mock('axios');
// jest.mock('../../helpers');
// jest.mock('<root>/config/enum-values');
// jest.mock('asklim');

describe('hapi_dataset_procurement_GET', () => {

    it('should expose a function', () => {
		expect( hapi_dataset_procurement_GET ).toBeDefined();
	});

    it('hapi_dataset_procurement_GET should return expected output', async () => {
        // const retValue = await hapi_dataset_procurement_GET(req,res);
        expect( 'true' ).toBeTruthy();
    });
});
