// the data loaded from a USGS-provided CSV file
var daydata;
var station;

// my leaflet.js map
var mymap;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    daydata = loadTable("../data/2.5_day_edit.csv", "csv", "header");
    station = loadTable("../data/GNS_ANSSstations.csv", "csv", "header");
}

function measureDistance(srcLat, srcLng, dstLat, dstLng){
  var origin = L.latLng(srcLat, srcLng),
      point = L.latLng(dstLat, dstLng)
  return (origin.distanceTo(point) / 1000)
}

function setup() {
    // first, call our map initialization function (look in the html's style tag to set its dimensions)
    setupMap()

    // call our function (defined below) that populates the maps with markers based on the table contents
    addCircles();

    // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
    createCanvas(2750, 1100)
    background(240,248,255)
    
    daydata.rows= _.sortBy(daydata.rows, row => -row.getNum('stnDist'))
    // daydata.rows= _.sortBy(daydata.rows, row => -row.getNum('depthError'))

    
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
    
    fill(0)
    noStroke()
}

function draw() {
    
  var table_daydata = daydata;
  var table_station = station;
  var symbolWidth = 65
  

  // stroke(20)
  
  x = 65
  y = 450
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
  y = 500
  // depth rectangle aka line
  fill(72,61,139) // dark slate blue
  for (var d=0; d<table_daydata.getRowCount(); d++){
    var depth = table_daydata.getNum(d, 3)
    rect(x, y, 4, depth)
    x += symbolWidth
  };


  x = 65
  y = 500
  // depth error rectangle
  fill(169, 213, 190, 70) // sea green
//   46,139,87
	
	192,213,169
  for (var e=0; e<table_daydata.getRowCount(); e++){
    var d_err = table_daydata.getNum(e, 6) // 16 with the real sheet
    rect(x-7, y, 18, d_err*1.5)
    x += symbolWidth
  };
  
  x = 60
  y = 400
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
  y = 400
  // station distance
    // depth lines  NEED TO FIX NAN CONTINUE
  fill(186,85,211) // medium orchid
  for (var s=0; s<table_daydata.getRowCount(); s++){
    var dmin = table_daydata.getNum(s, 8) // 
    rect(x, y, 4, -dmin/5)
    x += symbolWidth
  };

}

function setupMap(){
    
    // create your own map
    mymap = L.map('quake-map').setView([35.505, -0.09], 4);

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);
}

function addCircles(){
    // calculate minimum and maximum values for magnitude and depth
    var magnitudeMin = 0.0;
    var magnitudeMax = columnMax(daydata, "mag");
    console.log('magnitude range:', [magnitudeMin, magnitudeMax])

    // step through the rows of the table and add a dot for each event
    for (var i=0; i<daydata.getRowCount(); i++){
        var row = daydata.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }

        // create a new dot
        var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: '#FFFFB3',      // the dot stroke color
            fillColor: '#FFAD33', // the dot fill color
            fillOpacity: 0.65,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') * 40000
        })

        // place the new dot on the map
        circle.addTo(mymap);
        circle.bindPopup('Earthquake with a magnitude of: ' + row.getNum('mag'));
    }


//////////////// 
    // step through the rows of the table and add a dot for each station
    for (var i=0; i<station.getRowCount(); i++){
        var row = station.getRow(i)

        // create a new dot
        var circle = L.circle([row.getNum('Latitude'), row.getNum('Longitude')], {
            color: '#ba55d3',      // the dot stroke color
            fillColor: '#ba55d3', // the dot fill color
            fillOpacity: 0.65,  // use some transparency so we can see overlaps
            radius: 30000
        })

        // place the new dot on the map
        circle.addTo(mymap);
        circle.bindPopup("I'm a seismic monitoring station in " + row.getString('Name'));
    }
}


// removes any circles that have been added to the map
function removeAllCircles(){
    mymap.eachLayer(function(layer){
        if (layer instanceof L.Circle){
            mymap.removeLayer(layer)
        }
    })
}

// get the maximum value within a column
function columnMax(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.max(colValues);
}

// get the minimum value within a column
function columnMin(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.min(colValues);
}