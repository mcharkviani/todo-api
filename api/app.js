const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('../api/config/db');

dotenv.config();

// Connect to database
connectDB();

// Use modules
app.use(bodyParser());
app.use(express.json());
app.use(cors());
app.use(morgan());

// Routes
const tasks = require('../api/routes/task');
const users = require('../api/routes/user');

app.use('/tasks', tasks);
app.use('/users', users);

module.exports = app;
