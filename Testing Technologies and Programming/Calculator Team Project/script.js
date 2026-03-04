let displayValue = "";


function appendToDisplay(value) {
    displayValue += value;
    document.getElementById("display").value = displayValue;
}


function clearDisplay() {
    displayValue = "";
    document.getElementById("display").value = displayValue;
}


function calculateResult() {
    try {
        displayValue = eval(displayValue);
        document.getElementById("display").value = displayValue;
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}

function calculateResult() {
  try {
    const result = eval(display.value);
    if (result === Infinity || result === -Infinity) {
      display.value = "Error";
    } else {
      display.value = result;
    }
  } catch {
    display.value = "Error";
  }
}
