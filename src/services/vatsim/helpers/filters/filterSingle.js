const filterSingle = (filter, c) => {
	const nc = {};

	for(const f in filter)
	{
		const fi = filter[f];

		if(c[fi])
		{
			nc[fi] = c[fi];
		}
	}

	return nc;
}

module.exports = filterSingle;