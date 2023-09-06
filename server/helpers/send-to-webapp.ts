
import axios from 'axios';

import {
    env,
    debugFactory,
    Logger,
    logAxiosError,
    StatusCodes as HTTP,
} from '../helpers';

const d = debugFactory('helper:sendToWebApp');
const log = new Logger('[rsis:toWebApp]');


export async function sendToWebApp (
    apiRoute: string,
    reqBody: any
) {
    const docMetaInfo = metaInfoToString( reqBody );
    d( docMetaInfo );

    try {
        if( !(await createDocument( apiRoute, reqBody )) ) {
            await updateDocument( apiRoute, reqBody );
        }
    }
    catch (err) {
        log.error(`document sending to WebApp FAILURE (${docMetaInfo})`);
        logAxiosError( err, log );
    }
};


async function createDocument (
    apiRoute: string,
    reqBody: any
)
: Promise<boolean>
{
    const docMetaInfo = metaInfoToString( reqBody );
    try {
        const { status } = await sendTo( apiRoute, 'POST', reqBody );

        log.debug(`- POST status = ${status}`);

        if( status == HTTP.CREATED ) {
            log.info(`SUCCESS: document created in WebApp (${docMetaInfo})`);
            return true;
        }
        return false;
    }
    catch (err) {
        log.warn(`method <POST> to WebApp FAILURE (${docMetaInfo})`);
        logAxiosError( err, log );
        return false;
    }
}


async function updateDocument (
    apiRoute: string,
    reqBody: any
) {
    const docMetaInfo = metaInfoToString( reqBody );
    try{
        const { status } = await sendTo( apiRoute, 'PUT', reqBody );

        log.debug(`- PUT status = ${status}`);

        if( status == HTTP.OK ) {
            log.info(`SUCCESS: document updated (${docMetaInfo})`);
        }
        else {
            log.error(`document sending to WebApp FAILURE (${docMetaInfo})`);
        }
    }
    catch (err) {
        log.error(`method <PUT> to WebApp FAILURE (${docMetaInfo})`);
        logAxiosError( err, log );
    };
}


function metaInfoToString (
    reqBody: any
): string {
    const { id, type, pid } = reqBody;
    return `type: ${type}, id: ${id}, pid: ${pid}`;
}


async function sendTo (
    apiRoute: string,
    verb: "POST" | "PUT",
    reqBody: any
) {
    const putValidator = (status: any) => (status < HTTP.INTERNAL_SERVER_ERROR);
    const postValidator = (status: any) => (status < HTTP.INTERNAL_SERVER_ERROR);

    return axios({
        url: `${env.API_SERVER}${apiRoute}`,
        method: `${verb}`,
        headers: {
            'content-type' : 'application/json',
            'charset' : 'utf-8'
        },
        data: reqBody,
        validateStatus: verb === "PUT" ? putValidator : postValidator,
    });
}
