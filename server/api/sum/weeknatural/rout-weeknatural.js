var debug = require('debug')('api:sum:weeknatural');
const {
    readOne,
    create,
    updateOne,
    deleteOne
} = require('./ctrl-weeknatural');

const icwd = require('fs').realpathSync(process.cwd());
const { sendToWebApp } = require(`${icwd}/server/helpers/send-to-webapp`);

/**  
 * api for 1 week summary: /api/sum/weeknatural/<weekId>. 
 */
module.exports = function ( router ) {

    let route = '/sum/weeknatural';
    let routeWithWeekId = route + '/:weekId';
    
    router.get( routeWithWeekId, readOne );

    router.post( route, (req, res) => {

        Promise.resolve( create( req, res ) ) //;
        .then( () => {

            debug('in rout-weeknatural router.post');
            sendToWebApp( '/api' + route, req.body );
        });
    });

    router.put( route, (req, res) => {
        
        updateOne( req, res );
        debug('in rout-weeknatural router.put');
        sendToWebApp( '/api' + route, req.body );
    });

    router.delete( routeWithWeekId, deleteOne );
    
    /* api for all records */
    //router.get(route, readListAll);
};

