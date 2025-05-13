const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';
let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('number')) {
        if (value === '0' && currentInput === '0') return; // impede 00
        if (currentInput === '0' && value !== '.') {
          currentInput = value; // substitui 0 por outro número
          expression = expression.slice(0, -1) + value;
        } else {
          currentInput += value;
          expression += value;
        }
    updateDisplay(expression);
    } else if (button.classList.contains('decimal')) {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        expression += '.';
        updateDisplay(expression);
      }
    } else if (button.classList.contains('operator')) {
      if (currentInput === '') return;
      if (operator) return; // já tem operador, não permitir outro
      operator = value;
      previousInput = currentInput;
      currentInput = '';
      expression += ` ${value} `;
      updateDisplay(expression);
    } else if (button.classList.contains('equals')) {
      if (previousInput && currentInput && operator) {
        const result = calculate(previousInput, currentInput, operator);

        if (result === 'Erro') {
            updateDisplay('Erro');
          } else {
            expression += ` = ${result}`;
            updateDisplay(expression);
        }

        // Reset para próxima operação
        currentInput = result;
        previousInput = '';
        operator = '';
        expression = result === 'Erro' ? '' : result;
      }
    } else if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = '';
      expression = '';
      updateDisplay('0');
    } else if (value === '⌫') {
      if (expression.endsWith(' ')) {
        expression = expression.slice(0, -3); // remove operador e espaços
        operator = '';
        currentInput = previousInput;
        previousInput = '';
        } else {
        currentInput = currentInput.slice(0, -1);
        expression = expression.slice(0, -1);
        }
        updateDisplay(expression || '0');
      }
  });
});

function updateDisplay(value) {
  display.textContent = value;
}

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  let result;

  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = b !== 0 ? a / b : 'Erro';
      break;
    default:
      result = 0;
  }

  // Mostrar até 3 casas decimais se for número
  return typeof result === 'number'
    ? parseFloat(result.toFixed(3)).toString()
    : result;
}

document.addEventListener('keydown', (e) => {
    const key = e.key;
  
    if (!isNaN(key)) {
      clickButtonWithText(key);
    } else if (key === '/') {
        // força clicar o botão com texto "/"
        clickButtonWithText('/');
      } else if (['+', '-', '*'].includes(key)) {
        clickButtonWithText(key);
      } else if (key === 'Enter' || key === '=') {
      clickButtonWithText('=');
    } else if (key === 'Backspace') {
      clickButtonWithText('⌫');
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
      clickButtonWithText('C');
    } else if (key === '.') {
      clickButtonWithText('.');
    }
});
  
function clickButtonWithText(text) {
    const buttons = document.querySelectorAll('button');
    for (let button of buttons) {
      if (button.textContent === text) {
        button.click();
        break;
      }
    }
}