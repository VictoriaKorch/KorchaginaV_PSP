export class WeatherCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Только цвет для выходных
        const dayColor = (data.day === "Сб" || data.day === "Вс") ? '#ff4444' : '#333';
        
        return (
            `
            <div class="weather-card" style="width: 200px; margin: 0; background: white; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0; position: relative;">
                <div class="card-body text-center" style="padding: 16px;">
                    <h5 class="card-title" style="font-weight: 600; font-size: 1.1rem; margin-bottom: 4px; color: ${dayColor};">${data.day}</h5>
                    <div style="font-size: 0.85rem; color: #999; margin-bottom: 12px;">${data.date}</div>
                    
                    <div style="font-size: 2.5rem; line-height: 1; margin: 8px 0;">${data.icon}</div>
                    
                    <div style="font-size: 1.8rem; font-weight: 500; margin: 8px 0; color: #333;">${data.temp}</div>
                    
                    <div style="font-size: 0.8rem; color: #999; margin-bottom: 12px;">Ощущается: ${data.feelsLike}</div>
                    
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        <!-- Кнопка подробнее -->
                        <button class="btn" id="click-card-${data.id}" data-id="${data.id}" 
                                style="border-radius: 20px; padding: 4px 12px; font-size: 0.85rem; background: #f8f9fa; color: #333; border: 1px solid #e0e0e0; min-width: 90px;">
                            Подробнее
                        </button>
                        
                        <!-- Кнопка удаления (урна) -->
                        <button class="btn delete-card" data-id="${data.id}" 
                                style="border-radius: 50%; width: 32px; height: 32px; padding: 0; background: #f8f9fa; color: #666; border: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
            `
        );
    }

    addListeners(data, listener, deleteListener) {
        // Обработчик для кнопки "Подробнее"
        setTimeout(() => {
            const detailButton = document.getElementById(`click-card-${data.id}`);
            if (detailButton) {
                detailButton.addEventListener("click", listener);
            }
            
            // Обработчик для кнопки удаления
            const deleteButton = document.querySelector(`.delete-card[data-id="${data.id}"]`);
            if (deleteButton && deleteListener) {
                deleteButton.addEventListener("click", (e) => {
                    e.stopPropagation(); // Предотвращаем всплытие события
                    deleteListener(data.id);
                });
            }
        }, 0);
    }

    render(data, listener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener, deleteListener);
    }
}