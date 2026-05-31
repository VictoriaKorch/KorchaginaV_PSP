import { HeaderComponent } from "../../components/MetParam_header/MetParam_index.js";
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

                <div class="d-flex gap-2 justify-content-center mt-4">
                    <button type="submit" class="btn btn-primary" style="min-width: 120px;">
                        ${this.id ? 'Сохранить' : 'Создать'}
                    </button>
                    <button type="button" class="btn btn-secondary" id="cancel-btn" style="min-width: 120px;">
                        Отмена
                    </button>
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

    bindFormSubmit() {
        const form = document.getElementById('metparam-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                value: parseFloat(document.getElementById('value').value),
                unit: document.getElementById('unit').value,
                description: document.getElementById('description').value,
                additionalData: this.metParam?.additionalData || {}
            };

            if (this.id) {
                const { status } = await ajax.patch(metParamUrls.updateMetParamById(this.id), formData);
                if (status === 200) {
                    this.goToMainPage();
                } else {
                    console.error('Ошибка при обновлении');
                }
            } else {
                const { status } = await ajax.post(metParamUrls.createMetParam(), formData);
                if (status === 201) {
                    this.goToMainPage();
                } else {
                    console.error('Ошибка при создании');
                }
            }
        });
    }

    loadData() {
        if (this.id) {
            const loadDataAsync = async () => {
                const { data, status } = await ajax.get(metParamUrls.getMetParamById(this.id));
                const formContent = document.getElementById('form-content');
                if (status === 200 && data) {
                    this.metParam = data;
                    formContent.innerHTML = this.getFormHTML(data);
                    this.bindNameChange();
                    this.bindFormSubmit();
                    this.bindCancel();
                } else {
                    formContent.innerHTML = `
                        <div class="alert alert-danger">
                            Ошибка загрузки данных. Метеопараметр не найден.
                        </div>
                    `;
                }
            };
            loadDataAsync();
        } else {
            const formContent = document.getElementById('form-content');
            formContent.innerHTML = this.getFormHTML();
            this.bindNameChange();
            this.bindFormSubmit();
            this.bindCancel();
        }
    }

    bindCancel() {
        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.goToMainPage();
        });
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
        this.loadData();
    }
}