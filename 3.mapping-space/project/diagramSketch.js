var daydata;
var station;

// load the csv files 
function preload(){
  daydata = loadTable('../data/2.5_day_edit.csv', 'csv', 'header');
  station = loadTable('../data/GNS_ANSSstations.csv', 'csv', 'header');
}

function measureDistance(srcLat, srcLng, dstLat, dstLng){
  var origin = L.latLng(srcLat, srcLng),
      point = L.latLng(dstLat, dstLng)
  return origin.distanceTo(point) / 1000 // in kilometers
}


function setup() {
  createCanvas(2800, 1200)
  
  // sort data by depth error
  daydata.rows= _.sortBy(daydata.rows, row => -row.getNum('depthError'))
  
  // measure find closest station 
  var quake = daydata.getRow(0);
  var quakeLat = quake.getNum('latitude')
  var quakeLong = quake.getNum('longitude')
  var closestStations = _.sortBy(station.rows, row => measureDistance(quakeLat, quakeLong, row.getNum('Latitude'), row.getNum('Longitude')))
  var closest = closestStations[0];
  print(quake)
  print(closest)

}

  // create tables for each type of value to be used


function draw() {
  background(240,248,255) // Alice Blue
  noStroke()
  
  var table_daydata = daydata;
  var table_station = station;
  var symbolWidth = 65
  
  x = 65
  y = 300
  
  // magnitude circles
  fill(255, 79, 0, 250) // orange
  for (var m=0; m<table_daydata.getRowCount(); m++){
    var mag = (table_daydata.getNum(m, 4)*10)
    ellipse(x, y, mag)
    x += symbolWidth
  };
  
  x = 65
  y = 350
    
  // depth rectangle aka line
  fill(72,61,139) // dark slate blue
  for (var d=0; d<table_daydata.getRowCount(); d++){
    var depth = table_daydata.getNum(d, 3)
    rect(x, y, 4, depth*1.5)
    x += symbolWidth
  };

  x = 65
  y = 350
  
  // depth error rectangle
  fill(46,139,87,145) // sea green
  for (var e=0; e<table_daydata.getRowCount(); e++){
    var d_err = table_daydata.getNum(e, 6) // 16 with the real sheet
    rect(x-7, y, 18, d_err*1.5)
    x += symbolWidth
  };
  
  x = 65
  y = 250
  // station distance
    // depth lines  NEED TO FIX NAN CONTINUE
  fill(186,85,211) // medium orchid
  for (var s=0; s<table_daydata.getRowCount(); s++){
    // var row = table_daydata.getRow(s)
    // if (row.get('dmin')==''){
    //   continue
    // }
    var dmin = table_daydata.getNum(s, 5) // 6 with the real sheet
    rect(x, y, 4, -dmin*10)
    x += symbolWidth
  };
  

};

