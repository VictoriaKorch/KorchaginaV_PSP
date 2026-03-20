export class WeatherCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const dayClass = (data.day === "Сб" || data.day === "Вс") ? 'weekend-day' : 'weekday-day';
        
        return (
            `
            <div class="weather-card shadow-sm" data-id="${data.id}">
                <div class="card-body text-center">
                    <h5 class="${dayClass}">${data.day}</h5>
                    <div class="weather-date">${data.date}</div>
                    
                    <div class="weather-icon">${data.icon}</div>
                    
                    <div class="weather-temp">${data.tempDisplay}</div>
                    
                    <div class="weather-feels">Ощущается: ${data.feels}</div>
                    
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-detail" data-id="${data.id}">
                            Подробнее
                        </button>
                        
                        <button class="btn btn-delete" data-id="${data.id}">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
            `
        );
    }

    addListeners(data, listener, deleteListener) {
        setTimeout(() => {
            const detailButton = document.querySelector(`.btn-detail[data-id="${data.id}"]`);
            if (detailButton) {
                detailButton.addEventListener("click", listener);
            }
            
            const deleteButton = document.querySelector(`.btn-delete[data-id="${data.id}"]`);
            if (deleteButton && deleteListener) {
                deleteButton.addEventListener("click", (e) => {
                    e.stopPropagation();
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