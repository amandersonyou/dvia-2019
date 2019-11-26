var allDay
var station


// load the csv files 
function preload(){
  allDay = loadTable('data/all_day.csv', 'csv', 'header')
  station = loadTable('data/GNS_ANSSstations.csv', 'csv', 'header')
}

function setup(){
  createCanvas(1000, 1000, SVG)
  background(0,148,153) // Viridian Green Pantone

  // create tables for each type of value to be used
  var table = allDay
  var table_station = station



  // set up typography
  textFont("Rokkitt")
  textSize(18)
  fill(30)
  noStroke()
  
}



// function draw() {
    
// }