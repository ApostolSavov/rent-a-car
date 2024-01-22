function parseError(error) {
	if (error.name === 'ValidationError') {
		return Object.values(error.errors)
			.map((err) => err.properties.message)
			.join(' \n');
	} else {
		return error.message;
	}
}

module.exports = {
	parseError
};
