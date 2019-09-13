//var express = require('express');
//var router = express.Router();
const router = require('express').Router();
const path = require('path');

/* Send React App. */
router.get('', 
  (req, res, next) => {
    console.log('rest-router: dirname is ', __dirname);
    res.sendFile( path.resolve(
      __dirname, 
      '../../static/index.html'
      ),
      err => {
        if(err) { next(err); }
      }
    );
});

// GET for react app page. 
router.get('*', (req, res) => {
  console.log('rest-router redirect: dirname is ', __dirname);
  res.redirect('');
});

module.exports = router;
