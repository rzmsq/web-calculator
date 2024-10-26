var num1 = new String();
var num2 = new String();
var operation = new String();

var isNum1 = true;

function enterNum(num) {
    if (isNum1) {
        if (num == '0' && num1 == "") {
            return;
        }
        num1 += num;
        displayNum1();
    } else {
        if (num == '0' && num2 == "") {
            return;
        }
        num2 += num;
        displayNum2();
    }
}

function enterOperation(oper) {
    if (num1 == "") {
        return
    }

    if (operation != "" && num2 == "") {
        operation = oper;
        displayOper(false);
        return;
    }

    if (oper == '/') {
        operation = '/';
    } else if (oper == '*') {
        operation = '*';
    } else if (oper == '-') {
        operation = '-';
    } else if (oper == '+') {
        operation = '+';
    } else if (oper == '%') {
        operation = '%';
    }

    isNum1 = false;
    displayOper(true);
}

function displayNum1() {
    document.getElementById("operand-current").innerHTML = num1;
}

function displayNum2() {
    document.getElementById("operand-current").textContent += num2.at(-1);
}

function displayOper(isConcate) {
    if (isConcate) {
        document.getElementById("operand-current").textContent += ' ' + operation + ' ';
    } else {
        let current = document.getElementById("operand-current").textContent;
        document.getElementById("operand-current").innerHTML = current.substring(0, current.length - 2) + operation + ' ';
    }
}

function calculate() {
    if (num1 == "" || num2 == "") {
        return;
    }

    var result;

    if (operation == '/') {
        result = parseFloat(num1) / parseFloat(num2);
    } else if (operation == '*') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (operation == '-') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (operation == '+') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (operation == '%') {
    }

    displayResult(result);
    isNum1 = false;
}

function displayResult(result) {
    document.getElementById("result").innerHTML = result;
}