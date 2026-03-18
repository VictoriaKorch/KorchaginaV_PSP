import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        return {
            id: this.id,
            src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
            title: `Акция ${this.id}`,
            text: "Такой акции вы еще не видели"
        };
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
            <div id="product-page">
                <div class="d-flex flex-column align-items-start">
                    <div class="mb-3" id="back-button-container"></div>
                    <div id="product-content"></div>
                </div>
            </div>
            `
        );
    }

    clickBack() {
        console.log("Нажата кнопка Назад");
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        // Очищаем страницу
        this.parent.innerHTML = '';
        
        // Вставляем контейнер для страницы продукта
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Создаем и рендерим кнопку "Назад" в специальном контейнере
        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));
        
        // Получаем данные и рендерим компонент продукта
        const data = this.getData();
        const productContent = document.getElementById('product-content');
        const product = new ProductComponent(productContent);
        product.render(data);
    }
}