'use strict';
const pingController = message => {
  message.channel.send('Ping!');
};

module.exports = pingController;
