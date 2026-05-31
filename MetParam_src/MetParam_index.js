const express = require('express');
const path = require('path');
const metParamsRouter = require('./MetParam_routes/metparams');
const metParamService = require('./MetParam_services/MetParamService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'MetParam_data/metparams.json');
metParamService.init(DATA_FILE_PATH);

// ========== ДОБАВЬТЕ ЭТОТ БЛОК ==========
// Настройка CSP для разработки
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://yastatic.net; " +
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; " +
        "font-src 'self' data: https://fonts.gstatic.com; " +
        "img-src 'self' data: https://yastatic.net; " +
        "connect-src 'self' http://localhost:3000;"
    );
    next();
});
// ========================================

// Раздача статики
app.use(express.static(path.join(__dirname, '..', 'public')));

// Отдаём index.html по корневому пути
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'MetParam_index.html'));
});

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