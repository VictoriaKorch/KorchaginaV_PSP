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
            <div class="weather-carousel position-relative" style="max-width: 940px; margin: 0 auto;">
                <!-- Контейнер с карточками -->
                <div class="overflow-hidden" style="margin: 0 20px;">
                    <div class="d-flex" id="carousel-track" style="gap: 20px; transition: transform 0.3s ease; transform: translateX(0);">
                        <!-- Карточки будут добавляться сюда -->
                    </div>
                </div>
                
                <!-- Кнопки управления -->
                <button class="carousel-prev position-absolute start-0 top-50 translate-middle-y btn btn-light rounded-circle shadow-sm" 
                        id="carousel-prev"
                        style="width: 40px; height: 40px; z-index: 10; margin-left: -20px; display: flex; align-items: center; justify-content: center; padding: 0; font-size: 1.5rem;">
                    ‹
                </button>
                
                <button class="carousel-next position-absolute end-0 top-50 translate-middle-y btn btn-light rounded-circle shadow-sm" 
                        id="carousel-next"
                        style="width: 40px; height: 40px; z-index: 10; margin-right: -20px; display: flex; align-items: center; justify-content: center; padding: 0; font-size: 1.5rem;">
                    ›
                </button>
            </div>
            `
        );
    }

    render() {
        // Вставляем HTML карусели
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }

    initCarousel() {
        const track = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        
        if (!track || !prevBtn || !nextBtn) {
            console.error('Элементы карусели не найдены');
            return;
        }
        
        // Устанавливаем ширину каждой карточки
        for (let card of track.children) {
            card.style.width = '200px';
            card.style.flexShrink = '0';
        }
        
        const totalCards = track.children.length;
        const maxIndex = Math.max(0, totalCards - this.visibleCards);
        
        // Если карточек меньше или равно видимым, прячем кнопки
        if (totalCards <= this.visibleCards) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        // Добавляем обработчики
        prevBtn.addEventListener('click', () => {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
            track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
            
            // Обновляем состояние кнопок
            prevBtn.disabled = this.currentIndex === 0;
            nextBtn.disabled = this.currentIndex >= maxIndex;
            prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
        });
        
        nextBtn.addEventListener('click', () => {
            this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
            track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
            
            // Обновляем состояние кнопок
            prevBtn.disabled = this.currentIndex === 0;
            nextBtn.disabled = this.currentIndex >= maxIndex;
            prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
        });
    }
}