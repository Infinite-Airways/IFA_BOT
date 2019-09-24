'use strict';
const purgeController = async message => {
  const cont = message.content.slice(prefix.length).split(' ');
  const args = cont.slice(1);
  message.delete();

  if (!message.member.roles.find('name', 'Owners')) {
    message.channel.send('You need the `Owners` role to use this command.');
    return;
  }

  if (isNaN(args[0])) {
    message.channel.send(
      'Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>',
    );
    return;
  }

  const fetched = await message.channel.fetchMessages({ limit: args[0] });
  console.log(fetched.size + ' messages found, deleting...');

  message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Error: ${error}`));
};

module.exports = purgeController;