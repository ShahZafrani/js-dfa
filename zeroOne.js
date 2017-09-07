//output text
const fin = "Input Stream Accepted";
const rej = "Input Stream Rejected: ";
const err = "Input Stream Rejected due to Invalid Character: ";

//declare listDiv here so we can assign it later once the page is rendered
var listDiv = null;

//declare dfa in this js object
const zeroesThenOnesDFA = {
  q0: {
    0:"q0",
    1:"q1",
    isAccept:true
  },
  q1: {
    0:"q2",
    1:"q1",
    isAccept:true
  },
  q2: {
    0:"q2",
    1:"q2",
    isAccept:false
  },
  //starting state should be declared exactly as the corresponding object key is 
  startState: "q0",
  //vocabulary should be defined as a string with no delimiting
  vocabulary: "01"
}

function getNextState(currentState, input){
  if(zeroesThenOnesDFA.vocabulary.includes(input)) {
   return zeroesThenOnesDFA[currentState][input];
  } else {
    return err + input;
  }
}

//recursive function that does the heavy lifting
function validateStream(inputString, currentState) {
  
  //display the dfa's 'logic' on the page
  drawTransition("Current State is: " + currentState + ", Remaining Input Stream: " + inputString);
  //check if we still have inputs to process
  if(inputString.length > 0) {
    //get next state
    var nextState = getNextState(currentState, inputString[0]);
    //check if next state contains the error message, meaning there was an invalid input
    if(nextState.indexOf(err) !== -1){
      return nextState;
    } else {
      //recurse through the function with the first element of the string sliced off
      return validateStream(inputString.slice(1), nextState);
    }
  } else if (zeroesThenOnesDFA[currentState].isAccept == true) {
      //check if current state is an acceptance state
      return fin;
  } else {
      //current state is not an acceptance state so it must be rejected
    return rej + "stream ended at " + currentState;
  }
}

function drawTransition(output){
  var node = document.createElement("li");
  listDiv.appendChild(node);
  var text = document.createTextNode(output);
  node.appendChild(text);
}

  //function called when html button is pressed
function beginValidation(){
  var input = document.getElementById("streamInput").value;
  listDiv = document.getElementById("transitionList");
  //clear list from previous run
  listDiv.innerHTML = '';
  //run the dfa using the declared start state and store the output
  var output = validateStream(input.trim(), zeroesThenOnesDFA.startState);
  var text = document.createTextNode(output);
  var resultsNode = document.getElementById("results");
  resultsNode.innerHTML = '';
  //diplay final state
  resultsNode.appendChild(text);
}

