const buttonNumbers = document.querySelectorAll('[data-type="number"]');
const buttonClear = document.querySelector('[data-type="clear"]');
const buttonNegate = document.querySelector('[data-type="negate"]');
const buttonPercent = document.querySelector('[data-type="percent"]');
const buttonOperators = document.querySelectorAll('[data-type="operator"]');
const buttonEqual = document.querySelector('[data-type="equal"]');
const screen = document.getElementById("screen");

let currentOperation = null;
let leftOperand = "";
let rightOperand = "";
let clearScreen = false;

buttonClear.addEventListener("click", resetCalculator);
buttonNegate.addEventListener("click", negateNumber);
buttonEqual.addEventListener("click", evaluate);
buttonPercent.addEventListener("click", percent);

buttonNumbers.forEach((btn) => {
  btn.addEventListener("click", () => appendTextContent(btn.textContent));
});

buttonOperators.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    handleOperation(btn.textContent);
    handleClick(btn, event);
  });
});

const setDotToComma = (num) => num.toString().replace(/\./g, ",");

function removeActive() {
  buttonOperators.forEach((btn) => {
    btn.classList.remove("active-operator");
  });
}

function handleClick(btn, event) {
  const active = document.querySelector(".active-operator");
  if (active) active.classList.remove("active-operator");
  event.currentTarget.classList.add("active-operator");
}

function percent() {
  let num = Number.parseFloat(screen.textContent.replace(/,/g, "."));
  num /= 100;
  screen.textContent = setDotToComma(num.toFixed(2));
}

function resetSCreen() {
  screen.textContent = "";
  clearScreen = false;
}

function appendTextContent(number) {
  if (screen.textContent === "0" || clearScreen) resetSCreen();
  screen.textContent += number;
}

const sum = (a, b) => a + b;
const rest = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const modulo = (a, b) => a % b;

function performOperation(currentOperation, leftOperand, rightOperand) {
  let result;
  const a = Number.parseFloat(leftOperand.replace(/,/g, "."));
  const b = Number.parseFloat(rightOperand.replace(/,/g, "."));
  switch (currentOperation) {
    case "+":
      result = sum(a, b);
      break;
    case "-":
      result = rest(a, b);
      break;
    case "x":
      result = multiplication(a, b);
      break;
    case "÷":
      result = division(a, b);
      break;
    case "%":
      result = modulo(a, b);
      break;
    default:
      break;
  }
  return result;
}

function evaluate() {
  if (currentOperation === null || clearScreen) return;
  rightOperand = screen.textContent;
  let result = performOperation(currentOperation, leftOperand, rightOperand);
  result = setDotToComma(result);
  screen.textContent = result;
  currentOperation = null;
  removeActive();
}

function handleOperation(operator) {
  if (currentOperation !== null) evaluate();
  leftOperand = screen.textContent;
  currentOperation = operator;
  clearScreen = true;
}

function negateNumber() {
  const num = Number.parseFloat(screen.textContent.replace(/,/g, "."));
  if (Math.sign(num) === -1) {
    screen.textContent = setDotToComma(Math.abs(num));
  } else {
    screen.textContent = setDotToComma(-Math.abs(num));
  }
}

function resetCalculator() {
  screen.textContent = 0;
  currentOperation = null;
  leftOperand = "";
  rightOperand = "";
  removeActive();
}
