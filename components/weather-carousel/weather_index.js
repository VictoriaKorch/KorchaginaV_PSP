import { WeatherCardComponent } from "../weather-card/weather_index.js";

export class WeatherCarouselComponent {
    constructor(parent) {
        this.parent = parent;
        this.currentIndex = 0;
        this.visibleCards = 4;
        this.cardWidth = 220;
        this.track = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.cards = []; // { element, id }
    }

    getHTML() {
        return `
            <div class="carousel-container">
                <div class="overflow-hidden mx-4">
                    <div class="carousel-track" id="carousel-track"></div>
                </div>
                <button class="carousel-btn carousel-prev" id="carousel-prev">‹</button>
                <button class="carousel-btn carousel-next" id="carousel-next">›</button>
            </div>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
    }

    updateCarousel() {
        if (!this.track || !this.prevBtn || !this.nextBtn) return;

        const totalCards = this.cards.length;
        const maxIndex = Math.max(0, totalCards - this.visibleCards);

        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
        }

        if (totalCards <= this.visibleCards) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = '';
            this.nextBtn.style.display = '';
        }

        this.track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
    }

    addCard(cardData, clickListener, deleteListener) {
        const cardComponent = new WeatherCardComponent(this.track);
        cardComponent.render(cardData, clickListener, deleteListener);
        const cardElement = this.track.lastElementChild;
        this.cards.push({ element: cardElement, id: cardData.id });

        this.updateCarousel();
    }

    removeCard(id) {
        const index = this.cards.findIndex(c => c.id === id);
        if (index === -1) return false;

        const card = this.cards[index];
        card.element.remove();
        this.cards.splice(index, 1);

        if (index < this.currentIndex && this.currentIndex > 0) {
            this.currentIndex--;
        }

        this.updateCarousel();
        return true;
    }

    initCarousel() {
        if (!this.track || !this.prevBtn || !this.nextBtn) return;

        this.prevBtn.onclick = () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateCarousel();
            }
        };

        this.nextBtn.onclick = () => {
            const totalCards = this.cards.length;
            const maxIndex = Math.max(0, totalCards - this.visibleCards);
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                this.updateCarousel();
            }
        };

        this.updateCarousel();
    }
}