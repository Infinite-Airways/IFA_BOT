const filterSingle = require('./filterSingle');

const filterVatsim = (filter, a) => {
	const n = [];

	for(const c in a)
	{
		const client = a[c];
		n.push(filterSingle(filter, client));
	}

	return n;
}

module.exports = filterVatsim;