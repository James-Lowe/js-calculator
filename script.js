// Making links between javascript and buttons on the calculator

const displayPlate = document.querySelector('#display');
const backspaceButton = document.querySelector('#back');
const clearButton = document.querySelector('#ac');
const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');

// Creating variables for numbers and operator

let firstNumber = '';
let operator = '';
let secondNumber = '';
let saveNumber = '';

// Adding listeners to number buttons 

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', processNumber)
};

// Adding listeners to operator buttons

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function () {
        if (!firstNumber) {
            return
        } else {
            operator = operatorButtons[i].value;
        }
        secondNumber = '';
        useOperator();
    })
};

// Function to use operator

function useOperator () {
    if (firstNumber && secondNumber) {
        saveNumber = operate(+firstNumber, operator, +secondNumber);
        if (saveNumber % 1 != 0) {
            saveNumber = saveNumber.toFixed(3);
        }
        displayNumber(saveNumber);
        firstNumber = saveNumber;
        secondNumber = '';
    }
}

// Function for back button

backspaceButton.addEventListener('click', function() {
    if (secondNumber) {
        strNumber = secondNumber.toString();
        strChars = strNumber.split('')
        strChars.pop();
        strNumber = strChars.join('');
        secondNumber = Number(strNumber);
        displayNumber(secondNumber);
    } else {
        strNumber = firstNumber.toString();
        strChars = strNumber.split('')
        strChars.pop();
        strNumber = strChars.join('');
        firstNumber = Number(strNumber);
        displayNumber(firstNumber);
    }
});

// Function for AC button

clearButton.addEventListener('click', function() {
    firstNumber = '';
    secondNumber = '';
    saveNumber = '';
    tot = '';
    operator = '';
    displayPlate.innerHTML = '';
})

// Function for decimal sign

decimalButton.addEventListener('click', function() {
    decimal = decimalButton.value;
    if (displayPlate.innerHTML == '') {
        return
    } else if (displayPlate.innerHTML.includes('.')) {
        return
    } else {
        createNumber(decimal);
        if (secondNumber) {
            displayNumber(secondNumber);
        } else {
            displayNumber(firstNumber);
        }
    }
})

// Function for equals sign

equalsButton.addEventListener('click', function() {
    let tot = operate(+firstNumber, operator, +secondNumber);
    if (!secondNumber) {
        return
    }
    if (tot % 1 != 0) {
        tot = tot.toFixed(3);
    }
    displayPlate.innerHTML = tot;
    firstNumber = tot;
})


// Function for processing number input

function processNumber(e) {
    const number = Number(e.target.value);
    if (firstNumber && operator && secondNumber.length < 13) {
        createNumber(number);
        displayNumber(secondNumber);
      } else if (firstNumber.length < 13) {
        createNumber(number);
        displayNumber(firstNumber);
      }
}

// Function to create numbers

function createNumber(number) {
	if (firstNumber && operator) {
		secondNumber += number;
	} else {
		firstNumber += number;
	}
};

// Function to display number

function displayNumber(intNumber) {
    displayPlate.innerHTML = intNumber;
}

// Function to operate

function operate(x, operator, y) {
    switch(operator) {
        case 'add':
            return add(x, y);
            break;
        case 'subtract':
            return subtract(x, y);
            break;
        case 'multiply':
            return multiply(x, y);
            break;
        case 'divide':
            if (secondNumber == 0) {
                alert('Never divide by 0');
            } else {
            return divide(x, y);
            }
            break;
        default:
            console.log('Something went wrong')
    }
}

// Simple maths functions

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}