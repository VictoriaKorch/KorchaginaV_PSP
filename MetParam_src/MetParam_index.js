const express = require('express');
const path = require('path');
const metParamsRouter = require('./MetParam_routes/metparams');
const metParamService = require('./MetParam_services/MetParamService');

const app = express();
const PORT = 3000;
const DATA_FILE_PATH = path.join(__dirname, 'MetParam_data/metparams.json');

// Инициализация сервиса с путём к файлу данных
metParamService.init(DATA_FILE_PATH);

// Middleware для парсинга JSON
app.use(express.json());

// Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Корневой маршрут - информация об API
app.get('/', (req, res) => {
    res.json({
        message: 'Метеопараметры API',
        version: '1.0.0',
        endpoints: {
            getAll: 'GET /api/metparams',
            getById: 'GET /api/metparams/:id',
            create: 'POST /api/metparams',
            update: 'PATCH /api/metparams/:id',
            delete: 'DELETE /api/metparams/:id'
        },
        filters: {
            getAll: '?name=Температура&valueMin=0&valueMax=10&unit=°C'
        }
    });
});

// Подключаем роуты метеопараметров
app.use('/api/metparams', metParamsRouter);

// 404 - маршрут не найден
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Маршрут не найден',
        availableEndpoints: [
            'GET /',
            'GET /api/metparams',
            'GET /api/metparams/:id',
            'POST /api/metparams',
            'PATCH /api/metparams/:id',
            'DELETE /api/metparams/:id'
        ]
    });
});

// Обработчик ошибок
app.use((err, req, res, next) => {
    console.error('Ошибка сервера:', err);
    res.status(500).json({ 
        error: 'Внутренняя ошибка сервера',
        message: err.message 
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Сервер метеопараметров запущен`);
    console.log(`📍 Адрес: http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/metparams`);
    console.log('='.repeat(50));
});