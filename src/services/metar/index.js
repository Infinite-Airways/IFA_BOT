'use strict';
const axios = require('axios');
const { metartoken } = require('../../config/config.json');

const baseUrl = 'https://avwx.rest/api/metar';

const getDataForICAO = icao => {
  const url = `${baseUrl}/${icao}`;
  return axios.get(url, {
    params: {
      options: 'translate,speech,info,summary',
    },
    headers: {
      Authorization: metartoken,
    },
  });
};

module.exports = {
  getDataForICAO,
}
