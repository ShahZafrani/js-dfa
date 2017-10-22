var dataset = Object.keys(pda.states);
var svg = null;
var transitions = null;
var transitionKeys = null;


// load the external svg from a file
d3.xml("images/editable-svg.svg").mimeType("image/svg+xml").get(function(error, xml) {
  if (error) throw error;
  document.getElementById("svg-container").appendChild(xml.documentElement);
  initSVG();
});
  
function initSVG(){
  
  svg = d3.select("svg");
  
  var el = d3.selectAll("ellipse");
  el.style("fill", "d2b9ff");
  el.style("fill-opacity", "1");
  
  
  q00ellipse = d3.select("#q0-0").selectAll("ellipse");
  q00path = d3.select("#q0-0").selectAll("path");
  q01ellipse = d3.select("#q0-1").selectAll("ellipse");
  q01path = d3.select("#q0-1").selectAll("path");
  q10ellipse = d3.select("#q1-0").selectAll("ellipse");
  q10path = d3.select("#q1-0").selectAll("path");
  q11ellipse = d3.select("#q1-1").selectAll("ellipse");
  q11path = d3.select("#q1-1").selectAll("path");
  q20ellipse = d3.select("#q2-0").selectAll("ellipse");
  q20path = d3.select("#q2-0").selectAll("path");
  
  transitions = {
    "q00": [q00ellipse, q00path],
    "q01": [q01ellipse, q01path],
    "q10": [q10ellipse, q10path],
    "q11": [q11ellipse, q11path],
    "q20": [q20ellipse, q20path]
  }
  
  transitionKeys = Object.keys(transitions);
  
  // var q01 = null;
  // var q11 = null;
  // var q10 = null;
  // var q201 = null;
  
}

function highlight(group, color){
  for(let i = 0; i < transitions[group].length; i++) {
    transitions[group][i].attr("style","stroke: " +color + "; fill: " + color + ";");
  }
}
  
function resetColors() {
    //iterate through all elements
    for(let i = 0; i < transitionKeys.length; i++) {
      let key = transitionKeys[i];
      highlight(key, "black");
    }
}

