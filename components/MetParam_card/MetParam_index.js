export class MetParamCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="weather-card shadow-sm" data-id="${data.id}">
                <div class="card-body text-center">
                    <div class="card-padding-top"></div>
                    <h5 class="weekday-day">${data.name}</h5>
                    
                    <div class="weather-icon-wrapper">
                        <div class="weather-icon">${data.icon}</div>
                    </div>
                    
                    <div class="weather-value">${data.value}${data.unit}</div>
                    
                    <div class="weather-feels">${data.description || ''}</div>
                    
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-detail" data-id="${data.id}">
                            Подробнее
                        </button>
                        
                        <button class="btn btn-delete" data-id="${data.id}">
                            🗑️
                        </button>
                    </div>
                    <div class="card-padding-bottom"></div>
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