'use strict';

const express = require('express');
const loaders = require('./loaders');

const app = express();

const startApp = async () => {
  await loaders({ expressApp: app });
};

startApp();

module.exports = app;
