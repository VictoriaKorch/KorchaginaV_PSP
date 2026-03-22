const fileService = require('./weatherfileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

// Фильтрация по городу, температуре (диапазон) и дате
const findAll = (filters = {}) => {
    const { city, tempMin, tempMax, date } = filters;
    let weathers = fileService.readData(dataFilePath);

    if (city) {
        weathers = weathers.filter(w => w.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (tempMin !== undefined) {
        weathers = weathers.filter(w => w.temperature >= parseFloat(tempMin));
    }
    if (tempMax !== undefined) {
        weathers = weathers.filter(w => w.temperature <= parseFloat(tempMax));
    }
    if (date) {
        weathers = weathers.filter(w => w.date === date);
    }
    return weathers;
};

const findOne = (id) => {
    const weathers = fileService.readData(dataFilePath);
    return weathers.find(w => w.id === id);
};

const create = (weatherData) => {
    const weathers = fileService.readData(dataFilePath);
    const newId = weathers.length > 0 ? Math.max(...weathers.map(w => w.id)) + 1 : 1;
    const newWeather = { id: newId, ...weatherData };
    weathers.push(newWeather);
    fileService.writeData(dataFilePath, weathers);
    return newWeather;
};

const update = (id, weatherData) => {
    const weathers = fileService.readData(dataFilePath);
    const index = weathers.findIndex(w => w.id === id);
    if (index === -1) return null;
    weathers[index] = { ...weathers[index], ...weatherData };
    fileService.writeData(dataFilePath, weathers);
    return weathers[index];
};

const remove = (id) => {
    const weathers = fileService.readData(dataFilePath);
    const filtered = weathers.filter(w => w.id !== id);
    if (filtered.length === weathers.length) return false;
    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };