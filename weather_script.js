window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция
    let weatherAccumulatedValue = 0  // Накопленное значение для памяти
   
    // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")
    const calculatorContainer = document.querySelector(".weather-calculator-container")

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')


    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
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
    // Настраиваем обработчики для цифровых кнопок
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций
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
    
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
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
        const calculatorContainer = document.querySelector(".weather-calculator-container");
        calculatorContainer.classList.toggle("weather-bg-alternate");
    }
    
    document.getElementById("btn_op_screen_color").onclick = function() { 
        const screenElement = document.getElementById("result");
        screenElement.classList.toggle("weather-bg-alternate");
    }
    
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
    
    document.getElementById("btn_op_mplus").onclick = function() {
        let currentValue;
        
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
        
        if (currentValue !== '') {
            weatherAccumulatedValue += parseFloat(currentValue);
        } else if (expressionResult !== '') {
            weatherAccumulatedValue += parseFloat(expressionResult);
        } else if (a !== '') {
            weatherAccumulatedValue += parseFloat(a);
        }
        
        outputElement.innerHTML = weatherAccumulatedValue.toString();
        
        a = weatherAccumulatedValue.toString();
        b = '';
        selectedOperation = null;
    }
    
    document.getElementById("btn_op_mminus").onclick = function() {
        let currentValue;
        
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
        
        if (currentValue !== '') {
            weatherAccumulatedValue -= parseFloat(currentValue);
        } else if (expressionResult !== '') {
            weatherAccumulatedValue -= parseFloat(expressionResult);
        } else if (a !== '') {
            weatherAccumulatedValue -= parseFloat(a);
        }
        
        outputElement.innerHTML = weatherAccumulatedValue.toString();
        
        a = weatherAccumulatedValue.toString();
        b = '';
        selectedOperation = null;
    }
    
    document.getElementById("btn_op_mclear").onclick = function() {
        weatherAccumulatedValue = 0;
        outputElement.innerHTML = a || '0';
    }
    
    document.getElementById("btn_op_mrecall").onclick = function() {
        if (!selectedOperation) {
            a = weatherAccumulatedValue.toString();
            outputElement.innerHTML = a;
        } else {
            b = weatherAccumulatedValue.toString();
            outputElement.innerHTML = b;
        }
    }
    
    document.getElementById("btn_op_convert").onclick = function() {
        let currentValue;
    
        if (!selectedOperation) {
            currentValue = a;
        } else {
            currentValue = b;
        }
    
        if (currentValue !== '') {
            let mmhg = parseFloat(currentValue);
            let pascals = mmhg * 133.322;
            let result = pascals.toFixed(2).toString();
        
            if (!selectedOperation) {
                a = result;
            } else {
                b = result;
            }
            outputElement.innerHTML = result;
        } 
        else if (expressionResult !== '') {
            let mmhg = parseFloat(expressionResult);
            let pascals = mmhg * 133.322;
            a = pascals.toFixed(2).toString();
            b = '';
            selectedOperation = null;
            outputElement.innerHTML = a;
        }
        else if (a !== '') {
            let mmhg = parseFloat(a);
            let pascals = mmhg * 133.322;
            a = pascals.toFixed(2).toString();
            outputElement.innerHTML = a;
        }
    }

    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
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
            default:
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};