const purgeController = require('../../src/controllers/purge');

const messageMap = new Map();
messageMap.set('a', 'b');
let mockMessage;

describe('purgeController', () => {
  beforeEach(() => {
    mockMessage = {
      content: '!purge 20',
      channel: {
        send: jest.fn(),
        fetchMessages: jest.fn().mockReturnValue(messageMap),
        bulkDelete: jest.fn().mockResolvedValue({}),
      },
      delete: jest.fn(),
      member: {
        roles: [{
          name: 'Owner',
        }],
      }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the original message', () => {
    purgeController(mockMessage);
    expect(mockMessage.delete).toHaveBeenCalled();
  });

  it('should not send back any messages', () => {
    purgeController(mockMessage);
    expect(mockMessage.channel.send).toHaveBeenCalledTimes(0);
  });

  it('should try to fetch messages', async () => {
    await purgeController(mockMessage);
    expect(mockMessage.channel.fetchMessages).toHaveBeenCalled();
  });

  it('should do a bulk delete', async () => {
    await purgeController(mockMessage);
    expect(mockMessage.channel.bulkDelete).toHaveBeenCalled();
  })

  it('should send an error message when amount is not a number', () => {
    mockMessage.content = '!purge hello';
    purgeController(mockMessage);
    expect(mockMessage.channel.send).toHaveBeenCalledWith('Please use a number as your arguments.\nUsage: !purge <amount>');
  });

  // TODO: Fix this test
  xit('should send back an error when issue bulk deleting', async () => {
    mockMessage.channel.bulkDelete = jest.fn().mockRejectedValue(new Error('Test Error'));
    await purgeController(mockMessage);
    expect(mockMessage.channel.send).toHaveBeenCalledWith('Error: Test Error');
  });
});
