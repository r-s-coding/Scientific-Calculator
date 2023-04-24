// function tokenizeExpression(expression) {
//   const tokens = [];
//   let currentToken = "";

//   for (let i = 0; i < expression.length; i++) {
//     const char = expression[i];

//     if (isOperator(char)) {
//       // Check if the current "-" should be treated as a unary minus
//       if (char === "-" && (i === 0 || isOperator(expression[i - 1]) || expression[i - 1] === "(")) {
//         currentToken += "-";
//       } else {
//         // Push the current token to the array and reset it
//         if (currentToken !== "") {
//           tokens.push(currentToken);
//           currentToken = "";
//         }

//         tokens.push(char);
//       }
//     } else if (char === "(" || char === ")") {
//       // Push the current token to the array and reset it
//       if (currentToken !== "") {
//         tokens.push(currentToken);
//         currentToken = "";
//       }

//       tokens.push(char);
//     } else {
//       // Append the character to the current token
//       currentToken += char;
//     }
//   }

//   // Push the last token to the array
//   if (currentToken !== "") {
//     tokens.push(currentToken);
//   }

//   console.log("tokens: ", tokens);
//   return tokens;
// }

// function isOperator(char) {
//   return ["%", "/", "*", "-", "+", "!", "^"].includes(char);
// }

function tokenizeExpression(expression) {
	const tokens = [];
	let currentToken = "";

	for (let i = 0; i < expression.length; i++) {
		const char = expression[i];

		if (isOperator(char)) {
			// Check if the current "-" should be treated as a unary minus
			if (char === "-" && (i === 0 || isOperator(expression[i - 1]) || expression[i - 1] === "(")) {
				currentToken += "-";
			} else {
				// Push the current token to the array and reset it
				if (currentToken !== "") {
					tokens.push(currentToken);
					currentToken = "";
				}

				tokens.push(char);
			}
		} else if (char === "(" || char === ")") {
			// Push the current token to the array and reset it
			if (currentToken !== "") {
				tokens.push(currentToken);
				currentToken = "";
			}

			tokens.push(char);
		} else {
			// Append the character to the current token
			currentToken += char;
		}
	}

	// Push the last token to the array
	if (currentToken !== "") {
		tokens.push(currentToken);
	}

	console.log("tokens: ", tokens);
	return tokens;
}

function isOperator(char) {
	return ["%", "/", "*", "-", "+", "!", "^"].includes(char);
}


function infixToPostfix(displayedValue) {
	// Replace all HTML symbols with mathematical operators
	const expression = displayedValue
		.replace(/×/g, "*")
		.replace(/÷/g, "/")
		.replace(/−/g, "-")
		.replace(/π/g, "pi")
		.replace(/√/g, "sqrt");

	const tokens = tokenizeExpression(expression);
	const precedence = {
		"^": 4,
		"!": 3,
		"%": 2,
		"/": 2,
		"*": 2,
		"-": 1,
		"+": 1,
		"sin": 3,
		"sin⁻¹": 3,
		"cos": 3,
		"cos⁻¹": 3,
		"tan": 3,
		"tan⁻¹": 3,
		"ln": 3,
		"log": 3,
		"sqrt": 3,
		"pi": 0,
		"e": 0, // Right align like exponents
		"Ans": 0,
		"EXP": 3,
	};
	const stack = [];
	const output = [];

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];

		if (!isNaN(parseFloat(token))) {
			output.push(token);
		} else if (token === "pi" || token === "e" || token === "Ans") {
			output.push(token);
		} else if (token === "(") {
			stack.push(token);
		} else if (token === ")") {
			while (stack.length > 0 && stack[stack.length - 1] !== "(") {
				output.push(stack.pop());
			}
			// Pop the opening parenthesis from the stack
			stack.pop();
		} else {
			while (
				stack.length > 0 &&
				stack[stack.length - 1] !== "(" &&
				precedence[token] <= precedence[stack[stack.length - 1]]
			) {
				output.push(stack.pop());
			}
			stack.push(token);
		}
	}

	while (stack.length > 0) {
		output.push(stack.pop());
	}

	console.log("Postfix: ", output);
	return output;
}

function evaluatePostfix(expression) {
	const postfix = infixToPostfix(expression);
	const stack = [];

	for (let i = 0; i < postfix.length; i++) {
		const token = postfix[i];
		// Log token
		console.log('token: ', token);

		if (!isNaN(parseFloat(token))) {
			stack.push(parseFloat(token));
		} else if (token === "pi") {
			stack.push(Math.PI);
		} else if (token === "e") {
			stack.push(Math.E);
		} else if (token === "Ans") {
			// Get the value of the previous answer
			stack.push(parseFloat(previousAnswer));
		} else if (token === "+") {
			const operand2 = stack.pop();
			const operand1 = stack.pop();
			stack.push(operand1 + operand2);
		} else if (token === "-") {
			const operand2 = stack.pop();
			const operand1 = stack.pop();
			stack.push(operand1 - operand2);
		} else if (token === "*") {
			const operand2 = stack.pop();
			const operand1 = stack.pop();
			stack.push(operand1 * operand2);
		} else if (token === "/") {
			const operand2 = stack.pop();
			const operand1 = stack.pop();
			stack.push(operand1 / operand2);
		} else if (token === "%") {
			const operand = stack.pop();
			stack.push(operand / 100);
		} else if (token === "sin") {
			const operand = stack.pop();
			stack.push(Math.sin(operand));
		} else if (token === "sin⁻¹") {
			const operand = stack.pop();
			stack.push(Math.asin(operand));
		} else if (token === "cos") {
			const operand = stack.pop();
			stack.push(Math.cos(operand));
		} else if (token === "cos⁻¹") {
			const operand = stack.pop();
			stack.push(Math.acos(operand));
		} else if (token === "tan") {
			const operand = stack.pop();
			stack.push(Math.tan(operand));
		} else if (token === "tan⁻¹") {
			const operand = stack.pop();
			stack.push(Math.atan(operand));
		} else if (token === "ln") {
			const operand = stack.pop();
			stack.push(Math.log(operand));
		} else if (token === "log") {
			const operand = stack.pop();
			stack.push(Math.log10(operand));
		} else if (token === "sqrt") {
			const operand = stack.pop();
			stack.push(Math.sqrt(operand));
		} else if (token === "EXP") {
			const operand2 = stack.pop();
			const operand1 = stack.pop();
			stack.push(operand1 * 10 ^ operand2);
		} else if (token === "^") {
			const operand2 = stack.pop();
			const operand1 = stack.pop();
			stack.push(Math.pow(operand1, operand2));
		} else if (token === "!") {
			const operand = stack.pop();
			let result = 1;
			for (let j = 2; j <= operand; j++) {
				result *= j;
			}
			stack.push(result);
		}
		if (isNaN(stack[0])) {
			throw new Error("Result is NaN");
		}
		// Show current stack
		console.log('stack: ', stack);
	}



	// Save the result as the previous answer
	previousAnswer = stack[0];

	return stack[0];
}



// // Define a precedence map for the operators
// const precedence = {
//   '+': 1,
//   '-': 1,
//   '*': 2,
//   '/': 2,
//   '^': 3,
//   'sin': 4,
//   'cos': 4,
//   'tan': 4
// };

// // Define a function to tokenize the input string
// function tokenize(expr) {
//   const tokens = [];
//   let i = 0;

//   while (i < expr.length) {
//     let char = expr[i];

//     if (char === '-' && (i === 0 || ['+', '-', '*', '/', '^', '('].includes(expr[i - 1]))) {
//       // This is a negative number
//       let j = i + 1;
//       while (j < expr.length && /\d|\./.test(expr[j])) {
//         char += expr[j];
//         j++;
//       }
//       tokens.push(parseFloat(char));
//       i = j;
//     } else if (/\d|\./.test(char)) {
//       // This is a number
//       let j = i + 1;
//       while (j < expr.length && /\d|\./.test(expr[j])) {
//         char += expr[j];
//         j++;
//       }
//       tokens.push(parseFloat(char));
//       i = j;
//     } else if (/[+\-*/^()]/.test(char)) {
//       // This is an operator or a parenthesis
//       tokens.push(char);
//       i++;
//     } else if (/sin|cos|tan/.test(expr.slice(i, i + 3))) {
//       // This is a trigonometric function
//       tokens.push(expr.slice(i, i + 3));
//       i += 3;
//     } else {
//       // Ignore whitespace and other characters
//       i++;
//     }
//   }

//   return tokens;
// }

// // Define a function to convert the infix expression to postfix
// function toPostfix(displayedValue) {
//   const expr = displayedValue
//     .replace("×", "*")
//     .replace("÷", "/")
//     .replace("−", "-")
//     .replace("π", "pi")
//     .replace("√", "sqrt");
//   const tokens = tokenize(expr);
//   const stack = [];
//   const output = [];

//   for (let i = 0; i < tokens.length; i++) {
//     let token = tokens[i];

//     if (typeof token === 'number') {
//       output.push(token);
//     } else if (token === 'sin' || token === 'cos' || token === 'tan') {
//       // This is a function
//       stack.push(token);
//     } else if (token === '(') {
//       // Push opening parenthesis to the stack
//       stack.push(token);
//     } else if (token === ')') {
//       // Pop everything from the stack until we reach the opening parenthesis
//       while (stack.length > 0 && stack[stack.length - 1] !== '(') {
//         output.push(stack.pop());
//       }
//       if (stack.length > 0 && stack[stack.length - 1] === '(') {
//         stack.pop(); // Pop the opening parenthesis
//       }
//       if (stack.length > 0 && (stack[stack.length - 1] === 'sin' || stack[stack.length - 1] === 'cos' || stack[stack.length - 1] === 'tan')) {
//         // This is a function
//         output.push(stack.pop());
//       }
//     } else if (['+', '-', '*', '/', '^'].includes(token)) {
//       // This is an operator
//       while (stack.length > 0 && ['+', '-', '*', '/', '^', 'sin', 'cos', 'tan'].includes(stack[stack.length - 1]) && precedence[token] <= precedence[stack[stack.length - 1]]) {
//         output.push(stack.pop());
//       }
//       stack.push(token);
//     }
//   }

//   // Pop any remaining operators from the stack
//   while (stack.length > 0) {
//     output.push(stack.pop());
//   }

//   return output;
// }

// // Define a function to evaluate the postfix expression
// function evaluate(expr) {
//   const stack = [];

//   for (let i = 0; i < expr.length; i++) {
//     let token = expr[i];

//     if (typeof token === 'number') {
//       stack.push(token);
//     } else if (token === 'sin') {
//       stack.push(Math.sin(stack.pop()));
//     } else if (token === 'cos') {
//       stack.push(Math.cos(stack.pop()));
//     } else if (token === 'tan') {
//       stack.push(Math.tan(stack.pop()));
//     } else if (['+', '-', '*', '/', '^'].includes(token)) {
//       let operand2 = stack.pop();
//       let operand1 = stack.pop();
//       let result;
//       switch (token) {
//         case '+': result = operand1 + operand2; break;
//         case '-': result = operand1 - operand2; break;
//         case '*': result = operand1 * operand2; break;
//         case '/': result = operand1 / operand2; break;
//         case '^': result = Math.pow(operand1, operand2); break;
//       }
//       stack.push(result);
//     }
//   }

//   return stack.pop();
// }

