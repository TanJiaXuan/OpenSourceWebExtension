(function() {
  'use strict';

  //shortcut to get elements
  var el = function(element) {
    if (element.charAt(0) === '#') {
      // If passed an ID...

      return document.querySelector(element); // ... returns single element
    }

    return document.querySelectorAll(element); // Otherwise, returns a nodelist
  };

  //calculator variables
  var viewer = el('#viewer'), // Calculator screen to display result
    warning = el('#warning'), //Warning or Error message
    formulaDisplay = el('#formulaDisplay'), //Formula Display Message
    formulaList = el('#formulaList'), //List of Formula
    check = el('#check'), //Check Formula Button
    equals = el('#equals'), // Equal button
    nums = el('.num'), // List of numbers
    ops = el('.ops'), // List of operators
    prevAns = el('#prevAns'),
    currentNum = '', // Current number
    oldNum = '', // First number
    resultNum = '', // Result
    prevAnsNum = '', // Previous Answer
    operator; // Operand

  // When: Number is clicked. Get the current number selected
  var setNum = function() {
    if (resultNum) {
      // If a result was displayed, reset number
      currentNum = this.getAttribute('data-num');

      resultNum = '';
    } else {
      // Otherwise, add digit to previous number
      currentNum += this.getAttribute('data-num');
    }

    viewer.innerHTML = currentNum; // Display current number
  };

  // When: Previous Answer is clicked, get the previous result.
  var setPrevAns = function() {
    if (prevAnsNum == '') {
      currentNum = '0';
    } else {
      currentNum = prevAnsNum;
    }

    viewer.innerHTML = currentNum;
  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  var moveNum = function() {
    oldNum = currentNum;

    currentNum = '';

    operator = this.getAttribute('data-ops');

    equals.setAttribute('data-result', ''); // Reset result
  };

  // When: Equals is clicked. Calculate result
  var displayResults = function() {
    // Convert string input to numbers
    oldNum = parseFloat(oldNum);

    currentNum = parseFloat(currentNum);

    // Perform operation
    switch (operator) {
      case 'plus':
        resultNum = oldNum + currentNum;

        break;

      case 'minus':
        resultNum = oldNum - currentNum;

        break;

      case 'times':
        resultNum = oldNum * currentNum;

        break;

      case 'divided by':
        resultNum = oldNum / currentNum;

        break;

      // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = currentNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        resultNum = '';

        warning.innerHTML =
          'Warning: Please do not use two operands in a single calculation';
      } else {
        resultNum = '';

        warning.innerHTML = 'Warning: Please do not divide by 0';
      }
    }

    // Display result
    viewer.innerHTML = resultNum;

    equals.setAttribute('data-result', resultNum);

    // Now reset oldNum & keep result, set previous answer as result
    oldNum = 0;

    currentNum = resultNum;

    prevAnsNum = resultNum;
  };

  // When: Clear button is pressed. Clear everything, except previous answer
  var clearAll = function() {
    oldNum = '';

    currentNum = '';

    viewer.innerHTML = '0';

    equals.setAttribute('data-result', resultNum);
  };

  // When: Clear button is pressed. Clear everything, except previous answer
  var clearAllAC = function() {
    oldNum = '';

    currentNum = '';

    viewer.innerHTML = '0';

    prevAnsNum = 0;

    equals.setAttribute('data-result', resultNum);
  };

  /* Click events */

  // Add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayResults;

  // Add click event to previous answer
  prevAns.onclick = setPrevAns;

  // Add click event to clear button
  el('#clear').onclick = clearAll;

  currency;

  el('#clearAC').onclick = clearAllAC;

  // Add click event for changing formula
  formulaList.onclick = changeFormula;

})();
