var num1 = new String();
var num2 = new String();
var operation = new String();
var result;

var isNum1 = true;

function clearNum2() {
    let current = document.getElementById("operand-current").textContent;
    document.getElementById("operand-current").innerHTML = num2 == "" ?
        current.substring(0, current.length - 2) + ' ' :
        current.substring(0, current.length - 2);

    document.getElementById("result").innerHTML = '';
}

function clearOperation() {
    operation = "";
    let current = document.getElementById("operand-current").textContent;
    document.getElementById("operand-current").innerHTML =
        current.substring(0, current.length - 3);;
}

function removeNumLast() {
    if (operation == "") {
        if (num1 !== "") {
            num1 = num1.slice(0, -1);
            displayNum1();
        }
    } else if (num2 != "") {
        num2 = num2.substring(0, num2.length - 1);
        console.log(num2);
        clearNum2();
        displayNum2AndCalc();
    } else {
        clearOperation();
        clearResult()
        isNum1 = true;
    }
}

function clearAll() {
    num1 = "";
    num2 = "";
    operation = "";
    result = "";
    isNum1 = true;
    document.getElementById("operand-current").innerHTML = '';
    document.getElementById("result").innerHTML = '';
    document.getElementById("result-previous").innerHTML = '';
    document.getElementById("operand-previous").innerHTML = '';
}

function enterNum(num) {
    if (isNum1) {
        if (num == '0' && num1 == "0") {
            return;
        }
        num1 += num;
        displayNum1();
    } else {
        if (num == '0' && num2 == "0") {
            return;
        }
        num2 += num;
        displayNum2AndCalc();
    }
}

function clearResult() {
    result = "";
    document.getElementById("result").innerHTML = '';
}

function calculateAndSetNum1(params) {
    calculate();
    num1 = result;
    num2 = "";
    displayNum1();
    clearResult();
}
function checkOperAndInitOperation(oper) {
    if (oper === '/') {
        operation = '/';
    } else if (oper === '*') {
        operation = '*';
    } else if (oper === '-') {
        operation = '-';
    } else if (oper === '+') {
        operation = '+';
    } else if (oper === '%') {
        operation = '%';
    }
}

function enterOperation(oper) {
    if (num1 === "") {
        return
    }

    if (operation != "" && num2 === "") {
        displayPreviouse();
        operation = oper;
        displayOper(false);
        return;
    } else if (operation != "" && num2 !== "") {
        displayPreviouse();
        calculateAndSetNum1();
    }

    checkOperAndInitOperation(oper);
    isNum1 = false;
    displayOper(true);
}

function displayNum1() {
    document.getElementById("operand-current").innerHTML = num1;
}

function displayNum2AndCalc() {
    if (num2 === "") {
        return;
    }
    document.getElementById("operand-current").textContent += num2.at(-1);
    calculate();
}

function displayOper(isConcate) {
    if (isConcate) {
        document.getElementById("operand-current").textContent += ' ' + operation + ' ';
    } else {
        let current = document.getElementById("operand-current").textContent;
        document.getElementById("operand-current").innerHTML = current.substring(0, current.length - 2) + operation + ' ';
    }
}

function displayPreviouse() {
    document.getElementById("result-previous").innerHTML = document.getElementById("result").innerHTML;
    document.getElementById("operand-previous").innerHTML = num1 + ' ' + operation + ' ' + num2;
}

function calculate() {
    if (num1 === "" || num2 === "") {
        return;
    }
    checkOperAndCalc();
    displayResult(result);
    isNum1 = false;
}

function checkOperAndCalc() {
    if (operation === '/') {
        result = parseFloat(num1) / parseFloat(num2);
    } else if (operation === '*') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (operation === '-') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (operation === '+') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (operation === '%') {
    }
}

function displayResult(result) {
    document.getElementById("result").innerHTML = '= ' + result;
}