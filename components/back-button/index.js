export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener);
    }

    getHTML() {
        return (
            `
            <button id="back-button" class="btn" type="button" 
                    style="background: white; border: 1px solid #e0e0e0; border-radius: 30px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; padding: 0; font-size: 1.5rem; color: #333;">
                ←
            </button>
            `
        );
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}