
import os from 'node:os';
import util from 'node:util';
import colors from 'colors';

import { env, icwd  } from '<srv>/helpers/';
import getProcessEnvWithout from './get-process-env-without';

export default async function showStartSystemInfo (
    appVersion: string
): Promise<void>
{
    if( env.SHOW_STARTUP_INFO == 'NO') { return; }

    const {
        PWD, USER, NAME, NODE_ENV
    } = process.env;

    const node_env = NODE_ENV ?? 'undefined';
    const userInfo = util.format('%O', os.userInfo() );
    console.log('app version', appVersion.cyan );
    console.log('NODE Environment is', node_env.cyan );

    const envList = await getProcessEnvWithout('npm_, XDG, LESS');
    console.log( envList );

    console.log('stdout.isTTY is'.gray, `${process.stdout.isTTY}`.yellow );
    // isTTY == true - in terminal, undefined - in service journal
    console.log('package.json dir is'.gray, `${icwd}`.red ); // = '/app'
    console.log(`PWD (${__filename}) is ${PWD}`.gray );
    console.log('USER @ NAME'.red, 'is'.gray, `${USER} @ ${NAME}`.red );
    console.log(
        'platform is'.gray, `${os.platform()}`.cyan,
        ', hostname is'.gray, `${os.hostname()}`.cyan
    );
    console.log( colors.gray('User Info:'), userInfo.yellow );
    console.log( colors.gray('process pid:'), colors.cyan(''+process.pid ), '\n' );
}
