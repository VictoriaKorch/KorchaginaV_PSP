export class WeatherCarouselComponent {
    constructor(parent) {
        this.parent = parent;
        this.currentIndex = 0;
        this.visibleCards = 4;
        this.cardWidth = 220;
        this.track = null;
        this.totalCards = 0;
    }

    getHTML() {
        return (
            `
            <div class="weather-carousel position-relative" style="max-width: 940px; margin: 0 auto;">
                <!-- Контейнер с карточками -->
                <div class="overflow-hidden" style="margin: 0 20px;">
                    <div class="d-flex" id="carousel-track" style="gap: 20px; transition: transform 0.3s ease; transform: translateX(0);">
                        <!-- Карточки будут добавлены через JS -->
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

    renderWithCards(cardsHTML) {
        // Вставляем HTML карусели
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Находим трек
        this.track = document.getElementById('carousel-track');
        
        // Добавляем все карточки в трек
        cardsHTML.forEach(cardHtml => {
            this.track.insertAdjacentHTML('beforeend', cardHtml);
        });
        
        // Устанавливаем ширину каждой карточки
        for (let card of this.track.children) {
            card.style.width = '200px';
            card.style.flexShrink = '0';
        }
        
        // Сохраняем общее количество карточек
        this.totalCards = this.track.children.length;
        console.log(`Всего карточек: ${this.totalCards}`);
        
        // Инициализируем кнопки
        this.initButtons();
    }

    initButtons() {
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        
        if (!prevBtn || !nextBtn) {
            console.error('Кнопки карусели не найдены');
            return;
        }
        
        // Добавляем обработчики
        prevBtn.addEventListener('click', () => this.slide('prev'));
        nextBtn.addEventListener('click', () => this.slide('next'));
        
        // Обновляем состояние кнопок
        this.updateButtons();
    }

    slide(direction) {
        if (!this.track) return;
        
        const maxIndex = Math.max(0, this.totalCards - this.visibleCards);
        console.log(`Текущий индекс: ${this.currentIndex}, Макс индекс: ${maxIndex}`);
        
        if (direction === 'prev') {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
        } else {
            this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
        }
        
        // Сдвигаем трек
        const offset = this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(-${offset}px)`;
        
        // Обновляем состояние кнопок
        this.updateButtons();
    }
    
    updateButtons() {
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        
        if (!this.track || !prevBtn || !nextBtn) return;
        
        const maxIndex = Math.max(0, this.totalCards - this.visibleCards);
        
        // Если карточек меньше или равно видимым, прячем кнопки
        if (this.totalCards <= this.visibleCards) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        // Показываем кнопки
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        
        // Блокируем кнопки, если нельзя листать дальше
        prevBtn.disabled = this.currentIndex === 0;
        nextBtn.disabled = this.currentIndex >= maxIndex;
        
        prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
        
        prevBtn.style.cursor = this.currentIndex === 0 ? 'default' : 'pointer';
        nextBtn.style.cursor = this.currentIndex >= maxIndex ? 'default' : 'pointer';
    }

    // Старый метод render оставляем для обратной совместимости
    render() {
        this.renderWithCards([]);
    }
}