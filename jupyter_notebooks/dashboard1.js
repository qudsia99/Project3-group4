
// Check if data is loading by modifying route and running the below code
// var url = 'http://127.0.0.1:5000/api/CrimeData';
  // d3.json(url).then(function(data) {
  //   console.log(data);
  //  });


//CANADA MAP

let baseurl = 'http://127.0.0.1:5000/'
let type = 'api/CrimeData'
let year = "/2019"

let url1 = baseurl + type + year

  // Creating a map object.
  let myMap = L.map("map", {
    center: [62.09, -100.71],
    zoom: 4.0
  });

  // Adding tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

  console.log('Map initialized woo!');

// Grabbing the Flask-API data with d3.
d3.json(url1).then(function(data) {
  console.log("loading data:", data)

  // Create a row loop to go through the rows of data
  for (let i = 0; i < data.length; i++) {
    let coords = data[i].Coordinate;
    let parts = coords.split('.');
  
    // Ensure that there are at least three parts
    if (parts.length >= 3) {
      let latitude = parseFloat(parts[0] + '.' + parts[1]);
      let longitude = parseFloat(parts[2]);
      
      console.log('Creating Marker for:', data[i].Province);
      console.log('Original Coordinate:', coords);
      console.log('Converted Coordinates:', [latitude, longitude]);
      // Check for valid coordinates
      if (!isNaN(latitude) && !isNaN(longitude)) {
        // Create and add markers to the map
        L.marker([latitude, longitude], {
          draggable: true,
          title: data[i].Province
        }).addTo(myMap);
      }
    }
};
});