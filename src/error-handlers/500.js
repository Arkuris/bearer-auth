'use strict';

module.exports = (err, req, res, next) => {
  const error = { error: err.message || err };
  res.status(err.status || 500).json(error);
};