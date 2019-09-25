'use string';
const Discord = require('discord.js');
const { token } = require('./config/config.json');
const { ping, purge, weather, metar } = require('./controllers');
const getCommand = require('./helpers/get-command');

const bot = new Discord.Client();

bot.on('message', message => {
  switch (getCommand(message)) {
    case 'PING':
      ping(message);
      break;
    case 'PURGE':
      purge(message);
      break;
    case 'WEATHER':
      weather(message);
      break;
    case 'METAR':
      metar(message);
      break;
    default:
      break;
  }
});

bot.on('ready', () => {
  console.log('Bot started.');
});

bot.login(token);
