const parseServers = data => {
	const servers = [];

	for(const line in data) {
		const server = {};
		const things = data[line].split(":");
    const l = data[line].replace(" ", "");
    
		server["ident"] = things[0];
		server["hostname"] = things[1];
		server["location"] = things[2];
		server["name"] = things[3];
		server["clientsConnectionAllowed"] = things[4];

		servers.push(server);
	}
  
  return servers;
}

module.exports = parseServers;
