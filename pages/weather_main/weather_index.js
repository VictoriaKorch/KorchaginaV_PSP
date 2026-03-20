import { DayPage } from "../day/weather_index.js";
import { WeatherCardComponent } from "../../components/weather-card/weather_index.js";
import { WeatherCarouselComponent } from "../../components/weather-carousel/weather_index.js";
import { TemperatureFilterComponent } from "../../components/weather_temperature-filter/weather_index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.allCards = this.getData();               // все данные
        this.filteredCards = [...this.allCards];      // отображаемые
        this.currentFilter = { min: null, max: null }; // условия фильтра
        this.carousel = null;
        this.filterComponent = null;
    }

    getData() {
        return [
            { id: 1, day: "Пн", date: "23 мар", icon: "⛅", tempDisplay: "+7°", tempValue: 7, feels: "+5°" },
            { id: 2, day: "Вт", date: "24 мар", icon: "⛅", tempDisplay: "+3°", tempValue: 3, feels: "+1°" },
            { id: 3, day: "Ср", date: "25 мар", icon: "⛅", tempDisplay: "+1°", tempValue: 1, feels: "+1°" },
            { id: 4, day: "Чт", date: "26 мар", icon: "☁️", tempDisplay: "+2°", tempValue: 2, feels: "0°" },
            { id: 5, day: "Пт", date: "27 мар", icon: "⛅", tempDisplay: "+2°", tempValue: 2, feels: "0°" },
            { id: 6, day: "Сб", date: "28 мар", icon: "⛅", tempDisplay: "+3°", tempValue: 3, feels: "+1°" },
            { id: 7, day: "Вс", date: "29 мар", icon: "⛅", tempDisplay: "+3°", tempValue: 3, feels: "+1°" }
        ];
    }

    clickCard(e) {
        const cardId = e.target.closest('.weather-card')?.dataset.id;
        if (cardId) {
            const dayPage = new DayPage(this.parent, cardId);
            dayPage.render();
        }
    }

    deleteCard(id) {
        this.allCards = this.allCards.filter(card => card.id !== id);
        if (this.filteredCards.some(card => card.id === id)) {
            this.carousel.removeCard(id);
            this.filteredCards = this.filteredCards.filter(card => card.id !== id);
        }
    }

    addCard() {
        const templateCard = this.allCards[0];
        if (!templateCard) return;
        const newId = Math.max(...this.allCards.map(c => c.id)) + 1;
        const newCard = {
            ...templateCard,
            id: newId,
            tempDisplay: templateCard.tempDisplay,
            tempValue: templateCard.tempValue,
            feels: templateCard.feels
        };
        this.allCards.push(newCard);

        if (this.isCardMatchingFilter(newCard)) {
            this.carousel.addCard(newCard, this.clickCard.bind(this), (id) => this.deleteCard(id));
            this.filteredCards.push(newCard);
        }
    }

    isCardMatchingFilter(card) {
        const { min, max } = this.currentFilter;
        if (min !== null && card.tempValue < min) return false;
        if (max !== null && card.tempValue > max) return false;
        return true;
    }

    applyFilter(min, max) {
        this.currentFilter = { min, max };
        this.filteredCards = this.allCards.filter(card => {
            if (min !== null && card.tempValue < min) return false;
            if (max !== null && card.tempValue > max) return false;
            return true;
        });
        this.carousel.setCards(this.filteredCards, this.clickCard.bind(this), (id) => this.deleteCard(id));
    }

    render() {
    this.parent.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'min-vh-100';
    wrapper.style.background = '#f8f9fa';
    wrapper.style.padding = '40px 20px';
    wrapper.innerHTML = `
        <div class="container" style="max-width: 1200px;">
            <div class="text-center mb-5">
                <h1 class="page-title">Прогноз погоды</h1>
                <div class="page-subtitle">в Москве</div>
                <div class="mx-auto bg-secondary" style="width: 80px; height: 2px; opacity: 0.2; margin-top: 20px;"></div>
            </div>
            <div id="filter-container"></div>
            <div class="text-center mb-4">
                <button id="add-btn" class="btn btn-add">+ Добавить день</button>
            </div>
            <div id="carousel-container"></div>
        </div>
    `;
    this.parent.appendChild(wrapper);

    const filterContainer = document.getElementById('filter-container');
    this.filterComponent = new TemperatureFilterComponent(filterContainer);
    this.filterComponent.render((min, max) => this.applyFilter(min, max));

    const carouselContainer = document.getElementById('carousel-container');
    this.carousel = new WeatherCarouselComponent(carouselContainer);
    this.carousel.render();

    // Восстановление состояния фильтра
    if (window.weatherFilterState && (window.weatherFilterState.min !== null || window.weatherFilterState.max !== null)) {
        const { min, max } = window.weatherFilterState;
        this.filterComponent.setValues(min, max);
        this.applyFilter(min, max);
    } else {
        // если нет сохранённого фильтра – показываем все карточки
        this.applyFilter(null, null);
    }

    const addBtn = document.getElementById('add-btn');
    if (addBtn) {
        addBtn.onclick = () => this.addCard();
    }
}
}