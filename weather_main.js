import { MainPage } from "./pages/weather_main/weather_index.js";

const root = document.getElementById('root');

const mainPage = new MainPage(root);
mainPage.render();