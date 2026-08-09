"use strict";
// This turns on strict mode so silent errors become loud ones we can catch

// This is our own special error type for calculator problems
class CalculatorError extends Error {
  constructor(message) {
    super(message); // pass the message up to the normal Error
    this.name = "CalculatorError"; // give it a special name badge
  }
}

const OPERATION_SYMBOLS = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

// This function does the actual math, with guard clauses to catch problems
function safeCalculate(num1, num2, operation) {
  // Guard clause - check that both inputs are real numbers
  if (isNaN(num1) || isNaN(num2)) {
    throw new CalculatorError("Please enter valid numbers in both boxes!");
  }

  // Guard clause - stop division by zero before it happens
  if (operation === "divide" && num2 === 0) {
    throw new CalculatorError("Oops! You can't divide by zero!");
  }

  // If we get here, everything is safe - do the math!
  if (operation === "add") return num1 + num2;
  if (operation === "subtract") return num1 - num2;
  if (operation === "multiply") return num1 * num2;
  if (operation === "divide") return num1 / num2;

  // If none of the above matched, something is wrong with the operation
  throw new CalculatorError("Unknown operation selected!");
}

document.addEventListener("DOMContentLoaded", function () {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operationGroup = document.getElementById("operation");
  const expressionEl = document.getElementById("expression");
  const resultEl = document.getElementById("result");
  const calcBtn = document.getElementById("calcBtn");
  const clearBtn = document.getElementById("clearBtn");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const historyList = document.getElementById("historyList");

  let currentOperation = "add";
  const history = [];

  function setActiveOperation(op) {
    currentOperation = op;
    operationGroup.querySelectorAll(".op-btn").forEach((btn) => {
      const isActive = btn.dataset.op === op;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-checked", String(isActive));
    });
    updateExpression();
  }

  function updateExpression() {
    const a = num1Input.value.trim() || "?";
    const b = num2Input.value.trim() || "?";
    expressionEl.textContent = `${a} ${OPERATION_SYMBOLS[currentOperation]} ${b}`;
  }

  function renderHistory() {
    if (!history.length) {
      historyList.innerHTML =
        '<li class="history__empty">Your last calculations will show up here.</li>';
      return;
    }

    historyList.innerHTML = history
      .map(
        (entry) =>
          `<li><strong>${entry.expression}</strong> = ${entry.answer}</li>`,
      )
      .join("");
  }

  // This function runs when the "Calculate" button is clicked
  function handleCalculate() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const expression = `${num1Input.value || "?"} ${OPERATION_SYMBOLS[currentOperation]} ${num2Input.value || "?"}`;

    try {
      // Try the risky calculation
      const answer = safeCalculate(num1, num2, currentOperation);
      // Success! Show the answer in a friendly, positive style
      resultEl.textContent = `✅ Answer: ${answer}`;
      resultEl.className = "calculator__result is-success";
      expressionEl.textContent = expression;

      history.unshift({ expression, answer });
      if (history.length > 8) history.pop();
      renderHistory();
    } catch (error) {
      // Something went wrong! Show a friendly error instead of crashing
      resultEl.textContent = `⚠️ ${error.message}`;
      resultEl.className = "calculator__result is-error";
    }
  }

  function handleClear() {
    num1Input.value = "";
    num2Input.value = "";
    resultEl.textContent = "Ready when you are.";
    resultEl.className = "calculator__result";
    updateExpression();
    num1Input.focus();
  }

  operationGroup.querySelectorAll(".op-btn").forEach((btn) => {
    btn.addEventListener("click", () => setActiveOperation(btn.dataset.op));
  });

  [num1Input, num2Input].forEach((input) => {
    input.addEventListener("input", updateExpression);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleCalculate();
      }
    });
  });

  calcBtn.addEventListener("click", handleCalculate);
  clearBtn.addEventListener("click", handleClear);
  clearHistoryBtn.addEventListener("click", () => {
    history.length = 0;
    renderHistory();
  });

  updateExpression();
});
