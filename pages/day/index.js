import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

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
            <div id="day-page" style="min-height: 100vh; background: #f8f9fa; padding: 40px 20px;">
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
        
        // ============ ВОТ СЮДА ВСТАВЛЯЕМ ============
        // Проверяем, выходной ли день (Суббота или Воскресенье)
        const isWeekend = (data.day === "Суббота" || data.day === "Воскресенье");
        // Устанавливаем цвет: красный для выходных, черный для будней
        const dayColor = isWeekend ? '#ff4444' : '#333';
        // ===========================================
        
        const dayHTML = `
            <div style="background: white; border-radius: 24px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
                <!-- ======== И СЮДА ВСТАВЛЯЕМ dayColor ======== -->
                <h2 style="color: ${dayColor}; font-weight: 600; margin-bottom: 5px;">${data.day}</h2>
                <!-- ========================================== -->
                <div style="color: #666; margin-bottom: 20px;">${data.date}</div>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6rem; line-height: 1;">${data.icon}</div>
                    <div style="font-size: 3rem; font-weight: 600; color: #333;">${data.temp}</div>
                    <div style="color: #666;">Ощущается как ${data.feelsLike}</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
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
    }
}