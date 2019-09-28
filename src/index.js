'use string';
const Discord = require('discord.js');
const { ping, purge, weather, metar, play, leave } = require('./controllers');
const getCommand = require('./helpers/get-command');
const token = process.env.BOT_TOKEN;

const bot = new Discord.Client();
//  bot.on('debug', console.log)

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
    case 'PLAY':
      play(message);
      break;
    case 'LEAVE':
      leave(message);
      break;
    default:
      break;
  }
});

bot.on('ready', () => {
  bot.user.setActivity("an ATIS |!metar", { type: 'Listening' });
  console.log('Bot started.');
});

bot.on('guildMemberAdd', member => {
  let memberRole = member.guild.roles.find(role => role.id == '483854895615836160');
  let unverifiedRole = member.guild.roles.find(role => role.id == '566752818564694017');
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!channel) return;
  channel.send(`Hey ${member}, welcome to Infinite Airways, enjoy your stay! :tada::hugging: !`);
  member.addRole(memberRole);
  member.addRole(unverifiedRole);
  member.send(`Have a great time here in Infinite Airways :wink:
Here are some of the things that we do in our airline:
- Group flights every Friday, Saturday and even Sundays
- Fly whatever routes whenever you'd like
- Liveries being made for aircraft
- Friendly community of pilots
- ACARS tracker to log your flights
- Fly whatever aircraft you'd like
   
Register as a pilot at https://www.infiniteairways.xyz/
If you'd like to know more, ask us in the server!`);
});
//im pretty much done here
bot.login(token);
