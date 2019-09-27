'use strict';
const axios = require('axios');
const baseUrl = 'https://avwx.rest/api/metar';
const metartoken = process.env.METAR_TOKEN;

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
