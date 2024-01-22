const router = require('express').Router();
const utilService = require('../services/utilService.js');

router.get('/brands', (req, res) => {
	const data = utilService.loadBrands();

	res.json(data);
});

router.get('/:brand/models', (req, res) => {
	const data = utilService.loadModels(req.params.brand);

	res.json(data);
});

module.exports = router;
