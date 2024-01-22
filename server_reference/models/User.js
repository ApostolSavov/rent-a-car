const { Schema, model } = require('mongoose');

const schema = new Schema({
	email: { type: String, required: [true, 'Email is required.'] },
	name: { type: String, default: '', required: [true, 'Name is required.'] },
	hashedPassword: { type: String, required: true },
	rentedId: { type: String, default: '' },
	offered: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Car'
		}
	]
});

module.exports = model('User', schema);
