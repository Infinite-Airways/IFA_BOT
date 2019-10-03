'use strict';
const axios = require('axios')
const fs = require('fs');
const helpers = require('./helpers');

const dataUrls = [];

let cache = {};

const getVatsimData = () => {
	if(dataUrls.length > 0) {
		const url = dataUrls[Math.floor((Math.random() * dataUrls.length) + 1)];
		return axios.get(url);
	}
}

const updateVatsimData = async () => {
	if(dataUrls.length > 0) {
		try {
			cache = { data } = await getVatsimData();
		} catch(e) {
			cache = {};
		}
	}
	
}

const readStatus = () => {
	fs.readFile('src/services/vatsim/status.txt', 'utf8', (err, contents) => {
		if(err)
		{
			console.log(err);
			return;
		}
		const lines = contents.split("\n");
		for(const line in lines)
		{
			const l = lines[line];
			
			if(l.startsWith("url0"))
			{
				dataUrls.push(l.split("=")[1]);
				console.log(l.split("=")[1]);
			}
		}
	});
}

module.exports = {
	getClient: id => cache.clients.callsignToClient[id] ? cache.clients.callsignToClient[id] :  { error: `No client found with ID ${id}` },
	getClients: filter => filter ? helpers.filter.filterVatsim(filter, cache.clients.clients) : cache.clients.clients,
	getVoiceServers: filter => filter ? helpers.filter.filterVatsim(filter, cache.voiceServers) : data.voiceServers,
	getGeneral: () => cache.general,
	getPrefiled: filter => filter ? helpers.filter.filterVatsim(filter, cache.prefiledFPs) : cache.prefiledFPs,
	getServers: filter => filter ? helpers.filter.filterVatsim(filter, cache.servers) : cach.eservers,
	getCallsignsToClients: () => cache.clients.callsignToClient,
	init: () => {
		readStatus();
		updateVatsimData();
	},
	updateVatsimData: () => updateVatsimData(),
}
