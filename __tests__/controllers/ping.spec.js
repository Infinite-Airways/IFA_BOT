const pingController = require('../../src/controllers/ping');
const message = {
  content: '!ping',
  channel: {
    send: jest.fn(),
  },
};

describe('pingController', () => {
  it('should send me a ping', () => {
    pingController(message);
    expect(message.channel.send).toHaveBeenCalledWith('Ping!');
  });
});
