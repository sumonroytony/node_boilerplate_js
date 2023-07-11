require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');

const User = require('./model/user.model');
const auth = require('./middleware/auth.middleware');

const app = express();

app.use(cors());
app.use(morgan('combined'));

app.use(express.json({ limit: '50mb' }));

app.get('/', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ');
});

require('./route/user.route.js')(app);

// This should be the last route else any after it won't work
app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

module.exports = app;
