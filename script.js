const display = document.querySelector('.display'); // classe do visor
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('number')) {
      currentInput += value;
      updateDisplay(currentInput);
    } else if (button.classList.contains('decimal')) {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
      }
    } else if (button.classList.contains('operator')) {
      if (currentInput === '') return;
      operator = value;
      previousInput = currentInput;
      currentInput = '';
    } else if (button.classList.contains('equals')) {
      if (previousInput && currentInput && operator) {
        currentInput = calculate(previousInput, currentInput, operator);
        updateDisplay(currentInput);
        previousInput = '';
        operator = '';
      }
    } else if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = '';
      updateDisplay('0');
    } else if (value === '⌫') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
    }
  });
});

function updateDisplay(value) {
  display.textContent = value;
}

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+': return (a + b).toString();
    case '-': return (a - b).toString();
    case '*': return (a * b).toString();
    case '/': return b !== 0 ? (a / b).toString() : 'Erro';
    default: return '0';
  }
}
