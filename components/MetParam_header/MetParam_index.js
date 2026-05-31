export class HeaderComponent {
    constructor(parent, onHomeClick) {
        this.parent = parent;
        this.onHomeClick = onHomeClick;
    }

    getHTML() {
        return `
            <header class="metparam-header" style="
                background: #f8f9fa;
                padding: 16px 20px;
                border-bottom: 1px solid #e0e0e0;
                position: sticky;
                top: 0;
                z-index: 100;
            ">
                <div class="container" style="max-width: 1200px; margin: 0 auto;">
                    <button id="metparam-home-button" style="
                        background: none;
                        color: #000000;
                        border: none;
                        padding: 0;
                        cursor: pointer;
                        font-size: 1.8rem;
                        font-weight: 500;
                        font-family: inherit;
                    ">
                        Метеопараметры
                    </button>
                </div>
            </header>
        `;
    }

    addListeners() {
        const button = document.getElementById("metparam-home-button");
        if (button && this.onHomeClick) {
            button.addEventListener("click", this.onHomeClick);
        }
    }

    render() {
        this.parent.insertAdjacentHTML('afterbegin', this.getHTML());
        this.addListeners();
    }
}