import { MetParamIsPalindrome, MetParamSumDiagonals } from '../../MetParam_utils/MetParam_mathUtils.js';

export class MetParamCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const palindromeValue = String(data.palindromeValue);
        const isPalindrome = MetParamIsPalindrome(palindromeValue);
        const diagonalSum = MetParamSumDiagonals(data.matrix);
        
        return (
            `
            <div class="metparam-card shadow-sm" data-id="${data.id}">
                <div class="card-body text-center">
                    <div class="card-padding-top"></div>
                    <h5 class="param-name">${data.name}</h5>
                    
                    <div class="param-icon-wrapper">
                        <div class="param-icon">${data.icon}</div>
                    </div>
                    
                    <div class="param-value">${data.value}${data.unit}</div>
                    
                    <div class="param-description">${data.description || ''}</div>
                    
                    <div class="math-results">
                        <div class="math-item">
                            <span class="math-label">Значение - палиндром:</span>
                            <span class="math-result-value">${isPalindrome ? 'Да' : 'Нет'}</span>
                        </div>
                        <div class="math-item">
                            <span class="math-label">Σ диагоналей матрицы значений:</span>
                            <span class="math-result-value">${diagonalSum}</span>
                        </div>
                    </div>
                    
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