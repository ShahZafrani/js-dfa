const start = "START";
const state1 = "STATE 1";
const state2 = "STATE 2"; //acceptance state
const rejState = "State 3";
const fin = "Input Stream Accepted";
const rej = "Input Stream Rejected: ";
const err = "Input Stream Rejected due to Invalid Character: ";

var listDiv = null;

function validateStream(inputString, currentState) {
  console.log("Current State is: " + currentState + ", Remaining Input Stream: " + inputString);
  var node = document.createElement("li");
  currentOutputText="Current State is: " + currentState + ", Remaining Input Stream: " + inputString;
  listDiv.appendChild(node);
  var text = document.createTextNode(currentOutputText);
  node.appendChild(text);
  
  if(inputString.length > 0) {
     switch(currentState) {
       case start: {
         switch(inputString[0]) {
           case '0': {
             return validateStream(inputString.slice(1), state1);
             break;
           }
           case '1': {
             return validateStream(inputString.slice(1), rejState);
             break;
           }
           default: {
             return err + inputString[0];
           }
         }
         break;
       }
       case state1: {
         switch(inputString[0]) {
           case '0': {
             return validateStream(inputString.slice(1), state1);
             break;
           }
           case '1': {
             return validateStream(inputString.slice(1), state2);
             break;
           }
           default: {
             return err + inputString[0];
           }
         }
         break;
       }
       case state2: {
         switch(inputString[0]) {
           case '0': {
             return validateStream(inputString.slice(1), rejState);
             break;
           }
           case '1': {
             return validateStream(inputString.slice(1), state2);
             break;
           }
           default: {
             return err + inputString[0];
           }
         }
         break;
       }
       case rejState: {
         switch(inputString[0]) {
           case '0': {
             return validateStream(inputString.slice(1), rejState);
             break;
           }
           case '1': {
             return validateStream(inputString.slice(1), rejState);
             break;
           }
           default: {
             return err + inputString[0];
           }
         }
         break;
       }
     }
  } else if (currentState == state2) {
      return fin;
  } else {
    return rej + "stream ended at " + currentState;
  }
}

function beginValidation(){
  var input = document.getElementById("streamInput").value;
  listDiv = document.getElementById("transitionList");
  listDiv.innerHTML = '';
  var output = validateStream(input.trim(), start);
  var text = document.createTextNode(output);
  var resultsNode = document.getElementById("results");
  resultsNode.innerHTML = '';
  resultsNode.appendChild(text);
}

//process.argv[2] is the first command line argument
// var input = process.argv[2];
// console.log(validateStream(input, start));