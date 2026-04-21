import { MetParamCardComponent } from "../MetParam_card/MetParam_index.js";

export class MetParamGridComponent {
    constructor(parent) {
        this.parent = parent;
        this.grid = null;
        this.cards = [];
    }

    getHTML() {
        return `
            <div class="metparam-grid-container">
                <div class="metparam-grid" id="metparam-grid"></div>
            </div>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.grid = document.getElementById('metparam-grid');
    }

    setCards(cardsData, clickListener, deleteListener, editListener) {
        this.grid.innerHTML = '';
        this.cards = [];

        cardsData.forEach(item => {
            const cardComponent = new MetParamCardComponent(this.grid);
            cardComponent.render(item, clickListener, deleteListener, editListener);
            const cardElement = this.grid.lastElementChild;
            this.cards.push({ element: cardElement, id: item.id });
        });
    }
}