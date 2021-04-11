/*------ Variables ----- */
let number1 = ''
let number2 = ''
let operator = ''
let calcSum = 1;


/*------ Selecting elements ----- */
var arrNumbers = document.querySelectorAll('.number');
//console.log(arrNumbers);

var arrOperators = document.querySelectorAll('.operator');
//console.log('arrOperators', arrOperators);

var objMaths = document.querySelector('.maths');
//console.log('objMaths', objMaths);

var objPreview = document.querySelector('.preview');
//console.log('objPreview', objPreview);

var objClear = document.querySelector('.clear');
//console.log('objClear', objClear);

var objEquals = document.querySelector('.equal');
console.log('objEqual', objEquals);

var objDecimal = document.querySelector('.decimal');
//console.log('objDecimal', objDecimal);
var objRandom = document.querySelector('.random');
//console.log('objRandom', objRandom);


/*------ Events listners ----- */
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
objRandom.addEventListener('click', preview)


/*------ Functions ----- */
function preview(event) {
  //console.log(event.target.innerHTML);
  let currentItem = event.target.innerHTML;
  let dataType = '';
  let strMessage = '';

  switch(currentItem) {
    case '*': case 'x':
    case '/': case '&div;': case '÷':
    case '+':
    case '-':
      dataType = 'operator';
      break;
    
    case 'R':
    case 'r':
      dataType = 'number';
      currentItem = Math.floor(Math.random() * 10).toString();
      break;
    default:
      dataType = 'number';
      break;
  }

  switch (currentItem) {
    case '&div;': case '÷':
      currentItem = '/';
      break;
    case 'x':
      currentItem = '*';
      break;
  }

  console.log('currentItem', currentItem);
  console.log('dataType', dataType);

  if (calcSum == 1) {
    //objPreview.value = objMaths.value.toSting();
    number1 = objMaths.value;
    number2 = '';
    objMaths.value = '';
    calcSum = 0;
  }

  if (dataType == 'operator') {
    if(number1) {
      operator = currentItem;
      strMessage = number1 + ' ' + operator;
      if (number2) {
        strMessage += ' ' + number2;
      }
    } else {
      console.log('You cannot set an operator without a number being set');
    }
  } else {

    if (operator) {
      
      if (number2) {
        number2 += currentItem;
      } else {
        number2 = currentItem;
      }
      strMessage = number1 + ' ' + operator + ' ' + number2;
    } else {

      if (number1) {
        number1 += currentItem;
      } else {
        number1 = currentItem;
      }
      strMessage = number1;
    }
    
  }

  if (!number1.isNaN) {
    strMessage = number1.toString();
  }
  if (operator) {
    strMessage += ' ' + operator + ' ';
  }
  if(!number2.isNaN) {
    strMessage += number2.toString();
  }

  objPreview.value = strMessage;
  

}


function clear(event) {
  number1 = "";
  number2 = "";
  operator = "";
  objPreview.value = "";
  objMaths.value = "";
  calcSum = 0;
}


function equals(event) {
  var sum = calculator(number1, number2, operator);
  objMaths.value = sum;
  calcSum = 1;
}

//Adding a validation function for the numbers
function isValidNumber(number){
  //We are using a double negative as inNaN returns false on valid numbers
  return !isNaN(number);
}
function calculator(number1,number2,operator){
  //if number1 is not a number
  if(!isValidNumber(number1)){
      //end the function here and pass the message below.
      return 'Argument 1 must be a number';
  }
  //if number 2 is not a number
  if(!isValidNumber(number2)){
      //end the function here and pass the message below.
      return 'Argument 2 must be a number';
  }
  // if the operator does not equal + - * / %
  if(operator != '+' && operator != '-' && operator != '*' && operator != '/' && operator != '%'){
      //end the function here and pass the message below.
      return 'Argument 3 must be an arithmatic operator';
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