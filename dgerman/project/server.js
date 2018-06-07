// server.js

// set up ========================
var express  = require('express');
var app      = express();
// create our app w/ express
var mongoose = require('mongoose');
// mongoose for mongodb
var morgan = require('morgan');
// log requests to the console (express4)
var bodyParser = require('body-parser');
// pull information from HTML POST (express4)
var methodOverride = require('method-override');
// simulate DELETE and PUT (express4)

// configuration =================
mongoose.connect('mongodb://silo.cs.indiana.edu:33233/eggplant');
// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));
// set the static files location /public/img will be /img for users
app.use(morgan('dev'));
// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
var Task = mongoose.model('Task', {
             text : String
           });

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all tasks
app.get('/api/tasks', function(req, res) {
  // use mongoose to get all tasks in the database
  Task.find(function(err, tasks) {
    // if there is an error retrieving, send the error.
    // nothing after res.send(err) will execute
    if (err) res.send(err)
    res.json(tasks); // return all tasks in JSON format
    });
  });

// create task and send back all tasks after creation
app.post('/api/tasks', function(req, res) {
  // create a task, information comes from AJAX request from Angular
  Task.create({ text : req.body.text, done : false},
              function(err, task) {
                if (err) res.send(err);
                // get and return all the tasks after you create another
                Task.find(function(err, tasks) {
                  if (err) res.send(err)
                  res.json(tasks);
                });
              });
  });

// delete a task
app.delete('/api/tasks/:task_id', function(req, res) {
  Task.remove({ _id : req.params.task_id},
              function(err, task) {
                if (err) res.send(err);
                // get and return all the tasks after you create another
                Task.find(function(err, tasks) {
                            if (err) res.send(err)
                            res.json(tasks);
                          });
              });
  });

var port = process.env.PORT || 33233; // set the port

// listen (start app with node server.js)
// ======================================
app.listen(33233); // 33105); // 8080);
console.log("App listening on port " + 33233); // 33105"); // 8080");

