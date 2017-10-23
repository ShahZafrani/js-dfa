//output text
const fin = "Input Stream Accepted";
const rej = "Input Stream Rejected: ";
const err = "Input Stream Rejected due to: ";

var listDiv = null;
var stackDiv = null;
var resultsNode = null;
var speedSlider = null;
var stack = "";

window.onload = function(){
  initializeDisplay();
};

var timerWait = 750;
//declare listDiv here so we can assign it later once the page is rendered
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
  resetColors(transitions, transitionKeys, "black");
  resetColors(states, stateKeys, "d2b9ff");
  //display the pda's 'logic' on the page
  //check if we still have inputs to process
  if(inputString.length > 0) {
    //get next state
    var nextState = getNextState(currentState, inputString[0]);
    
    
    //update stack display
    drawStack();
    //check if next state contains the error message, meaning there was an invalid input
    if(nextState.indexOf(err) !== -1){
      highlight(states, currentState, "red");
      drawResult(nextState);
    } else {
      //recurse through the function with the first element of the string sliced off
      highlight(transitions, nextState + inputString[0], "red");
      highlight(states, nextState, "goldenrod");
      drawTransition("Current State is: " + nextState + ", Remaining Input Stream: " + inputString);
      return setTimeout(function(){ validateStream(inputString.slice(1), nextState); }, timerWait);
    }
  } else if ((pda.states[currentState].isAccept === true) && (stack === '')){
      //check if current state is an acceptance state and if stack is empty
      highlight(states, currentState, "cyan");
      drawResult(fin);
  } else {
      //current state is not an acceptance state so it must be rejected
      highlight(states, currentState, "red");
      drawResult(rej + "stream ended at " + currentState + ", and stack value was: " + stack);
  }
}

function getNextState(currentState, input){
  if(pda.vocabulary.includes(input)) {
    if((stack === '') && (pda.states[currentState][input].pop !== '')){
      return err + " stack implosion";
    } else if (stack.charAt(stack.length - 1) === pda.states[currentState][input].pop) {
      stack = stack.substr(0, stack.length - 1);
    }
    stack += pda.states[currentState][input].push;
   return pda.states[currentState][input].transition;
  } else {
    return err + " invalid character: " + input;
  }
}

// helper functions

function drawTransition(output){
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

