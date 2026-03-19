import { DayPage } from "../day/weather_index.js";
import { WeatherCardComponent } from "../../components/weather-card/weather_index.js";
import { WeatherCarouselComponent } from "../../components/weather-carousel/weather_index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentIndex = 0;
        this.cardsData = this.getData();
    }

    getData() {
        return [
            { id: 1, day: "Пн", date: "23 мар", icon: "⛅", temp: "+7°", feels: "+5°" },
            { id: 2, day: "Вт", date: "24 мар", icon: "⛅", temp: "+3°", feels: "+1°" },
            { id: 3, day: "Ср", date: "25 мар", icon: "⛅", temp: "+1°", feels: "+1°" },
            { id: 4, day: "Чт", date: "26 мар", icon: "☁️", temp: "+2°", feels: "0°" },
            { id: 5, day: "Пт", date: "27 мар", icon: "⛅", temp: "+2°", feels: "0°" },
            { id: 6, day: "Сб", date: "28 мар", icon: "⛅", temp: "+3°", feels: "+1°" },
            { id: 7, day: "Вс", date: "29 мар", icon: "⛅", temp: "+3°", feels: "+1°" }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const dayPage = new DayPage(this.parent, cardId);
        dayPage.render();
    }

    deleteCard(id) {
        this.cardsData = this.cardsData.filter(card => card.id !== id);
        const maxIndex = Math.max(0, this.cardsData.length - 4);
        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
        }
        this.render();
    }

    addCard() {
    // Берём первую карточку из массива (любую)
    const templateCard = this.cardsData[0];
    
    if (!templateCard) return; // если нет карточек
    
    const newId = Math.max(...this.cardsData.map(c => c.id)) + 1;
    
    const newCard = {
        ...templateCard,        // копируем все поля
        id: newId               // новый ID
    };
    
    this.cardsData.push(newCard);
    this.render();
}
    render() {
        // Генерируем HTML для всех карточек
        let cardsHTML = '';
        this.cardsData.forEach(item => {
            const dayClass = (item.day === "Сб" || item.day === "Вс") ? 'weekend-day' : 'weekday-day';
            
            cardsHTML += `
                <div class="weather-card shadow-sm" data-id="${item.id}">
                    <div class="card-body text-center">
                        <h5 class="${dayClass}">${item.day}</h5>
                        <div class="weather-date">${item.date}</div>
                        
                        <div class="weather-icon">${item.icon}</div>
                        
                        <div class="weather-temp">${item.temp}</div>
                        
                        <div class="weather-feels">Ощущается: ${item.feels}</div>
                        
                        <div class="d-flex gap-2 justify-content-center">
                            <button class="btn btn-detail" data-id="${item.id}">
                                Подробнее
                            </button>
                            
                            <button class="btn btn-delete" data-id="${item.id}">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        const html = `
            <div class="min-vh-100" style="background: #f8f9fa; padding: 40px 20px;">
                <div class="container" style="max-width: 1200px;">
                    <div class="text-center mb-5">
                        <h1 class="page-title">Прогноз погоды</h1>
                        <div class="page-subtitle">в Москве</div>
                        <div class="mx-auto bg-secondary" style="width: 80px; height: 2px; opacity: 0.2; margin-top: 20px;"></div>
                    </div>
                    
                    <div class="text-center mb-4">
                        <button id="add-btn" class="btn btn-add">
                            + Добавить день
                        </button>
                    </div>
                    
                    <div class="carousel-container">
                        <div class="overflow-hidden mx-4">
                            <div class="carousel-track" id="carousel-track" style="transform: translateX(0px);">
                                ${cardsHTML}
                            </div>
                        </div>
                        
                        <button class="carousel-btn carousel-prev" id="carousel-prev">
                            ‹
                        </button>
                        
                        <button class="carousel-btn carousel-next" id="carousel-next">
                            ›
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.parent.innerHTML = html;
        
        setTimeout(() => {
            this.initCarousel();
            this.initButtons();
        }, 0);
    }

    initCarousel() {
        const track = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        
        if (!track || !prevBtn || !nextBtn) return;
        
        const cardWidth = 220;
        const totalCards = track.children.length;
        const maxIndex = Math.max(0, totalCards - 4);
        
        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
        }
        
        track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
        
        if (totalCards <= 4) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        prevBtn.onclick = null;
        nextBtn.onclick = null;
        
        prevBtn.onclick = () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
            }
        };
        
        nextBtn.onclick = () => {
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
            }
        };
    }

    initButtons() {
        const addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.onclick = () => this.addCard();
        }

        document.querySelectorAll('.btn-detail').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                const dayPage = new DayPage(this.parent, id);
                dayPage.render();
            };
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.deleteCard(id);
            };
        });
    }
}