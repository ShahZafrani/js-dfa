var dataset = Object.keys(pda.states);
var svg = null;

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
}
  


