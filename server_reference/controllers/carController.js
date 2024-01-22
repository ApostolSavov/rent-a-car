const router = require('express').Router();
const carService = require('../services/carService');

router.get('/', async (req, res) => {
	const data = await carService.getAllAvailable();

	res.json(data);
});

router.get('/:id', async (req, res) => {
	const data = await carService.getById(req.params.id);

	res.json(data);
});

router.delete('/:id', async (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: 'valid access token is required'
		});
		return;
	}

	const data = await carService.deleteCar(req.params.id);

	res.json(data);
});

//edit car
router.put('/:id', async (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: 'valid access token is required'
		});
		return;
	}

	const data = await carService.editCar(req.params.id, req.body);

	res.json(data);
});

//add car
router.post('/', async (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: 'valid access token is required'
		});
		return;
	}

	const data = await carService.createCar(req.body);

	res.json(data);
});

router.get('/user/:id', async (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: 'valid access token is required'
		});
		return;
	}

	const data = await carService.getAll();

	const userId = req.params.id;

	let offered = data.filter((car) => car.ownerId == userId);

	res.json(offered);
});

router.post('/:id/rental', async ({ body }, res) => {
	if (!req.user) {
		res.status(401).json({
			message: 'valid access token is required'
		});
		return;
	}

	await carService.rentCar(body.userId, body.carId, body.days);
	res.json({ success: 'true' });
});

router.put('/:id/rental', async ({ body }, res) => {
	if (!req.user) {
		res.status(401).json({
			message: 'valid access token is required'
		});
		return;
	}
	await carService.cancelRent(body.carId, body.userId);
	res.json({ success: 'true' });
});

module.exports = router;
