import { DayPage } from "../day/MetParam_index.js";
import { MetParamGridComponent } from "../../components/MetParam_grid/MetParam_index.js";
import { SearchFilterComponent } from "../../components/MetParam_search-filter/MetParam_index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.allCards = this.getData();
        this.filteredCards = [...this.allCards];
        this.currentFilter = { searchText: '' };
        this.grid = null;
        this.filterComponent = null;
    }

    getData() {
        return [
            { 
                id: 1, 
                name: "Температура", 
                icon: "🌡️", 
                value: "+7", 
                unit: "°C", 
                description: "Комфортная",
                palindromeValue: "7",
                matrix: [[7, 2, 9], [5, 6, 8], [4, 7, 6]]
            },
            { 
                id: 2, 
                name: "Давление", 
                icon: "🎈", 
                value: "752", 
                unit: " мм.рт.ст", 
                description: "В норме",
                palindromeValue: "752",
                matrix: [[752, 750, 755], [748, 752, 754], [750, 752, 753]]
            },
            { 
                id: 3, 
                name: "Влажность", 
                icon: "💧", 
                value: "80", 
                unit: "%", 
                description: "Повышенная",
                palindromeValue: "80",
                matrix: [[80, 75, 85], [70, 80, 82], [78, 80, 76]]
            },
            { 
                id: 4, 
                name: "Ветер", 
                icon: "💨", 
                value: "2", 
                unit: " м/с", 
                description: "Легкий",
                palindromeValue: "2",
                matrix: [[2, 4, 1], [3, 2, 5], [2, 3, 2]]
            },
            { 
                id: 5, 
                name: "УФ излучение", 
                icon: "☀️", 
                value: "3", 
                unit: " УФИ", 
                description: "Умеренный",
                palindromeValue: "3",
                matrix: [[3, 2, 4], [1, 3, 5], [2, 3, 4]]
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.closest('.metparam-card')?.dataset.id;
        if (cardId) {
            const dayPage = new DayPage(this.parent, cardId);
            dayPage.render();
        }
    }

    deleteCard(id) {
        this.allCards = this.allCards.filter(card => card.id !== id);
        this.applyFilter(this.currentFilter.searchText);
    }

    addCard() {
        const templateCard = this.allCards[0];
        if (!templateCard) return;
        const newId = Math.max(...this.allCards.map(c => c.id)) + 1;
        const newCard = { ...templateCard, id: newId };
        this.allCards.push(newCard);
        this.applyFilter(this.currentFilter.searchText);
    }

    applyFilter(searchText) {
        this.currentFilter = { searchText };
        this.filteredCards = this.allCards.filter(card => 
            searchText === '' || card.name.toLowerCase().includes(searchText.toLowerCase())
        );
        if (this.grid) {
            this.grid.setCards(this.filteredCards, this.clickCard.bind(this), (id) => this.deleteCard(id));
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
        this.filterComponent.render((searchText) => this.applyFilter(searchText));

        const gridContainer = document.getElementById('grid-container');
        this.grid = new MetParamGridComponent(gridContainer);
        this.grid.render();

        if (window.searchFilterState) {
            const { searchText } = window.searchFilterState;
            this.filterComponent.setValue(searchText);
            this.applyFilter(searchText);
        } else {
            this.applyFilter('');
        }

        const addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.onclick = () => this.addCard();
        }
    }
}