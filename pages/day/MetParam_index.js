import { HeaderComponent } from "../../components/MetParam_header/MetParam_index.js";
import { MainPage } from "../MetParam_main/MetParam_index.js";
import { ajax } from "../../modules/ajax.js";
import { metParamUrls } from "../../modules/metParamUrls.js";

export class DayPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        this.data = null;
    }

    getHTML() {
        return `
            <div id="day-page" class="day-page">
                <div class="container" style="max-width: 600px;">
                    <div id="day-content">
                        <div class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getIcon(name) {
        const icons = {
            'Температура': '🌡️',
            'Давление': '🎈',
            'Влажность': '💧',
            'Ветер': '💨',
            'УФ излучение': '☀️'
        };
        return icons[name] || '📊';
    }

    getDetailsHTML(data) {
        const details = [];
        
        if (data.additionalData) {
            for (const [key, value] of Object.entries(data.additionalData)) {
                let label = key;
                if (key === 'feelsLike') label = 'Ощущается как';
                if (key === 'min') label = 'Минимум';
                if (key === 'max') label = 'Максимум';
                if (key === 'tendency') label = 'Тенденция';
                if (key === 'normal') label = 'Норма';
                if (key === 'dewPoint') label = 'Точка росы';
                if (key === 'comfort') label = 'Комфорт';
                if (key === 'direction') label = 'Направление';
                if (key === 'gusts') label = 'Порывы';
                if (key === 'level') label = 'Уровень';
                if (key === 'protection') label = 'Защита';
                
                let displayValue = value;
                if (key === 'feelsLike' || key === 'min' || key === 'max' || key === 'dewPoint') {
                    displayValue = `${value} ${data.unit}`;
                }
                if (key === 'gusts') {
                    displayValue = `${value} ${data.unit}`;
                }
                
                details.push({ label, value: displayValue });
            }
        }
        
        return details;
    }

    renderContent(data) {
        this.data = data;
        const dayContent = document.getElementById('day-content');
        const details = this.getDetailsHTML(data);
        
        dayContent.innerHTML = `
            <div class="day-card">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h2 class="day-title" style="color: #333">${data.name}</h2>
                </div>
                <div class="text-center mb-4">
                    <div class="day-icon">${this.getIcon(data.name)}</div>
                    <div class="day-temp">${data.value} ${data.unit}</div>
                    <div class="day-feels">${data.description}</div>
                </div>
                ${details.length > 0 ? `
                <div class="row g-3">
                    ${details.map(detail => `
                        <div class="col-6">
                            <div class="day-detail-item">
                                <div class="day-detail-label">${detail.label}</div>
                                <div class="day-detail-value">${detail.value}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `;
    }

    goToMainPage() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        
        const header = new HeaderComponent(this.parent, this.goToMainPage.bind(this));
        header.render();
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const loadData = async () => {
            const { data, status } = await ajax.get(metParamUrls.getMetParamById(this.id));
            if (status === 200 && data) {
                this.renderContent(data);
            } else {
                document.getElementById('day-content').innerHTML = `
                    <div class="alert alert-danger">
                        Ошибка загрузки данных. Метеопараметр не найден.
                    </div>
                `;
            }
        };
        loadData();
    }
}