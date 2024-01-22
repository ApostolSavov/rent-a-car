const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(email, name, password) {
	const existing = await User.findOne({ email });

	console.log(email, name, password);

	if (existing) {
		throw new Error('Email is already taken.');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = new User({
		email,
		hashedPassword,
		name
	});

	await user.save();

	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		accessToken: createToken(user)
	};
}

async function login(email, password) {
	const user = await User.findOne({ email });

	console.log(user);

	if (!user) {
		const error = new Error('Incorrect email or password.');
		error.status = 401;
		throw error;
	}

	const match = await bcrypt.compare(password, user.hashedPassword);

	if (!match) {
		const error = new Error('Incorrect email or password.');
		error.status = 401;
		throw error;
	}

	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		accessToken: createToken(user)
	};
}

function createToken(user) {
	const token = jwt.sign(
		{
			_id: user._id,
			email: user.email
		},
		'aliens exist'
	);

	return token;
}

async function getUser(userId) {
	return User.findById(userId).populate('offered').lean();
}

module.exports = {
	register,
	login,
	getUser
};
