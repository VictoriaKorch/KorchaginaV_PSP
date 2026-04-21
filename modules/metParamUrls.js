class MetParamUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getMetParams() {
        return `${this.baseUrl}/api/metparams`;
    }

    getMetParamById(id) {
        return `${this.baseUrl}/api/metparams/${id}`;
    }

    createMetParam() {
        return `${this.baseUrl}/api/metparams`;
    }

    updateMetParamById(id) {
        return `${this.baseUrl}/api/metparams/${id}`;
    }

    deleteMetParamById(id) {
        return `${this.baseUrl}/api/metparams/${id}`;
    }
}

export const metParamUrls = new MetParamUrls();