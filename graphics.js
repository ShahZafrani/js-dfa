var dataset = Object.keys(pda.states);
  
d3.xml("images/editable-svg.svg").mimeType("image/svg+xml").get(function(error, xml) {
  if (error) throw error;
  document.getElementById("svg-container").appendChild(xml.documentElement);
});
  
var svg = d3.select("svg");

var el = d3.selectAll("ellipse");

el.style("fill", "steelblue");
el.style("fill-opacity", "1");

var paths = d3.selectAll("path");

paths.style("fill","red");
paths.style("stroke", "red");

