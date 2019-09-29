'use strict';
const banController = message => {
    const prefix = "?";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if (!message.member.roles.some(r => ["Owners", "Staff"].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.reply("Please mention a valid member of this server");
    if (!member.kickable)
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    let reason = args.slice(2).join(' ');
    console.log(reason);
    if (!reason) reason = "No reason provided";
    if (reason.startsWith("<")) {
        message.channel.send("Please use the format: **Ban** + **User** + **Reason**");
        return;
    }
    member.ban(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.channel.send(`<@${member.user.id}> has been banned by <@${message.author.id}> for reason: ${reason}`);
    const embed = {
        color: 0x0091df,
        author: {
            name: `${message.author.tag} (ID ${message.author.id})`,
            icon_url: `${message.author.avatarURL}`,
            url: '',
        },
        fields: [{
            name: `__MODERATION INFORMATION__`,
            value: `:x: **Banned:** ${member.user.tag} (ID ${member.user.id}) \n :page_facing_up: **Reason:** ${reason}`,
        }, ],
    };
    message.client.channels.get('543574967871209502').send({
        embed,
    })
};

module.exports = banController;