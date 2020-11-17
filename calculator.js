// Set up event handlers:
let allButtons = Array.from(document.querySelectorAll(".button"));
for (let i = 0; i < allButtons.length; i++) {
	allButtons[i].addEventListener('click', handleButton);
}

let finalEquation = [];
let numDisplay = "0";

function handleButton(event) {
	let key = event.target.getAttribute('data-key');
	if (numDisplay == "Math is hard" && key != "clr") {
		if (Array.from(event.target.classList).includes("calc-fn")) {
			alert("STOP! YOU'VE VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR SENTENCE! YOUR STOLEN GOODS ARE NOW FORFEIT, VANDAL!");
			numDisplay = "0";
		}
		numDisplay = "0";
	}
	else if (Array.from(event.target.classList).includes("calc-num")) {
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
	if (result.toString().length > 10) {
		if (result > 9999999999) {
			numDisplay = "Math is hard";
		}
		else {
			if (result < 10) numDisplay = result.toFixed(9);
			else if (result < 100) numDisplay = result.toFixed(8);
			else if (result < 1000) numDisplay = result.toFixed(7);
			else if (result < 10000) numDisplay = result.toFixed(6);
			else if (result < 100000) numDisplay = result.toFixed(5);
			else if (result < 1000000) numDisplay = result.toFixed(4);
			else if (result < 10000000) numDisplay = result.toFixed(3);
			else if (result < 100000000) numDisplay = result.toFixed(2);
			else if (result < 1000000000) numDisplay = result.toFixed(1);
			else { numDisplay = resut.toFixed(0); }
		}
	} 
	else {
		numDisplay = result;
	}
	finalEquation = [];
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
