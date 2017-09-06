//output text
const fin = "Input Stream Accepted";
const rej = "Input Stream Rejected: ";
const err = "Input Stream Rejected due to Invalid Character: ";

//declare listDiv here so we can assign it later once the page is rendered
var listDiv = null;

//declare states here
const start = "q0";
const stateA = "q1";
const stateB = "q2"; //acceptance state
const stateC = "q3";
const stateD = "q4";


// declare state transitions here
function handleStartState(inputChar){
 switch(inputChar) {
     case '0': {
       return stateD;
     }
     case '1': {
       return stateB;
     }
     default: {
       return err + inputChar;
     }
  }
}

function handleStateA(inputChar){
   switch(inputChar) {
     case '0': {
       return stateA;
     }
     case '1': {
       return stateB;
     }
     default: {
       return err + inputChar;
     }
   }
}

function handleStateB(inputChar){
   switch(inputChar) {
     case '0': {
       return stateC;
     }
     case '1': {
       return stateB;
     }
     default: {
       return err + inputChar;
     }
   }
}

function handleStateC(inputChar){
   switch(inputChar) {
     case '0': {
       return stateC;
     }
     case '1': {
       return stateC;
     }
     default: {
       return err + inputChar;
     }
   }
}

function handleStateD(inputChar){
   switch(inputChar) {
     case '0': {
       return stateD;
     }
     case '1': {
       return stateB;
     }
     default: {
       return err + inputChar;
     }
   }
}

//recursive function that does the heavy lifting
function validateStream(inputString, currentState) {
  //display the dfa's 'logic' on the page
  var node = document.createElement("li");
  currentOutputText="Current State is: " + currentState + ", Remaining Input Stream: " + inputString;
  listDiv.appendChild(node);
  var text = document.createTextNode(currentOutputText);
  node.appendChild(text);
  
  //check if we still have inputs to process
  if(inputString.length > 0) {
    //execute the appropriate transition according to which state we are currently in
     switch(currentState) {
       case start: {
         var nextState = handleStartState(inputString[0]);
         if(nextState.indexOf(err) !== -1){
           return nextState;
         } else {
           return validateStream(inputString.slice(1), nextState);
         }
         break;
       }
       case stateA: {
         var nextState = handleStateA(inputString[0]);
         if(nextState.indexOf(err) !== -1){
           return nextState;
         } else {
           return validateStream(inputString.slice(1), nextState);
         }
         break;
       }
       case stateB: {
         var nextState = handleStateB(inputString[0]);
         if(nextState.indexOf(err) !== -1){
           return nextState;
         } else {
           return validateStream(inputString.slice(1), nextState);
         }
         break;
       }
       case stateC: {
         var nextState = handleStateC(inputString[0]);
         if(nextState.indexOf(err) !== -1){
           return nextState;
         } else {
           return validateStream(inputString.slice(1), nextState);
         }
         break;
       }
       case stateD: {
         var nextState = handleStateD(inputString[0]);
         if(nextState.indexOf(err) !== -1){
           return nextState;
         } else {
           return validateStream(inputString.slice(1), nextState);
         }
         break;
       }
     }
  } else if (currentState == start) {
      //acceptance state (stateB in our case) goes here
      return fin;
  } else if (currentState == stateB) {
      //acceptance state (stateB in our case) goes here
      return fin;
  } else if (currentState == stateD) {
      //acceptance state (stateB in our case) goes here
      return fin;
  } else {
    return rej + "stream ended at " + currentState;
  }
}


  //function called when html button is pressed
function beginValidation(){
  var input = document.getElementById("streamInput").value;
  listDiv = document.getElementById("transitionList");
  //clear list from previous run
  listDiv.innerHTML = '';
  //run the dfa and store the output
  var output = validateStream(input.trim(), start);
  var text = document.createTextNode(output);
  var resultsNode = document.getElementById("results");
  resultsNode.innerHTML = '';
  //diplay final state
  resultsNode.appendChild(text);
}

