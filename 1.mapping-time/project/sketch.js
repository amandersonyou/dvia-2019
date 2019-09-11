// CODE BELOW NOT COMPLETE!

function setup() {
  // set the width & height of the sketch
  createCanvas(600, 300);
  frameRate(60);
  background(255)
  noStroke()

print('starting time:', clock())
  
  
// create bars for hours/minutes/seconds
var barHeight = 400 // height of each bar
var maxWidth = 200 // maximum width of each bar (the actual width will always be ≤ this)
var spacing = 0 // the vertical space to skip between bars
var discrete = false
var colors = {};
  colors.key0 = "white";
  colors.key1 = "darkblue";
  colors.key2 = "yellow";
  colors.key3 = "green";
  colors.key4 = "red";
  colors.key5 = "orange";
  colors.key6 = "darkpink";
  colors.key7 = "lightpurple";
  colors.key8 = "darkred";
  colors.key9 = "darkpurple"
};

  for (var i = step; i <= width; i += step) {
    // set the color by mapping `i` from x-axis coordinates to 0-255 grey values
    stroke(map(i, 0,width, 0,255))

    if (i < middle) {
      leftOfCenter = true;
    } else {
      leftOfCenter = false;
    }


function clock(){
  let t = now(),

for (hours:t.hour()) {
  draw(rect(0, 0, 100, 300))

  if (hour == 0) {
    fill(key0);
  }  
  if (hour == 1) {
    fill(key1);
  }
  if (hour == 2) {
    fill(key1);
    
  }
      ;
}
if (hours:t.hour() == 1) {
      fill(key1);
      rect(0, 0, 100, 300);
    }
    
        if (i < middle) {
      leftOfCenter = true;
    } else {
  var now = clock()
  if (discrete){
    if hour
    var hourFill1 = fill(now.hour, 'darkslategrey')
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var hourFill1 = map(now.hour, 1, fill('darkslategrey')) // from hours (1-12) to pixels (0–maxWidth)
    var hourFill2 = map(now.hour, 1,12, 0,maxWidth) // from hours (1-12) to pixels (0–maxWidth)
    var minsFill1 = map(now.min,  0,60, 0,maxWidth)  // from mins (0–60) to pixels (0–maxWidth)
    var minsFill2 = map(now.min,  0,60, 0,maxWidth)  // from mins (0–60) to pixels (0–maxWidth)
    var secsFill1 = map(now.sec,  0,60, 0,maxWidth)  // from secs (0–60) to pixels (0–maxWidth)
    var secsFill2 = map(now.sec,  0,60, 0,maxWidth)  // from secs (0–60) to pixels (0–maxWidth)
  }

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  
// draw and fill the 6 rectangles
// hour 1
fill(255, 204, 0);
rect(0, 0, 100, 300);
// hour 2
fill(250, 04, 10);
rect(100, 0, 100, 300);
//minute 1
fill(200, 104, 12);
rect(200, 0, 100, 300);
//minute 2
fill(50, 14, 200);
rect(300, 0, 100, 300);
//second 1
fill(240, 54, 10);
rect(400, 0, 100, 300);
//second 2
fill(50, 76, 100);
rect(500, 0, 100, 300);

  // set up typography & drawing-color
  // textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
  // textSize(42) // make it big
  // fill(100, 50, 50)

  // draw the time string to the canvas
  // text(now.text.date, 30, 50)
  // text(now.text.time, 30, 100)

}