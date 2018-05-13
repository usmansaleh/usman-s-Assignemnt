/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import seedDatabaseIfNeeded from './config/seed';
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
// require('ssl-root-cas/latest').inject();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// Connect to MongoDB
// uncomment in case you wan to use MongoDB. At the moment we are using firebase so I have disabled mongodb initialization in this file

mongoose.connect(config.mongo.uri, config.mongo.options);
  mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});


// Setup server
var app = express();
var cors = require('cors');
//add cors to do the cross site requests
app.use(cors());
app.use(bodyParser.xml());

var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});

app.use(function(req, res, next) {
	// console.log("SERVER the request is: ", req);
  next();
});

require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

seedDatabaseIfNeeded();
setImmediate(startServer);

// Expose app
exports = module.exports = app;
