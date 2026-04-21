// modules/ajax.js
// Замена XMLHttpRequest на fetch с промисами

class Ajax {
    // GET запрос
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            console.error('GET request failed:', error);
            return { data: null, status: 500, error: error.message };
        }
    }

    // POST запрос
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            let responseData = null;
            try {
                responseData = await response.json();
            } catch (e) {
                // Если ответ не JSON
            }
            
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('POST request failed:', error);
            return { data: null, status: 500, error: error.message };
        }
    }

    // PATCH запрос
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            let responseData = null;
            try {
                responseData = await response.json();
            } catch (e) {}
            
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('PATCH request failed:', error);
            return { data: null, status: 500, error: error.message };
        }
    }

    // DELETE запрос
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            return { data: null, status: response.status };
        } catch (error) {
            console.error('DELETE request failed:', error);
            return { data: null, status: 500, error: error.message };
        }
    }
}

export const ajax = new Ajax();