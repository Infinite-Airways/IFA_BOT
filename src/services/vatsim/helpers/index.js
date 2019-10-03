// Parsers
const parseVatsimData = require('./parsers/parseVatsimData');

// Filters
const filterSingle = require('./filters/filterSingle');
const filterVatsim = require('./filters/filterVatsim');

module.exports = {
  parsers: {
    parseVatsimData,
  },
  filters: {
    filterSingle,
    filterVatsim,
  }
};
