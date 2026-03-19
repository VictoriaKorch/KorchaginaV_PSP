import { BackButtonComponent } from "../../components/weather_back-button/weather_index.js";
import { MainPage } from "../weather_main/weather_index.js";

export class DayPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getData() {
        const weatherData = {
            1: {
                day: "Понедельник",
                date: "23 марта 2026",
                icon: "⛅",
                weather: "Переменная облачность",
                temp: "+7°",
                feelsLike: "+5°",
                wind: "2 м/с",
                humidity: "80%",
                pressure: "752 мм.рт.ст",
                sunrise: "6:24",
                sunset: "18:47"
            },
            2: {
                day: "Вторник",
                date: "24 марта 2026",
                icon: "⛅",
                weather: "Переменная облачность",
                temp: "+3°",
                feelsLike: "+1°",
                wind: "2 м/с",
                humidity: "70%",
                pressure: "750 мм.рт.ст",
                sunrise: "6:21",
                sunset: "18:49"
            },
            3: {
                day: "Среда",
                date: "25 марта 2026",
                icon: "⛅",
                weather: "Переменная облачность",
                temp: "+1°",
                feelsLike: "+1°",
                wind: "3 м/с",
                humidity: "77%",
                pressure: "747 мм.рт.ст",
                sunrise: "6:19",
                sunset: "18:51"
            },
            4: {
                day: "Четверг",
                date: "26 марта 2026",
                icon: "☁️",
                weather: "Пасмурно",
                temp: "+2°",
                feelsLike: "0°",
                wind: "3 м/с",
                humidity: "70%",
                pressure: "748 мм.рт.ст",
                sunrise: "6:16",
                sunset: "18:53"
            },
            5: {
                day: "Пятница",
                date: "27 марта 2026",
                icon: "⛅",
                weather: "Переменная облачность",
                temp: "+2°",
                feelsLike: "0°",
                wind: "3 м/с",
                humidity: "70%",
                pressure: "750 мм.рт.ст",
                sunrise: "6:13",
                sunset: "18:55"
            },
            6: {
                day: "Суббота",
                date: "28 марта 2026",
                icon: "⛅",
                weather: "Переменная облачность",
                temp: "+3°",
                feelsLike: "+1°",
                wind: "2 м/с",
                humidity: "70%",
                pressure: "750 мм.рт.ст",
                sunrise: "6:10",
                sunset: "19:02"
            },
            7: {
                day: "Воскресенье",
                date: "29 марта 2026",
                icon: "⛅",
                weather: "Переменная облачность",
                temp: "+3°",
                feelsLike: "+1°",
                wind: "2 м/с",
                humidity: "70%",
                pressure: "750 мм.рт.ст",
                sunrise: "6:05",
                sunset: "19:10"
            }
        };
        
        return weatherData[this.id] || weatherData[1];
    }

    get pageRoot() {
        return document.getElementById('day-page');
    }

    getHTML() {
        return (
            `
            <div id="day-page" class="day-page">
                <div class="container" style="max-width: 600px;">
                    <div id="back-button-container" class="mb-4"></div>
                    <div id="day-content"></div>
                </div>
            </div>
            `
        );
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));
        
        const data = this.getData();
        const dayContent = document.getElementById('day-content');
        
        const isWeekend = (data.day === "Суббота" || data.day === "Воскресенье");
        const dayColor = isWeekend ? '#ff4444' : '#333';
        
        const dayHTML = `
            <div class="day-card">
                <h2 class="day-title" style="color: ${dayColor}">${data.day}</h2>
                <div class="day-date">${data.date}</div>
                
                <div class="text-center mb-4">
                    <div class="day-icon">${data.icon}</div>
                    <div class="day-temp">${data.temp}</div>
                    <div class="day-feels">Ощущается как ${data.feelsLike}</div>
                </div>
                
                <div class="row g-3">
                    <div class="col-6">
                        <div class="day-detail-item">
                            <div class="day-detail-label">Ветер</div>
                            <div class="day-detail-value">${data.wind}</div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="day-detail-item">
                            <div class="day-detail-label">Влажность</div>
                            <div class="day-detail-value">${data.humidity}</div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="day-detail-item">
                            <div class="day-detail-label">Давление</div>
                            <div class="day-detail-value">${data.pressure}</div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="day-detail-item">
                            <div class="day-detail-label">Восход/Закат</div>
                            <div class="day-detail-value">${data.sunrise} / ${data.sunset}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        dayContent.insertAdjacentHTML('beforeend', dayHTML);
    }
}