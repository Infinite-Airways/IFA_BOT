'use strict';
const Discord = require('discord.js');
const { getDataForICAO } = require('../../services/metar');

const metarController = async message => {
  message.channel.startTyping(true);
  const icao = message.content.toLowerCase().slice(' ')[1];

  try {
    const response = await getDataForICAO(icao);

    if (response.error) { console.log(response.error); return; }

    const {
      station,
      time,
      raw,
      translate,
      wind_direction,
      wind_speed,
      flight_rules,
    } = response;

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
  
    message.channel.send({ 
      embed, 
    });
    message.channel.stopTyping(true);

  } catch (error) {
    console.log(error);
  }
};

module.exports = metarController;