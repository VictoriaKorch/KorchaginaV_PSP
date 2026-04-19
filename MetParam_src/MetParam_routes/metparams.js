const express = require('express');
const router = express.Router();
const metParamController = require('../MetParam_controllers/MetParamController');

// GET /api/metparams - получить все метеопараметры (с фильтрацией)
router.get('/', metParamController.getAllMetParams);

// GET /api/metparams/:id - получить метеопараметр по ID
router.get('/:id', metParamController.getMetParamById);

// POST /api/metparams - создать новый метеопараметр
router.post('/', metParamController.createMetParam);

// PATCH /api/metparams/:id - обновить метеопараметр
router.patch('/:id', metParamController.updateMetParam);

// DELETE /api/metparams/:id - удалить метеопараметр
router.delete('/:id', metParamController.deleteMetParam);

module.exports = router;