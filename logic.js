//Variables

let numbers = "0123456789";
let operators = "+-*/";
let number1 = 0;
let number2 = 0;
let operator = "+";
let operandIndex = 0;
let existantOperator = false;
let existantFloatingPoint = false;

//buttons

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const resetBtn = document.querySelector("#reset");
const deleteBtn = document.querySelector("#delete");
const equalBtn = document.querySelector("#equal");
let display = document.querySelector("#display");
const floatingPointBtn = document.querySelector("#floatingPoint");

//Math operators functions

function add(n1, n2) { return n1 + n2; }
function subtract(n1, n2) { return n1 - n2; }
function multiply(n1, n2) { return n1 * n2; }
function divide(n1, n2) {
    if (n2 === 0) { alert("YOU CANNOT DIVIDE BY 0"); return "syntax error"; }
    else { return (n1 / n2); }
}

function operate(number1, number2, operator) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    let result = 0;
    if (operator === "+") result = add(number1, number2);
    else if (operator === "-") result = subtract(number1, number2);
    else if (operator === "*") result = multiply(number1, number2);
    else if (operator === "/") result = divide(number1, number2);
    else if (number1 === "Syntax error") result = "Syntax error";
    else result = "SyntaxError";
    return result;

}

//Adding event listeners

numberButtons.forEach((btn, key) => {
    btn.addEventListener("click", function () {
        if (operandIndex === 0) {
            number1 = number1 + btn.textContent;
            display.textContent = number1.slice(1);
        }
        else if (operandIndex === 1) {
            number2 = number2 + btn.textContent;
            display.textContent = number2.slice(1);
        }
    });
});

operatorButtons.forEach((btn, key) => {
    btn.addEventListener("click", function () {
        if (existantOperator == true) {
            //alert("first calc");
            number1 = operate(number1, number2, operator);
            display.textContent = number1;
            number2 = 0;
        }

        operator = btn.textContent;
        display.textContent = operator;
        operandIndex = 1;
        existantOperator = true;
        existantFloatingPoint = false;
    });
})

equalBtn.addEventListener("click", function () {
    display.textContent = operate(number1, number2, operator);
    //alert(`${number1} ${operator} ${number2}`);
    number1 = 0;
    number2 = 0;
    operandIndex = 0;
    existantOperator = false;
    existantFloatingPoint = false;
});

resetBtn.addEventListener("click", function () {
    number1 = 0;
    number2 = 0;
    operator = 0;
    operandIndex = 0;
    existantOperator = false;
    existantFloatingPoint = false;
    display.textContent = 0;
})

deleteBtn.addEventListener("click", function () {
    if (operandIndex === 0) {
        if (number1.slice(number1.length - 1) === ".") {
            number1 = number1.slice(0, number1.length - 1);
            existantFloatingPoint = false;
        }
        else { number1 = number1.slice(0, number1.length - 1); }
        display.textContent = number1.slice(1);
    }
    else if (operandIndex === 1) {
        if (number2.slice(number2.length - 1) === ".") {
            number2 = number2.slice(0, number2.length - 1);
            existantFloatingPoint = false;
        }
        else { number2 = number2.slice(0, number2.length - 1); }
        display.textContent = number2.slice(1);
    }
})

floatingPointBtn.addEventListener("click", function () {
    if (!existantFloatingPoint) {
        if (operandIndex === 0) { number1 = number1 + "."; display.textContent = number1.slice(1); }
        else if (operandIndex === 1) { number2 = number2 + "."; display.textContent = number2.slice(1); }
    }
    existantFloatingPoint = true;
})