import { DayPage } from "../day/weather_index.js";
import { WeatherCardComponent } from "../../components/weather-card/weather_index.js";
import { WeatherCarouselComponent } from "../../components/weather-carousel/weather_index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.cardsData = this.getData();
        this.carousel = null;
    }

    getData() {
        return [
            { id: 1, day: "Пн", date: "23 мар", icon: "⛅", temp: "+7°", feels: "+5°" },
            { id: 2, day: "Вт", date: "24 мар", icon: "⛅", temp: "+3°", feels: "+1°" },
            { id: 3, day: "Ср", date: "25 мар", icon: "⛅", temp: "+1°", feels: "+1°" },
            { id: 4, day: "Чт", date: "26 мар", icon: "☁️", temp: "+2°", feels: "0°" },
            { id: 5, day: "Пт", date: "27 мар", icon: "⛅", temp: "+2°", feels: "0°" },
            { id: 6, day: "Сб", date: "28 мар", icon: "⛅", temp: "+3°", feels: "+1°" },
            { id: 7, day: "Вс", date: "29 мар", icon: "⛅", temp: "+3°", feels: "+1°" }
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
        this.cardsData = this.cardsData.filter(card => card.id !== id);
        this.carousel.removeCard(id);
    }

    addCard() {
        const templateCard = this.cardsData[0];
        if (!templateCard) return;
        const newId = Math.max(...this.cardsData.map(c => c.id)) + 1;
        const newCard = { ...templateCard, id: newId };
        this.cardsData.push(newCard);
        this.carousel.addCard(newCard, this.clickCard.bind(this), (id) => this.deleteCard(id));
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
                <div class="text-center mb-4">
                    <button id="add-btn" class="btn btn-add">+ Добавить день</button>
                </div>
                <div id="carousel-container"></div>
            </div>
        `;
        this.parent.appendChild(wrapper);

        const carouselContainer = document.getElementById('carousel-container');
        this.carousel = new WeatherCarouselComponent(carouselContainer);
        this.carousel.render();

        // Заполняем карусель начальными данными
        this.cardsData.forEach(item => {
            this.carousel.addCard(item, this.clickCard.bind(this), (id) => this.deleteCard(id));
        });

        this.carousel.initCarousel();

        const addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.onclick = () => this.addCard();
        }
    }
}