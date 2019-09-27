'use strict';
const pingController = require('./ping');
const metarController = require('./metar');
const purgeController = require('./purge');
const weatherController = require('./weather');
const vatsimController = require('./vatsim');

module.exports = {
  ping: pingController,
  metar: metarController,
  purge: purgeController,
  weather: weatherController,
  vatsim: vatsimController,
};
