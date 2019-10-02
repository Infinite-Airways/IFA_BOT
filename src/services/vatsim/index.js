'use strict';
const axios = require('axios');
const baseUrl = 'http://142.44.243.147:5000/data';

const getDataForVatsim = callsign_data => {
  const url = `${baseUrl}/${callsign_data}`;
  return axios.get(url);
};

module.exports = {
  getDataForVatsim,
}
