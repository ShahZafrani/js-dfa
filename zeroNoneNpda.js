//output text
const fin = "Input Stream Accepted";
const rej = "Input Stream Rejected: ";
const err = "Input Stream Rejected due to: ";

var listDiv = null;
var stackDiv = null;
var resultsNode = null;
var speedSlider = null;
var stack = "";

var timerWait = 750;
//declare listDiv here so we can assign it later once the page is rendered
window.onload = function() {
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
  q0: {
    0:{
      transition: "q0",
      pop: "",
      push: "$"
    },
    1: {
      transition: "q1",
      pop: "$",
      push: ""
    },
    isAccept:true
  },
  q1: {
    0:{
      transition: "q2",
      pop: "",
      push: "@"
    },
    1: {
      transition: "q1",
      pop: "$",
      push: ""
    },
    isAccept:true
  },
  q2: {
    0:{
      transition: "q2",
      pop: "",
      push: "@"
    },
    1: {
      transition: "q2",
      pop: "",
      push: "@"
    },
    isAccept: false
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
  //display the dfa's 'logic' on the page
  drawTransition("Current State is: " + currentState + ", Remaining Input Stream: " + inputString);
  //check if we still have inputs to process
  if(inputString.length > 0) {
    //get next state
    var nextState = getNextState(currentState, inputString[0]);
    //update stack display
    drawStack();
    //check if next state contains the error message, meaning there was an invalid input
    if(nextState.indexOf(err) !== -1){
      drawResult(nextState);
    } else {
      //recurse through the function with the first element of the string sliced off
      return setTimeout(function(){ validateStream(inputString.slice(1), nextState); }, timerWait);
    }
  } else if ((pda[currentState].isAccept === true) && (stack === '')){
      //check if current state is an acceptance state and if stack is empty
      drawResult(fin);
  } else {
      //current state is not an acceptance state so it must be rejected
    drawResult(rej + "stream ended at " + currentState + ", and stack value was: " + stack);
  }
}

function getNextState(currentState, input){
  if(pda.vocabulary.includes(input)) {
    if((stack === '') && (pda[currentState][input].pop !== '')){
      return err + " stack implosion";
    } else if (stack.charAt(stack.length - 1) === pda[currentState][input].pop) {
      stack = stack.substr(0, stack.length - 1);
    }
    stack += pda[currentState][input].push;
   return pda[currentState][input].transition;
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
  document.getElementById("validate-button").disabled = false;
}

function resetDisplay() {
  listDiv.innerHTML = '';
  stack = '';
  stackDiv.innerHTML = '';
  resultsNode.innerHTML = '';
}

