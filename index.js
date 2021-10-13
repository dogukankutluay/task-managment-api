const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const taskRepository = require('./app/repositories/taskRepository');
const taskController = require('./app/controllers/taskController');
const authController = require('./app/controllers/authController');

const app = express();

// applying middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Reset Data
taskRepository.resetData();

// Map Requests to Handlers
authController.mapRequestsToHandlers(app);
taskController.mapRequestsToHandlers(app);

// wrapped for testing
const PROCESS_PORT = 5000;
const SERVER_PORT = PROCESS_PORT || 5000;
if (!module.parent) {
  // staring the express server
  app.listen(SERVER_PORT, function () {
    console.log('Server is running at port :  ', SERVER_PORT);
  });
}

module.exports = app;
