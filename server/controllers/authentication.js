const passport = require('passport');
const db = require('../databases').getDB('config');
const User = db.model('User');

const sendJSONresponse = function (res, status, content) {
  //console.log('authentication: ', content);
  res.status(status);
  res.json(content);
};

module.exports.register = function( req, res ) {

  const { name,
          email,
          password, } = req.body;

  if(!name || !email || !password) {
    sendJSONresponse( res, 400, 
      {"message": "All fields required."
    });
    return;
  }
  const user = new User();

  user.name = name;
  user.email = email;
  user.setPassword( password );

  user.save(
    (err) => {      
      if(err) {
        sendJSONresponse(res, 404, err);   
      } 
      else {
        let token = user.generateJwt();
        sendJSONresponse(res, 200, {"token" : token});  
      }
    }
  );
};

module.exports.login = function( req, res ) {

  const { email,
          password } = req.body;

  if(!email || !password) {
    sendJSONresponse(res, 400, 
      {message : "All fields required."}
    );
    return;
  }
  passport.authenticate(
    'local',
    (err, user, info) => {
      if(err) {
        sendJSONresponse(res, 404, err);
        return;
      }

      if(user) {
        let token = user.generateJwt();
        sendJSONresponse(res, 200, {"token" : token});
        //res.redirect(303,'/levelA');
      }
      else {
        sendJSONresponse(res, 401, info);
      }
  })(req, res);
};

