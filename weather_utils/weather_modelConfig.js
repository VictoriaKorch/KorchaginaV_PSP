export function getModelConfig(weatherType) {
    const configs = {
        "Ясно": { type: 'single', files: ['weather_models/Sun.glb'] },
        "Переменная облачность": { type: 'double', files: ['weather_models/Sun.glb', 'weather_models/Clouds.glb'] },
        "Пасмурно": { type: 'single', files: ['weather_models/Clouds.glb'] },
        "Гроза": { type: 'single', files: ['weather_models/Lightning bolt.glb'] },
    };
    return configs[weatherType] || { type: 'single', files: ['weather_models/Clouds.glb'] };
}