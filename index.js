const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({
  path: './config/env/config.env',
});
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`****server started ${PORT}****`);
});

module.exports = app;
