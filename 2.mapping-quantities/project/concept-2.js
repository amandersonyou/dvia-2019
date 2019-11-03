// Concept with thick and opaque bars for coral, circles for tests, and thick bars for accumulated totals.

var nuclear
var neg_penang
var pos_penang
var neg_watamu
var pos_watamu

function preload(){
  nuclear = loadTable('data/nuclearTests_4787.csv', 'csv', 'header')
  neg_penang = loadTable('data/negative_penang.csv', 'csv', 'header')
  pos_penang = loadTable('data/pos_penang.csv', 'csv', 'header')
  neg_watamu = loadTable('data/negative_watamu.csv', 'csv', 'header')
  pos_watamu = loadTable('data/pos_watamu.csv', 'csv', 'header')
}

function setup(){
  createCanvas(2000, 3500)
  background(0,148,153) // Viridian Green Pantone
  // background(0,96,96)

  // pick one of the three data files to work with and call it 'table'
  var table = nuclear
  // var table_coral = coral 
  var table_negP = neg_penang
  var table_posP = pos_penang
  var table_negW = neg_watamu
  var table_posW = pos_watamu


  // set up typography
  textFont("Prestige Elite")
  textSize(16)
  fill(30)
  noStroke()

  // var x = 200
  // var y = 100
  var rowHeight = 60
  var colWidth = 45

  //create y axis structure
  // labels to be done in illustrator


// draw the year lables that will be in the middle-ish of the page
x = 100
y = 700
textStyle(NORMAL)
textAlign(BOLD)
for (var r=0; r<table.getRowCount(); r++){
    var year = table.getString(r, 0)
    text(year, x, y-rowHeight)
    x += colWidth
}
// **************** CORAL BARS ****************
  
// draw the negative Penang coral values
x = 100
y = 400
fill(255,111,97,240) // pantone 2019 color "living coral"
textStyle(NORMAL)
textAlign(BOLD)
for (var r=0; r<table_negP.getRowCount(); r++){
    var coralNP = table_negP.getNum(r, 1)
    rect(x, y, colWidth-5, -coralNP*2.5)
    x += colWidth
}

  // draw the negative Watamu coral values
x = 100
y = 400
fill(222,152,171,210) // sea pink
// fill(255,182,193,210) // light pink
textStyle(NORMAL)
textAlign(BOLD)
for (var r=0; r<table_negW.getRowCount(); r++){
    var coralNW = table_negW.getNum(r, 1)
    rect(x, y, colWidth-5, -coralNW*2.5)
    x += colWidth
}

// draw the postive Penang coral values
x = 100
y = 400
fill(255,111,97,240)
textStyle(NORMAL)
textAlign(BOLD)
for (var r=0; r<table_posP.getRowCount(); r++){
    var coralPP = table_posP.getNum(r, 1)
    rect(x + colWidth*17, y, colWidth-5, -coralPP*2.5)
    x += colWidth
}

// draw the postive Watamu coral values
x = 100
y = 400
fill(222,152,171,210) // sea pink
// fill(255,182,193,210) //light pink
textStyle(NORMAL)
textAlign(BOLD)
for (var r=0; r<table_posW.getRowCount(); r++){
  var coralPW = table_posW.getNum(r, 1)
  rect(x + colWidth*15, y, colWidth-5, -coralPW*2.5)
  x += colWidth
}


// **************** NUCLEAR BARS ****************


// draw the bars for the accumulated nuclear tests
x = 100
y = 770
fill(38,48,86,240) // Blue Depths Pantone
// fill(25,81,144,240) // Turkish Sea Pantone
textStyle(NORMAL)
textAlign(BOLD)
for (var r=0; r<table.getRowCount(); r++){
    var tests = table.getNum(r, 2)
    rect(x, y, colWidth-5, tests*1.25)
    x += colWidth
}


// // draw the circles for the nuclear tests, radius is equal to the circle size
x = 100
y = 770
noStroke()
// fill(255,218,41,220) // Vibrant Yellow Pantone
fill(152,221,222,220) // Limpet Shell Pantone
textStyle(NORMAL)
textAlign(BOLD)
for (var r=0; r<table.getRowCount(); r++){
    var tests = table.getNum(r, 1)
    ellipse(x + colWidth*.5, y, tests*1.25, tests*1.25)
    x += colWidth
}

}
