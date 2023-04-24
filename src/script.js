document.addEventListener("DOMContentLoaded", function (event) {
  // Controls which layout is displayed for the mobile screen
  const switchBtnGroup = document.querySelector('.switch');
  const switchToggleButtons = switchBtnGroup.querySelectorAll('.btn');
  // Switches which layout is active by clicking on the button
  switchBtnGroup.addEventListener('click', () => {
    switchToggleButtons.forEach(button => {
      button.classList.toggle('active');
    });
    // Sliding transition for the small screen using Boostrap carousel
    const carousel = document.querySelector('.carousel');
    const slideIndex = document.querySelector('.btn-bd-toggleButton.active').textContent === '123' ? 0 : 1;
    const bsCarousel = new bootstrap.Carousel(carousel);
    carousel.setAttribute('data-bs-slide-to', slideIndex);
    carousel.dispatchEvent(new Event('slide.bs.carousel'));
    // Trigger carousel slide transition
    bsCarousel.to(slideIndex);
  });

  // Keep track of the active state of the radDeg buttons
  let radDegActive = true;
  const radDegBtnGroups = document.querySelectorAll('.radDeg');
  radDegBtnGroups.forEach(radDegBtnGroup => {
    const radDegToggleButtons = radDegBtnGroup.querySelectorAll('.btn');
    radDegBtnGroup.addEventListener('click', () => {
      // Toggle the active state of the buttons
      radDegToggleButtons.forEach(button => {
        button.classList.toggle('active');
      });
      // Update the active state variable
      radDegActive = radDegToggleButtons[0].classList.contains('active');
      // Update the active state of the buttons in both instances
      radDegBtnGroups.forEach(group => {
        const buttons = group.querySelectorAll('.btn');
        buttons.forEach(button => {
          if (button.textContent === 'Rad') {
            button.classList.toggle('active', radDegActive);
          } else {
            button.classList.toggle('active', !radDegActive);
          }
        });
      });
    });
  });

  // Click event listener for the Inverse buttons
  const invButtons = document.querySelectorAll('.btn-bd-inv');
  // Toggles the inverse functions
  let invCheck = true;
  // Get all buttons with data-text1 and data-text2 attributes
  const inverseButtons = document.querySelectorAll('.btn-inv');
  const normalButtons = document.querySelectorAll('.btn-norm')
  // Updates the display of the inverse button
  invButtons.forEach(invButton => {
    invButton.addEventListener('click', () => {
      invCheck = !invCheck;
      invButtons.forEach(button => {
        button.classList.toggle('active');
      });
      // Updates the functions to show their inverse
      if (invCheck) {
        inverseButtons.forEach(altButton => {
          altButton.classList.add('d-none');
        });
        normalButtons.forEach(altButton => {
          altButton.classList.remove('d-none');
        });
      } else {
        inverseButtons.forEach(altButton => {
          altButton.classList.remove('d-none');
        });
        normalButtons.forEach(altButton => {
          altButton.classList.add('d-none');
        });
      }
    });
  });

  // Displaying the text content of the clicked button on screen
  //Getting the reference for the input field and the numeric and scientific buttons
  const inputField = document.getElementById('inputBox');
  const numericButtons = document.querySelectorAll('.numeric-buttons button');
  const scientificButtons = document.querySelectorAll('.scientific-buttons button');
  const ceButtons = document.querySelectorAll('.btn-ce');
  const equalButtons = document.querySelectorAll('.btn-equal');
  // History of buttons clicked
  let currentValue = [];
  let expressionHistory = [];
  // Flags that listens for the superscript values
  let superscriptFlag = false;
  let nthrootFlag = false;
  let temp = "";
  let tempVal = "";
  // Buttons that should not be displayed
  let hideBtns = ['Inv', 'Rad', 'Deg', '=', "EXP", "x!", "xy", "ex", "10x", "x2", "y√x", "Rnd", "CE"];
  // Operators
  const operators = ["×", "÷", "−", "+", "CE"];
  // Click event listener for the numeric buttons
  numericButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Clears the display after an expresion has been evaluated if the 'AC' button hasn't been clicked
      toggleACandCE();
      if (nthrootFlag) {
        tempVal += (operators.includes(button.textContent)) ? "" : button.textContent;
        inputField.innerHTML = inputField.innerText.slice(0, nthroot()) + '<sup>' + tempVal + '</sup>' + "√" + temp;
      } else if (superscriptFlag) {
        inputField.innerHTML += "<sup>" + button.textContent + "</sup>";
        currentValue.push(button.textContent);
      } else if (hideBtns.includes(button.textContent)) {
        inputField.innerHTML += '';
      } else {
        inputField.innerHTML += button.innerHTML;
        currentValue.push(button.textContent);
      }
      // Automatically scroll to the right of the expression
      inputField.scrollLeft = inputField.scrollWidth;
    });
  });

  // Functions that require a bracket
  let bracketFunctions = ['sin', 'cos', 'tan', 'ln', 'log', '√', 'sin⁻¹', 'cos⁻¹', 'tan⁻¹']
  // Click event listener for the scientific buttons
  scientificButtons.forEach(button => {
    // Clears the display after an expresion has been evaluated if the 'AC' button hasn't been clicked
    button.addEventListener('click', () => {
      toggleACandCE();
      if (hideBtns.includes(button.textContent)) {
        if (button.textContent === "EXP" && inputField.innerHTML) {
          inputField.innerHTML += "E";
          currentValue.push("E");
        } else if (button.textContent === "x!") {
          inputField.innerHTML += "!";
          currentValue.push("!");
        } else if (button.textContent === "xy" && inputField.innerHTML) {
          superscriptFlag = true;
          currentValue.push("^", "(");
        } else if (button.textContent === "ex") {
          superscriptFlag = true;
          inputField.innerHTML += 'e';
          currentValue.push("e^", "(");
        } else if (button.textContent === "10x") {
          superscriptFlag = true;
          inputField.innerHTML += '10';
          currentValue.push("10^");
        } else if (button.textContent === "x2" && inputField.innerHTML) {
          inputField.innerHTML += "<sup>" + "2" + "</sup>";
          currentValue.push("^2");
        } else if (button.textContent === "y√x" && inputField.innerHTML) {
          temp = inputField.textContent.substring(nthroot(), inputField.textContent.length);
          inputField.innerText = inputField.innerText.slice(0, nthroot());
          inputField.innerHTML += "√" + temp;
          nthrootFlag = true;
          currentValue.push("^", "(", "1", "/");
        } else if (button.textContent === "Rnd") {
          let randomNum = math.random(0, 1).toString()
          if (inputField.innerHTML) {
            inputField.innerHTML += "×" + randomNum;
          } else {
            inputField.innerHTML += randomNum;
          }
          currentValue.push(randomNum);
        } else {
          inputField.innerHTML += '';
        }
      } else {
        inputField.innerHTML += button.innerHTML;
        currentValue.push(button.textContent);
        if (bracketFunctions.includes(button.textContent)) {
          inputField.innerHTML += '(';
          currentValue.push('(');
        }
      }
      inputField.scrollLeft = inputField.scrollWidth;
      resetDisplay(inputField.innerText);
    });
  });

  // Click event listener for the CE button
  ceButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Resets superscript flag
      superscriptFlag = false;
      nthrootFlag = false;
      // Clears the display if the AC button is displayed else removes the last button input from the display
      if (button.textContent === 'AC') {
        inputField.innerHTML = '0';
        currentValue = [];
      } else if (inputField.innerHTML.length >= 1) {
        currentValue.splice(-1);
        inputField.innerHTML = currentValue.join('');
      }
      resetDisplay(inputField.innerText);
    });
  });

  // Click event listener for the '=' button
  let previousResult = ""
  equalButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Disable the superscript
      superscriptFlag = false;
      nthrootFlag = false;
      // Push the nthRoot
      currentValue.push(tempVal);
      // Find and close any open brackets
      const openBrackets = currentValue.filter(num => num === '(').length;
      const closeBrackets = currentValue.filter(num => num === ')').length;
      if (openBrackets !== closeBrackets && openBrackets > closeBrackets) {
        const difference = openBrackets - closeBrackets;
        inputField.innerHTML += Array(difference + 1).join(')');
        currentValue = currentValue.concat(Array(difference).fill(")"));
      }
      // Stores the expression in an array for future callbacks
      expressionHistory.push(currentValue);
      // Evaluates the displayed expression
      try {
        inputField.textContent = evaluateExpression(currentValue.join(""), previousResult);
        previousResult = inputField.textContent.toString();
      } catch (error) {
        inputField.textContent = "ERROR";
      }
      // Updates the currentValue expression
      currentValue = [];
      superscript = '';
      temp = "";
      tempVal = "";
      // Updates the 'CE' button after the expression has been evaluated
      ceButtons.forEach(button => {
        button.textContent = 'AC';
      });
    });
  });

  // Always display 0 when there is no text on screen
  function resetDisplay(displayText) {
    if (!displayText) {
      inputField.innerHTML = '0'
    }
  }

  // Toggles the button text between 'AC' and 'CE', removes the leading 0 from the display
  function toggleACandCE() {
    if (ceButtons[0].textContent === 'AC') {
      inputField.innerHTML = '0';
      ceButtons.forEach(button => {
        button.textContent = 'CE';
      });
    }

    if (inputField.innerHTML === '0') {
      inputField.innerHTML = '';
    }
  }

  // Returns the index of the first operator found staring from the end of the expression
  function nthroot() {
    for (let i = inputField.innerText.length - 1; i >= 0; i--) {
      if (operators.includes(inputField.innerText[i])) {
        return i + 1;
      }
    }
    return 0;
  }

  // Modifies the syntax and evaluates the expression
  function evaluateExpression(displayedValue, previousResult) {
    let expression = displayedValue
    if (radDegActive) {
      expression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/π/g, "pi")
        .replace(/√/g, "sqrt")
        .replace(/log/g, "log10")
        .replace(/ln/g, "log")
        .replace(/√/g, "sqrt")
        .replace(/E/g, "E0")
        .replace(/Ans/g, previousResult)
        .replace(/sin⁻¹/g, "asin")
        .replace(/cos⁻¹/g, "acos")
        .replace(/tan⁻¹/g, "atan")
        .replace(/=/g, "");
    } else {
      expression = expression
        .replace(/sin\(/g, "sin((pi/180)")
        .replace(/cos\(/g, "cos((pi/180)")
        .replace(/tan\(/g, "tan((pi/180)")
        .replace(/sin⁻¹/g, "(180/pi)asin")
        .replace(/cos⁻¹/g, "(180/pi)acos")
        .replace(/tan⁻¹/g, "(180/pi)atan");
    }
    return math.evaluate(expression);
  }
});


