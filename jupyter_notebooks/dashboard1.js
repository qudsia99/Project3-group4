
// Check if data is loading by modifying route and running the below code
// var url = 'http://127.0.0.1:5000/api/CrimeData';
  // d3.json(url).then(function(data) {
  //   console.log(data);
  //  });


//CANADA MAP

let baseurl = 'http://127.0.0.1:5000/'
let type = 'api/CrimeData'


let url1 = baseurl + type 

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
  // for (let i = 0; i < data.CrimeData.length; i++) {
  //   let coords = data.CrimeData[i].Coordinate;
  //   let parts = coords.split('.');
  //   console.log("parts",parts)
// the above for loop counting everything over and over.


  let provinceDataCount = {};

  // Iterate through the rows, counting quantity per province
  data.CrimeData.forEach(count => {
    let province = count.Province;
     // Dividing count among provinces
    provinceDataCount[province] = (provinceDataCount[province] || 0) + 1;
  });

// Iterate through the unique provinces and create one marker per province
  Object.keys(provinceDataCount).forEach(province => {
    // Get the count of data for the current province
    let count2 = provinceDataCount[province];
    // setting radius of marker to depend on data count per pvovince 
    // for marker size
    let radius = count2 * 0.1;

  // Converting non-standard coordinates into standard ('lat','lon')
    let firstDataPoint = data.CrimeData.find(point => point.Province === province);

    if (firstDataPoint && firstDataPoint.Coordinate) {
      let coords = firstDataPoint.Coordinate;
      let parts = coords.split('.');
      
      if (parts.length >= 3) {
        let latitude = parseFloat(parts[0] + '.' + parts[1]);
        let longitude = parseFloat(parts[2]);

        console.log('Converted Coordinates:', [latitude, longitude]);
      
      // Check for valid coordinates
      if (!isNaN(latitude) && !isNaN(longitude)) {
        // Create and add markers to the map
        L.circleMarker([latitude, longitude], {
          draggable: true,
          color: "red",
          radius: radius,
          title: province
        }).addTo(myMap);
      }
    }
  }
  })
}
);