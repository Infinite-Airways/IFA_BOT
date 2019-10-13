'use strict';
const Discord = require('discord.js');
const { getDataForVatsim } = require('../../services/vatsim');

const vatsimController = async message => {
    message.channel.send("VATSIM servers are curently down for maintenance until Monday at 2000z. More info : https://audio.vatsim.net/");
//   try {
//     var callsign_datacase = message.content.split(' ')[1];
//     var callsign_data = callsign_datacase.toUpperCase();
//     const { data } = await getDataForVatsim(callsign_data);

//     if (data.error) { message.channel.send(`Error: ${data.error}`); return; }

//     const {
//       callsign,
//       name,
//       cid,
//       dep,
//       arr,
//       aircraft,
//       coords,
//       altitude,
//       speed,
//       heading,
//       timestamp,
//       type,
//       frequency,
//     } = data;

//     var timestampconverted = new Date(timestamp);
//     var timestampconvertedsplit = timestampconverted.toString().split(' ');
//     var unixconverted = timestampconvertedsplit[0] + " " + timestampconvertedsplit[1] + " " + timestampconvertedsplit[2] + " " + timestampconvertedsplit[3] + " " + timestampconvertedsplit[4];

    
//     if (type == 'pilot'){
//       const embed = {
//         color: 0x0091df,
//         title: '__Information for ' + `${callsign}` + '__',
//         author: {
//           name: '',
//         },
//         thumbnail: {
//           url: 'attachment://infinitelogo.png',
//         },
//         fields: [
//           {
//             name: `**Fetched:** ${unixconverted}`,
//             value: `**Name:** ${name}
//               **VATSIM CID:** ${cid}
//               **Departure:** ${dep.code.icao}
//               **Arrival:** ${arr.code.icao}
//               **Aircraft:** ${aircraft}
//               **Speed:** ${speed}
//               **Heading:** ${heading}°
//               **Altitude** ${altitude}ft
//               **Type** ${type.toUpperCase()}`,
//           },
//         ],
//       };
//       message.channel.startTyping(true);
//       message.channel.send({embed});
//       message.channel.stopTyping(true);
//     } else if(type== 'atc'){
//       const embed = {
//         color: 0x0091df,
//         title: '__Information for ' + `${callsign}` + '__',
//         thumbnail: {
//           url: 'attachment://infinitelogo.png',
//         },
//         fields: [
//           {
//             name: `**Fetched:** ${unixconverted}`,
//             value: `**Name:** ${name}
//               **VATSIM CID:** ${cid}
//               **Frequency:** ${frequency}MHz
//               **Type** ${type.toUpperCase()}`,
//           },
//         ],
//       };
//       message.channel.startTyping(true);
//       message.channel.send({embed});
//       message.channel.stopTyping(true);
//     };
//   } catch (error) {
//     if ( error || error.response.status) {
//       message.channel.send("Please enter a valid callsign");
//       return;
//     }
//   }
};

module.exports = vatsimController;
