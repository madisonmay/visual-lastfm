// Much of this visualization was produced by following the tutorial
// at http://mbostock.github.com/d3/tutorial/bar-2.html

var t = 1297110663, // start time (seconds since epoch)
    v = 70, // start value
    data = d3.range(33).map(next); // starting dataset

function next() {
   return {
     time: ++t,
     value: v = ~~Math.max(15, Math.min(90, v + 40 * (Math.random() - 0.5)))
   };
}

setInterval(function() {
   data.shift();
   data.push(next());
   redraw();
}, 1500);

var w = 20,
     h = 160;

var x = d3.scale.linear()
     .domain([0, 1])
     .range([0, w]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, h]);

// The below code may eventually be used
// to generate a spectrum of tones
// var color = d3.scale.linear()
//     .domain([0, w])
//     .range([0, 255]);

var chart = d3.select(".chart_body").append("svg")
     .attr("class", "chart")
     .attr("width", w * data.length - 1)
     .attr("height", h);

// Conversion from rgb to hex
// function newRGB(r, g, b) {
//     console.log(r, g, b);
//     var rgb = d3.rgb(r, g, b)
//     hex = rgb.toString();
//     return hex;
// };

chart.selectAll("rect")
   .data(data)
   .enter().append("rect")
   .attr("x", function(d, i) { return x(i) - 0.5; })
   .attr("y", function(d) { return h - y(d.value) - 0.5; })
   .attr("width", w)
   .attr("height", function(d) { return y(d.value); })
   .attr("fill", "#51A351");

chart.append("line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - 0.5)
    .attr("y2", h - 0.5)
    .style("stroke", "#000");

function redraw() {

    // Update…
    chart.selectAll("rect")
    .data(data)
    .transition()
    .duration(1000)
    .attr("y", function(d) { return h - y(d.value) - 0.5; })
    .attr("height", function(d) { return y(d.value); });
}
