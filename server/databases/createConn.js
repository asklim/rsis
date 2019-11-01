//import { mongoose } from 'mongoose';
const mongoose = require('mongoose');
const infoDB = require('./infodb');


module.exports.createConn = function( uri, title) {

  const conn = mongoose.createConnection(uri, 
                  { useNewUrlParser: true,
                    useCreateIndex : true });

  // CONNECTION EVENTS
  conn.on('connected', () => {
      console.log(`${title}: connected to ${conn.host}:${conn.port}`);
      infoDB.log(conn);
  });
  conn.on('error', (err) => {
      console.log(title, ': connection error: ', err);
  });
  conn.on('disconnecting', () => {
    console.log(`${title} connection closing ...`);
  });  
  conn.on('disconnected', () => {
      console.log(`${title} disconnected from MongoDB.`);
  });
  conn.on('close', () => {
    console.log(`${title} connection closed.`);
  });

  conn.closeConn = () => {    
    // eslint-disable-next-line no-unused-vars
    return new Promise( (resolve, reject ) => {
      conn.close( () => {
        resolve( title );
      });
    });
  };

  return conn;
};
