/* A calendar showing the Moon passing left to right with 1 moon, and 4 stars 
each representing a season. Each passes at an increment of 0.25. The rotation 
for the stars is for visual interest and fun.*/

function setup() {
  // set the width & height of the sketch
	createCanvas(600, 600)
  console.log('starting time:', clock())
}

function draw() {
  background(26, 25, 49)
  noStroke()
  
  /* Use now = clock() to set variables for hours, minutes, and seconds. 
  now.progress allows the value to change with the progression of time.*/
  var now = clock()
  seasonWidth = width * now.progress.season
  moonWidth = width * now.progress.moon
  

  // Moon with 4 circles of slightly different colors
  let center = color('#fffce6');
  let inside = color('#fffacd');
  let middle = color('#fff7b3');
  let outside = color('#fff599');  

  push();
  translate(moonWidth, height * 0.5);
  fill(outside);
  ellipse(10, 0, 400, 400);
  fill(middle);
  ellipse(0, 0, 300, 300);
  fill(inside);
  ellipse(0, 0, 200, 200);
  fill(center);
  ellipse(0, 0, 100, 100);
  rotate(frameCount / -100.0);
  pop();

  // Stars each representing a season
  // Autumn 
  fill(218, 164, 63)
    push();
    translate(seasonWidth, height * 0.5);
    rotate(frameCount / -200.0);
    star(0, 0, 30, 70, 5);
    pop();
  // Winter
  fill(101, 164, 229)
    push();
    translate(seasonWidth /0.75, height * 0.5);
    rotate(frameCount / -200.0);
    star(0, 0, 30, 70, 5);
    pop();
  // Spring
  fill(0, 179, 60)
    push();
    translate(seasonWidth /0.5, height * 0.5);
    rotate(frameCount / -200.0);
    star(0, 0, 30, 70, 5);
    pop();
  // Summer
  fill(218, 133, 169)
    push();
    translate(seasonWidth /0.25, height * 0.5);
    rotate(frameCount / -200.0);
    star(0, 0, 30, 70, 5);
    pop();
}

// Rotation functionality
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  
  
}
