const router = require('express').Router();

const { register, login, getUser } = require('../services/authService');

const { parseError } = require('../utils');

router.post('/register', async (req, res) => {
	const { email, password, name } = req.body;

	try {
		const userData = await register(email, name, password);

		res.json(userData);
	} catch (err) {
		const error = parseError(err);
		res.status(err.status || 400).json({ msg: error });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const userData = await login(email, password);

		res.json(userData);
	} catch (err) {
		const error = parseError(err);
		res.status(err.status || 400).json({ msg: error });
	}
});

router.get('/user/:id', async (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: 'valid access token is required'
		});
		return;
	}
	try {
		const user = await getUser(req.params.id);
		res.json(user);
	} catch (err) {
		const error = parseError(err);
		res.status(err.status || 400).json({ msg: error });
	}
});

module.exports = router;
