import { BackButtonComponent } from "../../components/MetParam_back-button/MetParam_index.js";
import { MainPage } from "../MetParam_main/MetParam_index.js";

export class DayPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getData() {
        const paramData = {
            1: {
                name: "Температура",
                icon: "🌡️",
                value: "+7°C",
                feelsLike: "+5°C",
                min: "+2°C",
                max: "+9°C",
                description: "Температура воздуха - один из ключевых метеорологических параметров, характеризующих тепловое состояние атмосферы. Измеряется в градусах Цельсия (°C).",
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
                value: "752 мм.рт.ст",
                tendency: "Растет",
                normal: "745-755",
                description: "Атмосферное давление - сила, с которой воздух давит на земную поверхность. Нормальным считается давление 760 мм рт.ст. на уровне моря.",
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
                value: "80%",
                dewPoint: "+4°C",
                comfort: "Влажно",
                description: "Относительная влажность воздуха показывает, насколько воздух насыщен водяным паром. Оптимальная влажность для человека 40-60%.",
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
                value: "2 м/с",
                direction: "Юго-западный",
                gusts: "до 4 м/с",
                description: "Скорость ветра влияет на ощущение температуры. По шкале Бофорта 2 м/с соответствует легкому ветру.",
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
                value: "3 УФИ",
                level: "Средний",
                protection: "SPF 15+",
                description: "Ультрафиолетовый индекс (УФИ) характеризует уровень ультрафиолетового излучения. Значения от 3 до 5 считаются умеренными.",
                details: [
                    { label: "Уровень опасности", value: "Средний" },
                    { label: "Рекомендуемая защита", value: "SPF 15+" },
                    { label: "Время безопасного пребывания", value: "45 минут" },
                    { label: "Максимум сегодня", value: "4 УФИ в 13:00" }
                ]
            }
        };
        
        return paramData[this.id] || paramData[1];
    }

    getHTML() {
        return `
            <div id="day-page" class="day-page">
                <div class="container" style="max-width: 600px;">
                    <div id="back-button-container" class="mb-4"></div>
                    <div id="day-content"></div>
                </div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const backButton = new BackButtonComponent(document.getElementById('back-button-container'));
        backButton.render(this.clickBack.bind(this));
        
        const data = this.getData();
        const dayContent = document.getElementById('day-content');
        
        dayContent.insertAdjacentHTML('beforeend', `
            <div class="day-card">
                <h2 class="day-title" style="color: #333">${data.name}</h2>
                <div class="text-center mb-4">
                    <div class="day-icon">${data.icon}</div>
                    <div class="day-temp">${data.value}</div>
                </div>
                <div class="mb-4">
                    <p class="text-muted">${data.description}</p>
                </div>
                <div class="row g-3">
                    ${data.details.map(detail => `
                        <div class="col-6">
                            <div class="day-detail-item">
                                <div class="day-detail-label">${detail.label}</div>
                                <div class="day-detail-value">${detail.value}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `);
    }
}