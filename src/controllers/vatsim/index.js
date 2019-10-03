'use strict';
const vatsim = require('../../services/vatsim');

const dataUpdated = () => {
  console.log(new Date() + ': Data updated, updating again in 3 minutes');
};

const dataFailed = () => {
  updateData();
};

const updateData = () => {
  vatsim.updateVatsimData(dataUpdated, dataFailed);
};

vatsim.init();

const mins = 1 * 60 * 1000;

setInterval(() => {
  updateData();
}, mins);

const vatsimController = message => {
  const callsign = message.content.split(' ')[1];
};

module.exports = vatsimController;
