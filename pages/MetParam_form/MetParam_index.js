import { BackButtonComponent } from "../../components/MetParam_back-button/MetParam_index.js";
import { MainPage } from "../MetParam_main/MetParam_index.js";
import { ajax } from "../../modules/ajax.js";
import { metParamUrls } from "../../modules/metParamUrls.js";

export class MetParamFormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id ? parseInt(id) : null;
        this.metParam = null;
    }

    getHTML() {
        const title = this.id ? 'Редактирование метеопараметра' : 'Создание метеопараметра';
        return `
            <div id="form-page" class="day-page">
                <div class="container" style="max-width: 600px;">
                    <div id="back-button-container" class="mb-4"></div>
                    <div class="day-card">
                        <h2 class="day-title text-center mb-4">${title}</h2>
                        <div id="form-content">
                            <div class="text-center py-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Загрузка...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getFormHTML(data = {}) {
        const names = ['Температура', 'Давление', 'Влажность', 'Ветер', 'УФ излучение'];
        const units = {
            'Температура': '°C',
            'Давление': 'мм.рт.ст',
            'Влажность': '%',
            'Ветер': 'м/с',
            'УФ излучение': 'УФИ'
        };

        const selectedName = data.name || 'Температура';
        const selectedUnit = data.unit || units[selectedName];

        return `
            <form id="metparam-form">
                <div class="mb-3">
                    <label for="name" class="form-label">Название параметра</label>
                    <select class="form-select" id="name" name="name" required>
                        ${names.map(name => 
                            `<option value="${name}" ${name === selectedName ? 'selected' : ''}>${name}</option>`
                        ).join('')}
                    </select>
                </div>

                <div class="mb-3">
                    <label for="value" class="form-label">Значение</label>
                    <input type="number" step="0.1" class="form-control" id="value" name="value" 
                           value="${data.value !== undefined ? data.value : ''}" required>
                </div>

                <div class="mb-3">
                    <label for="unit" class="form-label">Единица измерения</label>
                    <input type="text" class="form-control" id="unit" name="unit" 
                           value="${selectedUnit}" readonly>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Описание</label>
                    <input type="text" class="form-control" id="description" name="description" 
                           value="${data.description || ''}" required>
                </div>
            </form>
        `;
    }

    bindNameChange() {
        const nameSelect = document.getElementById('name');
        const unitInput = document.getElementById('unit');
        const units = {
            'Температура': '°C',
            'Давление': 'мм.рт.ст',
            'Влажность': '%',
            'Ветер': 'м/с',
            'УФ излучение': 'УФИ'
        };
        
        nameSelect.addEventListener('change', (e) => {
            unitInput.value = units[e.target.value] || '';
        });
    }

    loadData() {
        if (this.id) {
            ajax.get(metParamUrls.getMetParamById(this.id), (data, status) => {
                const formContent = document.getElementById('form-content');
                if (status === 200 && data) {
                    this.metParam = data;
                    formContent.innerHTML = this.getFormHTML(data);
                    this.bindNameChange();
                } else {
                    formContent.innerHTML = `
                        <div class="alert alert-danger">
                            Ошибка загрузки данных. Метеопараметр не найден.
                        </div>
                    `;
                }
            });
        } else {
            const formContent = document.getElementById('form-content');
            formContent.innerHTML = this.getFormHTML();
            this.bindNameChange();
        }
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));
        
        this.loadData();
    }
}