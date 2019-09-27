'use string';
const Discord = require('discord.js');
const { ping, purge, weather, metar } = require('./controllers');
const getCommand = require('./helpers/get-command');
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
      break;
  }
});

bot.on('ready', () => {
  bot.user.setActivity(" an ATIS | !metar", { type: 'Listening' });
  console.log('Bot started.');
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  var role = message.guild.roles.find(role => role.name === "Member");
  if (!channel) return;
  channel.send(`Hey ${member}, welcome to Infinite Airways, enjoy your stay :tada::hugging: !`);
  message.member.addRole(role);
});

bot.login(token);
