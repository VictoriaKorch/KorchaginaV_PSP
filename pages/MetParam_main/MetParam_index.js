import { DayPage } from "../day/MetParam_index.js";
import { MetParamGridComponent } from "../../components/MetParam_grid/MetParam_index.js";
import { SearchFilterComponent } from "../../components/MetParam_search-filter/MetParam_index.js";
import { HeaderComponent } from "../../components/MetParam_header/MetParam_index.js";
import * as paramService from "../../services/MetParam_DataService.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.grid = null;
        this.filterComponent = null;
    }

    goToMainPage() {
        this.render();
    }

    clickCard(e) {
        const cardId = e.target.closest('.weather-card')?.dataset.id;
        if (cardId) {
            const dayPage = new DayPage(this.parent, cardId);
            dayPage.render();
        }
    }

    deleteCard(id) {
        paramService.deleteCard(id);
        this.updateGrid();
    }

    addCard() {
        paramService.addCard();
        this.updateGrid();
    }

    applyFilter(searchText) {
        paramService.applyFilter(searchText);
        window.searchFilterState = { searchText };
        this.updateGrid();
    }

    updateGrid() {
        const filteredData = paramService.getFilteredData();
        if (this.grid) {
            this.grid.setCards(
                filteredData, 
                this.clickCard.bind(this), 
                this.deleteCard.bind(this)
            );
        }
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent, this.goToMainPage.bind(this));
        header.render();

        const wrapper = document.createElement('div');
        wrapper.className = 'min-vh-100';
        wrapper.style.background = '#f8f9fa';
        wrapper.style.padding = '40px 20px';
        wrapper.innerHTML = `
            <div class="container" style="max-width: 1200px;">
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
            this.applyFilter(searchText);
        } else {
            this.updateGrid();
        }

        document.getElementById('add-btn').onclick = this.addCard.bind(this);
    }
}