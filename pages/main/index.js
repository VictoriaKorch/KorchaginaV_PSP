import { DayPage } from "../day/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentIndex = 0; // Текущая позиция карусели
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

    clickCard(id) {
        const dayPage = new DayPage(this.parent, id);
        dayPage.render();
    }

    deleteCard(id) {
        // Запоминаем, сколько было карточек до удаления
        const oldLength = this.cardsData.length;
        
        // Удаляем карточку
        this.cardsData = this.cardsData.filter(card => card.id !== id);
        
        // Если удалили последнюю карточку и были не в начале, корректируем индекс
        const maxIndex = Math.max(0, this.cardsData.length - 4);
        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
        }
        
        this.render();
    }

    addCard() {
        const newId = Math.max(...this.cardsData.map(c => c.id)) + 1;
        const newCard = {
            id: newId,
            day: "Новый",
            date: "новый день",
            icon: "⛅",
            temp: "+5°",
            feels: "+3°"
        };
        this.cardsData.push(newCard);
        this.render();
    }

    render() {
        // Генерируем HTML для всех карточек
        let cardsHTML = '';
        this.cardsData.forEach(item => {
            const dayColor = (item.day === "Сб" || item.day === "Вс") ? '#ff4444' : '#333';
            
            cardsHTML += `
                <div class="weather-card" data-id="${item.id}" style="width: 200px; flex-shrink: 0; background: white; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
                    <div style="padding: 16px; text-align: center;">
                        <h5 style="font-weight: 600; font-size: 1.1rem; margin-bottom: 4px; color: ${dayColor};">${item.day}</h5>
                        <div style="font-size: 0.85rem; color: #999; margin-bottom: 12px;">${item.date}</div>
                        <div style="font-size: 2.5rem; line-height: 1; margin: 8px 0;">${item.icon}</div>
                        <div style="font-size: 1.8rem; font-weight: 500; margin: 8px 0; color: #333;">${item.temp}</div>
                        <div style="font-size: 0.8rem; color: #999; margin-bottom: 12px;">Ощущается: ${item.feels}</div>
                        <div style="display: flex; gap: 8px; justify-content: center;">
                            <button class="detail-btn" data-id="${item.id}" 
                                    style="border-radius: 20px; padding: 4px 12px; font-size: 0.85rem; background: #f8f9fa; color: #333; border: 1px solid #e0e0e0; min-width: 90px; cursor: pointer;">
                                Подробнее
                            </button>
                            <button class="delete-btn" data-id="${item.id}"
                                    style="border-radius: 50%; width: 32px; height: 32px; padding: 0; background: #f8f9fa; color: #666; border: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: center; font-size: 1rem; cursor: pointer;">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        // Полный HTML страницы
        const html = `
            <div style="min-height: 100vh; background: #f8f9fa; padding: 40px 20px;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h1 style="font-size: 2.8rem; font-weight: 400; color: #000; margin: 0;">
                            Прогноз погоды
                        </h1>
                        <div style="font-size: 1.2rem; color: #333; margin-top: 5px;">
                            в Москве
                        </div>
                        <div style="width: 80px; height: 2px; background: #e0e0e0; margin: 20px auto;"></div>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                        <button id="add-btn" style="background: white; border: 1px solid #e0e0e0; border-radius: 30px; padding: 8px 20px; color: #333; font-size: 0.95rem; cursor: pointer;">
                            + Добавить день
                        </button>
                    </div>
                    
                    <div style="position: relative; max-width: 940px; margin: 0 auto;">
                        <button id="prev-btn" style="position: absolute; left: -20px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: white; border: 1px solid #ddd; border-radius: 50%; cursor: pointer; z-index: 10; font-size: 20px; display: flex; align-items: center; justify-content: center;">
                            ‹
                        </button>
                        
                        <button id="next-btn" style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: white; border: 1px solid #ddd; border-radius: 50%; cursor: pointer; z-index: 10; font-size: 20px; display: flex; align-items: center; justify-content: center;">
                            ›
                        </button>
                        
                        <div style="overflow: hidden; margin: 0 20px;">
                            <div id="track" style="display: flex; gap: 20px; transition: transform 0.3s ease; transform: translateX(0px);">
                                ${cardsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.parent.innerHTML = html;
        
        // Сохраняем текущий индекс и применяем его после рендера
        setTimeout(() => {
            this.initCarousel();
            this.initButtons();
        }, 0);
    }

    initCarousel() {
    const track = document.getElementById('track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const cardWidth = 220;
    const visibleCards = 4;
    const totalCards = track.children.length;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    if (this.currentIndex > maxIndex) {
        this.currentIndex = maxIndex;
    }
    
    track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
    
    if (totalCards <= visibleCards) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
    
    // Просто убираем все предыдущие обработчики
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
        // Кнопка добавления
        const addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.onclick = () => this.addCard();
        }

        // Кнопки подробнее
        document.querySelectorAll('.detail-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.clickCard(id);
            };
        });

        // Кнопки удаления
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.deleteCard(id);
            };
        });
    }
}