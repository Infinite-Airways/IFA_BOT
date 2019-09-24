'use strict';
const { prefix } = require('../config/botconfig.json');

const getCommand = message => {
  const { content } = message;
  const command = content
    .toUpperCase()
    .split(' ')[0]
    .split(prefix)[1];
  return command || 'not a command';
};

module.exports = getCommand;