const parseGeneral = data => {
  const general = {};

  for (const line in data) {
    const l = data[line];
    
    general[l.split('=')[0]] = l.split('=')[1];
	}
  
	return general;
};

module.exports = parseGeneral;
