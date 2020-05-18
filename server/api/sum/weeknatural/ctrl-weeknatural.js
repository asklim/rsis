//var debug = require( 'debug' )( 'api:sum:weeknatural' );
//const colors = require( 'colors' );
const icwd = require( 'fs' ).realpathSync( process.cwd() );

const HTTPCODE = require( `${icwd}/src/config/http-response-codes` );

const db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const WeekNatural = db.model( 'WeekNatural' );

//const workdate = require( `${icwd}/imports/utils/workdate` );



const sendJSONresponse = (res, status, content) => {

    //console.log('sendJSON: ', content);
    //console.log('sendJSON: ', Object.keys(content[0]));

    res.status( status );
    res.json( content );
};




/** 
 * @name readOne
 * @description 
 * Read a week summary Natural info 
 * by the XXI century weekId or 'last' 
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 503 Service Unavailable & error object
 * @returns {} undefined
 * @example 
 * GET /api/sum/weeknatural/:weekId
 * GET /api/sum/weeknatural/960
 * GET /api/sum/weeknatural/1011
 * GET /api/sum/weeknatural/last 
 *
 * 
**/
const readOne = ( req, res ) => {


    console.log( `I: try readOne sum-week-natural document`,
               '\nI: finding weekNatural\'s params: ', req.params,
               '\nI: finding weekNatural\'s query: ', req.query
    );
    //console.log(req.hostname);
    
    const { weekId } = req.params;

    if( !req.params || !weekId ) {

        console.log( 'W: weekNatural readOne: No weekId specified.' );
        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'No weekId in request.'
        });
        return;
    }

    let finding, sorting, weekNumber;

    if( weekId.toLowerCase() === 'last' ) {
        
        finding = {};
        sorting = { id: -1 };
    }
    else {

        weekNumber = Number.parseInt( weekId, 10 );
        if( !weekNumber ) {

            console.log( 'W: weekNatural readOne: wrong weekId specified.' );
            sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
                message: 'Wrong weekId in request.'
            });
            return;            
        }
        finding =  { id: weekNumber };
        sorting =  {};            
    }


    WeekNatural.find( finding )
    .sort( sorting )
    .limit(1)
    .exec( (err, docs) => {

        if( !docs || docs.length < 1 ) {

            let msg = `Summary data for week ${weekId}/${weekNumber} not found.`;
            console.log(`W: weekNatural ${msg}`);

            sendJSONresponse( res, HTTPCODE.NOT_FOUND, {
                message: `WeekNatural ${msg}`
            });
            return;
        }

        if( err ) { 

            sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
            //console.log(err);                
            return;
        } 

        console.log( `SUCCESS: weekNatural ${docs[0].id} readOne is Ok.`);
        sendJSONresponse( res, HTTPCODE.OK, docs[0] );
    });

};



/** 
 * @name create
 * @description Create a new week Natural
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict    & message
 * @fires 503 Service Unavailable & error object
 * @returns {} undefined
 * @example
 * POST /api/sum/weeknatural
 * 
 *  
**/
const create = ( req, res )  => {


    console.log( `I: try create, sum-week-natural body.id: ${req.body.id}` ); 
    
    if( !req.body || req.body === {} ) {

        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, body is required'
        });
        return;
    }
    const { id } = req.body;

    if( !id /*|| weekId === ''*/ ) {

        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, body.id number is required'
        });
        return;
    }  
  
    const finding = { id };

    WeekNatural.find( finding )
    .limit( 1 )
    .exec( (err, docs) => { 

        if( err ) { 

            sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
            //console.log(err);
            return;
        }

        if( docs && docs.length !== 0 ) {

            sendJSONresponse( res, HTTPCODE.CONFLICT, {
                message: `Summary data for week ${id} already exists.`
            });
            return;
        }

        WeekNatural.create( req.body, 
        (err, doc) => {

            if( err ) {

                console.log( 'E: weekNatural create err: ', err );
                sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
                return;
            } 

            console.log( `SUCCESS: weekNatural ${doc.id} created.`);
            sendJSONresponse( res, HTTPCODE.CREATED, {
                message: `Summary data for week ${doc.id} created successfull.`
            });
            
        });
    });    
};



/** 
 * @name updateOne
 * @description Update week Natural summary 
 * @fires 200 OK          & updated document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 503 Service Unavailable & error object
 * @returns {} undefined
 * @example
 * PUT /api/sum/weeknatural
 * 
 *  
**/
const updateOne = ( req, res ) => {


    //console.log(req.body);

    if( !req.body || req.body === {} ) {
    
        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, body is required'
        });
        return;
    }

    const weekNumber  = Number.parseInt( req.body.id, 10 );

    if( !weekNumber ) {
    
        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, body.id is required or wrong.'
        });
        return;
    }

    WeekNatural.find( { id: weekNumber } )
    .limit( 1 )
    .exec( (err, docs) => {

        if (!docs || docs.length < 1) {

            sendJSONresponse( res, HTTPCODE.NOT_FOUND, {
                message: `Summary data for week ${weekNumber} not found.`
            });
            return;
        }

        if( err ) {             

            sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err);
            //console.log(err);
            return;
        }
 
        Object.assign( docs[0], req.body,
            { updatedAt: Date.now() }
        );
        //doc[0].host = req.body.host;
        //debug( `weekNatural doc.isNew: ${docs[0].isNew}.`);//false

        docs[0].save( (err, saved) => {

            if( err ) {
                sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
            } 
            else {

                console.log( `SUCCESS: weekNatural ${saved.id} updated.`);
                sendJSONresponse( res, HTTPCODE.OK, saved );
            }
        });
    });
};   


/** 
 * @name deleteOne
 * @description Delete week Natural summary
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 503 Service Unavailable & error object
 * @returns {} undefined
 * @example
 * DELETE /api/sum/weeknatural/:weekId 
 * @example
 * DELETE /api/sum/weeknatural/956
 * DELETE /api/sum/weeknatural/1011
 *  
**/
const deleteOne = ( req, res ) => {


    const { weekId } = req.params;

    if( !weekId || weekId === '' ) {

        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, weekId is required.'
        });    
        return;
    }   

    const weekNumber  = Number.parseInt( weekId, 10 );
    
    if( !weekNumber ) {

        console.log( 'W: [weekNatural deleteOne] wrong :weekId specified.' );
        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Wrong :weekId in request.'
        });
        return;            
    }

    WeekNatural.findOneAndDelete( { id: weekNumber },
    ( err, doc ) => { 

        if( err ) {

            console.log( err );
            sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
            return;
        }
        
        if( !doc ) {

            sendJSONresponse( res, HTTPCODE.NOT_FOUND, doc );
            return;
        }

        console.log( `I: Week ${weekId} natural summary deleted.` );
        sendJSONresponse( res, HTTPCODE.NO_CONTENT, doc );
    });  
};



module.exports = {

    readOne,
    create,
    updateOne,
    deleteOne,
};
