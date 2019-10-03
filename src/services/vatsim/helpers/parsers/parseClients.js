const parseClients = data => {
  const clients = [];
  const callsignToClient = [];

  for (const line in data) {
    const client = {};
    const things = data[line].split(':');

    client['callsign'] = things[0];
    client['cid'] = things[1];
    client['name'] = things[2];
    client['clienttype'] = things[3];
    client['frequency'] = things[4];
    client['latitude'] = things[5];
    client['longitude'] = things[6];
    client['altitude'] = things[7];
    client['groundspeed'] = things[8];
    client['planned_aircraft'] = things[9];
    client['planned_tascruse'] = things[10];
    client['planned_depairport'] = things[11];
    client['planned_altitude'] = things[12];
    client['planned_destairport'] = things[13];
    client['server'] = things[14];
    client['protrevision'] = things[15];
    client['rating'] = things[16];
    client['transponder'] = things[17];
    client['facilitytype'] = things[18];
    client['visualrange'] = things[19];
    client['planned_revision'] = things[20];
    client['planned_flighttype'] = things[21];
    client['planed_deptime'] = things[22];
    client['planned_actdeptime'] = things[23];
    client['planned_hrsenroute'] = things[24];
    client['planed_minenroute'] = things[25];
    client['planned_hrsfuel'] = things[26];
    client['planned_minfuel'] = things[27];
    client['planned_altairport'] = things[28];
    client['planned_remarks'] = things[29];
    client['planned_route'] = things[30];
    client['planned_depairport_lat'] = things[31];
    client['planned_depairport_lon'] = things[32];
    client['planned_destairport_lat'] = things[33];
    client['planned_destairport_lon'] = things[34];
    client['atis_message'] = things[35];
    client['time_last_atis_received'] = things[36];
    client['time_logon'] = things[37];
    client['heading'] = things[38];
    client['QNH_iHg'] = things[39];
    client['QNH_Mb'] = things[40];

    clients.push(client);
    callsignToClient[client.callsign] = client;
  }

  return { 
    clients,
    callsignToClient,
  };
};

module.exports = parseClients;
