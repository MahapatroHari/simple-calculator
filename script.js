const screen = document.querySelector(".screen");
const calculatorButtons = document.querySelectorAll(".calculator-button");


screen.innerText = "0";
let buffer = "0";
let totalCalculated, prevSelectedOperator, temp;

function handleNumberClick(number) {
    if (buffer == 0) {
        buffer = number;
    } else {
        buffer += number;
    }
}

function handleOperation(symbol) {
    if (!prevSelectedOperator) {
        temp = Number(buffer);
        buffer = "0";
    }
    else {
        handleCalc(prevSelectedOperator);
    }
    prevSelectedOperator = symbol;
}

function handleCalc(symbol) {
    let currentNo = Number(buffer);
    if (symbol === "+") {
        temp += currentNo;
    }
    else if (symbol === "-") {
        temp -= currentNo;
    }
    else if (symbol === "×") {
        let specialCase = currentNo === 0 ? 1 : currentNo;
        temp *= specialCase;
    }
    else if (symbol === "÷") {
        temp /= currentNo;
    }
    currentNo = 0;
    buffer = 0;
    prevSelectedOperator = null;
}

function handleCalculations(symbol) {
    if (symbol === "C") {
        buffer = "0"
        prevSelectedOperator = null;
    }
    else if (symbol === "=") {
        if (!prevSelectedOperator) {
            return;
        }
        handleCalc(prevSelectedOperator);
        buffer = temp;
        prevSelectedOperator = null;
    }
    else {
        handleOperation(symbol);
    }
}

function handleButtonClick(value) {
    const isNumber = !isNaN(Number(value))
    if (isNumber) {
        handleNumberClick(value);
    }
    else {
        handleCalculations(value);
    }
    rerender();
}

function rerender() {
    screen.innerText = buffer;
}

calculatorButtons.forEach((cbtn) => {
    cbtn.addEventListener("click", (event) => {
        handleButtonClick(event.target.innerText);
    })
})