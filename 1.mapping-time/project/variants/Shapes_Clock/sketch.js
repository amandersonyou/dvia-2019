/* A clock where the shapes change gradually as time passes. The rectagle shows 
hours, the triangle represents minutes, and the circle shows seconds.*/

function setup() {
  // set the width & height of the sketch
	createCanvas(800, 800)
  console.log('starting time:', clock())
}

var width = 50
var height = 50


function draw() {
  background(72, 117, 119)
  noStroke()
  
  /* Use now = clock() to set variables for hours, minutes, and seconds. 
  now.progress allows the value to change with the progression of time.*/
  var now = clock()
  hourHeight = height * now.progress.hour
  minsHeight = height * now.progress.min
  minsWidth = width * now.progress.min
  secsWidth = width * now.progress.sec
  

  /* Draw the three shapes to represent hours, minutes, and seconds. 
  Fill with different colors for fun. Use the var now clock() method variables
  to alter the width/height/size of the shapes. */

  // HOUR: Triangle
  fill(22, 91, 154); //blue
  triangle(50, 0, 250, 0, 150, hourHeight)
  
  // MINUTE: Circle
  fill(227, 204, 119); //golden
  ellipse(400, height/2, minsWidth/2, minsHeight/2);
  
  // SECOND: Rectangle
  fill(238, 119, 119); //coral
  rect(0, 625, secsWidth, 100);

}