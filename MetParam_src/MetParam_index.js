const express = require('express');
const path = require('path');
const metParamsRouter = require('./MetParam_routes/metparams');
const metParamService = require('./MetParam_services/MetParamService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'MetParam_data/metparams.json');
metParamService.init(DATA_FILE_PATH);

// Раздача статики (фронтенд из папки public)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.method === 'POST' || req.method === 'PATCH') {
        console.log('Body:', req.body);
    }
    next();
});

// API маршруты
app.use('/api/metparams', metParamsRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📄 Фронтенд: http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/metparams`);
    console.log('='.repeat(50));
});