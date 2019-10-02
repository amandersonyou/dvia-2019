/*Stalactite clock. These purple triangles "hang" and grow as time progresses. 
Triangles with the same time lengths also have the same hues.*/


function setup() {
  // set the width & height of the sketch, add WEBGL for 3D
	createCanvas(500, 250)
  console.log('starting time:', clock())
}

h = 250

function draw() {
  background('#D8BFD8');
  noStroke();
  
  /* Use now = clock() to set variables for year, month, etc. 
  now.progress allows the value to change with the progression of time.*/
  var now = clock()
  toothLengthY = h * now.progress.year
  toothLengthS = h * now.progress.season
  toothLengthM = h * now.progress.month
  toothLengthMo = h * now.progress.moon
  toothLengthW = h * now.progress.week
  toothLengthD = h * now.progress.day
  toothLengthHD = h * now.progress.halfday
  // toothLengthH = h * now.progress.hour
  // toothLengthMin = h * now.progress.min

  
  /* Draw the teeth and assign each a different time length */
  // Back row (1-5)
  // Tooth 1
  fill('#4B0082');
  triangle(0, 0, 100, 0, 50, toothLengthY);
  //Tooth 2
  fill('#663399');
  triangle(100, 0, 200, 0, 150, toothLengthS);
  //Tooth 3
  fill('#483D8B');
  triangle(200, 0, 300, 0, 250, toothLengthM);
  //Tooth 4
  fill('#6A5ACD');
  triangle(300, 0, 400, 0, 350, toothLengthMo);
  //Tooth 5
  fill('#9370DB');
  triangle(400, 0, 500, 0, 450, toothLengthW);
  
  
  // Front Row (6-9)
  // Tooth 6
  fill('#800080');
  triangle(50, 0, 150, 0, 100, toothLengthD);
  //Tooth 7
  fill('#9370DB');
  triangle(150, 0, 250, 0, 200, toothLengthW);
  //Tooth 8
  fill('#800080');
  triangle(250, 0, 350, 0, 300, toothLengthD);
  //Tooth 9
  fill('#4B0082');
  triangle(350, 0, 450, 0, 400, toothLengthY);
}