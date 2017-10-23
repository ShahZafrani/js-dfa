//output text
const fin = "Input Stream Accepted";
const rej = "Input Stream Rejected: ";
const err = "Input Stream Rejected due to: ";

//declare variables outside a function scope to be set later
var listDiv = null;
var stackDiv = null;
var resultsNode = null;
var speedSlider = null;
var stack = "";
var timerWait = 750;

//assign values once page loads (this helps avoid a race condition)
window.onload = function(){
  initializeDisplay();
};
function initializeDisplay(){
  listDiv = document.getElementById("transitionList");
  stackDiv = document.getElementById("stack");
  resultsNode = document.getElementById("results");
  speedSlider = document.getElementById("speedSlider");
  speedSlider.oninput = function() {
    timerWait = this.value;
  }
}

//declare pda in this js object
const pda = {
  //starting state should be declared exactly as the corresponding object key is
  startState: "q0",
  //vocabulary should be defined as a string with no delimiting
  vocabulary: "01",
  states: {
    q0: {
      0:{
        transition: "q0",
        pop: "",
        push: "a"
      },
      1: {
        transition: "q1",
        pop: "a",
        push: ""
      },
      isAccept:true
    },
    q1: {
      0:{
        transition: "q2",
        pop: "",
        push: "b"
      },
      1: {
        transition: "q1",
        pop: "a",
        push: ""
      },
      isAccept:true
    },
    q2: {
      0:{
        transition: "q2",
        pop: "",
        push: "b"
      },
      1: {
        transition: "q2",
        pop: "",
        push: "b"
      },
      isAccept: false
    }
  }
}

  //function called when html button is pressed
function beginValidation(){
  document.getElementById("validate-button").disabled = true;
  var input = document.getElementById("streamInput").value;
  resetDisplay();
  //run the pda using the declared start state
  validateStream(input.trim(), pda.startState);

}

//recursive function that does the heavy lifting
function validateStream(inputString, currentState) {
  //currStack used for display purposes later
  var currStack = stack;
  //set transition and state colors to default
  resetColors(transitions, transitionKeys, "black");
  resetColors(states, stateKeys, "d2b9ff");
  
  //check if we still have inputs to process
  if(inputString.length > 0) {
    //get next state
    var nextState = getNextState(currentState, inputString[0]);
    
    //update stack display
    drawStack();
    
    //check if next state contains the error message, meaning there was an invalid input or stack imploded
    if(nextState.indexOf(err) !== -1){
      highlight(states, currentState, "red");
      drawResult(nextState);
    } else {
      //highlight the relevant state and transition
      highlight(transitions, nextState + inputString[0], "red");
      highlight(states, nextState, "goldenrod");
      drawTransition(nextState, inputString, currStack);
      //recurse through the function with the first element of the string sliced off
      setTimeout(function(){ validateStream(inputString.slice(1), nextState); }, timerWait);
    }
  } else if ((pda.states[currentState].isAccept === true) && (stack === '')){
      //check if current state is an acceptance state and if stack is empty
      //display final status, color ending state, and display accept
      highlight(states, currentState, "cyan");
      drawTransition(currentState, inputString, currStack);
      drawResult(fin);
  } else {
      //current state is not an acceptance state so it must be rejected
      //display final status, color ending state, and display accept
      highlight(states, currentState, "red");
      drawTransition(currentState, inputString, currStack);
      drawResult(rej + "stream ended at " + currentState + ", and stack value was: " + stack);
  }
}

function getNextState(currentState, input){
  //check if input is part of the vocab
  if(pda.vocabulary.includes(input)) {
    // if stack is empty and there is a pop function, reject input with explanation
    if((stack === '') && (pda.states[currentState][input].pop !== '')){
      return err + " stack implosion";
    } else if (stack.charAt(stack.length - 1) === pda.states[currentState][input].pop) {
      //if the item at the top of the stack matches this transition's pop item: pop it
      stack = stack.substr(0, stack.length - 1);
    }
    //add the push item of this transition to the top of the stack
    stack += pda.states[currentState][input].push;
   return pda.states[currentState][input].transition;
  } else {
    return err + " invalid character: " + input;
  }
}

// helper functions

function drawTransition(state, input, stackVal){
  var output = "Current State is: " + state + " | Remaining Input Stream: " + input + " | Current Stack Value: " + stackVal;
  var node = document.createElement("li");
  listDiv.appendChild(node);
  var text = document.createTextNode(output);
  node.appendChild(text);
}

function drawStack(){
  var text = document.createTextNode(stack);
  stackDiv.innerHTML = '';
  stackDiv.appendChild(text);
}

function drawResult(output){
  var text = document.createTextNode(output);
  resultsNode.appendChild(text);
  resultsNode.scrollIntoView();
  document.getElementById("validate-button").disabled = false;
}

function resetDisplay() {
  listDiv.innerHTML = '';
  stack = '';
  stackDiv.innerHTML = '';
  resultsNode.innerHTML = '';
}

