module.exports = () => (req, res, next) => {
	const token = req.headers['authorization-token'];

	try {
		if (token) {
			const userData = jwt.verify(token, 'aliens exist');
			req.user = userData;
		}
		next();
	} catch (err) {
		res.status(401).json({
			message: 'Invalid access token. Please sign in.'
		});
	}
};
