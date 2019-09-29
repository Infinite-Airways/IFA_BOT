'use strict';
const pingController = require('./ping');
const metarController = require('./metar');
const purgeController = require('./purge');
const weatherController = require('./weather');
const playController = require('./music/play.js');
const leaveController = require('./music/leave.js');
const queueController = require('./music/queue.js');

module.exports = {
  ping: pingController,
  metar: metarController,
  purge: purgeController,
  weather: weatherController,
  play: playController,
  leave: leaveController,
  queue: queueController,
};
