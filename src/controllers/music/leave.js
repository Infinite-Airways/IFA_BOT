'use strict';
const leaveController = async message => {
    if (!message.member.voiceChannel) return message.channel.send('You must be in a voice channel');
    if (!message.guild.me.voiceChannel) return message.channel.send('I cant leave if im not here.');
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('You must be in the same voice channel as me.');
    message.guild.me.voiceChannel.leave();
    message.channel.send('Bye! :wave:');
}
module.exports = leaveController;