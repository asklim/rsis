/*"use strict";*/
const ctrlAuth = require('../controllers/authentication');

/*  
 * api for user register: /api/register 
 *         user login: /api/login
 **/
module.exports = function ( router ) {

  router.post('/register', ctrlAuth.register);
  router.post('/login', ctrlAuth.login);
};

