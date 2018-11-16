let displayArea = document.getElementById("display-area");
let formulaArea = document.getElementById("formula-area");
let firstNum = "";
let firstNumChosen = false;
let operator = "";
let operatorChosen = false;
let secondNum = "";
let secondNumChosen = false;
let decimalUsed = false;
let computed = false;
let tempNum = "";
let tempFunc = "";

let allButtons = Array.from(
   document.getElementsByClassName("button")
   );

allButtons.forEach(function(button) {
   button.addEventListener("click", function() {
      
      if(!firstNumChosen) {
         if(this.classList.contains("number") || this.dataset.val == "decimal") {
            if(this.dataset.val == "decimal" && !decimalUsed) {
               firstNum = firstNum.concat(".");
               decimalUsed = true;
               displayArea.textContent = firstNum;
            } else if(this.classList.contains("number")) {
               firstNum = firstNum.concat(this.dataset.val);
               displayArea.textContent = firstNum;
            }
         }
         
         if(firstNum && this.dataset.val == "negative" && !operator) {
            if(firstNum[0] == "-") {
               firstNum = firstNum.substring(1);
               displayArea.textContent = firstNum;
            } else {
               firstNum = "-" + firstNum;
               displayArea.textContent = firstNum;
            }
         }
      }
      
      if(!operatorChosen ) {
         if(this.classList.contains("function")) {
            firstNumChosen = true;
            decimalUsed = false;
            operator = this.dataset.val;
         }
      }

      if(!secondNumChosen && firstNumChosen && operator != "") {
         if(this.classList.contains("number") || this.dataset.val == "decimal") {
            operatorChosen = true;
            if(this.dataset.val == "decimal" && !decimalUsed) {
               secondNum = secondNum.concat(".");
               decimalUsed = true;
               displayArea.textContent = secondNum;
            } else if(this.classList.contains("number")) {
               secondNum = secondNum.concat(this.dataset.val);
               displayArea.textContent = secondNum;
            }
         }
         
         if(secondNum && this.dataset.val == "negative") {
            if(secondNum[0] == "-") {
               secondNum = secondNum.substring(1);
               displayArea.textContent = secondNum;
            } else {
               secondNum = "-" + secondNum;
               displayArea.textContent = secondNum;
            }
         }
      }     

      if(firstNumChosen && operatorChosen && secondNum) {
         if(this.dataset.val == "equals") {
            secondNumChosen = true;
            let a = Number(firstNum);
            let b = Number(secondNum);
            switch(operator) {
               case "add":
                  firstNum = add(a,b);
                  displayArea.textContent = shrinkNum(firstNum);
                  firstNum = firstNum.toString();
                  operator = "";
                  secondNum = "";
                  break;
               case "multiply":
                  firstNum = multiply(a, b);
                  displayArea.textContent = shrinkNum(firstNum);
                  firstNum = firstNum.toString();
                  operator = "";
                  secondNum = "";
                  // halfResetter();
                  break;
               case "subtract":
                  firstNum = subtract(a,b);
                  displayArea.textContent = shrinkNum(firstNum);
                  firstNum = firstNum.toString();
                  operator = "";
                  secondNum = "";
                  // halfResetter();
                  break;
               case "divide":
                  firstNum = divide(a,b);
                  displayArea.textContent = shrinkNum(firstNum);
                  firstNum = firstNum.toString();
                  operator = "";
                  secondNum = "";
                  // halfResetter();
                  break;
            }
         }
      }
      
      if(secondNumChosen) {
         if(this.classList.contains("number")) {
            tempNum = this.dataset.val;
            console.log("tempNum is " + tempNum);
            fullReset();
            firstNum = tempNum;
            displayArea.textContent = firstNum;
            tempNum = "";
         } else if(this.classList.contains("function")) {
            tempFunc = this.dataset.val;
            halfResetter();
            operator = tempFunc;
            tempFunc = "";
         }
      } 
      
      if(this.dataset.val == "clear") {
         fullReset();
      }
      
      formulaArea.textContent = firstNum + " " + toSymbol(operator) + " " + secondNum;
      
      // console.log("-----------------------------------------")
      // console.log("firstNumChonsen? " + firstNumChosen)
      // console.log("firstNum is " + firstNum);
      
      // console.log("operatorChosen? " + operatorChosen);
      // console.log("operator is " + operator)
      
      // console.log("secondNumChonse? " + secondNumChosen);
      // console.log("secondnUm is " + secondNum);
      
      
   });
});

function shrinkNum(num) {
   let numString = num.toString();
   
   if(numString.length > 12) {
      if(Number.isInteger(num)) {
         return num.toPrecision(6);
      } else if (num < 1 && num > -1) {
         return num.toPrecision(10);
      } else {
         return num.toPrecision(numString.indexOf(".") + (12-numString.indexOf(".")));
      }
   } else {
      return num;
   }
}

function toSymbol(string) {
   if(string == "add") {
      return "+";
   } else if (string == "subtract") {
      return "-";
   } else if (string == "multiply") {
      return "x"; 
   } else if (string == "divide") {
      return "/";
   } else {
      return "";
   }
}

function fullReset() {
   firstNum = '';
   firstNumChosen = false;
   decimalUsed = false;
   secondNumChosen = false;
   secondNum = '';
   operatorChosen = false;
   operator = ''
   displayArea.textContent = "0";
}
   
function halfResetter() {
   secondNumChosen = false;
   secondNum = '';
   operatorChosen = false;
   operator = ''
   decimalUsed = false;
}

function add(a, b) {
   return a+b;
}
function subtract(a, b) {
   return a-b;
}
function multiply(a, b) {
   return a*b;
}
function divide(a, b) {
   return a/b;
}

