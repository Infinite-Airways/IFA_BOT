'use strict';
const axios = require('axios');
const baseUrl = 'https://avwx.rest/api/metar';
const options = ['translate', 'info', 'speech', 'summary'];
const metartoken = process.env.METAR_TOKEN;

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
