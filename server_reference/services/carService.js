const Car = require('../models/Car');
const User = require('../models/User');
const { carBrands, carModelsByBrand } = require('../config/carEnums');

async function getAll() {
	return Car.find({}).lean();
}

async function getAllAvailable() {
	const cars = await Car.find({
		rentEnd: { $lte: new Date().toISOString() }
	});

	if (cars) {
		let freshCars = await Promise.all(
			cars.map(async (car) => {
				if (car.renterId) {
					const user = await User.findById(car.renterId);
					user.rentedId = '';
					await user.save();
				}
				car.renterId = '';
				return await car.save();
			})
		);

		return freshCars;
	}
}

async function getById(id) {
	return Car.findById(id).lean();
}

function getCarBrands() {
	return carBrands;
}

function getCarModelsByBrand(brand) {
	return carModelsByBrand[brand];
}

async function createCar(data) {
	const car = new Car(data);
	const user = await User.findById(data.ownerId);
	user.offered.push(String(car._id));
	await user.save();
	return car.save();
}

async function editCar(carId, data) {
	const car = await Car.findById(carId);
	Object.assign(car, data);
	return car.save();
}

async function deleteCar(carId) {
	const car = await Car.findById(carId);
	const user = await User.findById(car.ownerId).populate('offered');
	await Car.deleteOne({ _id: carId });
	console.log(carId);
	console.log(user.offered);
	user.offered = user.offered.filter(({ _id }) => _id != carId);
	await user.save();
	return { 'deleted successfully': 'true' };
}

async function rentCar(userId, carId, days) {
	const car = await Car.findById(carId);
	if (!car) {
		return;
	}
	if (car.rentEnd > new Date()) {
		return;
	}
	const user = await User.findById(userId);
	if (!user) {
		return;
	}
	let date = new Date();
	date.setDate(date.getDate() + days);
	user.rentedId = carId;
	car.rentEnd = date;
	car.renterId = userId;
	await user.save();
	return car.save();
}

async function cancelRent(carId, userId) {
	console.log(carId);
	const car = await Car.findById(carId);
	const user = await User.findById(userId);
	car.renterId = '';
	car.rentEnd = '2000-01-01T09:06:45.558Z';
	user.rentedId = '';
	user.save();
	return car.save();
}

async function loadBrands() {
	console.log(carBrands);
	return carBrands;
}

module.exports = {
	getAll,
	getAllAvailable,
	getById,
	getCarBrands,
	getCarModelsByBrand,
	createCar,
	editCar,
	deleteCar,
	rentCar,
	loadBrands,
	cancelRent
};
