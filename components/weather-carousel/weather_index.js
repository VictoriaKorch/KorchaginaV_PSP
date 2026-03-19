export class WeatherCarouselComponent {
    constructor(parent) {
        this.parent = parent;
        this.currentIndex = 0;
        this.visibleCards = 4;
        this.cardWidth = 220;
    }

    getHTML() {
        return (
            `
            <div class="carousel-container">
                <div class="overflow-hidden mx-4">
                    <div class="carousel-track" id="carousel-track">
                        <!-- Карточки будут добавляться сюда -->
                    </div>
                </div>
                
                <button class="carousel-btn carousel-prev" id="carousel-prev">
                    ‹
                </button>
                
                <button class="carousel-btn carousel-next" id="carousel-next">
                    ›
                </button>
            </div>
            `
        );
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }

    initCarousel() {
        const track = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        
        if (!track || !prevBtn || !nextBtn) return;
        
        const totalCards = track.children.length;
        const maxIndex = Math.max(0, totalCards - this.visibleCards);
        
        if (totalCards <= this.visibleCards) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
        
        prevBtn.onclick = null;
        nextBtn.onclick = null;
        
        prevBtn.onclick = () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
            }
        };
        
        nextBtn.onclick = () => {
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
            }
        };
    }
}