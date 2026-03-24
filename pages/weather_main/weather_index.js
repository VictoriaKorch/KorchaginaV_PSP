import { DayPage } from "../day/weather_index.js";
import { WeatherCarouselComponent } from "../../components/weather-carousel/weather_index.js";
import { TemperatureFilterComponent } from "../../components/weather_temperature-filter/weather_index.js";
import * as weatherService from "../../services/weatherDataService.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.carousel = null;
        this.filterComponent = null;
    }

    clickCard(e) {
        const cardId = e.target.closest('.weather-card')?.dataset.id;
        if (cardId) {
            const dayPage = new DayPage(this.parent, cardId);
            dayPage.render();
        }
    }

    deleteCard(id) {
        weatherService.deleteCard(id);
        this.updateCarousel();
    }

    addCard() {
        weatherService.addCard();
        this.updateCarousel();
    }

    applyFilter(min, max) {
        weatherService.applyFilter(min, max);
        window.weatherFilterState = { min, max };
        this.updateCarousel();
    }

    updateCarousel() {
        const filteredData = weatherService.getFilteredData();
        if (this.carousel) {
            this.carousel.setCards(
                filteredData, 
                this.clickCard.bind(this), 
                this.deleteCard.bind(this)
            );
        }
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
        this.filterComponent.render(this.applyFilter.bind(this));

        const carouselContainer = document.getElementById('carousel-container');
        this.carousel = new WeatherCarouselComponent(carouselContainer);
        this.carousel.render();

        // Восстановление фильтра
        if (window.weatherFilterState) {
            const { min, max } = window.weatherFilterState;
            this.filterComponent.setValues(min, max);
            this.applyFilter(min, max);
        } else {
            this.updateCarousel();
        }

        document.getElementById('add-btn').onclick = this.addCard.bind(this);
    }
}