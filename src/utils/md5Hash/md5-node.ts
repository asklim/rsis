import {
    createHash,
    BinaryToTextEncoding
} from 'node:crypto';

export default function md5 (
    inputText: string,
    outputFormat: BinaryToTextEncoding = 'hex'
) {
    return createHash('md5').
        update( inputText ).
        digest( outputFormat )
    ;
}
