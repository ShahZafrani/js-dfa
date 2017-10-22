var dataset = Object.keys(pda.states);
  


// Simple Circle Chart
simplecircle = d3.select("section")
.append("div").attr("class","tutorialdiv")
.append("svg")
.attr("height", 300)
.attr("width", 700);
var nodes = simplecircle.selectAll("node")
.data(dataset)
.enter()
.append('g').attr('class', 'circle')
.append("circle")
.attr("fill", "#ffffff")
.attr("stroke", "#dfe5e6")
.attr("stroke-width", 1)
.attr("cx",function(d, i) {
	return (i * 250) + 100 ;
})
.attr("r", 75)
.attr("cy",200)w
.append("text")
  .text(function(d) {
    return d
  })
.style("stroke","black")
.attr("text-anchor", "middle")
.attr("dy", "-2em");