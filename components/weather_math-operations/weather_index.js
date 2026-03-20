// components/math-operations/weather_index.js
import { weatherIsPalindrome, weatherSumDiagonals } from '../../weather_utils/weather_mathUtils.js';

export class MathOperationsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="math-operations mt-5">
                <h3 class="text-center mb-4">Метеорологические вычисления</h3>
                <div class="row">
                    <!-- Проверка палиндрома -->
                    <div class="col-md-6 mb-4">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">Проверка палиндрома</h5>
                                <p class="card-text">Введите название города, дату или любую строку:</p>
                                <input type="text" id="palindrome-input" class="form-control mb-2" placeholder="Например: Шалаш">
                                <button id="check-palindrome" class="btn btn-secondary">Проверить</button>
                                <div id="palindrome-result" class="mt-2 alert alert-info d-none"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Сумма диагоналей матрицы -->
                    <div class="col-md-6 mb-4">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">Сумма диагоналей температурной матрицы</h5>
                                <p class="card-text">Введите квадратную матрицу в формате JSON. 
                                Пример: <code>[[7,5,3],[2,6,4],[8,1,9]]</code></p>
                                <textarea id="matrix-input" rows="4" class="form-control mb-2" 
                                    placeholder='[[7,5,3],[2,6,4],[8,1,9]]'></textarea>
                                <button id="calculate-diagonals" class="btn btn-secondary">Вычислить общую сумму</button>
                                <div id="matrix-result" class="mt-2 alert alert-info d-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Палиндром
        const palindromeInput = document.getElementById('palindrome-input');
        const checkBtn = document.getElementById('check-palindrome');
        const palindromeResult = document.getElementById('palindrome-result');

        checkBtn.addEventListener('click', () => {
            const str = palindromeInput.value.trim();
            if (!str) {
                this.showResult(palindromeResult, 'Пожалуйста, введите строку.', 'warning');
                return;
            }
            const isPal = weatherIsPalindrome(str);
            const message = isPal ? `"${str}" — палиндром.` : `"${str}" — не палиндром.`;
            this.showResult(palindromeResult, message, isPal ? 'success' : 'danger');
        });

        // Матрица
        const matrixInput = document.getElementById('matrix-input');
        const calcBtn = document.getElementById('calculate-diagonals');
        const matrixResult = document.getElementById('matrix-result');

        calcBtn.addEventListener('click', () => {
            const raw = matrixInput.value.trim();
            if (!raw) {
                this.showResult(matrixResult, 'Введите матрицу в формате JSON.', 'warning');
                return;
            }

            try {
                const parsed = JSON.parse(raw);
                if (!Array.isArray(parsed)) throw new Error('Не массив');
                const total = weatherSumDiagonals(parsed);
                this.showResult(matrixResult, `Общая сумма диагоналей: ${total}`, 'success');
            } catch (err) {
                let msg = 'Ошибка: ';
                if (err.message.includes('квадратной')) msg += err.message;
                else if (err.message.includes('числом')) msg += err.message;
                else msg += 'Некорректный JSON или матрица не квадратная.';
                this.showResult(matrixResult, msg, 'danger');
            }
        });
    }

    showResult(element, message, type) {
        element.textContent = message;
        element.classList.remove('d-none', 'alert-info', 'alert-success', 'alert-danger', 'alert-warning');
        element.classList.add(`alert-${type}`);
        element.classList.remove('d-none');
    }
}