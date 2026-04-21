class MetParamUrls {
    constructor() {
        // Пустая строка = относительные пути
        this.baseUrl = '';
    }

    getMetParams() {
        return '/api/metparams';
    }

    getMetParamById(id) {
        return `/api/metparams/${id}`;
    }

    createMetParam() {
        return '/api/metparams';
    }

    updateMetParamById(id) {
        return `/api/metparams/${id}`;
    }

    deleteMetParamById(id) {
        return `/api/metparams/${id}`;
    }
}

export const metParamUrls = new MetParamUrls();