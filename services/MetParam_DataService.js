// services/metParamDataService.js

// Начальные данные метеопараметров
/*const initialData = [
    { 
        id: 1, 
        name: "Температура", 
        icon: "🌡️", 
        value: "+7", 
        unit: "°C", 
        description: "Комфортная",
        feelsLike: "+5°",
        min: "+2°",
        max: "+9°",
        detail: "Температура воздуха - один из ключевых метеорологических параметров, характеризующих тепловое состояние атмосферы."
    },
    { 
        id: 2, 
        name: "Давление", 
        icon: "🎈", 
        value: "752", 
        unit: " мм.рт.ст", 
        description: "В норме",
        tendency: "Растет",
        normal: "745-755 мм.рт.ст",
        detail: "Атмосферное давление - сила, с которой воздух давит на земную поверхность. Влияет на самочувствие людей."
    },
    { 
        id: 3, 
        name: "Влажность", 
        icon: "💧", 
        value: "80", 
        unit: "%", 
        description: "Повышенная",
        dewPoint: "+4°C",
        comfort: "Влажно",
        detail: "Относительная влажность воздуха - отношение парциального давления паров воды к давлению насыщенного пара."
    },
    { 
        id: 4, 
        name: "Ветер", 
        icon: "💨", 
        value: "2", 
        unit: " м/с", 
        description: "Легкий",
        direction: "Юго-западный",
        gusts: "до 4 м/с",
        detail: "Скорость ветра - важный параметр, влияющий на ощущение температуры и комфорт пребывания на улице."
    },
    { 
        id: 5, 
        name: "УФ излучение", 
        icon: "☀️", 
        value: "3", 
        unit: " УФИ", 
        description: "Умеренный",
        level: "Средний",
        protection: "SPF 15+",
        detail: "Ультрафиолетовое излучение - часть солнечного спектра. УФ-индекс характеризует уровень опасности для кожи и глаз."
    }
];

let allCards = [...initialData];
let currentFilter = { searchText: '' };

// Получение отфильтрованных данных
export const getFilteredData = () => {
    if (currentFilter.searchText === '') {
        return [...allCards];
    }
    return allCards.filter(card => 
        card.name.toLowerCase().includes(currentFilter.searchText.toLowerCase())
    );
};

// Получение всех данных
export const getAllData = () => {
    return [...allCards];
};

// Добавление карточки (копируем первую)
export const addCard = () => {
    const templateCard = allCards[0];
    const newCard = { ...templateCard };
    // Находим максимальный существующий ID и добавляем 1
    const maxId = allCards.length > 0 ? Math.max(...allCards.map(c => c.id)) : 0;
    newCard.id = maxId + 1;
    allCards.push(newCard);
};

// Удаление карточки
export const deleteCard = (id) => {
    allCards = allCards.filter(card => card.id !== id);
};

// Применение фильтра
export const applyFilter = (searchText) => {
    currentFilter = { searchText };
};

// Получение текущего фильтра
export const getCurrentFilter = () => {
    return { ...currentFilter };
};

// Сброс фильтра
export const resetFilter = () => {
    currentFilter = { searchText: '' };
};

// Получение карточки по ID
export const getCardById = (id) => {
    return allCards.find(card => card.id === id) || null;
};

// Обновление карточки
export const updateCard = (id, updatedData) => {
    const index = allCards.findIndex(card => card.id === id);
    if (index !== -1) {
        allCards[index] = { ...allCards[index], ...updatedData };
        return true;
    }
    return false;
};

// Получение количества карточек
export const getCardsCount = () => {
    return allCards.length;
};*/