export class CameraControls {
    constructor(container, viewer) {
        this.container = container;
        this.viewer = viewer;
        this.buttons = {};
    }

    render() {
        this.container.innerHTML = `
            <div style="display: flex; gap: 12px; justify-content: center; margin-top: 20px; flex-wrap: wrap;">
                <button id="zoom-in" class="btn btn-light" style="border-radius: 30px; padding: 6px 12px; cursor: pointer;">+ Приблизить</button>
                <button id="zoom-out" class="btn btn-light" style="border-radius: 30px; padding: 6px 12px; cursor: pointer;">− Отдалить</button>
                <button id="view-front" class="btn btn-light" style="border-radius: 30px; padding: 6px 12px; cursor: pointer;">Спереди</button>
                <button id="view-back" class="btn btn-light" style="border-radius: 30px; padding: 6px 12px; cursor: pointer;">Сзади</button>
                <button id="view-left" class="btn btn-light" style="border-radius: 30px; padding: 6px 12px; cursor: pointer;">Слева</button>
                <button id="view-right" class="btn btn-light" style="border-radius: 30px; padding: 6px 12px; cursor: pointer;">Справа</button>
            </div>
        `;

        this.buttons.zoomIn = document.getElementById('zoom-in');
        this.buttons.zoomOut = document.getElementById('zoom-out');
        this.buttons.front = document.getElementById('view-front');
        this.buttons.back = document.getElementById('view-back');
        this.buttons.left = document.getElementById('view-left');
        this.buttons.right = document.getElementById('view-right');

        this.buttons.zoomIn?.addEventListener('click', () => this.viewer.zoomIn());
        this.buttons.zoomOut?.addEventListener('click', () => this.viewer.zoomOut());
        this.buttons.front?.addEventListener('click', () => this.viewer.setView('front'));
        this.buttons.back?.addEventListener('click', () => this.viewer.setView('back'));
        this.buttons.left?.addEventListener('click', () => this.viewer.setView('left'));
        this.buttons.right?.addEventListener('click', () => this.viewer.setView('right'));
    }

    destroy() {
        // Обработчики удаляются вместе с DOM, ничего дополнительного не требуется
    }
}