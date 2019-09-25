'use strict';
const Discord = require('discord.js');
const weather = require('weather-js');

const weatherController = message => {
  weather.find({ search: args.join(' '), degreeType: 'F' }, (err, result) => {
    if (err) message.channel.send(err);

    if (result.length === undefined || result.length === 0) {
      message.channel.send('**Please enter a valid location.**');
      return;
    }

    const { current, location } = result[0];
    const {
      skytext,
      observationpoint,
      imageUrl,
      temperature,
      feelslike,
      winddisplay,
      humidity,
    } = current;
    const { timezone, degreetype } = location;

    const embed = new Discord.RichEmbed()
      .setDescription(`**${skytext}**`)
      .setAuthor(`Weather for ${observationpoint}`)
      .setThumbnail(imageUrl)
      .setColor(0x00ae86)
      .addField('Timezone', `UTC${timezone}`, true)
      .addField('Degree Type', degreetype, true)
      .addField('Temperature', `${temperature} Degrees`, true)
      .addField('Feels Like', `${feelslike} Degrees`, true)
      .addField('Winds', winddisplay, true)
      .addField('Humidity', `${humidity}%`, true);

    message.channel.send({ embed });
  });
};

module.exports = weatherController;