'use strict';
const fs = require("fs");
const path = require('path');
const getCommand = message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let settings = JSON.parse(fs.readFileSync(path.join(__dirname, "../config/prefixconfig.json"), "utf8"));
  if(!settings[message.guild.id]) {
    settings[message.guild.id] = {
      prefix: '!'
    };
  }
  let prefix = settings[message.guild.id].prefix;
  let gprefix = prefix;
  var Globals = {
    'gprefix':gprefix,
  };
  module.exports = Globals;
  global.gprefix = 'test'
  const { content } = message;
  const command = content
    .toUpperCase()
    .split(' ')[0]
    .split(prefix)[1];
  return command || 'not a command';
};
module.exports = getCommand;