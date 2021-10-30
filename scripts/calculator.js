class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

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

    if (equalsButton.click) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation} ${this.currentOperand} = ${computation}`;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

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
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

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
window.addEventListener('keydown', (button) => {
  buttonBlur();
  let buttonKey = button.key;
  if (buttonKey === '*') {
    buttonKey = 'x';
  }
  if ((buttonKey >= 0 && buttonKey <= 9) || buttonKey === '.') {
    calculator.appendNumber(buttonKey);
    calculator.updateDisplay();
  } else if (buttonKey === '+' || buttonKey === '-' || buttonKey === 'x' || buttonKey === '/') {
    if (buttonKey === '/') {
      button.preventDefault();
    }
    calculator.chooseOperation(buttonKey);
    calculator.updateDisplay();
  } else if (buttonKey === '=' || buttonKey === 'Enter') {
    calculator.compute();
    calculator.updateDisplay();
  } else if (buttonKey === 'Delete' || buttonKey === 'Escape') {
    calculator.clear();
    calculator.updateDisplay();
  } else if (buttonKey === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  }
});
