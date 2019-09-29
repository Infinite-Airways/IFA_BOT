'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();

const kickController = message => {
    const prefix = "?";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let numArgs = args.length;
    let argsReason = args.slice(2).join(" ");
    let argsReasonBefore = argsReason.split(" ");
    console.log(argsReasonBefore);
    console.log(args[1]);
    let reporter = message.author.id;
    let allowedRole = message.guild.roles.find("name", "rolename");
    if ((message.member.roles.find(role => role.name === 'Owners' || role.name === 'Staff'))) {
        if(args[2]!= argsReasonBefore[0]){
            message.channel.send('Please use the specified format: **PREFIX** + **KICK** + **USER** + **REASON** ');
            return;
        }
        if ((!args[1].startsWith("<"))) {
            message.channel.send('Please use the specified format: **PREFIX** + **KICK** + **USER** + **REASON** ');
            return;
        }
        if (numArgs < 3) {
            if (numArgs < 2) {
                message.channel.send("Please mention a user and a reason");
                return;
            };
            message.channel.send("Please mention a reason");
            console.log(argsReason);
            return;
        }
        let user = message.mentions.users.first();
        let member;
        if (user) {
            member = message.guild.member(user);
            console.log(member);
        } else {
            message.channel.send("This user is not in the server or doesn't exist");
            return;
        }
        // member.send(`You have been kicked from Infinite Airways for ${argsReason}`);
        member.kick(`You have been kicked from Infinite Airways for ${argsReason}`);
        message.channel.send(`Kicked ${member} for ${argsReason}!`);
        message.client.channels.get('543574967871209502').send(`<@${reporter}> just kicked ${member} for ${argsReason}`)
    } else {
        message.channel.send("You are not allowed to use this command");
        return;
    };




};

module.exports = kickController;