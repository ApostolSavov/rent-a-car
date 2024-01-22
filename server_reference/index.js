const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const carController = require('./controllers/carController');
const authController = require('./controllers/authController');
const utilController = require('./controllers/utilController');

port = 3000;

const DB_URL = 'mongodb://localhost:27017/car-rental';

async function start() {
	await new Promise((resolve, reject) => {
		mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		const db = mongoose.connection;

		db.once('open', () => {
			console.log('Database connected.');
			resolve();
		});

		db.on('error', (err) => reject(err));
	});
}

start();

const app = express();

app.use(cors());
app.use(auth());
app.use(express.json());

app.use((req, res, next) => {
	//console.log(req.headers);

	next();
});

app.use('/auth', authController);
app.use('/data', carController);
app.use('/util', utilController);

app.get('/', (req, res) => {
	res.send('API base url');
});

app.listen(port, () => console.log('Server started on: http://localhost:3000'));
