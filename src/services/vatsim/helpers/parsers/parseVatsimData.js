'use strict';
const parseGeneral = require('./parseGeneral');
const parsePrefile = require('./parsePrefile');
const parseClients = require('./parseClients');
const parseServers = require('./parseServers');
const parseVoice = require('./parseVoice');

const parser = (wasInSection, currentSection, data) => {
  let out = {};

  if (wasInSection) {
    switch (currentSection) {
      case 'GENERAL\r':
        out['general'] = parseGeneral(data);
        break;
      case 'PREFILE\r':
        out['prefiledFPs'] = parsePrefile(data);
        break;
      case 'CLIENTS\r':
        out['clients'] = parseClients(data);
        break;
      case 'SERVERS\r':
        out['servers'] = parseServers(data);
        break;
      case 'VOICE SERVERS\r':
        out['voiceServers'] = parseVoice(data);
        break;
      default:
        console.log('Current Section: ', { currentSection });
    }
  }

  return out;
}

const parseVatsimData = raw => {
  let data = [];
  const lines = raw.split('\n');
  let inSection = false;
  let wasInSection = false;
  let currentSection = '';
  let output = {};

  if (lines.length < 1 || lines[4].includes('DOWNLOAD ALLOTMENT EXCEEDED')) {
    return;
  }

  for (const line in lines) {
    const l = lines[line];

    if (l === ';   END') {
      const obj = parser(wasInSection, currentSection, data);
      output = { ...output, ...obj};
      data = [];
      return;
    } else if (inSection && !l.startsWith('!')) {
      data.push(l);
    } else if (l.startsWith('!')) {
      wasInSection = inSection;

      inSection = true;
      const newCurrentSection = l
        .replace('!', '')
        .replace(';', '')
        .replace(':', '');

      const obj = parser(wasInSection, currentSection, data);
      output = { ...output, ...obj };

      data = [];

      currentSection = newCurrentSection;
    }
  }

  return output;
};

module.exports = parseVatsimData;
