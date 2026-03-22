// utils/mathUtils.js

/**
 * Проверка строки на палиндром (без учёта регистра и пробелов)
 * Использует цикл do...while для демонстрации
 * @param {string} str - проверяемая строка
 * @returns {boolean}
 */
export function weatherIsPalindrome(str) {
    if (typeof str !== 'string') return false;
    const cleaned = str.replace(/\s/g, '').toLowerCase();
    let left = 0;
    let right = cleaned.length - 1;
    do {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    } while (left < right);
    return true;
}
/**export function isPalindrome2(stroka) {
    const s = String(stroka).toLowerCase();
    const reversed = s.split('').reverse().join('');
    return s === reversed;
}

export function isPalindrome3(stroka) {
    const s = String(stroka).toLowerCase();
    const charMap = {}; // Используем объект для хранения пар символов для сравнения
    const length = s.length;
    for (let i = 0; i < Math.floor(length / 2); i++) {
        charMap[i] = {
            left: s[i],
            right: s[length - 1 - i]
        };
    }
    const bad_smbl = new Set(); // Используем коллекцию Set для хранения несовпадающих позиций
    for (let key in charMap) {
        if (charMap[key].left !== charMap[key].right) {
            bad_smbl.add(key);
        }
    }
    return bad_smbl.size === 0;
} */

    
/**
 * Суммирует элементы главной и побочной диагоналей квадратной матрицы
 * Центральный элемент учитывается один раз
 * @param {number[][]} matrix - квадратная матрица чисел
 * @returns {number} общая сумма диагоналей
 * @throws {Error} если матрица некорректна
 */
export function weatherSumDiagonals(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) {
        throw new Error('Матрица не может быть пустой');
    }
    const n = matrix.length;
    // Проверка квадратности и числовых значений
    for (let i = 0; i < n; i++) {
        if (!Array.isArray(matrix[i]) || matrix[i].length !== n) {
            throw new Error('Матрица должна быть квадратной');
        }
        for (let j = 0; j < n; j++) {
            if (typeof matrix[i][j] !== 'number' || isNaN(matrix[i][j])) {
                throw new Error(`Элемент [${i}][${j}] не является числом`);
            }
        }
    }

    let total = 0;
    let i = 0;
    do {
        total += matrix[i][i];                       // главная диагональ
        const secondaryIdx = n - 1 - i;
        if (secondaryIdx !== i) {                    // не дублируем центр
            total += matrix[i][secondaryIdx];
        }
        i++;
    } while (i < n);

    return total;
}