// services/weatherDataService.js

// Начальные данные
const initialData = [
    { id: 1, day: "Пн", date: "23 мар", icon: "⛅", tempDisplay: "+7°", tempValue: 7, feels: "+5°" },
    { id: 2, day: "Вт", date: "24 мар", icon: "⛅", tempDisplay: "+3°", tempValue: 3, feels: "+1°" },
    { id: 3, day: "Ср", date: "25 мар", icon: "⛅", tempDisplay: "+1°", tempValue: 1, feels: "+1°" },
    { id: 4, day: "Чт", date: "26 мар", icon: "☁️", tempDisplay: "+2°", tempValue: 2, feels: "0°" },
    { id: 5, day: "Пт", date: "27 мар", icon: "⛅", tempDisplay: "+2°", tempValue: 2, feels: "0°" },
    { id: 6, day: "Сб", date: "28 мар", icon: "⛅", tempDisplay: "+3°", tempValue: 3, feels: "+1°" },
    { id: 7, day: "Вс", date: "29 мар", icon: "⛅", tempDisplay: "+3°", tempValue: 3, feels: "+1°" }
];

let allCards = [...initialData];
let currentFilter = { min: null, max: null };

// Получение отфильтрованных данных
export const getFilteredData = () => {
    if (currentFilter.min === null && currentFilter.max === null) {
        return [...allCards];
    }
    return allCards.filter(card => {
        if (currentFilter.min !== null && card.tempValue < currentFilter.min) return false;
        if (currentFilter.max !== null && card.tempValue > currentFilter.max) return false;
        return true;
    });
};

// Получение всех данных
export const getAllData = () => {
    return [...allCards];
};

// Добавление карточки
export const addCard = () => {
    const templateCard = allCards[0];
    const newCard = { ...templateCard };
    newCard.id = allCards.length + 1;
    allCards.push(newCard);
};

// Удаление карточки
export const deleteCard = (id) => {
    allCards = allCards.filter(card => card.id !== id);
};

// Применение фильтра
export const applyFilter = (min, max) => {
    currentFilter = { min, max };
};

// Получение текущего фильтра
export const getCurrentFilter = () => {
    return { ...currentFilter };
};