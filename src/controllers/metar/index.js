'use strict';
const Discord = require('discord.js');
const { getDataForICAO } = require('../../services/metar');

const metarController = async message => {
  const icao = message.content.split(' ')[1];

  try {
    const { data } = await getDataForICAO(icao);

    if (data.error) { message.channel.send(`Error: ${data.error}`); return; }

    const {
      station,
      time,
      raw,
      translate,
      wind_direction,
      wind_speed,
      flight_rules,
    } = data;

    new Discord.Attachment('../../assets/images/infinitelogo.png');

    const embed = {
      color: 0x0091df,
      title: '__METAR for ' + `${icao}` + '__',
      author: {
        name: '',
      },
      thumbnail: {
        url: 'attachment://infinitelogo.png',
      },
      fields: [
        {
          name: `**${raw}**`,
          value: `**Station:** ${station}
            **Observed at:** ${time.dt}
            **Temperature:** ${translate.temperature}
            **Dewpoint:** ${translate.dewpoint}
            **Winds:** ${wind_direction.value} at ${wind_speed.value} knots
            **Visibility:** ${translate.visibility}
            **Pressure:** ${translate.altimeter}`,
        },
        {
          name: `\u200b \n__Sky Conditions__`,
          value: `**Clouds:** ${translate.clouds}
            **Flight Rules:** ${flight_rules}`,
        },
      ],
    };

    message.channel.startTyping(true);
  
    message.channel.send({ 
      embed, 
    });
    message.channel.stopTyping(true);

  } catch (error) {
    if (error.response.data.error) {
      message.channel.send(error.response.data.error);
    }
  }
};

module.exports = metarController;