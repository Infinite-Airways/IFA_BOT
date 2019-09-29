'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();

const reportController = message => {
    const prefix = "?";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let numArgs = args.length;
    let argsReason = args.slice(2).join(" ");
    if (numArgs < 3){
        message.channel.send("Please mention a user and a reason");
        console.log(argsReason);
        return;
    }
    let reporter = message.author.id;
    let user = message.mentions.users.first();
    let member;
    if(user){
        member = message.guild.member(user);
    }
    message.channel.send(`Reported ${member} for ${argsReason}! This has been sent to the staff/owners`);
    message.client.channels.get('543574967871209502').send(`<@${reporter}> just reported ${member} for ${argsReason}`)

  };
  
  module.exports = reportController;
  