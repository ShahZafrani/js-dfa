const start = "START";
const state1 = "STATE 1";
const state2 = "STATE 2"; //acceptance state
const fin = "Input Stream Accepted";
const rej = "Input Stream Rejected: ";
const err = "Input Stream Contains Invalid Character: ";

function validateStream(inputString, currentState) {
  console.log(inputString);
  if(inputString.length > 0) {
     switch(currentState) {
       case start: {
         switch(inputString[0]) {
           case 'a': {
             return validateStream(inputString.slice(1), state2);
             break;
           }
           case 'b': {
             return validateStream(inputString.slice(1), state1);
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
           case 'a': {
             return validateStream(inputString.slice(1), state2);
             break;
           }
           case 'b': {
             return validateStream(inputString.slice(1), start);
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
           case 'a': {
             return validateStream(inputString.slice(1), state1);
             break;
           }
           case 'b': {
             return validateStream(inputString.slice(1), start);
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

// console.log(validateStream("aaa", start));
// console.log(process.argv[2]);
console.log(validateStream(process.argv[2], start));