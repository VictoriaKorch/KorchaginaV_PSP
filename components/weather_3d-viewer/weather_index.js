import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getModelConfig } from '../../weather_utils/weather_modelConfig.js';

export class Weather3DViewer {
    constructor(container, weatherType) {
        this.container = container;
        this.weatherType = weatherType;
        this.animationId = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.controls = null;
        this.init();
    }

    init() {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        this.container.appendChild(canvas);

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(width, height, false);
        this.renderer.setClearColor(0xe6ebf5);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.camera.position.set(0, 1.5, 4);

        this.controls = new OrbitControls(this.camera, canvas);
        this.controls.enableDamping = true;
        this.controls.target.set(0, 1, 0);
        this.controls.enableZoom = true;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(4, 10, 8);
        this.scene.add(dirLight);

        const config = getModelConfig(this.weatherType);
        const loader = new GLTFLoader();

        const normalizeModel = (obj) => {
            const box = new THREE.Box3().setFromObject(obj);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            obj.position.x -= center.x;
            obj.position.z -= center.z;
            obj.position.y -= center.y;
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) obj.scale.multiplyScalar(1.2 / maxDim);
        };

        if (config.type === 'single') {
            loader.load(config.files[0], gltf => {
                const model = gltf.scene;
                normalizeModel(model);
                this.scene.add(model);
            }, undefined, err => console.warn('Ошибка загрузки модели', err));
        } else if (config.type === 'double') {
            const gap = 1.2;
            config.files.forEach((file, idx) => {
                loader.load(file, gltf => {
                    const model = gltf.scene;
                    normalizeModel(model);
                    model.position.x = idx === 0 ? -gap : gap;
                    this.scene.add(model);
                });
            });
        }

        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };
        animate();

        const handleResize = () => {
            const newWidth = this.container.clientWidth;
            const newHeight = this.container.clientHeight;
            this.renderer.setSize(newWidth, newHeight, false);
            this.camera.aspect = newWidth / newHeight;
            this.camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);
        this.resizeHandler = handleResize;
    }

    zoomIn() {
        const vec = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
        this.camera.position.addScaledVector(vec, -0.5);
        this.controls.update();
    }

    zoomOut() {
        const vec = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
        this.camera.position.addScaledVector(vec, 0.5);
        this.controls.update();
    }

    setView(direction) {
        const distance = this.camera.position.distanceTo(this.controls.target);
        let x = 0, z = 0;
        switch (direction) {
            case 'front': x = 0; z = distance; break;
            case 'back': x = 0; z = -distance; break;
            case 'left': x = -distance; z = 0; break;
            case 'right': x = distance; z = 0; break;
            default: return;
        }
        this.camera.position.set(x, 1.5, z);
        this.controls.target.set(0, 1, 0);
        this.controls.update();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.container.innerHTML = '';
    }
}