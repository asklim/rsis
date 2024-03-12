import 'module-alias/register';
import 'dotenv/config';
// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import {
    cleanEnv,
    str,
    port
} from 'envalid';


const DEFAULT_TOKEN = '1234567890:defaultDEFAULTdefaultDEFAULTdefault';

const specs = {
    NODE_ENV: str({default: 'undefined'}),
    PORT: port({ default: 3067 }),
    DEV_MODE: str({
        choices: ['NOT_HMR','HotModuleReplacement'],
        default: 'NOT_HMR' }),
    MONGO_TESTDB_URI: str({
        default: DEFAULT_TOKEN,
        devDefault: DEFAULT_TOKEN
    }),
    API_SERVER: str({
        default: '',
        //devDefault: 'https://rsis-webapp.herokuapp.com'
    }),
    ATLAS_CREDENTIALS: str({
        devDefault: DEFAULT_TOKEN
    }),
    MIKAVBOT_TOKEN: str({
        default: DEFAULT_TOKEN,
        devDefault: DEFAULT_TOKEN
    }),
    VIBER_CHAT_TOKEN: str({
        default: DEFAULT_TOKEN
    }),
    JWT_SECRET: str(),
    SHOW_STARTUP_INFO: str({
        choices: ['YES','NO'],
        default: 'YES'
    }),
    GOOGLE_MAP_API_KEY: str({
        default: DEFAULT_TOKEN
    }),
    RSIS_GOOGLE_API_KEY: str({
        default: DEFAULT_TOKEN
    }),
};

const env = cleanEnv( process.env, specs );

export default env;
