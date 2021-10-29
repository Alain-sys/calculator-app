let radio1 = document.getElementById('radio1');
let radio2 = document.getElementById('radio2');
let radio3 = document.getElementById('radio3');
let themeSwitcher = document.querySelectorAll('.theme-switcher');
let radioControl = document.querySelector('.radio-control');
let themeId = 0;

// verify which themeSwitcher is checked, take his id if it's checked and save it in localStorage
function getLocalStorage() {
  for (let i = 0; i < themeSwitcher.length; i++) {
    let storageThemeSwitcher = themeSwitcher[i];
    if (storageThemeSwitcher.checked) {
      let storageThemeSwitcherId = storageThemeSwitcher.id;
      if (storageThemeSwitcherId === 'radio1') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
      } else if (storageThemeSwitcherId === 'radio2') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
      } else if (storageThemeSwitcherId === 'radio3') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
      }
    }
  }
}

// verify the id of the localStorage and add style with attribute according to his id
function switchTheme() {
  if (localStorage.getItem('switchTheme') === 'radio1') {
    document.querySelector('html').dataset['theme'] = '1';
    radioControl.style.left = '6%';
    radio1.setAttribute('checked', true);
  } else if (localStorage.getItem('switchTheme') === 'radio2') {
    document.querySelector('html').dataset['theme'] = '2';
    radioControl.style.left = '40%';
    radio2.setAttribute('checked', true);
  } else if (localStorage.getItem('switchTheme') === 'radio3') {
    document.querySelector('html').dataset['theme'] = '3';
    radioControl.style.left = '75%';
    radio3.setAttribute('checked', true);
  }
}

// if localstorage is null call the function getLocalStorage and SwitchTheme else call the function switchTheme
function verifyLocalStorage() {
  if (localStorage.getItem('switchTheme') == null) {
    radioControl.style.left = '6%';
    getLocalStorage();
    switchTheme();
  } else {
    switchTheme();
  }
}

verifyLocalStorage();

// call the function switchTheme and save themeId in localStorage when themeSwitcher change
themeSwitcher.forEach((theme) => {
  theme.addEventListener('change', () => {
    themeId = theme.id;
    localStorage.setItem('switchTheme', themeId);
    switchTheme();
  });
});

/************************Calculator */

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
