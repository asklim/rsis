
const sendJSONresponse = (res, status, content) =>
{
  res.status(status);
  res.json(content);
};

const response400 = (res, msg) => {
  // Bad Request (invalid syntax)
  sendJSONresponse(res, 400, {"message": msg});
};

/** 
 * Read a env variable from process.env by name
 * GET /api/config/processenv?name=<var_name> 
 **/
module.exports.readOne = (req, res) =>
{
  console.log('env.ROne: Finding params: ', req.params,
              ' length: ', Object.keys(req.params).length );
  console.log('env.ROne: Finding query: ', req.query);  

  if( Object.keys(req.params).length !== 0) // не должно быть
  {    
    response400( res, ".params not allowed" );
    return;
  }
  if( !req.query ) // req.query должен быть
  {     
    response400( res, ".query not present" );
    return;    
  }
  const { name } = req.query;
  if( !name ) // req.query.name должен быть
  {    
    response400( res, ".name not present" );
    return;      
  }
  const value = process.env[ name ];
  console.log("name : ", name);
  console.log("value: ", value);

  if( !value ) // Нет такой переменной в окружении
  {    
    sendJSONresponse( res, 404, {
      "message" : "invalid .name"} );
    return;      
  }
  sendJSONresponse( res, 200, {
    "value" : value
  });
};
