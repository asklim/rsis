var webClient = require('./catalogs4web');
var excelClient = require('./catalogs4excel');

var sendJSONresponse = function (res, status, content) {
    console.log(`catalogs: ${content}`);
    res.status(status);
    res.json(content);
};

/** 
  * GET a one catalog for <client> by <query> 
  *
  **/

module.exports.catalogReadOne = (req, res) => {

    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);

    if (req.params && req.params.client) {

        switch (req.params.client) {
            case 'excel':
                excelClient.catalogQueryReadOne(req, res);
                return;
            case 'web':
                webClient.catalogQueryReadOne(req, res);
                return; 
            default:
                sendJSONresponse(res, 404,
                    {'catalogs': `Client '${req.params.client}' not found.`
                    });
                return; 
        }
    } else {

        sendJSONresponse(res, 404, {
            'catalogs': 'No params in request.'
        });
    }
};

module.exports.catalogsAllClients = (req, res) => {

    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);

    sendJSONresponse(res, 404, {
        'catalogs': 'No params in request.'
    });
};


/** 
  * POST a one catalog for <client> by <query> 
  *
  **/

module.exports.catalogCreateOne = (req, res) => {

    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);

    if (req.params && req.params.client) {

        switch (req.params.client) {
            case 'excel':
                excelClient.catalogQueryCreateOne(req, res);
                return;
            case 'web':
                //webClient.catalogQueryCreateOne(req, res);
                return; 
            default:
                sendJSONresponse(res, 404,
                    {'catalogs': `Client '${req.params.client}' not found.`
                    });
                return; 
        }
    } else {

        sendJSONresponse(res, 404, {
            'catalogs': 'No params in request.'
        });
    }
};


/** 
  * PUT a one catalog for <client> by <query> 
  *
  **/

module.exports.catalogUpdateOne = (req, res) => {

    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);

    if (req.params && req.params.client) {

        switch (req.params.client) {
            case 'excel':
                excelClient.catalogQueryUpdateOne(req, res);
                return;
            case 'web':
                //webClient.catalogQueryUpdateOne(req, res);
                return; 
            default:
                sendJSONresponse(res, 404,
                    {'catalogs': `Client '${req.params.client}' not found.`
                    });
                return; 
        }
    } else {

        sendJSONresponse(res, 404, {
            'catalogs': 'No params in request.'
        });
    }
};


/** 
  * DELETE a one catalog for <client> by <query> 
  *
  **/

module.exports.catalogDeleteOne = (req, res) => {

    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);

    if (req.params && req.params.client) {

        switch (req.params.client) {
            case 'excel':
                excelClient.catalogQueryDeleteOne(req, res);
                return;
            case 'web':
                //webClient.catalogQueryDeleteOne(req, res);
                return; 
            default:
                sendJSONresponse(res, 404,
                    {'catalogs': `Client '${req.params.client}' not found.`
                    });
                return; 
        }
    } else {

        sendJSONresponse(res, 404, {
            'catalogs': 'No params in request.'
        });
    }
};