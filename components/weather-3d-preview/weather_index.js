import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Weather3DPreview {
    constructor(parent, weatherType, width = 200, height = 200) {
        this.parent = parent;
        this.weatherType = weatherType; // строка из data.weather (например, "Переменная облачность")
        this.width = width;
        this.height = height;
        this.canvas = null;
    }

    // Определяем, какие модели загружать по типу погоды
    getModelConfig() {
        const configs = {
            "Ясно": { type: 'single', files: ['weather_models/Sun.glb'] },
            "Переменная облачность": { type: 'double', files: ['weather_models/Sun.glb', 'weather_models/Clouds.glb'] },
            "Пасмурно": { type: 'single', files: ['weather_models/Clouds.glb'] },
            "Гроза": { type: 'single', files: ['weather_models/Lightning bolt.glb'] },
            // Добавьте другие соответствия при необходимости
        };
        return configs[this.weatherType] || { type: 'single', files: ['weather_models/Clouds.glb'] }; // fallback
    }

    render() {
        // Создаём canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';
        this.canvas.style.borderRadius = '12px';
        this.canvas.style.cursor = 'pointer';
        this.canvas.className = 'weather-3d-preview';
        this.parent.appendChild(this.canvas);

        this.initThree();
    }

    initThree() {
        const config = this.getModelConfig();

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
        renderer.setClearColor(0xe6ebf5, 1); // тот же фон, что в галерее
        renderer.setSize(this.width, this.height, false);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
        camera.position.set(0, 0.1, 2);

        // Освещение
        scene.add(new THREE.AmbientLight(0xffffff, 1));
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(2, 6, 4);
        scene.add(light);

        const loader = new GLTFLoader();

        // Функция для приведения модели к полу и масштабирования
        const normalizeModel = (obj) => {
            const box = new THREE.Box3().setFromObject(obj);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            obj.position.x -= center.x;
            obj.position.z -= center.z;
            obj.position.y -= center.y;
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) obj.scale.multiplyScalar(1.1 / maxDim);
        };

        if (config.type === 'single') {
            loader.load(config.files[0], gltf => {
                const model = gltf.scene;
                normalizeModel(model);
                scene.add(model);
                renderer.render(scene, camera);
            }, undefined, err => {
                console.warn('Ошибка загрузки модели', err);
                this.drawFallback();
            });
        } else if (config.type === 'double') {
            const gap = 0.6;
            let loaded = 0;
            config.files.forEach((file, idx) => {
                loader.load(file, gltf => {
                    const model = gltf.scene;
                    normalizeModel(model);
                    model.position.x = idx === 0 ? -gap : gap;
                    scene.add(model);
                    loaded++;
                    if (loaded === 2) renderer.render(scene, camera);
                }, undefined, err => {
                    loaded++;
                    if (loaded === 2) renderer.render(scene, camera);
                });
            });
        }
    }

    drawFallback() {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = "#dde6f2";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.font = "56px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#666";
        ctx.fillText("🧩", this.width / 2, this.height / 2);
    }
}