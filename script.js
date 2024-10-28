class Calculator {
    #num1;
    #num2;
    #result;
    #operation;
    #isNum1 = true;

    constructor(num1, num2, operation) {
        this.#num1 = num1;
        this.#num2 = num2;
        this.#operation = operation;
    }

    #add() {
        this.#result = parseFloat(this.#num1) + parseFloat(this.#num2);
    }

    #subtract() {
        this.#result = parseFloat(this.#num1) - parseFloat(this.#num2);
    }

    #multiply() {
        this.#result = parseFloat(this.#num1) * parseFloat(this.#num2);
    }

    #divide() {
        this.#result = parseFloat(this.#num1) / parseFloat(this.#num2);
    }

    #percent() {
        this.#result = this.#num1 / 100;
    }

    calculate() {
        switch (this.#operation) {
            case '+':
                this.#add();
                break;
            case '-':
                this.#subtract();
                break;
            case '*':
                this.#multiply();
                break;
            case '/':
                this.#divide();
                break;
            case '%':
                this.#percent();
                break;
            default:
                throw new Error('Invalid operation');
        }
    }

    delLastN() {
        if (this.#isNum1) {
            this.#num1 = this.#num1.toString().substring(0, this.#num1.toString().length - 1);
        } else {
            this.#num2 = this.#num2.toString().substring(0, this.#num2.toString().length - 1);
        }
    }

    isHaveOperation() {
        return this.#operation !== '';
    }

    clearData() {
        this.#num1 = '';
        this.#num2 = '';
        this.#operation = '';
        this.#result = '';
    }

    set setNum1(num1) {
        this.#num1 = num1;
    }

    set setNum2(num2) {
        this.#num2 = num2;
    }

    set setOperation(operation) {
        this.#operation = operation;
    }

    set setResult(result) {
        this.#result = result;
    }

    set setIsNum1(isNum1) {
        this.#isNum1 = isNum1;
    }

    get getNum1() {
        return this.#num1;
    }

    get getNum2() {
        return this.#num2;
    }

    get getOperation() {
        return this.#operation;
    }

    get getResult() {
        return this.#result;
    }

    get getIsNum1() {
        return this.#isNum1;
    }
}

var calc = new Calculator("", "", "");
var current = () => document.getElementById("operand-current").textContent;

function replaceOperation() {
    document.getElementById("operand-current").innerHTML = calc.getNum1 + ' ' +
        calc.getOperation + ' ' + calc.getNum2;
}

// function changeSign() {
//     if (isNum1) {
//         calc.setNum1 = calc.getNum1.charAt(0) == '-' ? calc.getNum1.substring(1) : '-' + calc.getNum1;
//         displayNum1();
//     } else {
//         clearOperation();
//         calc.setOperation = calc.getOperation == '-' ? '+' : '-';
//         replaceOperation();
//         calculate();
//     }
// }

function clearNum2() {
    document.getElementById("operand-current").innerHTML = calc.getNum2 == "" ?
        current().substring(0, current().length - 2) + ' ' :
        current().substring(0, current().length - 2);

    document.getElementById("result").innerHTML = '';
}

function clearOperation() {
    calc.setOperation = "";
    document.getElementById("operand-current").innerHTML =
        current().substring(0, current().length - 3);;
}

function removeNumLast() {
    if (calc.getOperation == "") {
        if (calc.getNum1.toString() !== "") {
            calc.delLastN();
            displayNum1();
        }
    } else if (calc.getNum2.toString() !== "") {
        calc.delLastN();
        clearNum2();
        displayNum2AndCalc();
    } else {
        clearOperation();
        clearResult()
        calc.setIsNum1 = true;
    }
}

function clearAll() {
    calc.clearData();
    calc.setIsNum1 = true;
    document.getElementById("operand-current").innerHTML = '';
    document.getElementById("result").innerHTML = '';
    document.getElementById("result-previous").innerHTML = '';
    document.getElementById("operand-previous").innerHTML = '';
}

function enterNum(num) {
    if (calc.getIsNum1) {
        if (num == '0' && calc.getNum1 == "0") {
            return;
        }
        calc.setNum1 = calc.getNum1 + num;
        displayNum1();
    } else {
        if (num == '0' && calc.getNum2 == "0") {
            return;
        }
        calc.setNum2 = calc.getNum2 + num;
        displayNum2AndCalc();
    }
}

function clearResult() {
    calc.setResult = "";
    document.getElementById("result").innerHTML = '';
}

function calculateAndSetNum1() {
    calculate();
    calc.setNum1 = calc.getResult;
    calc.setNum2 = "";
    displayNum1();
    clearResult();
}

function initOperation(oper) {
    if (oper === '/') {
        calc.setOperation = '/';
    } else if (oper === '*') {
        calc.setOperation = '*';
    } else if (oper === '-') {
        calc.setOperation = '-';
    } else if (oper === '+') {
        calc.setOperation = '+';
    } else if (oper === '%') {
        calc.setOperation = '%';
    }
}

function enterOperation(oper) {
    if (calc.getNum1 === "") {
        return
    }

    if (calc.getOperation != "" && calc.getNum2 === "") {
        calc.setOperation = oper;
        if (oper != '%') {
            displayOper();
        } else {
            calculateAndSetNum1();
        }
        return;
    } else if (calc.getOperation != "" && calc.getNum2 !== "") {
        displayPreviouse();
        calculateAndSetNum1();
    }

    initOperation(oper);
    calc.setIsNum1 = false;
    if (oper != '%') {
        displayOper();
    } else {
        calculateAndSetNum1();
    }
}

function displayNum1() {
    document.getElementById("operand-current").innerHTML = calc.getNum1;
}

function displayNum2AndCalc() {
    if (calc.getNum2 === "") {
        return;
    }
    document.getElementById("operand-current").textContent += calc.getNum2.at(-1);
    calculate();
}

function displayOper() {
    document.getElementById("operand-current").innerHTML = current().substring(0, calc.getNum1.toString().length) + ' ' + calc.getOperation + ' ';
}

function displayPreviouse() {
    document.getElementById("result-previous").innerHTML = document.getElementById("result").innerHTML;
    document.getElementById("operand-previous").innerHTML = calc.getNum1 + ' ' + calc.getOperation + ' ' + calc.getNum2;
}

function calculate() {
    if (calc.getNum1 === "" || (calc.getNum2 === "" && calc.getOperation !== '%')) {
        return;
    }
    calc.calculate();
    displayResult(result);
    calc.setIsNum1 = false;
}

function displayResult(result) {
    document.getElementById("result").innerHTML = '= ' + calc.getResult;
}