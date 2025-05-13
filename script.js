// Funções matemáticas básicas
function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) {
      return "Erro: divisão por 0!";
    }
    return a / b;
}
  
// Função principal que escolhe qual operação usar
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+":
        return add(a, b);
        case "-":
        return subtract(a, b);
        case "*":
        return multiply(a, b);
        case "/":
        return divide(a, b);
        default:
        return null;
    }
}