const start = "START";
const state1 = "STATE 1";
const state2 = "STATE 2"; //acceptance state
const rejState = "State 3";
const fin = "Input Stream Accepted";
const rej = "Input Stream Rejected: ";
const err = "Input Stream Contains Invalid Character: ";

function validateStream(inputString, currentState) {
  console.log("Current State is: " + currentState + ", Remaining Input Stream: " + inputString);
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

//process.argv[2] is the first command line argument
var input = process.argv[2];
console.log(validateStream(input, start));