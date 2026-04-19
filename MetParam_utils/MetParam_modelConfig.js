export function getModelConfig(weatherType) {
    const configs = {
        "Ясно": { type: 'single', files: ['MetParam_models/Sun.glb'] },
        "Переменная облачность": { type: 'double', files: ['MetParam_models/Sun.glb', 'MetParam_models/Clouds.glb'] },
        "Пасмурно": { type: 'single', files: ['MetParam_models/Clouds.glb'] },
        "Гроза": { type: 'single', files: ['MetParam_models/Lightning bolt.glb'] },
    };
    return configs[weatherType] || { type: 'single', files: ['MetParam_models/Clouds.glb'] };
}