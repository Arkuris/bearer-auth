'use strict';

module.exports = (req, res, next) => {
  const error = { error: 'Resource Not Found' };
  res.status(404).json(error);
};