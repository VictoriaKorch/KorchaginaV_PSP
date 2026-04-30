import { DayPage } from "../day/MetParam_index.js";
import { MetParamFormPage } from "../MetParam_form/MetParam_index.js";
import { MetParamGridComponent } from "../../components/MetParam_grid/MetParam_index.js";
import { SearchFilterComponent } from "../../components/MetParam_search-filter/MetParam_index.js";
import { ajax } from "../../modules/ajax.js";
import { metParamUrls } from "../../modules/metParamUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.grid = null;
        this.filterComponent = null;
        this.currentData = [];
    }

    clickCard(e) {
        const cardId = e.target.closest('.weather-card')?.dataset.id;
        if (cardId) {
            const dayPage = new DayPage(this.parent, cardId);
            dayPage.render();
        }
    }

    deleteCard(id) {
        // confirm УДАЛЁН - удаляем без подтверждения
        const deleteAsync = async () => {
            const { status } = await ajax.delete(metParamUrls.deleteMetParamById(id));
            if (status === 204) {
                this.loadData();  // Просто перезагружаем список
            } else {
                console.error('Ошибка при удалении');
            }
        };
        deleteAsync();
    }

    editCard(id) {
        const formPage = new MetParamFormPage(this.parent, id);
        formPage.render();
    }

    addCard() {
        const formPage = new MetParamFormPage(this.parent, null);
        formPage.render();
    }

    applyFilter(searchText) {
        window.searchFilterState = { searchText };
        this.loadData(searchText);
    }

    loadData(searchText = '') {
        let url = metParamUrls.getMetParams();
        if (searchText) {
            url += `?name=${encodeURIComponent(searchText)}`;
        }
        
        const loadAsync = async () => {
            const { data, status } = await ajax.get(url);
            if (status === 200) {
                this.currentData = data;
                this.updateGrid();
            } else {
                console.error('Ошибка загрузки данных');
            }
        };
        loadAsync();
    }

    updateGrid() {
        if (this.grid) {
            this.grid.setCards(
                this.currentData, 
                this.clickCard.bind(this),
                this.deleteCard.bind(this),
                this.editCard.bind(this)
            );
        }
    }

    render() {
        this.parent.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'min-vh-100';
        wrapper.style.background = '#f8f9fa';
        wrapper.style.padding = '40px 20px';
        wrapper.innerHTML = `
            <div class="container" style="max-width: 1200px;">
                <div class="text-center mb-4">
                    <h1 class="page-title">Метеопараметры</h1>
                    <div class="mx-auto bg-secondary" style="width: 80px; height: 2px; opacity: 0.2; margin-top: 20px;"></div>
                </div>
                <div id="filter-container"></div>
                <div class="text-center mb-4">
                    <button id="add-btn" class="btn btn-add">+ Добавить параметр</button>
                </div>
                <div id="grid-container"></div>
            </div>
        `;
        this.parent.appendChild(wrapper);

        const filterContainer = document.getElementById('filter-container');
        this.filterComponent = new SearchFilterComponent(filterContainer);
        this.filterComponent.render(this.applyFilter.bind(this));

        const gridContainer = document.getElementById('grid-container');
        this.grid = new MetParamGridComponent(gridContainer);
        this.grid.render();

        if (window.searchFilterState) {
            const { searchText } = window.searchFilterState;
            this.filterComponent.setValue(searchText);
            this.loadData(searchText);
        } else {
            this.loadData();
        }

        document.getElementById('add-btn').onclick = this.addCard.bind(this);
    }
}