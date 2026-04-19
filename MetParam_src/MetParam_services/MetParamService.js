const fileService = require('./MetParamfileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

// Фильтрация по названию, диапазону значений и единице измерения
const findAll = (filters = {}) => {
    const { name, valueMin, valueMax, unit } = filters;
    let metParams = fileService.readData(dataFilePath);

    if (name) {
        metParams = metParams.filter(p => 
            p.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    if (valueMin !== undefined) {
        metParams = metParams.filter(p => p.value >= parseFloat(valueMin));
    }
    
    if (valueMax !== undefined) {
        metParams = metParams.filter(p => p.value <= parseFloat(valueMax));
    }
    
    if (unit) {
        metParams = metParams.filter(p => 
            p.unit.toLowerCase().includes(unit.toLowerCase())
        );
    }
    
    return metParams;
};

const findOne = (id) => {
    const metParams = fileService.readData(dataFilePath);
    return metParams.find(p => p.id === id);
};

const create = (metParamData) => {
    const metParams = fileService.readData(dataFilePath);
    const newId = metParams.length > 0 
        ? Math.max(...metParams.map(p => p.id)) + 1 
        : 1;
    
    const newMetParam = { 
        id: newId, 
        ...metParamData,
        additionalData: metParamData.additionalData || {}
    };
    
    metParams.push(newMetParam);
    fileService.writeData(dataFilePath, metParams);
    return newMetParam;
};

const update = (id, metParamData) => {
    const metParams = fileService.readData(dataFilePath);
    const index = metParams.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    // Сохраняем существующий additionalData и обновляем переданными полями
    const existingAdditionalData = metParams[index].additionalData || {};
    const newAdditionalData = metParamData.additionalData || {};
    
    metParams[index] = { 
        ...metParams[index], 
        ...metParamData,
        additionalData: { ...existingAdditionalData, ...newAdditionalData }
    };
    
    fileService.writeData(dataFilePath, metParams);
    return metParams[index];
};

const remove = (id) => {
    const metParams = fileService.readData(dataFilePath);
    const filtered = metParams.filter(p => p.id !== id);
    
    if (filtered.length === metParams.length) return false;
    
    fileService.writeData(dataFilePath, filtered);
    return true;
};

// Дополнительные методы для работы с метеопараметрами
const findByName = (name) => {
    const metParams = fileService.readData(dataFilePath);
    return metParams.filter(p => 
        p.name.toLowerCase() === name.toLowerCase()
    );
};

const findByUnit = (unit) => {
    const metParams = fileService.readData(dataFilePath);
    return metParams.filter(p => 
        p.unit.toLowerCase().includes(unit.toLowerCase())
    );
};

const getStats = () => {
    const metParams = fileService.readData(dataFilePath);
    const stats = {};
    
    metParams.forEach(p => {
        if (!stats[p.name]) {
            stats[p.name] = {
                count: 0,
                min: Infinity,
                max: -Infinity,
                sum: 0,
                avg: 0
            };
        }
        
        stats[p.name].count++;
        stats[p.name].min = Math.min(stats[p.name].min, p.value);
        stats[p.name].max = Math.max(stats[p.name].max, p.value);
        stats[p.name].sum += p.value;
    });
    
    Object.keys(stats).forEach(name => {
        stats[name].avg = stats[name].sum / stats[name].count;
    });
    
    return stats;
};

module.exports = { 
    init, 
    findAll, 
    findOne, 
    create, 
    update, 
    remove,
    findByName,
    findByUnit,
    getStats
};