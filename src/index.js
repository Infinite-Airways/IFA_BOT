'use string';
const Discord = require('discord.js');
const { ping, purge, weather, metar } = require('./controllers');
const getCommand = require('./helpers/get-command');
//Required for environment variables
require('dotenv').config();
const token = process.env.BOT_TOKEN;

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
      console.log('Invalid command');
  }
});

bot.on('ready', () => {
  bot.user.setActivity(" an ATIS | !metar", { type: 'Listening' });
  console.log('Bot started.');
});

bot.login(token);
