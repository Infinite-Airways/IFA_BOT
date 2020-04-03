'use strict';
const axios = require('axios');
const baseUrl = 'http://184.161.214.19:2223/data';

const getDataForVatsim = callsign_data => {
  const url = `${baseUrl}/${callsign_data}`;
  return axios.get(url);
};

module.exports = {
  getDataForVatsim,
}