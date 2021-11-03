class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  // create attributes
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
  }

  // remove the last character of currentOperand
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // take the string number and concatenate it with the next number
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // take the string operation and put it in the operation attribute, previousOperand attribute take currentOperand then clear currentOperand
  chooseOperation(operator) {
    // if the user click on an operator when previousOperand and currentOperand is empty return
    if (this.previousOperand === '' && this.currentOperand === '') return;

    // if the previousOperand is not empty call the compute method
    if (this.previousOperand !== '') {
      this.compute();
    }

    // previousOperand = currentOperand when the user click for the first time on an operator or when this.operation = undefined in the function compute
    if (this.operation === '' || this.operation === undefined) {
      this.previousOperand = this.currentOperand;
    }

    this.operation = operator;
    this.currentOperand = '';
  }

  // convert the string numbers into numbers and calcul it according to the operator
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case 'x':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }

    // update the previousOperandTextElement display if the user click on the equalsButton
    if (equalsButton.click) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation} ${this.currentOperand} = ${computation}`;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  // update the display of currentOperandTextElement and previousOperandTextElement
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
      if (this.previousOperandTextElement.innerText === `${this.previousOperand} ${this.operation}`) {
        this.previousOperandTextElement.innerText += ` ${this.currentOperand}`;
      }
    }
  }
}

// take html elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// create new instance of the calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// call functions when click on numberButtons
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// call functions when click on operationButtons
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// call functions when click on equalsButton
equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

// call functions when click on allClearButton
allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

// call functions when click on deleteButton
deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

// remove the focus on the button
function buttonBlur() {
  numberButtons.forEach((button) => {
    button.blur();
  });
  operationButtons.forEach((button) => {
    button.blur();
  });
  equalsButton.blur();
  allClearButton.blur();
  deleteButton.blur();
}

// listen keydown on keyboard
window.addEventListener('keydown', (button) => {
  buttonBlur();
  // take the "name" of the keydown
  let buttonKey = button.key;

  // convert the keydown '*' in 'x'
  if (buttonKey === '*') {
    buttonKey = 'x';
  }

  // if the keydown user is 0 or 9 or between us or '.' call functions
  if ((buttonKey >= 0 && buttonKey <= 9) || buttonKey === '.') {
    calculator.appendNumber(buttonKey);
    calculator.updateDisplay();
  }
  // if the keydown is an operator call functions and if it's '/' block his website shortcut
  if (buttonKey === '+' || buttonKey === '-' || buttonKey === 'x' || buttonKey === '/') {
    if (buttonKey === '/') {
      button.preventDefault();
    }
    calculator.chooseOperation(buttonKey);
    calculator.updateDisplay();
  }

  // if the keydown is '=' or 'Enter' call functions
  if (buttonKey === '=' || buttonKey === 'Enter') {
    calculator.compute();
    calculator.updateDisplay();
  }

  // if the keydown is 'Delete' or 'Escape' call functions
  if (buttonKey === 'Delete' || buttonKey === 'Escape') {
    calculator.clear();
    calculator.updateDisplay();
  }

  // if the keydown is 'Backspace' all functions
  if (buttonKey === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  }
});
