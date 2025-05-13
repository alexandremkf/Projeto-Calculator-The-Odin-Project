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
  
// Testes (temporários — remova depois)
console.log(operate("+", 2, 3)); // 5
console.log(operate("-", 10, 4)); // 6
console.log(operate("*", 6, 7)); // 42
console.log(operate("/", 9, 3)); // 3  