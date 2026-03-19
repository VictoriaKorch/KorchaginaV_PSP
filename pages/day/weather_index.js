import { BackButtonComponent } from "../../components/weather_back-button/weather_index.js";
import { MainPage } from "../weather_main/weather_index.js";
import { Weather3DPreview } from "../../components/weather-3d-preview/weather_index.js";
import { Weather3DPage } from "../weather_3d/weather_index.js";

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
            <div id="day-page" class="day-page" style="min-height: 100vh; background: #f8f9fa; padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto;">
                    <div id="back-button-container" style="margin-bottom: 20px;"></div>
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
        
        // Кнопка назад
        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));
        
        // Данные дня
        const data = this.getData();
        const dayContent = document.getElementById('day-content');
        
        // Проверяем, выходной ли день
        const isWeekend = (data.day === "Суббота" || data.day === "Воскресенье");
        const dayColor = isWeekend ? '#ff4444' : '#333';
        
        // Формируем HTML страницы дня, включая контейнер для 3D-превью
        const dayHTML = `
            <div class="day-card" style="background: white; border-radius: 24px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
                <h2 style="color: ${dayColor}; font-weight: 600; margin-bottom: 5px;">${data.day}</h2>
                <div style="color: #666; margin-bottom: 20px;">${data.date}</div>
                
                <!-- Контейнер для 3D-превью -->
                <div id="3d-preview-container" style="width: 100%; display: flex; justify-content: center; margin: 20px 0;"></div>
                
                <div style="font-size: 3rem; font-weight: 600; color: #333; text-align: center;">${data.temp}</div>
                <div style="color: #666; text-align: center;">Ощущается как ${data.feelsLike}</div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px;">
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                        <div style="color: #999; font-size: 0.9rem;">Ветер</div>
                        <div style="font-weight: 600;">${data.wind}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                        <div style="color: #999; font-size: 0.9rem;">Влажность</div>
                        <div style="font-weight: 600;">${data.humidity}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                        <div style="color: #999; font-size: 0.9rem;">Давление</div>
                        <div style="font-weight: 600;">${data.pressure}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                        <div style="color: #999; font-size: 0.9rem;">Восход/Закат</div>
                        <div style="font-weight: 600;">${data.sunrise} / ${data.sunset}</div>
                    </div>
                </div>
            </div>
        `;
        
        dayContent.insertAdjacentHTML('beforeend', dayHTML);
        
        // Инициализация 3D-превью после вставки HTML
        const previewContainer = document.getElementById('3d-preview-container');
        if (previewContainer) {
            // Создаём компонент превью, передаём тип погоды (data.weather)
            const preview = new Weather3DPreview(previewContainer, data.weather, 250, 250);
            preview.render();
            
            // Добавляем обработчик клика на canvas для перехода к полному 3D-просмотру
            if (preview.canvas) {
                preview.canvas.addEventListener('click', () => {
                    const view3DPage = new Weather3DPage(this.parent, this.id);
                    view3DPage.render();
                });
            }
        }
    }
}