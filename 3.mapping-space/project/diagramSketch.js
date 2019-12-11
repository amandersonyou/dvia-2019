var daydata;
var station;

// load the csv files 
function preload(){
  daydata = loadTable('../data/2.5_day_edit.csv', 'csv', 'header');
  station = loadTable('../data/GNS_ANSSstations.csv', 'csv', 'header');
}

// find distance between two places given the lats and longs
function measureDistance(srcLat, srcLng, dstLat, dstLng){
  var origin = L.latLng(srcLat, srcLng),
      point = L.latLng(dstLat, dstLng)
  return (origin.distanceTo(point) / 1000)
}


function setup() {
  createCanvas(2750, 1500)
  
  // sort data by depth error
  // daydata.rows= _.sortBy(daydata.rows, row => -row.getNum('stnDist'))
  daydata.rows= _.sortBy(daydata.rows, row => -row.getNum('depthError'))

  
  // use measureDistance function to find distance from quake to its nearest station
  // recorded these values into the daydata csv
  var quake = daydata.getRow(40);
  var quakeLat = quake.getNum('latitude')
  var quakeLong = quake.getNum('longitude')
  var closestStations = _.sortBy(station.rows, row => measureDistance(quakeLat, quakeLong, row.getNum('Latitude'), row.getNum('Longitude')))
  var closest = closestStations[0];
  var stationDistance = measureDistance(quakeLat, quakeLong, closest.getNum('Latitude'), closest.getNum('Longitude'))
  // print(quake)
  // print(closest)
  // print(stationDistance)
}


// draw shapes to represent the various data relating to the quakes and stations
function draw() {
  background(240,248,255) // Alice Blue
  // noStroke()
  
  var table_daydata = daydata;
  var table_station = station;
  var symbolWidth = 65
  

  // stroke(20)
  
  x = 65
  y = 500
  // magnitude circles
  fill(255, 173, 51) // orange
  for (var m=0; m<table_daydata.getRowCount(); m++){
    var mag = (table_daydata.getNum(m, 4)*10)
    var magError = (table_daydata.getNum(m, 7)*10)
    strokeWeight(magError)
    // stroke(255, 230, 179)
    stroke(255, 255, 179)
    ellipse(x, y, mag)
    
    
    // strokeFill("red")
    x += symbolWidth
  };
  
  noStroke()
  
  x = 65
  y = 550
  // depth rectangle aka line
  fill(72,61,139) // dark slate blue
  for (var d=0; d<table_daydata.getRowCount(); d++){
    var depth = table_daydata.getNum(d, 3)
    rect(x, y, 4, depth*1.5)
    x += symbolWidth
  };


  x = 65
  y = 550
  // depth error rectangle
  fill(46,139,87,145) // sea green
  for (var e=0; e<table_daydata.getRowCount(); e++){
    var d_err = table_daydata.getNum(e, 6) // 16 with the real sheet
    rect(x-7, y, 18, d_err*1.5)
    x += symbolWidth
  };
  
  x = 60
  y = 450
  /* dmin is defined as: horizontal distance from the epicenter to the nearest 
  station (in degrees). 1 degree is approximately 111.2 kilometers. In general, 
  the smaller this number, the more reliable is the calculated depth of the 
  earthquake.*/
  fill(218, 179, 255) // lavendar
  for (var s=0; s<table_daydata.getRowCount(); s++){
    var dmin = table_daydata.getNum(s, 5) // 6 with the real sheet
    rect(x, y, 4, -dmin*111.2/5)
    x += symbolWidth
  };
  
  
  x = 70
  y = 450
  // station distance
    // depth lines  NEED TO FIX NAN CONTINUE
  fill(186,85,211) // medium orchid
  for (var s=0; s<table_daydata.getRowCount(); s++){
    var dmin = table_daydata.getNum(s, 8) // 
    rect(x, y, 4, -dmin/5)
    x += symbolWidth
  };

};

