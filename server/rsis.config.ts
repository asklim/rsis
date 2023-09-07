/* */
const dbName = {
    rsiscfg:  'rsiscfg',
    rsisdata: 'rsisdata',
    rsissum:  'rsissum',
    rsistmp:  'rsistmp',
    //rsiswp:   'rsiswp',
    //rsiswc:   'rsiswc',
    //rsiswn:   'rsiswn'
};

const PROD = 'hp8710w',
    RS00 = 'hp8710w.nu69b.mika:36667',
    RS01 = 'hpts600.nu69b.mika:36667',
    RS02 = 'kanote.nu69b.mika:36667',
    ATLAS0 = 'rsis-shard-00-00-jjwdj.mongodb.net:27017',
    ATLAS1 = 'rsis-shard-00-00-jjwdj.mongodb.net:27017',
    ATLAS2 = 'rsis-shard-00-00-jjwdj.mongodb.net:27017'
;

const mongoHosts = {
    DEV1:             `mongodb://${PROD}:27017`,
    DEV2:             `mongodb://${PROD}:27016`,
    STANDALONE:       `mongodb://${PROD}:36667`,
    CLOUDDB_TEMPLATE: `mongodb://%s@${ATLAS0},${ATLAS1},${ATLAS2}/%s?ssl=true&replicaSet=rsis-shard-0&authSource=admin&retryWrites=true`,
    RS0: `mongodb://${RS00},${RS01},${RS02}/%s?ssl=true&replicaSet=rs0&authSource=admin&retryWrites=true`
};

const API_SERVER_LOCAL = "http://192.168.0.240:3067";


export {
    dbName,
    mongoHosts,
    API_SERVER_LOCAL,
};
