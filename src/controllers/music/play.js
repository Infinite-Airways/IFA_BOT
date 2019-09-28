'use strict';
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const playController = async message => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    if(!message.member.voiceChannel) return message.channel.send('You must be in a voice channel');
    if(message.guild.me.voiceChannel) return message.channel.send('Sorry the bot is busy');
    if(!args[0]) return message.channel.send('Do you want me to play nothing?');
    let validate = ytdl.validateURL(args[0]);
    if (!validate) return message.channel.send('Thats an invalid link you got there...');
    let info = await ytdl.getInfo(args[0]);
    let voiceConnection = message.member.voiceChannel.join()
    .then(voiceConnection => {
    const stream = ytdl(args[0], { filter : 'audioonly', bitrate: 96000, quality : 'highestaudio'});
    const streamDispatcher = voiceConnection.playStream(stream, streamOptions);
    })
    .catch(console.error);
    message.channel.send(`Now playing: ${info.title}`);

}
module.exports = playController;