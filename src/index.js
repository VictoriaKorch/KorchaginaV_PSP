const express = require('express');
const path = require('path');
const weatherRouter = require('./routes/weather');
const weatherService = require('./services/weatherService');

const app = express();
const PORT = 3000;
const DATA_FILE_PATH = path.join(__dirname, 'data/weather.json');

weatherService.init(DATA_FILE_PATH);

app.use(express.json());

// Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключаем роуты
app.use('/weather', weatherRouter);

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});