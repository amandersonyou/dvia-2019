/* A long winter: the snowflakes fall per day, "accumulating" per month as the
white block grows taller. The sky color changes between 4 shades of grey, one
color for each week in a month. Credit to p5 example for the snow!*/

let snowflakes = []; // array to hold snowflake objects
var colors = ['DarkGray','Silver','LightGray','Gainsboro']
var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}

function setup() {
// set the width & height of the sketch
	createCanvas(700, 900)
	fill(240)
	noStroke()
  console.log('starting time:', clock())
  maxHeight = 800
}

/* Use now = clock() to set variables for day, week, and month. 
now.progress allows the value to change with the progression of time.*/
function draw() {
  var now = clock()
  snowHeight = maxHeight * -now.progress.month
  let t = now.progress.day;
  var color = colorForProgress(now.progress.week);
  background(color);

  // Rising snow bank by month
  fill(242, 242, 242);
  rect(0, 900, 700, snowHeight);
  
  // create a random number of snowflakes each frame, snowfalls per day
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}


