'use strict';
const axios = require('axios');
const { metartoken } = require('../../config/config.json');

const baseUrl = 'https://avwx.rest/api/metar';
const options = ['translate', 'info', 'speech', 'summary'];

const getDataForICAO = async icao => {
  return axios.get(`${baseUrl}/${icao}`, {
    params: {
      options,
    },
    headers: {
      Authorization: metartoken,
    },
  });
};

module.exports = getDataForICAO;
