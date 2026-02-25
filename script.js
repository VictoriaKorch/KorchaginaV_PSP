window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция
    let isBackgroundChanged = false // Флаг для смены фона
    // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")
    const calculatorContainer = document.querySelector(".calculator-container")

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')


    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5', 
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }
    // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
    digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }
    // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    // Операция смены знака +/-
    document.getElementById("btn_op_sign").onclick = function() { 
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) * -1).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) * -1).toString();
                outputElement.innerHTML = b;
            }
        }
    }
    
    // Операция вычисления процента %
    document.getElementById("btn_op_percent").onclick = function() { 
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                outputElement.innerHTML = b;
            }
        }
    }
    
    // Кнопка стирания последнего символа (Backspace)
    document.getElementById("btn_op_backspace").onclick = function() { 
        if (!selectedOperation) {
            if (a.length > 0) {
                a = a.slice(0, -1);
                outputElement.innerHTML = a || '0';
            }
        } else {
            if (b.length > 0) {
                b = b.slice(0, -1);
                outputElement.innerHTML = b || '0';
            }
        }
    }
    
    
    document.getElementById("btn_op_bgcolor").onclick = function() { 
        const calculatorContainer = document.querySelector(".calculator-container");
        calculatorContainer.classList.toggle("bg-alternate");
    }
    // Смена цвета фона экрана
    document.getElementById("btn_op_screen_color").onclick = function() { 
        const screenElement = document.getElementById("result");
        screenElement.classList.toggle("bg-alternate");
    }
    // Вычисление квадратного корня √
    document.getElementById("btn_op_sqrt").onclick = function() { 
        let currentValue;
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
        
        if (currentValue !== '') {
            let num = parseFloat(currentValue);
            if (num >= 0) {
                let result = Math.sqrt(num).toString();
                if (!selectedOperation) {
                    a = result;
                } else {
                    b = result;
                }
                outputElement.innerHTML = result;
            }
        }
    }
    
    // Возведение в квадрат x²
    document.getElementById("btn_op_square").onclick = function() { 
        let currentValue;
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
        
        if (currentValue !== '') {
            let num = parseFloat(currentValue);
            let result = (num * num).toString();
            if (!selectedOperation) {
                a = result;
            } else {
                b = result;
            }
            outputElement.innerHTML = result;
        }
    }
    
    // Вычисление факториала x!
    document.getElementById("btn_op_factorial").onclick = function() { 
        let currentValue;
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
        
        if (currentValue !== '') {
            let num = parseInt(currentValue);
            if (num >= 0 && Number.isInteger(parseFloat(currentValue))) {
                let result = 1;
                for (let i = 2; i <= num; i++) {
                    result *= i;
                }
                result = result.toString();
                if (!selectedOperation) {
                    a = result;
                } else {
                    b = result;
                }
                outputElement.innerHTML = result;
            }
        }
    }
    
    // Кнопка добавления трех нулей (000)
    document.getElementById("btn_digit_triplezero").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') a = '0';
            a += '000';
            outputElement.innerHTML = a;
        } else {
            if (b === '') b = '0';
            b += '000';
            outputElement.innerHTML = b;
        }
    }
    // НАКАПЛИВАЕМОЕ СЛОЖЕНИЕ (M+)
    document.getElementById("btn_op_mplus").onclick = function() {
        let currentValue;
        
        // Определяем текущее значение на экране
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
        
        // Если есть значение, добавляем его к накопленному
        if (currentValue !== '') {
            accumulatedValue += parseFloat(currentValue);
        } else if (expressionResult !== '') {
            // Если нет текущего ввода, но есть результат вычисления
            accumulatedValue += parseFloat(expressionResult);
        } else if (a !== '') {
            accumulatedValue += parseFloat(a);
        }
        
        // Показываем накопленное значение на экране
        outputElement.innerHTML = accumulatedValue.toString();
        
        // Сбрасываем операцию, чтобы можно было продолжать ввод
        a = accumulatedValue.toString();
        b = '';
        selectedOperation = null;
    }
    
    // НАКАПЛИВАЕМОЕ ВЫЧИТАНИЕ (M-)
    document.getElementById("btn_op_mminus").onclick = function() {
        let currentValue;
        
        // Определяем текущее значение на экране
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
        
        // Если есть значение, вычитаем его из накопленного
        if (currentValue !== '') {
            accumulatedValue -= parseFloat(currentValue);
        } else if (expressionResult !== '') {
            // Если нет текущего ввода, но есть результат вычисления
            accumulatedValue -= parseFloat(expressionResult);
        } else if (a !== '') {
            accumulatedValue -= parseFloat(a);
        }
        
        // Показываем накопленное значение на экране
        outputElement.innerHTML = accumulatedValue.toString();
        
        // Сбрасываем операцию, чтобы можно было продолжать ввод
        a = accumulatedValue.toString();
        b = '';
        selectedOperation = null;
    }
    
    // ОЧИСТКА НАКОПЛЕННОГО ЗНАЧЕНИЯ (MC)
    document.getElementById("btn_op_mclear").onclick = function() {
        accumulatedValue = 0;
        outputElement.innerHTML = a || '0';
    }
    
    // ВЫЗОВ НАКОПЛЕННОГО ЗНАЧЕНИЯ (MR)
    document.getElementById("btn_op_mrecall").onclick = function() {
        if (!selectedOperation) {
            a = accumulatedValue.toString();
            outputElement.innerHTML = a;
        } else {
            b = accumulatedValue.toString();
            outputElement.innerHTML = b;
        }
    }
    // Конвертер мм.рт.ст в Паскали
    document.getElementById("btn_op_convert").onclick = function() {
        let currentValue;
    
        // Определяем текущее значение на экране
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
    
        // Если есть значение на экране, конвертируем его
        if (currentValue !== '') {
            let mmhg = parseFloat(currentValue);
            // 1 мм.рт.ст = 133.322 Па
            let pascals = mmhg * 133.322;
        
            // Форматируем результат (не более 2 знаков после запятой)
            let result = pascals.toFixed(2).toString();
        
        // Сохраняем результат в текущую переменную
        if (!selectedOperation) {
            a = result;
        } else {
            b = result;
        }
        outputElement.innerHTML = result;
        } 
        // Если ничего не введено, но есть результат вычисления
        else if (expressionResult !== '') {
            let mmhg = parseFloat(expressionResult);
            let pascals = mmhg * 133.322;
            a = pascals.toFixed(2).toString();
            b = '';
            selectedOperation = null;
            outputElement.innerHTML = a;
        }
        // Если есть сохраненное значение в a
        else if (a !== '') {
            let mmhg = parseFloat(a);
            let pascals = mmhg * 133.322;
            a = pascals.toFixed(2).toString();
            outputElement.innerHTML = a;
        }
    }

    // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("btn_op_equal").onclick = function() { 
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOperation)
            return
            
        // Выполняем выбранную операцию - чтобы не плодить if, воспользуемся удобной и более наглядной функцией сравнения switch, которая на основе значения переданной переменной выполняет нужный кейс. В case указывается ожидаемое точное значение переменной (это может быть любое значение), а затем после : пишется код, который нужно выполнить в данном случае. Case проверяются последовательно, выход из switch происходит при попадании на break или если значение не совпало ни с чем.
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                // обязательно пишется в конце действий case, чтобы выйти из switch, иначе продолжится сравнение case дальше
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            // желательно (но не обязательно) всегда прописывать дефолтное поведение, в случае если в переменной окажется не перечисленное выше значение. в нашем случае это не нужно.
            default:
                break;
        }
        
        // Сохраняем результат и очищаем второе число, чтобы при новом вводе записывать значение нового числа в b
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        // Показываем результат на экране
        outputElement.innerHTML = a
    }
};