const weatherService = require('../weather_services/weatherService');

// Вспомогательная функция валидации полей
const validateWeatherData = (data, isUpdate = false) => {
    const errors = [];

    if (!isUpdate) {
        // Для создания обязательны все поля, кроме id
        if (!data.city) errors.push('city обязателен');
        if (!data.date) errors.push('date обязательна');
        if (data.temperature === undefined) errors.push('temperature обязательна');
        if (data.humidity === undefined) errors.push('humidity обязательна');
        if (data.pressure === undefined) errors.push('pressure обязательно');
        if (!data.description) errors.push('description обязателен');
    }

    // Валидация значений (если они переданы)
    if (data.temperature !== undefined && isNaN(parseFloat(data.temperature))) {
        errors.push('temperature должна быть числом');
    }
    if (data.humidity !== undefined && (isNaN(parseInt(data.humidity)) || parseInt(data.humidity) < 0 || parseInt(data.humidity) > 100)) {
        errors.push('humidity должно быть числом от 0 до 100');
    }
    if (data.pressure !== undefined && (isNaN(parseFloat(data.pressure)) || parseFloat(data.pressure) < 800 || parseFloat(data.pressure) > 1100)) {
        errors.push('pressure должно быть числом (800-1100)');
    }
    if (data.date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
        errors.push('date должна быть в формате ГГГГ-ММ-ДД');
    }

    return errors;
};

const getAllWeather = (req, res) => {
    const { city, tempMin, tempMax, date } = req.query;
    const filters = {};
    if (city) filters.city = city;
    if (tempMin) filters.tempMin = parseFloat(tempMin);
    if (tempMax) filters.tempMax = parseFloat(tempMax);
    if (date) filters.date = date;

    const weathers = weatherService.findAll(filters);
    res.json(weathers);
};

const getWeatherById = (req, res) => {
    const id = parseInt(req.params.id);
    const weather = weatherService.findOne(id);
    if (!weather) return res.status(404).json({ error: 'Прогноз не найден' });
    res.json(weather);
};

const createWeather = (req, res) => {
    const { city, date, temperature, humidity, pressure, description } = req.body;
    const errors = validateWeatherData({ city, date, temperature, humidity, pressure, description });
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const newWeather = weatherService.create({
        city,
        date,
        temperature: parseFloat(temperature),
        humidity: parseInt(humidity),
        pressure: parseFloat(pressure),
        description
    });
    res.status(201).json(newWeather);
};

const updateWeather = (req, res) => {
    const id = parseInt(req.params.id);
    const updateData = { ...req.body };

    // Валидируем только переданные поля
    const errors = validateWeatherData(updateData, true);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Приводим типы для переданных числовых полей
    if (updateData.temperature !== undefined) updateData.temperature = parseFloat(updateData.temperature);
    if (updateData.humidity !== undefined) updateData.humidity = parseInt(updateData.humidity);
    if (updateData.pressure !== undefined) updateData.pressure = parseFloat(updateData.pressure);

    const updated = weatherService.update(id, updateData);
    if (!updated) return res.status(404).json({ error: 'Прогноз не найден' });
    res.json(updated);
};

const deleteWeather = (req, res) => {
    const id = parseInt(req.params.id);
    const success = weatherService.remove(id);
    if (!success) return res.status(404).json({ error: 'Прогноз не найден' });
    res.status(204).send();
};

module.exports = {
    getAllWeather,
    getWeatherById,
    createWeather,
    updateWeather,
    deleteWeather
};