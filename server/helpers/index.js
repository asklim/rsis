
const helpers = require( 'asklim' );
const serverConfig = require( './serverconfig' );

//console.log( 'helpers\n', helpers ); // {}

module.exports = {
    ... helpers,
    //NO [Circular] ... require( './herokuapp' ), // ONLY direct from file
    //NO [Circular] ... require( './send-to-webapp' ), // ONLY direct from file
    ... serverConfig,
};
