
'use strict';

const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');

const setupLoaders = async ({ expressApp }) => {
  await mongooseLoader();
  console.info('MongoDB connection initialized');
  await expressLoader(expressApp);
  console.info('Express initialized');
};

module.exports = setupLoaders;
