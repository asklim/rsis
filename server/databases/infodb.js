const debug = require( 'debug' )( '-dbs:info' );
const { formatWithOptions } = require( 'util' );

module.exports.log = async function (mongooseConnection) {
  
    //debug( `Mongoose version ${mongooseConnection.base.version}` );

    const { host, port, db, id } = mongooseConnection;

    const title = `dbinfo: ${host}:${port}/${db.databaseName}`;

    const models = mongooseConnection.modelNames(); //массив имен моделей
    
    debug( `Mongoose connection id: ${id}` );
    //debug( `${title}: model's count = ${models.length}` );
    //debug( `${title}:`, models );

    /*
    const callAllModelsDocumentsCounting = [];
    models
    .forEach( (modelName) => {
        let theModel = mongooseConnection.model( modelName );

        callAllModelsDocumentsCounting
        .push(
            new Promise( (resolve) => {
                theModel
                .countDocuments( {}, 
                    (err, count) => resolve([ modelName, count ])
                );
            })
        );
    });

    Promise
    .all( callAllModelsDocumentsCounting )
    .then( 
        (infoDocs) => {
            console.log( `${title}:\n`,
                formatWithOptions( { colors: true }, '%O', infoDocs )
            );
        })
    .catch( (error) => console.log( error.message ));
    */
    const infoDocs = [];
    for( let modelName of models ) {
        let theModel = mongooseConnection.model( modelName );
        let count = await theModel.countDocuments({});
        infoDocs.push([ modelName, count ]);
    }

    console.log( `${title}:\n`,
        formatWithOptions( { colors: true }, '%O', infoDocs )
    );
};
