var sigMonth;
var station;

// load the csv files 
function preload(){
  sigMonth = loadTable('../data/2.5_day.csv', 'csv', 'header');
  station = loadTable('../data/GNS_ANSSstations.csv', 'csv', 'header');
}

function setup() {
  createCanvas(3000, 1000)
  background(0,148,153) // Viridian Green Pantone

  // create tables for each type of value to be used
var table_sigMonth = sigMonth;
var table_station = station;



var symbolWidth = 60

// function draw() {
  
x = 50
y = 300
fill(222,152,171, 250)
  for (var m=0; m<table_sigMonth.getRowCount(); m++){
    var mag = table_sigMonth.getNum(m, 4)
    ellipse(x+symbolWidth, y, mag*10)
    x += symbolWidth
  };
    
};