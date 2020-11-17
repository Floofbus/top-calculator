// Set up event handlers:
let allButtons = Array.from(document.querySelectorAll(".button"));
for (let i = 0; i < allButtons.length; i++) {
	allButtons[i].addEventListener('click', handleButton);
}

let finalEquation = [];
let numDisplay = "0";

function handleButton(event) {
	let key = event.target.getAttribute('data-key');
	if (Array.from(event.target.classList).includes("calc-num")) {
		handleNumberButton(key);
	}
	else if (Array.from(event.target.classList).includes("calc-fn")) {
		handleFunctionButton(key);
	}
	else {
		handleEqualsButton();
	}
	updateDisplays();
}

function handleNumberButton(key) {
	if (key == "." && !numDisplay.includes(".") && numDisplay.length < 10) {
		numDisplay += key;
	}
	else if (key != "." && numDisplay.length < 10) {
		if (numDisplay === "0") {
			numDisplay = key;
		}
		else {
			numDisplay += key;
		}
	}
}

function handleFunctionButton(key) {
	if (key === "clr") {
		finalEquation = [];
		numDisplay = "0";
	}
	else if (key === "-/+") {
		if (numDisplay[0] != "-") {
			numDisplay = "-" + numDisplay;
		}
		else {
			numDisplay = numDisplay.substring(1);
		}
	}
	else {
		finalEquation.push(numDisplay);
		finalEquation.push(key);
		numDisplay = "0";
	}
}

function handleEqualsButton() {
	if (numDisplay[-1] == ".") {
		numDisplay += "0";
	}
	finalEquation.push(numDisplay);
	let result = operate(finalEquation);
	if (result.length > 10) {
		if (result > 9999999999) {
			numDisplay = "Math is hard";
		}
		else {

		}
	} 
	else {
		numDisplay = result;
		finalEquation = [];
	}
}

function updateDisplays() {
	document.getElementById("op-display").textContent = finalEquation.join(" ");
	document.getElementById("num-display").textContent = numDisplay;
}

function add(a, b) { return a + b; }

function multiply(a, b) { return a * b; }

function subtract(a, b) { return a - b; }

function divide(a, b) { return (b != 0) ? a / b : 0; }

function pow(a, b) { return a ** b; }

function operate(input) {
	if (input.length == 1) {
		return input[0];
	}
	let output = input;
	
	let operators = [{char: "**", op: pow},
					 {char: "*", op: multiply},
					 {char: "/", op: divide},
					 {char: "+", op: add},
					 {char: "-", op: subtract}];
	for (let i = 0; i < operators.length; i++) {
		while (output.indexOf(operators[i].char) != -1) {
			let j = output.indexOf(operators[i].char);
			output.splice(j - 1, 3, operators[i].op(parseFloat(output[j-1]), parseFloat(output[j+1])));
		}
	}
	return output[0];
}
