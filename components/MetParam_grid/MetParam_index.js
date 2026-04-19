import { MetParamCardComponent } from "../MetParam_card/MetParam_index.js";

export class MetParamGridComponent {
    constructor(parent) {
        this.parent = parent;
        this.grid = null;
        this.cards = []; // { element, id }
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

    addCard(cardData, clickListener, deleteListener) {
        const cardComponent = new MetParamCardComponent(this.grid);
        cardComponent.render(cardData, clickListener, deleteListener);
        const cardElement = this.grid.lastElementChild;
        this.cards.push({ element: cardElement, id: cardData.id });
    }

    removeCard(id) {
        const index = this.cards.findIndex(c => c.id === id);
        if (index === -1) return false;

        const card = this.cards[index];
        card.element.remove();
        this.cards.splice(index, 1);
        return true;
    }

    setCards(cardsData, clickListener, deleteListener) {
        // очищаем грид
        this.grid.innerHTML = '';
        this.cards = [];

        // создаём карточки
        cardsData.forEach(item => {
            const cardComponent = new MetParamCardComponent(this.grid);
            cardComponent.render(item, clickListener, deleteListener);
            const cardElement = this.grid.lastElementChild;
            this.cards.push({ element: cardElement, id: item.id });
        });
    }
}