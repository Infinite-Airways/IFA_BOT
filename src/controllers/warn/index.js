'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();

const warnController = message => {
    const prefix = "?";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let reason1 = args.slice(2).join(' ');
    let member1 = message.mentions.members.first() || message.guild.members.get(args[0]);
    let numArgs = args.length;
    let argsReason = args.slice(2).join(" ");
    if (!message.member.roles.some(r => ["Owners", "Staff"].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
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
    message.channel.send(`Warned ${member} for ${argsReason}!`);
    member.send(`You have been warned by <@${reporter}> for ${argsReason}`);

    const embed = {
        color: 0x0091df,
        author: {
            name: `${message.author.tag} (ID ${message.author.id})`,
            icon_url: `${message.author.avatarURL}`,
            url: '',
        },
        fields: [{
            name: `__MODERATION INFORMATION__`,
            value: `:warning: **Warned:** ${member1.user.tag} (ID ${member1.user.id}) \n :page_facing_up: **Reason:** ${reason1}`,
        }, ],
    };
    message.client.channels.get('543574967871209502').send({
        embed,
    })

  };
  
  module.exports = warnController;
  