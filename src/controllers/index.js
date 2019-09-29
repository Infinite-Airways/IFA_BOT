'use strict';
const pingController = require('./ping');
const metarController = require('./metar');
const purgeController = require('./purge');
const weatherController = require('./weather');
const musicController = require('./music/index.js');

module.exports = {
  ping: pingController,
  metar: metarController,
  purge: purgeController,
  weather: weatherController,
  music: musicController,
};
