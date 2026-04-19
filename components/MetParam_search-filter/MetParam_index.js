export class SearchFilterComponent {
    constructor(parent) {
        this.parent = parent;
        this.onFilter = null;
        this.searchInput = null;
    }

    getHTML() {
        return `
            <div class="search-filter mb-3">
                <div class="row g-2 justify-content-center">
                    <div class="col-auto">
                        <input type="text" id="filter-search" class="form-control" placeholder="Поиск по названию" style="width: 250px;">
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

    setValue(value) {
        this.searchInput.value = value !== null ? value : '';
    }

    render(onFilter) {
        this.onFilter = onFilter;
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.searchInput = document.getElementById('filter-search');
        const applyBtn = document.getElementById('filter-apply');
        const resetBtn = document.getElementById('filter-reset');

        applyBtn.addEventListener('click', () => {
            const searchText = this.searchInput.value;
            window.searchFilterState = { searchText };
            if (this.onFilter) this.onFilter(searchText);
        });

        resetBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            window.searchFilterState = { searchText: '' };
            if (this.onFilter) this.onFilter('');
        });
    }
}