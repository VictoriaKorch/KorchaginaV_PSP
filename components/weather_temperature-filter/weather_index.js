export class TemperatureFilterComponent {
    constructor(parent) {
        this.parent = parent;
        this.onFilter = null;
        this.minInput = null;
        this.maxInput = null;
    }

    getHTML() {
    return `
        <div class="temperature-filter mb-4">
            <div class="row g-2 justify-content-center">
                <div class="col-auto">
                    <input type="number" id="filter-min" class="form-control" placeholder="от °C" style="width: 100px;">
                </div>
                <div class="col-auto">
                    <input type="number" id="filter-max" class="form-control" placeholder="до °C" style="width: 100px;">
                </div>
                <div class="col-auto">
                    <button id="filter-apply" class="btn btn-secondary">Применить</button>
                </div>
                <div class="col-auto">
                    <button id="filter-reset" class="btn btn-secondary">Сбросить</button>
                </div>
            </div>
        </div>
    `;
}
setValues(min, max) {
    this.minInput.value = min !== null ? min : '';
    this.maxInput.value = max !== null ? max : '';
}
    render(onFilter) {
        this.onFilter = onFilter;
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.minInput = document.getElementById('filter-min');
        this.maxInput = document.getElementById('filter-max');
        const applyBtn = document.getElementById('filter-apply');
        const resetBtn = document.getElementById('filter-reset');

        applyBtn.addEventListener('click', () => {
    const min = this.minInput.value === '' ? null : parseInt(this.minInput.value);
    const max = this.maxInput.value === '' ? null : parseInt(this.maxInput.value);
    window.weatherFilterState = { min, max }; // сохраняем состояние
    if (this.onFilter) this.onFilter(min, max);
});

        resetBtn.addEventListener('click', () => {
    this.minInput.value = '';
    this.maxInput.value = '';
    window.weatherFilterState = { min: null, max: null }; // очищаем состояние
    if (this.onFilter) this.onFilter(null, null);
});
    }
}