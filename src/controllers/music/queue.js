var serverQueue = require('./play.js')
console.log(serverQueue.songs);
const queueController = async msg => {
    if (!serverQueue) return msg.channel.send('There is nothing playing.');
    return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
    `);
}
module.exports = queueController;
