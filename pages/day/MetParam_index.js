import { BackButtonComponent } from "../../components/MetParam_back-button/MetParam_index.js";
import { MainPage } from "../MetParam_main/MetParam_index.js";
import { DayInfoCard } from "../../components/MetParam_day-info-card/MetParam_index.js";
import { MetParam3DViewer } from "../../components/MetParam_3d-viewer/MetParam_index.js";
import { CameraControls } from "../../components/MetParam_camera-controls/MetParam_index.js";
import { MetParamIsPalindrome, MetParamSumDiagonals } from "../../MetParam_utils/MetParam_mathUtils.js";

export class DayPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        this.viewer = null;
        this.controls = null;
    }

    getData() {
        const paramData = {
            1: {
                name: "Температура",
                icon: "🌡️",
                value: "+7",
                unit: "°C",
                description: "Комфортная",
                weatherType: "Переменная облачность",
                palindromeValue: "7",
                matrix: [[7, 2, 9], [5, 6, 8], [4, 7, 6]],
                detail: "Температура воздуха - один из ключевых метеорологических параметров, характеризующих тепловое состояние атмосферы. Измеряется в градусах Цельсия (°C).",
                details: [
                    { label: "Ощущается как", value: "+5°C" },
                    { label: "Минимальная сегодня", value: "+2°C" },
                    { label: "Максимальная сегодня", value: "+9°C" },
                    { label: "Тенденция", value: "Повышение" }
                ]
            },
            2: {
                name: "Давление",
                icon: "🎈",
                value: "752",
                unit: " мм.рт.ст",
                description: "В норме",
                weatherType: "Переменная облачность",
                palindromeValue: "752",
                matrix: [[752, 750, 755], [748, 752, 754], [750, 752, 753]],
                detail: "Атмосферное давление - сила, с которой воздух давит на земную поверхность. Нормальным считается давление 760 мм рт.ст. на уровне моря.",
                details: [
                    { label: "Тенденция", value: "Растет" },
                    { label: "Норма для региона", value: "745-755 мм.рт.ст" },
                    { label: "Изменение за 3 часа", value: "+2 мм.рт.ст" },
                    { label: "Влияние", value: "Комфортное" }
                ]
            },
            3: {
                name: "Влажность",
                icon: "💧",
                value: "80",
                unit: "%",
                description: "Повышенная",
                weatherType: "Пасмурно",
                palindromeValue: "80",
                matrix: [[80, 75, 85], [70, 80, 82], [78, 80, 76]],
                detail: "Относительная влажность воздуха показывает, насколько воздух насыщен водяным паром. Оптимальная влажность для человека 40-60%.",
                details: [
                    { label: "Точка росы", value: "+4°C" },
                    { label: "Уровень комфорта", value: "Влажно" },
                    { label: "Абсолютная влажность", value: "6.8 г/м³" },
                    { label: "Рекомендация", value: "Проветривание" }
                ]
            },
            4: {
                name: "Ветер",
                icon: "💨",
                value: "2",
                unit: " м/с",
                description: "Легкий",
                weatherType: "Ясно",
                palindromeValue: "2",
                matrix: [[2, 4, 1], [3, 2, 5], [2, 3, 2]],
                detail: "Скорость ветра влияет на ощущение температуры. По шкале Бофорта 2 м/с соответствует легкому ветру.",
                details: [
                    { label: "Направление", value: "Юго-западный" },
                    { label: "Порывы", value: "до 4 м/с" },
                    { label: "Шкала Бофорта", value: "1 балл (легкий)" },
                    { label: "Влияние на температуру", value: "Охлаждение на 2°C" }
                ]
            },
            5: {
                name: "УФ излучение",
                icon: "☀️",
                value: "3",
                unit: " УФИ",
                description: "Умеренный",
                weatherType: "Ясно",
                palindromeValue: "3",
                matrix: [[3, 2, 4], [1, 3, 5], [2, 3, 4]],
                detail: "Ультрафиолетовый индекс (УФИ) характеризует уровень ультрафиолетового излучения. Значения от 3 до 5 считаются умеренными.",
                details: [
                    { label: "Уровень опасности", value: "Средний" },
                    { label: "Рекомендуемая защита", value: "SPF 15+" },
                    { label: "Время безопасного пребывания", value: "45 минут" },
                    { label: "Максимум сегодня", value: "4 УФИ в 13:00" }
                ]
            }
        };
        
        const data = paramData[this.id] || paramData[1];
        data.isPalindrome = MetParamIsPalindrome(String(data.palindromeValue));
        data.diagonalSum = MetParamSumDiagonals(data.matrix);
        return data;
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

        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const dayContent = document.getElementById('day-content');

        const infoCard = new DayInfoCard(data);
        dayContent.insertAdjacentHTML('beforeend', infoCard.render());

        const viewerContainer = document.createElement('div');
        viewerContainer.style.width = '400px';
        viewerContainer.style.height = '400px';
        viewerContainer.style.margin = '30px auto 0 auto';
        viewerContainer.style.background = '#e6ebf5';
        viewerContainer.style.borderRadius = '16px';
        viewerContainer.style.overflow = 'hidden';
        dayContent.appendChild(viewerContainer);

        const controlsContainer = document.createElement('div');
        controlsContainer.id = 'camera-controls-container';
        dayContent.appendChild(controlsContainer);

        this.viewer = new MetParam3DViewer(viewerContainer, data.weatherType);

        this.controls = new CameraControls(controlsContainer, this.viewer);
        this.controls.render();
    }
}