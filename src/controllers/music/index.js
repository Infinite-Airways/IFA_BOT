'use strict';
//https://github.com/DevYukine/Music-Bot/blob/master/MusicBot.js
const queue = new Map();
const ytdl = require('ytdl-core-discord');
const YouTube = require('simple-youtube-api');
const YTB_API = process.env.YTB_API;
const youtube = new YouTube(YTB_API);
const botconfig = require('../../config/botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();

const musicController = async msg => {
    var prefix = require('../../helpers/get-command.js').gprefix;
    const Util = require('discord.js');
    const args = msg.content.split(' ');
    const serverQueue = queue.get(msg.guild.id);
    const url = args[2] ? args[2].replace(/<(.+)>/g, '$1') : '';
    const searchString = args.slice(2).join(' ');
    if (args[1] === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }
        if (msg.guild.voiceConnection == null || msg.guild.voiceConnection.channel == voiceChannel){

            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id);
                    await handleVideo(video2, msg, voiceChannel, true);
                }
                return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        let index = 0;
                        msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
                        `);
                        try {
                            var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                            return msg.channel.send('No or invalid value entered, cancelling video selection.');
                        }
                        const videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('🆘 I could not obtain any search results.');
                    }
                }
                return handleVideo(video, msg, voiceChannel);
            }
        }
        else if (msg.guild.voiceConnection.channel !== voiceChannel){
            return msg.channel.send('You must be in the same voice channel as me.')
        }
    }
    else if (args[1] === 'queue') {
        const serverQueue = queue.get(msg.guild.id);
        if (!serverQueue) return msg.channel.send('There is nothing playing.');
        return msg.channel.send(`
    __**Song queue:**__
    ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
    **Now playing:** ${serverQueue.songs[0].title}
        `);
    }
    else if (args[1] === 'skip') {
        if (msg.member.voiceChannel === msg.guild.voiceConnection.channel) {
            if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
            if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
            serverQueue.connection.dispatcher.end('Skipped!');
            return undefined;
        }
        else return msg.channel.send('You must be in the same voice channel as me.');
    }
    else if (args[1] === 'pause') {
        if (msg.guild.voiceConnection == null) return msg.channel.send('There is nothing playing.');
        if (msg.member.voiceChannel === msg.guild.voiceConnection.channel) {
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return msg.channel.send('⏸ Paused');
            }
            else return msg.channel.send('There is nothing to pause.');
        }
        else return msg.channel.send('You must be in the same voice channel as me.');
    }
    else if (args[1] === 'resume') {
        if (msg.guild.voiceConnection == null) return msg.channel.send('There is nothing playing.');
        if (msg.member.voiceChannel === msg.guild.voiceConnection.channel) {
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return msg.channel.send('▶ Resumed!');
            }
            return msg.channel.send('There is nothing playing.');
        }
        else return msg.channel.send('You must be in the same voice channel as me.');
    }
    else if (args[1] === 'stop') {
        if (msg.guild.voiceConnection == null) return msg.channel.send('There is nothing playing.');
        if (msg.member.voiceChannel === msg.guild.voiceConnection.channel) {
            if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
            if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('Stopped!');
            msg.channel.send(':stop_button: Stopped!');
            return undefined;
        }
        else return msg.channel.send('You must be in the same voice channel as me.');
    }
    else if (args[1] === 'np' ||args[1] === 'nowplaying') {
        if (!serverQueue) return msg.channel.send('There is nothing playing.');
        return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    }
    else if (args[1] === 'help') {
        msg.reply('Sent you a DM.');
        const thumb = new Discord.Attachment('./src/assets/images/infinitelogo.png');
        const embed1 = {
            color: 0x0091df,
            title: '**__Music Commands__**',
            author: {
            name: '',
            },
            thumbnail: {
            url: 'attachment://infinitelogo.png',
            },
            fields: [
            {
                name: `\u200b`,                
                value: `**${prefix}music + Play** + Search term or youtube URL: Plays/adds music to the queue.
**${prefix}music + Queue**: Shows the queue.
**${prefix}music + Skip**: Skips the current song.
**${prefix}music + Pause**: Pauses the song.
**${prefix}music + Resume**: Resumes the song.
**${prefix}music + Stop**: Stops the song.
**${prefix}music + Np**: Shows *'now playing'*.`,
            },
            ],
        };
        msg.member.send({ files: [thumb], embed: embed1 });
    }
    else if (args[1] === 'loopqueue') {
        var guild = {};
        const serverQueue = queue.get(msg.guild.id);
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        if(!serverQueue) return msg.channel.send('Not playing anything right now');
        if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send(`You must be in **${serverQueue.voiceChannel.name}** to loop the queue`);
        serverQueue.loop = !serverQueue.loop;
        queue.set(msg.guild.id, serverQueue);
        //play(guild, serverQueue.songs[0]);
        if(serverQueue.loop) return msg.channel.send('**🔁 Repeated current queue!**');
        return msg.channel.send('**🔁 Unrepeated current queue!**');
    }


    else return msg.reply(`That command does not exist. Help : ${prefix}music help`);
    async function handleVideo(video, msg, voiceChannel, playlist = false) {
        const serverQueue = queue.get(msg.guild.id);
        console.log(video);
        const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            queue.set(msg.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(msg.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queue.delete(msg.guild.id);
                return msg.channel.send(`I could not join the voice channel: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if (playlist) return undefined;
            else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
        }
        return undefined;
    }
    async function play(guild, song) {
        const serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        console.log(serverQueue.songs);
        const dispatcher = serverQueue.connection.playOpusStream(await ytdl(song.url), { filter : 'audioonly', bitrate: 96000, quality : 'highestaudio'})
            .on('end', reason => {
                if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                else console.log(reason);
                if (serverQueue.loop === true) serverQueue.songs.push(serverQueue.songs.shift());
                else serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));
        serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
    }
}
module.exports = musicController;