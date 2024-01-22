const { carBrands, carModelsByBrand } = require('../config/carEnums');

function loadBrands() {
	return carBrands;
}

function loadModels(brand) {
	return carModelsByBrand[brand];
}

module.exports = {
	loadBrands,
	loadModels
};
