
const db = require( '../../databases' ).getDB( 'config' );
const User = db.model( 'User' );

const {
    send200Ok,
    send400BadRequest,
    send500ServerError,
} = require( '../../helpers' );


module.exports = function (req, res) {

    const { 
        name,
        email,
        password, 
    } = req.body;

    if( !name || !email || !password ) {
        return send400BadRequest( res, 'All fields required.' );
    }

    const user = new User();

    user.name = name;
    user.email = email;
    user.setPassword( password );

    user.save(
        (err) => {      
            if( err ) {
                return send500ServerError(res, err);   
            } 
            else {
                let token = user.generateJwt();
                return send200Ok(res, { token, });  
            }
        }
    );
};
