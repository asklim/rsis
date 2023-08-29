import 'module-alias/register';
import * as dotenv from 'dotenv';
// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import {
    cleanEnv,
    str,
    port
} from 'envalid';

dotenv.config();

const defaultToken = '1234567890:defaultDEFAULTdefaultDEFAULTdefault';

export default cleanEnv( process.env,
    {
        NODE_ENV: str({default: 'undefined'}),
        PORT: port({ default: 3067 }),
        DEV_MODE: str({}),
        MONGO_TESTDB_URI: str({
            devDefault: defaultToken
        }),
        API_SERVER: str({
            devDefault: 'https://rsis-webapp.herokuapp.com'
        }),
        ATLAS_CREDENTIALS: str({
            devDefault: defaultToken
        }),
        MIKAVBOT_TOKEN: str({
            devDefault: defaultToken
        }),
        VIBER_CHAT_TOKEN: str({
            default: defaultToken
        }),
        JWT_SECRET: str(),
        SHOW_STARTUP_INFO: str({
            choices: ['YES','NO'],
            default: 'YES'
        }),
        GOOGLE_MAP_API_KEY: str({
            default: defaultToken
        }),
        RSIS_GOOGLE_API_KEY: str({
            default: defaultToken
        }),
    }
);
