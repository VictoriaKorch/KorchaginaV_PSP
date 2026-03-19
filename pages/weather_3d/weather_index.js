import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BackButtonComponent } from "../../components/weather_back-button/weather_index.js";
import { DayPage } from "../day/weather_index.js";

export class Weather3DPage {
    constructor(parent, dayId) {
        this.parent = parent;
        this.dayId = dayId;
        // Данные о дне можно получить через DayPage, но проще передать или получить из хранилища
        // Для простоты будем использовать те же данные, что и в DayPage, но нужно где-то хранить соответствие id и погоды.
        // Можно передать weatherType при создании страницы, но у нас есть только id.
        // Решение: создать словарь соответствия id -> weatherType (или загружать данные из того же источника)
        this.weatherData = this.getWeatherDataForId(dayId);
    }

    // Временная функция, позже можно заменить на получение данных из общего хранилища
    getWeatherDataForId(id) {
        const map = {
            1: { weather: "Переменная облачность", temp: "+7°", feels: "+5°", day: "Понедельник", date: "23 марта 2026" },
            2: { weather: "Переменная облачность", temp: "+3°", feels: "+1°", day: "Вторник", date: "24 марта 2026" },
            3: { weather: "Переменная облачность", temp: "+1°", feels: "+1°", day: "Среда", date: "25 марта 2026" },
            4: { weather: "Пасмурно", temp: "+2°", feels: "0°", day: "Четверг", date: "26 марта 2026" },
            5: { weather: "Переменная облачность", temp: "+2°", feels: "0°", day: "Пятница", date: "27 марта 2026" },
            6: { weather: "Переменная облачность", temp: "+3°", feels: "+1°", day: "Суббота", date: "28 марта 2026" },
            7: { weather: "Переменная облачность", temp: "+3°", feels: "+1°", day: "Воскресенье", date: "29 марта 2026" },
        };
        return map[id] || map[1];
    }

    getModelConfig(weatherType) {
        const configs = {
            "Ясно": { type: 'single', files: ['weather_models/Sun.glb'] },
            "Переменная облачность": { type: 'double', files: ['weather_models/Sun.glb', 'weather_models/Clouds.glb'] },
            "Пасмурно": { type: 'single', files: ['weather_models/Clouds.glb'] },
            "Гроза": { type: 'single', files: ['weather_models/Lightning bolt.glb'] },
        };
        return configs[weatherType] || { type: 'single', files: ['weather_models/Clouds.glb'] };
    }

    getHTML() {
        return `
            <div class="weather-3d-page" style="min-height: 100vh; background: #f8f9fa; padding: 20px;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <div id="back-button-container" style="margin-bottom: 20px;"></div>
                    <div id="3d-viewer-container" style="position: relative;">
                        <canvas id="viewer-canvas" style="width: 100%; height: 70vh; background: #e6ebf5; border-radius: 16px;"></canvas>
                        <div id="viewer-controls" style="display: flex; gap: 12px; align-items: center; margin-top: 20px; justify-content: center;">
                            <button id="zoom-in" class="btn btn-light" style="border-radius: 50%; width: 40px; height: 40px;">+</button>
                            <button id="zoom-out" class="btn btn-light" style="border-radius: 50%; width: 40px; height: 40px;">−</button>
                            <button id="view-front" class="btn btn-light">Вид спереди</button>
                            <button id="view-back" class="btn btn-light">Сзади</button>
                            <button id="view-left" class="btn btn-light">Слева</button>
                            <button id="view-right" class="btn btn-light">Справа</button>
                        </div>
                        <div id="weather-info" style="margin-top: 20px; text-align: center;">
                            <h3>${this.weatherData.day}</h3>
                            <p>${this.weatherData.date} • ${this.weatherData.temp} • ощущается ${this.weatherData.feels}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Кнопка назад
        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(() => this.clickBack());

        // Инициализация 3D
        this.init3DViewer();
        this.initControls();
    }

    init3DViewer() {
        const canvas = document.getElementById('viewer-canvas');
        const config = this.getModelConfig(this.weatherData.weather);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        renderer.setClearColor(0xe6ebf5);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0, 1, 0);

        // Освещение
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
        dirLight.position.set(4, 10, 8);
        scene.add(dirLight);

        const loader = new GLTFLoader();
        const normalizeModel = (obj) => {
            const box = new THREE.Box3().setFromObject(obj);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            obj.position.x -= center.x;
            obj.position.z -= center.z;
            obj.position.y -= center.y;
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) obj.scale.multiplyScalar(1.5 / maxDim);
        };

        if (config.type === 'single') {
            loader.load(config.files[0], gltf => {
                const model = gltf.scene;
                normalizeModel(model);
                scene.add(model);
            });
        } else if (config.type === 'double') {
            const gap = 1.8;
            config.files.forEach((file, idx) => {
                loader.load(file, gltf => {
                    const model = gltf.scene;
                    normalizeModel(model);
                    model.position.x = idx === 0 ? -gap : gap;
                    scene.add(model);
                });
            });
        }

        // Кнопки управления камерой
        const distance = () => camera.position.distanceTo(controls.target);
        const setCameraDirection = (dir) => {
            const d = distance();
            let x = 0, y = 2, z = 0;
            if (dir === "front")  { x = 0; z = d; }
            if (dir === "back")   { x = 0; z = -d; }
            if (dir === "left")   { x = -d; z = 0; }
            if (dir === "right")  { x = d; z = 0; }
            camera.position.set(x, y, z);
            controls.target.set(0, 1, 0);
            controls.update();
        };

        document.getElementById('zoom-in').onclick = () => {
            const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
            camera.position.addScaledVector(vec, -0.5);
            controls.update();
        };
        document.getElementById('zoom-out').onclick = () => {
            const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
            camera.position.addScaledVector(vec, 0.5);
            controls.update();
        };
        document.getElementById('view-front').onclick = () => setCameraDirection('front');
        document.getElementById('view-back').onclick = () => setCameraDirection('back');
        document.getElementById('view-left').onclick = () => setCameraDirection('left');
        document.getElementById('view-right').onclick = () => setCameraDirection('right');

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }

    initControls() {
        // Дополнительные обработчики, если нужно
    }

    clickBack() {
        const dayPage = new DayPage(this.parent, this.dayId);
        dayPage.render();
    }
}