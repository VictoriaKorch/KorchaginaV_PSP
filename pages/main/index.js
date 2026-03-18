import { WeatherCardComponent } from "../../components/weather-card/index.js";
import { WeatherCarouselComponent } from "../../components/weather-carousel/index.js";
import { DayPage } from "../day/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
    return (
        `
        <div id="main-page" style="min-height: 100vh; background: #f8f9fa; padding: 40px 20px;">
            <div style="max-width: 1200px; margin: 0 auto;">
                <!-- Заголовок -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-size: 2.8rem; font-weight: 400; color: #000; margin: 0; font-family: 'YS Text', 'Helvetica Neue', Arial, sans-serif;">
                        Прогноз погоды
                    </h1>
                    <div style="font-size: 1.2rem; color: #333; margin-top: 5px; font-family: 'YS Text', 'Helvetica Neue', Arial, sans-serif;">
                        в Москве
                    </div>
                    <div style="width: 80px; height: 2px; background: #e0e0e0; margin: 20px auto;"></div>
                </div>
                
                <!-- Контейнер для карусели -->
                <div id="carousel-container"></div>
            </div>
        </div>
        `
    );
}

    getData() {
    const weatherIcons = {
        clear: "☀️",
        partlyCloudy: "⛅",
        cloudy: "☁️",
        rain: "🌧️",
        storm: "⛈️",
        snow: "❄️"
    };
    
    return [
        {
            id: 1,
            day: "Пн",
            fullDay: "Понедельник",
            date: "23 мар",
            icon: weatherIcons.partlyCloudy,
            weather: "Переменная облачность",
            temp: "+7°",
            feelsLike: "+5°",
            wind: "2 м/с",
            humidity: "80%"
        },
        {
            id: 2,
            day: "Вт",
            fullDay: "Вторник", 
            date: "24 мар",
            icon: weatherIcons.partlyCloudy,
            weather: "Переменная облачность",
            temp: "+3°",
            feelsLike: "+1°",
            wind: "2 м/с",
            humidity: "70%"
        },
        {
            id: 3,
            day: "Ср",
            fullDay: "Среда",
            date: "25 мар",
            icon: weatherIcons.partlyCloudy,
            weather: "Переменная облачность",
            temp: "+1°",
            feelsLike: "+1°",
            wind: "3 м/с",
            humidity: "77%"
        },
        {
            id: 4,
            day: "Чт",
            fullDay: "Четверг",
            date: "26 мар",
            icon: weatherIcons.cloudy,
            weather: "Пасмурно",
            temp: "+2°",
            feelsLike: "0°",
            wind: "3 м/с",
            humidity: "70%"
        },
        {
            id: 5,
            day: "Пт",
            fullDay: "Пятница",
            date: "27 мар",
            icon: weatherIcons.partlyCloudy,
            weather: "Переменная облачность",
            temp: "+2°",
            feelsLike: "0°",
            wind: "3 м/с",
            humidity: "70%"
        },
        {
            id: 6,
            day: "Сб",
            fullDay: "Суббота",
            date: "28 мар",
            icon: weatherIcons.partlyCloudy,
            weather: "Переменная облачность",
            temp: "+3°",
            feelsLike: "+1°",
            wind: "2 м/с",
            humidity: "70%"
        },
        {
            id: 7,
            day: "Вс",
            fullDay: "Воскресенье",
            date: "29 мар",
            icon: weatherIcons.partlyCloudy,
            weather: "Переменная облачность",
            temp: "+3°",
            feelsLike: "+1°",
            wind: "2 м/с",
            humidity: "70%"
        }
    ];
}

    clickCard(e) {
        const cardId = e.target.dataset.id;
        console.log("Выбран день:", cardId);
        
        const dayPage = new DayPage(this.parent, cardId);
        dayPage.render();
    }

    render() {
        // Очищаем страницу
        this.parent.innerHTML = '';
        
        // Вставляем HTML страницы
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Получаем данные
        const data = this.getData();
        
        // Получаем контейнер для карусели
        const carouselContainer = document.getElementById('carousel-container');
        
        // СОЗДАЕМ ВСЕ КАРТОЧКИ ВРЕМЕННО
        const cardsHTML = [];
        data.forEach((item) => {
            // Создаем временный контейнер для карточки
            const tempDiv = document.createElement('div');
            const card = new WeatherCardComponent(tempDiv);
            card.render(item, this.clickCard.bind(this));
            cardsHTML.push(tempDiv.innerHTML);
        });
        
        // СОЗДАЕМ КАРУСЕЛЬ И СРАЗУ ПЕРЕДАЕМ ЕЙ КАРТОЧКИ
        // Для этого добавим новый метод в карусель
        
        // Временно сохраняем карточки в глобальную переменную для карусели
        window.__tempCardsHTML = cardsHTML;
        
        // Создаем карусель с карточками
        const carousel = new WeatherCarouselComponent(carouselContainer);
        carousel.renderWithCards(cardsHTML);
    }
}