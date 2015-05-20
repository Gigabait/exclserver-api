'use strict';

// VARIABLES
var express = require('express'),
    db = require('../lib/db.js');

// INIT ROUTER
var router = express.Router();

// GET all
var allServers={
  'timeCache' : 0,
  'json' : []
}

router.get('/all', function(req, res, next) {
  var time=Math.floor(new Date() / 1000);
  if(allServers.timeCache+(600*60) < time){
    db.query("SELECT id,dns,name FROM es_servers WHERE dns IS NOT NULL AND name IS NOT NULL LIMIT 20;",function(err,rows){
      if (err) {
        next(new Error("Internal server error"));
      }

      allServers.timeCache = time;

      if (rows && typeof rows == "object" && rows[1]){
        allServers.json = rows;
      }

      res.json(allServers.json);
    })
  } else {
    res.json(allServers.json);
  }
});

module.exports = router;
