'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  // Check for the presence of the Authorization header and its format.
  let authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authorizationHeader || !authorizationHeader.startsWith('Basic ')) {
    return _authError(res);
  }

  try {
    // Decode the Base64 encoded username:password value.
    let basic = authorizationHeader.split(' ')[1];
    let [username, pass] = base64.decode(basic).split(':');

    // Authenticate the user.
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    _authError(res, 'Invalid Login', 403);
  }
}

// Authentication error helper function.
function _authError(res, message = 'Authentication Required', statusCode = 401) {
  res.status(statusCode).send(message);
}