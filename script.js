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
      currentInput += value;
      expression += value;
      updateDisplay(expression);
    } else if (button.classList.contains('decimal')) {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        expression += '.';
        updateDisplay(expression);
      }
    } else if (button.classList.contains('operator')) {
      if (currentInput === '') return;
      operator = value;
      previousInput = currentInput;
      currentInput = '';
      expression += ` ${value} `;
      updateDisplay(expression);
    } else if (button.classList.contains('equals')) {
      if (previousInput && currentInput && operator) {
        const result = calculate(previousInput, currentInput, operator);
        expression += ` = ${result}`;
        updateDisplay(expression);
        // Reset para próxima operação
        currentInput = result;
        previousInput = '';
        operator = '';
        expression = result;
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