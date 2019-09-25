'use strict';

const purgeController = async message => {
  const amount = message.content.split(' ')[1];

  if (isNaN(amount)) {
    message.channel.send(`Please use a number as your arguments.\nUsage: ${message.content[0]}purge <amount>`);
    return;
  }

  message.delete();

  if (!message.member.roles.find(role => role.name === 'Owner')) {
    message.channel.send('You need the \'Owners\' role to use this command.');
    return;
  }

  const fetched = await message.channel.fetchMessages({ limit: amount });

  try {
    message.channel.bulkDelete(fetched);
  } catch(error) {
    message.channel.send(`Error: ${error}`);
  }
};

module.exports = purgeController;