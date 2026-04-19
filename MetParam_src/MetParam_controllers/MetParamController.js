const metParamService = require('../MetParam_services/MetParamService');

// Вспомогательная функция валидации полей
const validateMetParamData = (data, isUpdate = false) => {
    const errors = [];
    const allowedNames = ['Температура', 'Давление', 'Влажность', 'Ветер', 'УФ излучение'];

    if (!isUpdate) {
        // Для создания обязательны все поля, кроме id
        if (!data.name) errors.push('name обязателен');
        if (data.value === undefined) errors.push('value обязателен');
        if (!data.unit) errors.push('unit обязателен');
        if (!data.description) errors.push('description обязателен');
    }

    // Валидация названия параметра
    if (data.name !== undefined && !allowedNames.includes(data.name)) {
        errors.push(`name должен быть одним из: ${allowedNames.join(', ')}`);
    }

    // Валидация значения
    if (data.value !== undefined && isNaN(parseFloat(data.value))) {
        errors.push('value должен быть числом');
    }

    // Валидация единиц измерения в зависимости от параметра
    if (data.name === 'Температура' && data.unit !== undefined && data.unit !== '°C') {
        errors.push('unit для Температуры должен быть °C');
    }
    if (data.name === 'Давление' && data.unit !== undefined && data.unit !== 'мм.рт.ст') {
        errors.push('unit для Давления должен быть мм.рт.ст');
    }
    if (data.name === 'Влажность' && data.unit !== undefined && data.unit !== '%') {
        errors.push('unit для Влажности должен быть %');
    }
    if (data.name === 'Ветер' && data.unit !== undefined && data.unit !== 'м/с') {
        errors.push('unit для Ветра должен быть м/с');
    }
    if (data.name === 'УФ излучение' && data.unit !== undefined && data.unit !== 'УФИ') {
        errors.push('unit для УФ излучения должен быть УФИ');
    }

    // Валидация диапазонов значений
    if (data.name === 'Влажность' && data.value !== undefined) {
        const val = parseFloat(data.value);
        if (val < 0 || val > 100) {
            errors.push('value для Влажности должен быть от 0 до 100');
        }
    }
    if (data.name === 'Давление' && data.value !== undefined) {
        const val = parseFloat(data.value);
        if (val < 700 || val > 800) {
            errors.push('value для Давления должен быть от 700 до 800 мм.рт.ст');
        }
    }
    if (data.name === 'УФ излучение' && data.value !== undefined) {
        const val = parseFloat(data.value);
        if (val < 0 || val > 11) {
            errors.push('value для УФ излучения должен быть от 0 до 11');
        }
    }

    return errors;
};

const getAllMetParams = (req, res) => {
    const { name, valueMin, valueMax, unit } = req.query;
    const filters = {};
    
    if (name) filters.name = name;
    if (valueMin) filters.valueMin = parseFloat(valueMin);
    if (valueMax) filters.valueMax = parseFloat(valueMax);
    if (unit) filters.unit = unit;

    const metParams = metParamService.findAll(filters);
    res.json(metParams);
};

const getMetParamById = (req, res) => {
    const id = parseInt(req.params.id);
    const metParam = metParamService.findOne(id);
    if (!metParam) return res.status(404).json({ error: 'Метеопараметр не найден' });
    res.json(metParam);
};

const createMetParam = (req, res) => {
    const { name, value, unit, description, additionalData } = req.body;
    const errors = validateMetParamData({ name, value, unit, description });
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const newMetParam = metParamService.create({
        name,
        value: parseFloat(value),
        unit,
        description,
        additionalData: additionalData || {}
    });
    
    res.status(201).json(newMetParam);
};

const updateMetParam = (req, res) => {
    const id = parseInt(req.params.id);
    const updateData = { ...req.body };

    // Валидируем только переданные поля
    const errors = validateMetParamData(updateData, true);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Приводим типы для переданных числовых полей
    if (updateData.value !== undefined) {
        updateData.value = parseFloat(updateData.value);
    }

    const updated = metParamService.update(id, updateData);
    if (!updated) return res.status(404).json({ error: 'Метеопараметр не найден' });
    res.json(updated);
};

const deleteMetParam = (req, res) => {
    const id = parseInt(req.params.id);
    const success = metParamService.remove(id);
    if (!success) return res.status(404).json({ error: 'Метеопараметр не найден' });
    res.status(204).send();
};

module.exports = {
    getAllMetParams,
    getMetParamById,
    createMetParam,
    updateMetParam,
    deleteMetParam
};