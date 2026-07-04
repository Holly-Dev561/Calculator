//Declaring variables
let equation = "";
let numbers = "0123456789";
let operators = "/*+-";
let btnNumbers = Array.from(document.querySelectorAll(".number"));
let btnOperators = Array.from(document.querySelectorAll(".operator"));
let btnReset = document.querySelector("#reset");
let btnDelete = document.querySelector("#delete");
let btnEqual = document.querySelector("#equal");

//Defining textContent of buttons

btnNumbers.forEach((btn, index) => btn.textContent = index);

//Operators functions

function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2
}
function divide(num1, num2) {
    return num1 / num2;
}

//Equation logic organiser function

function equationComposer(equation) {
    alert("equation composition start with equation:" + equation);
    if (operators.includes(equation[0])) {
        alert("This shit sucks learn how to write dumbass");
        return;
    }
    let equationArr = [];
    let operatorBefore = 0;
    for (let charIndex = 0; charIndex < equation.length; charIndex++) {

        if (operators.includes(equation[charIndex])) {
            let numToAdd = "";
            for (let charBefore = operatorBefore + 1; charBefore < charIndex; charBefore++) {
                numToAdd = numToAdd + equation[charBefore];
            }
            operatorBefore = charIndex;
            equationArr.push(Number(numToAdd));
            equationArr.push(equation[charIndex]);
        }
        else if (charIndex === equation.length - 1) {
            let numToAdd = "";
            for (let lastNumCharIndex = operatorBefore + 1; lastNumCharIndex < equation.length; lastNumCharIndex++) {
                numToAdd = numToAdd + equation[lastNumCharIndex];
            }
            equationArr.push(numToAdd);
        }

    }
    alert("equation composition end result :" + equationArr);
    calculation(equationArr);
}

function calculation(equationArr) {
    alert("Calculation start");
    equationArr.forEach((element, index) => {
        if (element === "*") {
            equationArr.splice(index - 1, 3, multiply(equationArr[index + 1], equationArr[index - 1]))
        }
        else if (element === "/") {
            equationArr.splice(index - 1, 3, divide(equationArr[index + 1], equationArr[index - 1]))
        }
    })
    equationArr.forEach((element, index) => {
        if (element === "+") {
            equationArr.splice(index - 1, 3, add(equationArr[index + 1], equationArr[index - 1]))
        }
        else if (element === "-") {
            equationArr.splice(index - 1, 3, subtract(equationArr[index + 1], equationArr[index - 1]));
        }
    })
    //return equationArr[0];
    alert("Calculation end result :" + equationArr[0]);
}


// Equation production function

function addToFunction(btn, equation) {
    return equation + btn.textContent;
}
//For each button pressed the equation string is updated through either adding one character, removing one or reseting the whole string

btnNumbers.forEach(btn => btn.addEventListener("click", button => equation = addToFunction(btn, equation)));
btnOperators.forEach(btn => btn.addEventListener("click", button => equation = addToFunction(btn, equation)));
btnReset.addEventListener("click", function () { equation = "" });
btnDelete.addEventListener("click", function () { equation.slice(0, -1) });
btnEqual.addEventListener("click", function () { equation = equationComposer(equation) });
console.log(equation);

