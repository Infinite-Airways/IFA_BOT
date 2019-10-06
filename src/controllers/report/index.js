'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();

const reportController = message => {
    var prefix = require('../../helpers/get-command.js').gprefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let reason1 = args.slice(2).join(' ');
    let member1 = message.mentions.members.first() || message.guild.members.get(args[0]);
    let numArgs = args.length;
    let argsReason = args.slice(2).join(" ");
    if (numArgs < 3){
        message.channel.send("Please mention a user and a reason");
        console.log(argsReason);
        return;
    }
    let reporter = message.author.id;
    let user1 = message.mentions.users.first();
    let member;
    if(user1){
        member = message.guild.member(user1);
    }
    message.channel.send(`Reported ${member} for ${argsReason}! This has been sent to the staff/owners`);

    const embed = {
        color: 0x0091df,
        author: {
            name: `${message.author.tag} (ID ${message.author.id})`,
            icon_url: `${message.author.avatarURL}`,
            url: '',
        },
        fields: [{
            name: `__MODERATION INFORMATION__`,
            value: `:warning: **Reported:** ${member1.user.tag} (ID ${member1.user.id}) \n :page_facing_up: **Reason:** ${reason1}`,
        }, ],
    };
    message.client.channels.get('543574967871209502').send({
        embed,
    })

  };
  
  module.exports = reportController;
  