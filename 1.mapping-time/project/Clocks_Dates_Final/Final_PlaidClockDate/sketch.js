/* Final combination project showing elements of time and date together in a 
plaid pattern. I'm using elements from one of my first clock concepts and 
bringing in additional date variables. */

var discrete = false 
var maxLength = 500
var maxWidth = 500

function setup() {
  // set the width & height of the sketch, add WEBGL for 3D
	createCanvas(500, 500)
  console.log('starting time:', clock())
}

function draw() {
  background(162, 32, 58);
  noStroke();
  
  /* Use now = clock() to set variables for each time variable. Map to certain 
  values and use else to use progress if needed.*/
  var now = clock()
  if (discrete){
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var hourLen = map(now.hour, 1,12, 0,maxLength) 
    var minsLen = map(now.min,  0,60, 0,maxLength) 
    var secLen = map(now.sec,  1,60, 0,maxLength)
    var monthWidth = map(now.month,  1,12, 0,maxWidth)  
    var weekWidth = map(now.week,  1,52, 0,maxWidth)
    var dayWidth = map(now.day,  1,30, 0,maxWidth)
  }else{
    hourLen = maxLength * now.progress.hour
    minsLen = maxLength * now.progress.min
    secLen = maxLength * now.progress.sec
    monthWidth = maxWidth * now.progress.month
    weekWidth = maxWidth * now.progress.week
    dayWidth = maxWidth * now.progress.day    
  }
  
  
  /* Draw the lines for each factor of time in a plaid pattern. Stroke weight 
  and color varies depending on the time. The longer the time, the darker the 
  color. The stroke weight relates back to values inherent in the time/date (ex:
  60 for 60 minutes, or 12 for 12 months.) */
  strokeCap(SQUARE);
  strokeWeight(24);
  stroke(12, 63, 146);
  line(150, 0, 150, hourLen);

  strokeWeight(60);
  stroke(15, 82, 189);
  line(300, 0, 300, minsLen);
  
  strokeWeight(60);
  stroke(19, 100, 231);
  line(400, 0, 400, secLen);
  
  strokeWeight(12);
  stroke(24, 78, 29);
  line(0, 150, monthWidth, 150);
  
  strokeWeight(7);
  stroke(34, 109, 41);
  line(0, 300, weekWidth, 300);
  
  strokeWeight(1);
  stroke(3, 140, 53);
  line(0, 400, dayWidth, 400);
}