/* Cat eye clock.*/

/* Choose colors for background to cycle through. Use colorForProgress() to 
set up gradient.*/
var colors = ['#f564b0','#e264b0','#c6648c','#d22d91','#de84a3']
var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}

var width = 800
var height = 600

function setup() {
  // set the width & height of the sketch and call the clock method.
  createCanvas(800, 600)
  console.log('starting time:', clock())
}

// Use now = clock() to create variables that will change with the time
function draw() {
  var now = clock();
    hourWidth = width * now.progress.hour;
    secsWidth = width * now.progress.sec;
  var color = colorForProgress(now.progress.min);
  background(color);


  // Draw the main cat-eye background shape that will stay consistent. 
  fill(214, 218, 79);
  stroke(5, 4, 4);
  strokeWeight(4);
  ellipse(width/2, height/2, 650, 400);


  /* Draw the cat's pupil that will change by the hour. I need help constraining
  the total width to be no more than 500.*/
  fill(0);
  noStroke();
  ellipse(width/2, height/2, hourWidth, 400);
  
  
  /* Draw a point to represent a lazer toy the cat eye sees, it moves with 
  each second. */
  stroke('#f9eb60');
  strokeWeight(10);
  point(secsWidth, 550);

}
