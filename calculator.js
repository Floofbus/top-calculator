function add(a, b) { return a + b; }

function multiply(a, b) { return a * b; }

function subtract(a, b) { return a - b; }

function divide(a, b) { return a / b; }

function pow(a, b) { return a ** b; }

// Calculators always use algebraic precedence: (pow, sqrt) -> (mult, div) -> (add, sub)

// Instead of having one function that is called that waits for the input to be over
// we have to keep track of everything that gets entered individually and then operate
// on them only when the equals button has been pressed.

let testArray = [10, "+", 30, "*", 50, "-", 5, "**" , 2, "/", 15]; // 158.3r - 1.6r

function operate(input) {
	let output = input;
	
	let operators = [{char: "**", op: pow},
					 {char: "*", op: multiply},
					 {char: "/", op: divide},
					 {char: "+", op: add},
					 {char: "-", op: subtract}];
	for (let i = 0; i < operators.length; i++) {
		while (output.indexOf(operators[i].char) != -1) {
			let j = output.indexOf(operators[i].char);
			output.splice(j - 1, 3, operators[i].op(output[j-1], output[j+1]));
		}
	}
	return output[0];
}

console.log(operate(testArray));
