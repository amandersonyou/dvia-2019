// A clock where the lines grow gradually downward as time passes.

function setup() {
  // set the width & height of the sketch
	createCanvas(800, 800)
  console.log('starting time:', clock())
}

var width = 600
var height = 400

// Set the background color
function draw() {
  background(208, 153, 157)
  noStroke()

  // Use now = clock() and .progress to alter the height values as time progresses
  var now = clock()
  hourHeight = height * now.progress.hour
  minsHeight = height * now.progress.min
  secsHeight = height * now.progress.sec
  

  /* Draw the lines with "beastly" stroke weight. As time passes, the lines grow
  toward the bottom of the canvas. */
  stroke(110);
  line(600, 30, 600, hourHeight);
  stroke(150);
  line(400, 30, 400, minsHeight);
  stroke(255);
  line(200, 30, 200, secsHeight);
  
  strokeWeight(10); 
  
}