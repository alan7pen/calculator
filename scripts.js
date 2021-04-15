/*

So what does it mean that comments are a code-smell: 
it means that when you see a comment, 
you should pause and think: "Hmmm, I sense a hint that something could be improved".

that said, lets crack on
*/




/*------ Global Variables ----- */

// set default values
let number1 = ''
let number2 = ''
let operator = '', blnEquals = false

const CHAMPION = 'All it champion, crack on !!!';


/*------ Selecting elements ----- */
var arrNumbers = document.querySelectorAll('.number'); // array of number objects
//console.log(arrNumbers);

var arrOperators = document.querySelectorAll('.operator'); // arrat of operator objects
//console.log('arrOperators', arrOperators);

// get the object for specific fields
var objPrevious = document.querySelector(".previous");
//console.log('previous', objPrevious);

var objPreview = document.querySelector('.preview');
//console.log('objPreview', objPreview);

var objMaths = document.querySelector('.maths');
//console.log('objMaths', objMaths);

var objClear = document.querySelector('.clear');
//console.log('objClear', objClear);

var objEquals = document.querySelector('.equal');
//console.log('objEqual', objEquals);

var objError = document.querySelector(".error");
//console.log('objError', objError);

var objDecimal = document.querySelector('.decimal');
//console.log('objDecimal', objDecimal);

var objRandom = document.querySelector('.random');
console.log('objRandom', objRandom);


// here is an opportunity to call the clear function to ensure all are in sync
clearPage();




/*------ Events listners ----- */
// using the object reference, set event listener to invoke associated callback function
// loop through array to add listners...
for(let counter = 0; counter < arrNumbers.length; counter++) {
  //console.log(arrNumbers[counter]);
  objNumber = arrNumbers[counter];
  objNumber.addEventListener('click', preview);
}

for(let counter = 0; counter < arrOperators.length; counter++) {
  //console.log(arrNumbers[counter]);
  objOperator = arrOperators[counter];
  objOperator.addEventListener('click', preview);
}

objClear.addEventListener('click', clear);
objEquals.addEventListener('click', equals);
objDecimal.addEventListener("click", preview);
objRandom.addEventListener("click", preview);




/*------ Functions ----- */



// called by digits (0...9 and decimal place or operators + - / *)

function preview(event) {
  //console.log(event.target.innerHTML);
  //console.log('blnEquals', blnEquals);


  // really wish we had NOT focused on nesting if/else as over complicates the workings of the function...
  // the following is in real of refactoring
  // ideally we should split into smaller helper functions...
  // will look at this in due coure...first one would be pushed over would be the dataType
  // then 


  let currentItem = event.target.innerHTML;
  let dataType = '';
  let strMessage = '';
  objError.innerHTML = CHAMPION;

  if (currentItem.toUpperCase() == 'R') {
    //currentItem = 
    currentItem = Math.floor(Math.random() * 10).toString();
  }
  
  // look at object (innerHTML) that called function to decide if operator or number
  switch(currentItem) {
    case '*': case 'x':
    case '/': case '&div;': case '÷':
    case '+':
    case '-':
      dataType = 'operator';
      break;
    default:
      dataType = 'number';
      break;
  }

  
  // change operator type where necessary
  switch (currentItem) {
    case '&div;': case '÷':
      currentItem = '/';
      break;
    case 'x':
      currentItem = '*';
      break;
  }

  console.log('currentItem', currentItem);
  //console.log('dataType', dataType);


  if (dataType == 'operator') {

    if(blnEquals) {
      blnEquals = false;
    }

    
    // when number calc number1, clear 2, set previous
    if (number2) {
      number1 = calculator(number1,number2,operator);
      number2 = "";
      objPrevious.value = objPreview.value;
      objMaths.value = "";
    }

    // display number1 with operator
    // otheriwse throw error to
    if (number1) {
      operator = currentItem;
      strMessage = number1 + ' ' + operator;
    } else {
      // when click op withn not first puttinga number in
      objError.innerHTML = 'You cannot set an operator without a number being set';
      return;
    }

  // not an operator; so could be a digit / number
  } else {

    // when equals true; clear number1, previous and toggle it off
    if (blnEquals){
      number1 = "";
      objPrevious.value = "";
      blnEquals = false;
    }
    
    // 
    if (operator) {
     
      // add digit/decimal (allow only 1)
      if (number2) {
        if (currentItem == '.') {
          if (!hasDecimal(number2)) {
              number2 += currentItem;
          }

        } else {

          number2 += currentItem;

        }

      } else {

        // if no digit before decimal put leading zero; otherwise place on end
        if (currentItem == '.') {
          number2 = '0.';
        } else {
          number2 = currentItem;
        }
      }

      // update message and calc sum
      strMessage = number1 + ' ' + operator + ' ' + number2;
      var sum = calculator(number1, number2, operator);
      objMaths.value = sum;

    } else {

      // add digit/decimal (allow only 1)
      if (number1) {

        if (currentItem == '.') {
          if (!hasDecimal(number1)) {
              number1 += currentItem;
          }
        } else {
          number1 += currentItem;
        }
      } else {

        // if no digit before decimal put leading zero; otherwise place on end
        if (currentItem == '.') {
          number1 = '0.';

        } else {
          number1 = currentItem;
        }
      }

      // set message as number1
      strMessage = number1;

    }
    
  }

  // update preview with message from above...
  objPreview.value = strMessage;
  
}




function clear(event) {
    clearPage();
}




function clearPage() {
  // speaks for itself, clear the deck when operator presses 'C'
  number1 = "";
  number2 = "";
  operator = "";
  objPrevious.value = "";
  objPreview.value = "";
  objMaths.value = "";
  objError.innerHTML = CHAMPION;
  blnEquals = true;
}




function equals(event) {
  // calculates sum
  // if returns value, update fields and clear number2/operator/equals flag
  var sum = calculator(number1, number2, operator);

  if(sum) {
    objMaths.value = "";
    objPrevious.value = objPreview.value; // move contents of preview to previous
    objPreview.value = sum; // show sum of calculation
    blnEquals = true; 
    number1 = sum; // updates number1 with value of the calculation
    number2 = "";
    operator = "";
  }

}




function hasDecimal(number){
  // returns true/false if decimal point is present
  // how:
  //    gets position of decimal point in string; this is zero based, when not found will be -1
  //    if not found (i.e. > -1), set error message and true
  //    if not found return false
  if(number.indexOf('.') !== -1){
      objError.innerHTML = 'You can only have one decimal place per number';
      return true;
  }
  return false;
}


//Adding a validation function for the numbers
function isValidNumber(number){
  //We are using a double negative as inNaN returns false on valid numbers
  return !isNaN(number);
}
function calculator(number1,number2,operator){
  //if number1 is not a number
  if(!isValidNumber(number1) || !number1){
      //end the function here and pass the message below.
      objError.innerHTML = 'Number 1 must be set';
      return;
  }
    // if the operator does not equal + - * / %
  //if(operator != '+' && operator != '-' && operator != '*' && operator != '/' && operator != '%'){
  if(operator != '+' && operator != '-' && operator != '*' && operator != '/' && operator != '%'){
    //end the function here and pass the message below.
    objError.innerHTML =  'You need to set an operator';
    return;
  }
  //if number 2 is not a number
  if(!isValidNumber(number2) || !number2){
      //end the function here and pass the message below.
      objError.innerHTML =  'Number2 must be set';
      return;
  }

  //all fo the validation has passed so we need to do maths
  var sum;
  //based on the operator passed in argument 3 we will do a different sum
  switch(operator){
      case '+':
          sum = parseFloat(number1) + parseFloat(number2);
      break;
      case '-':
          sum = number1 - number2;
      break;
      case '*':
          sum = number1 * number2;
      break;
      case '/':
          sum = number1 / number2;
      break;
      case '%':
          sum = number1 % number2;
      break;
  }
  //return the value of the sum
  return sum;
}