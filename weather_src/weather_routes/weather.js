const express = require('express');
const router = express.Router();
const weatherController = require('../weather_controllers/weatherController');

router.get('/', weatherController.getAllWeather);
router.get('/:id', weatherController.getWeatherById);
router.post('/', weatherController.createWeather);
router.patch('/:id', weatherController.updateWeather);
router.delete('/:id', weatherController.deleteWeather);

module.exports = router;