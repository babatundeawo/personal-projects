"use strict";
// This turns on strict mode so silent errors become loud ones we can catch

// This is our own special error type for calculator problems
class CalculatorError extends Error {
  constructor(message) {
    super(message); // pass the message up to the normal Error
    this.name = "CalculatorError"; // give it a special name badge
  }
}

// This function does the actual math, with guard clauses to catch problems
function safeCalculate(num1, num2, operation) {
  // 🚦 Guard clause - check that both inputs are real numbers
  if (isNaN(num1) || isNaN(num2)) {
    throw new CalculatorError("Please enter valid numbers in both boxes!");
  }

  // 🚦 Guard clause - stop division by zero before it happens
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

// This function runs when the "Calculate" button is clicked
function handleCalculate() {
  // Grab the values the user typed, and convert text to numbers
  let num1 = parseFloat(document.getElementById("num1").value);
  let num2 = parseFloat(document.getElementById("num2").value);
  let operation = document.getElementById("operation").value;

  // This is where our error catching magic happens!
  let resultBox = document.getElementById("result");

  try {
    // Try the risky calculation
    let answer = safeCalculate(num1, num2, operation);
    // Success! Show the answer in friendly green text
    resultBox.style.color = "#2e7d32";
    resultBox.textContent = "✅ Answer: " + answer;
  } catch (error) {
    // Something went wrong! Show a friendly error instead of crashing
    resultBox.style.color = "#c62828";
    resultBox.textContent = "⚠️ " + error.message;
  }
}