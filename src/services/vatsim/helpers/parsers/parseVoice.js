const parseVoice = data => {
	const voiceServers = [];

	for(const line in data)
	{
		const l = data[line];
		const things = l.split(":");
		const voice = {};

		voice["address"] = things[0];
		voice["location"] = things[1];
		voice["name"] = things[2];
		voice["clients_allowed"] = things[3];
		voice["type"] = things[4];

		voiceServers.push(voice);
	}

  return voiceServers;
}

module.exports = parseVoice;