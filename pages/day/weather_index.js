import { BackButtonComponent } from "../../components/weather_back-button/weather_index.js";
import { MainPage } from "../weather_main/weather_index.js";
import { DayInfoCard } from "../../components/weather_day-info-card/weather_index.js";
import { Weather3DViewer } from "../../components/weather_3d-viewer/weather_index.js";
import { CameraControls } from "../../components/weather_camera-controls/weather_index.js";

export class DayPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        this.viewer = null;
        this.controls = null;
    }

    getData() {
        const weatherData = {
            1: { day: "Понедельник", date: "23 марта 2026", icon: "⛅", weather: "Переменная облачность", temp: "+7°", feelsLike: "+5°", wind: "2 м/с", humidity: "80%", pressure: "752 мм.рт.ст", sunrise: "6:24", sunset: "18:47" },
            2: { day: "Вторник", date: "24 марта 2026", icon: "⛅", weather: "Переменная облачность", temp: "+3°", feelsLike: "+1°", wind: "2 м/с", humidity: "70%", pressure: "750 мм.рт.ст", sunrise: "6:21", sunset: "18:49" },
            3: { day: "Среда", date: "25 марта 2026", icon: "⛅", weather: "Переменная облачность", temp: "+1°", feelsLike: "+1°", wind: "3 м/с", humidity: "77%", pressure: "747 мм.рт.ст", sunrise: "6:19", sunset: "18:51" },
            4: { day: "Четверг", date: "26 марта 2026", icon: "☁️", weather: "Пасмурно", temp: "+2°", feelsLike: "0°", wind: "3 м/с", humidity: "70%", pressure: "748 мм.рт.ст", sunrise: "6:16", sunset: "18:53" },
            5: { day: "Пятница", date: "27 марта 2026", icon: "⛅", weather: "Переменная облачность", temp: "+2°", feelsLike: "0°", wind: "3 м/с", humidity: "70%", pressure: "750 мм.рт.ст", sunrise: "6:13", sunset: "18:55" },
            6: { day: "Суббота", date: "28 марта 2026", icon: "⛅", weather: "Переменная облачность", temp: "+3°", feelsLike: "+1°", wind: "2 м/с", humidity: "70%", pressure: "750 мм.рт.ст", sunrise: "6:10", sunset: "19:02" },
            7: { day: "Воскресенье", date: "29 марта 2026", icon: "⛅", weather: "Переменная облачность", temp: "+3°", feelsLike: "+1°", wind: "2 м/с", humidity: "70%", pressure: "750 мм.рт.ст", sunrise: "6:05", sunset: "19:10" }
        };
        return weatherData[this.id] || weatherData[1];
    }

    getHTML() {
        return `
            <div id="day-page" class="day-page" style="min-height: 100vh; background: #f8f9fa; padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto;">
                    <div id="back-button-container" style="margin-bottom: 20px;"></div>
                    <div id="day-content"></div>
                </div>
            </div>
        `;
    }

    clickBack() {
        if (this.viewer) {
            this.viewer.destroy();
            this.viewer = null;
        }
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Кнопка назад
        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const dayContent = document.getElementById('day-content');

        // Карточка с информацией
        const infoCard = new DayInfoCard(data);
        dayContent.insertAdjacentHTML('beforeend', infoCard.render());

        // Контейнер для 3D
        const viewerContainer = document.createElement('div');
        viewerContainer.style.width = '400px';
        viewerContainer.style.height = '400px';
        viewerContainer.style.margin = '30px auto 0 auto';
        viewerContainer.style.background = '#e6ebf5';
        viewerContainer.style.borderRadius = '16px';
        viewerContainer.style.overflow = 'hidden';
        dayContent.appendChild(viewerContainer);

        // Контейнер для кнопок
        const controlsContainer = document.createElement('div');
        controlsContainer.id = 'camera-controls-container';
        dayContent.appendChild(controlsContainer);

        // Создаём 3D-вьювер
        this.viewer = new Weather3DViewer(viewerContainer, data.weather);

        // Создаём панель управления
        this.controls = new CameraControls(controlsContainer, this.viewer);
        this.controls.render();
    }
}