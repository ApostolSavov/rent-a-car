const { Schema, model } = require('mongoose');

const schema = new Schema({
	brand: { type: String, required: true },
	model: { type: String, required: true },
	price: { type: Number, required: true, min: [1, 'Minimum price is 1BGN.'] },
	year: { type: Number, required: true },
	description: { type: String, required: true },
	rentEnd: { type: Date, default: '2000-01-01T09:06:45.558Z' },
	imageUrl: {
		type: String,
		required: true,
		match: [/^https?:\/\//, 'Invalid image URL!']
	},
	ownerId: { type: String, required: true },
	renterId: { type: String, default: '' }
});

module.exports = model('Car', schema);
