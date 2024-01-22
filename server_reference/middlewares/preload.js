const { getById } = require('../services/carService');

module.exports =
	(paramName = 'id') =>
	async (req, res, next) => {
		const id = req.params[paramName];

		if (id) {
			const data = await getById(id);
		}
		next();
	};
