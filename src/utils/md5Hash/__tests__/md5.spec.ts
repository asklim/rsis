import md5 from '../md5-node';
//import md5 from '../md5-short'; // tests 03/ and 04/ not passed !!!
// import md5 from '../md5hash';  // tests 03/ and 04/ not passed !!!

describe(
    'md5hash testing ...',
    () => {
        test(`01/ correct value of empty string`,
            () => {
                const hash = md5('');
                const value = 'd41d8cd98f00b204e9800998ecf8427e';
                expect( hash ).toEqual( value );
            }
        );
        test(`02/ correct value of Base64-all-characters string`,
            () => {
                const hash = md5("ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                    "abcdefghijklmnopqrstuvwxyz" + "0123456789" + "+/");
                const value = '7845f7eade89338adabfef89bd6e9a5b';
                expect( hash ).toEqual( value );
            }
        );
        test(`03/ correct value of all-Russian-characters string`,
            () => {
                const hash = md5("АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ" +
                    "абвгдеёжзийклмнопрстуфхцчшщъыьэюя");
                const value = '497dd4dca63b3f4062b525e62e13fd6d';
                expect( hash ).toEqual( value );
            }
        );
        test(`04/ correct value of UNICODE string`,
            () => {
                const hash = md5(`\u{260E}\u{20AA}\u{212E}`);
                const value = '91ac53a38511c579b0f96bb967034985';
                expect( hash ).toEqual( value );
            }
        );
    }
);
