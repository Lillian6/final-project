var width = 1430;
var height = 700;



var svg = d3.select("#chart").append("svg")
  .attr("width", width)
  .attr("height", height)

var canvas = svg.append("g")
  .attr("transform", "translate(0, -40)")



var datapoints = [{
    Platform: "Google+",
    countK: 0.034,
    imagePath: "images/google+icon.jpg"
  },
  {
    Platform: "Pinterest",
    countK: 0.565,
    imagePath: "images/Pinterest-icon.png"
  },
  {
    Platform: "WordPress",
    countK: 94.795,
    imagePath: "images/wordpress-icon.png"
  },
  {
    Platform: "Youtube",
    countK: 109.545,
    imagePath: "images/youtube-icon.png"
  },
  {
    Platform: "Instagram",
    countK: 134.617,
    imagePath: "images/instagram-icon.png"
  },
  {
    Platform: "Flickr",
    countK: 157.881,
    imagePath: "images/flickr-icon.png"
  },
  {
    Platform: "Linked-In",
    countK: 461.482,
    imagePath: "images/linkedin-icon.png"
  },
  {
    Platform: "Tumblr",
    countK: 573.95,
    imagePath: "images/tumblr-icon.png"
  },
  {
    Platform: "Foursquare",
    countK: 602.264,
    imagePath: "images/foursquare-icon.png"
  },
  {
    Platform: "iPhone-App",
    countK: 866.217,
    imagePath: "images/iphone-app-icon.png"
  },
  {
    Platform: "SMS",
    countK: 999.04,
    imagePath: "images/sms-icon.png"
  },
  {
    Platform: "Facebook",
    countK: 6870.824,
    imagePath: "images/facebook-icon.png"
  },
  {
    Platform: "Twitter",
    countK: 8095.134,
    imagePath: "images/twitter-icon.png"
  }
]

var defs = canvas.append("defs");
defs.append("pattern")
  .attr("id", "Google+")
  .attr("height", "100%")
  .attr("width", "100%")
  .attr("patternContentUnits", "objectBoundingBox")
  .append("image")
  .attr("height", 1)
  .attr("width", 1)
  .attr("preserveAspectRatio", "none")
  .attr("xlink:href", "images/google+icon.jpg")

var radiusScale = d3.scaleSqrt().domain([0.034, 8095.134]).range([20, 150])

var simulation = d3.forceSimulation()
  .force("x", d3.forceX(width / 2).strength(0.09))
  .force("y", d3.forceY(height / 2).strength(0.09))
  .force("collide", d3.forceCollide(function(d) {
    return radiusScale(d.countK) + 3
  }))

var circles = canvas.selectAll("g.platforms")
  .data(datapoints)
  .enter()
  .append("circle")
  .attr("class", "platform")
  .attr("r", function(d) {
    return radiusScale(d.countK)
  })
  .attr("fill", function(d) {
    return "url(#" + d.Platform + ")"
  })
  .on("click", function(d) {
    console.log(d);
    d3.select(this)
      .append("title")
      .text(function(d){
        return d.countK + " thousand users"
      })
  })
  .on("mouseover", function(d){
    d3.select(this)
      .transition()
      .attr("r", function(d) {
        return radiusScale(d.countK) * 2
      })
    d3.select(this)
      .append("title")
      .text(function(d){
        return d.countK + " thousand users"
      })
  })
  .on("mouseout", function(d){
    d3.select(this)
      .transition()
      .attr("r", function(d){
      return radiusScale(d.countK)
    })
  });

defs.selectAll(".platform-pattern")
  .data(datapoints)
  .enter().append("pattern")
  .attr("class", "platform-pattern")
  .attr("id", function(d) {
    return d.Platform
  })
  .attr("height", "100%")
  .attr("width", "100%")
  .attr("patternContentUnits", "objectBoundingBox")
  .append("image")
  .attr("height", 1)
  .attr("width", 1)
  .attr("preserveAspectRatio", "none")
  .attr("xlink:href", function(d) {
    return d.imagePath
  })


simulation.nodes(datapoints)
  .on('tick', ticked)


function ticked() {
  circles
    .attr("cx", function(d) {
      return d.x
    })
    .attr("cy", function(d) {
      return d.y
    })
}

var rect = svg.append("rect")
  .attr("width", 1430)
  .attr("height", 200)
  .attr("fill", "pink")
  .attr("transform", "translate(0, 600)")
  .attr("fill", "#B8C4FF")

var text1 = svg.append("text")
  .attr("x", 80)
  .attr("y", 660)
  .text("Introduction")
  .attr("font-size", "40px")
  .attr("font", "Italic")
  .attr("fill", "none")
  .attr("stroke", "#000000")

var text2 = svg.append("text")
  .attr("x",330)
  .attr("y", 640)
  .attr("width", 300)
  .attr("font-size", "25px")
  .text("This bubble chart is a data visualization which shows the New Yorker social media usage.")


var text3 = svg.append("text")
  .attr("x", 330)
  .attr("y", 680)
  .attr("font-size", "25px")
  .text("The bigger the bubble is, the more users are on this social media.")


  setTimeout(function() {
    var x = document.querySelector('#chart');
    x.classList.add('active')
  }, 3000)
