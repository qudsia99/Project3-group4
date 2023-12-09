
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


//Check if data is loading by modifying route and running the below code
const url = 'http://127.0.0.1:5000/api/IncomeData';

function init(){

  d3.json(url).then(function(data) {
  
    //loading income data api 
    let inc = data.IncomeData;

    // Setting a filter for the tpye of income data we want
    let type_of_stat = 'Average employment income';

    // Setting which year you want to filter the data for
    let year = 2019;

    // Filtering data by Type of income data and year
    let filteredByValues = inc.filter(originalSample => originalSample['TypeOfStat'] == type_of_stat && originalSample["Year"] == year);
    
    //Loading array to store the province and average_income
    provinces = [];
    average_incomes = [];
    
    // For loop to go through all filtered values
    for (let i = 0; i < filteredByValues.length; i++) {
    // Init variable to hold the current data in loop
      let item = filteredByValues[i];

    // Extracting each province in the data
      let p = item.Province;
      let v = item.Value;
      
    //taking extracted eleemnt and pushing into province and income arrays
      provinces.push(p);
      average_incomes.push(v)

    }

  //takes a vlaue at an given index and see if this value is repeated at another index
  //of it is it ignores that vlaues and does not store is
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  //extracts the unique provinces names from our array and store them in a new array called unique_provinces
  var unique_provinces = provinces.filter(onlyUnique)
  console.log(unique_provinces)

  //function to take average of the first 3 nubmers in our array as the income data was samples 3 times for each provine
  function averageEveryThreeNumbers(arr) {
    //initliazes an array to store the data
    const result = [];
  
    //creates a for loop that stops after its gone through every tuple of data in the array
    for (let i = 0; i < arr.length - 2; i += 3) {
      //slices inital array into group of 3 
      const chunk = arr.slice(i, i + 3);
      
      let sum = 0;
      //takes each group and determines each sum
      for (const num of chunk) {
        sum += num;
      }

      //takes the sum of each group and divides it by 3 and roudns it by 2 decimal places
      const average = Math.round((sum / chunk.length));
      //pushes the average result to our 
      result.push(average);
    }
  
    //returns result of the function 
    return result;
  }
  
  //Using functio to average our income data
  const resultArray = averageEveryThreeNumbers(average_incomes);

  //Comibining the province and income array into an object
  var sorted_income_data = unique_provinces.map((province, index) => ({ x: province, y: resultArray[index]}));

  // Sort the data alphabetically by Province
  sorted_income_data.sort((a, b) => a.x.localeCompare(b.x));
  
  //Sets Parameters for our line graph
  var income_graph = [{
    x: sorted_income_data.map(point => point.x),
    y: sorted_income_data.map(point => point.y),
    type: 'line'
  }];

  //Sets layout parameters for our line graph
  var income_graph_layout = {
    height: 600,
    title: 'Average Income Across Provinces',
    xaxis: {
      title: 'Provinces'
    },
    yaxis: {
      title: 'Average Income'
    },
    margin: {
      b: 101 
    }
  };

  //Drawing new Plotly Graph
  Plotly.newPlot('Income', income_graph, income_graph_layout);

  }); //end of d3 element

}

init();

// Function called by DOM changes
function optionChanged(time_period) {
  updatePlotly(time_period);
}

// Update the restyled plot's values
function updatePlotly(new_year) {

  d3.json(url).then(function(data) {
  
    //loading income data api 
    let inc = data.IncomeData;

    // Setting a filter for the tpye of income data we want
    let type_of_stat = 'Average employment income';

    // Setting which year you want to filter the data for
    let year = new_year;

    // Filtering data by Type of income data and year
    let filteredByValues = inc.filter(originalSample => originalSample['TypeOfStat'] == type_of_stat && originalSample["Year"] == year);
    
    //Loading array to store the province and average_income
    provinces = [];
    average_incomes = [];
    
    // For loop to go through all filtered values
    for (let i = 0; i < filteredByValues.length; i++) {
    // Init variable to hold the current data in loop
      let item = filteredByValues[i];

    // Extracting each province in the data
      let p = item.Province;
      let v = item.Value;
      
    //taking extracted eleemnt and pushing into province and income arrays
      provinces.push(p);
      average_incomes.push(v)

    }

  //takes a vlaue at an given index and see if this value is repeated at another index
  //of it is it ignores that vlaues and does not store is
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  //extracts the unique provinces names from our array and store them in a new array called unique_provinces
  var unique_provinces = provinces.filter(onlyUnique)
  console.log(unique_provinces)

  //function to take average of the first 3 nubmers in our array as the income data was samples 3 times for each provine
  function averageEveryThreeNumbers(arr) {
    //initliazes an array to store the data
    const result = [];
  
    //creates a for loop that stops after its gone through every tuple of data in the array
    for (let i = 0; i < arr.length - 2; i += 3) {
      //slices inital array into group of 3 
      const chunk = arr.slice(i, i + 3);
      
      let sum = 0;
      //takes each group and determines each sum
      for (const num of chunk) {
        sum += num;
      }

      //takes the sum of each group and divides it by 3 and roudns it by 2 decimal places
      const average = Math.round((sum / chunk.length));
      //pushes the average result to our 
      result.push(average);
    }
  
    //returns result of the function 
    return result;
  }
  
  //Using functio to average our income data
  const resultArray = averageEveryThreeNumbers(average_incomes);

  //Comibining the province and income array into an object
  var sorted_income_data = unique_provinces.map((province, index) => ({ x: province, y: resultArray[index]}));

  // Sort the data alphabetically by Province
  sorted_income_data.sort((a, b) => a.x.localeCompare(b.x));
  
  //Sets Parameters for our line graph
  var income_graph = [{
    x: sorted_income_data.map(point => point.x),
    y: sorted_income_data.map(point => point.y),
    type: 'line'
  }];

  //Sets layout parameters for our line graph
  var income_graph_layout = {
    height: 600,
    title: 'Average Income Across Provinces',
    xaxis: {
      title: 'Provinces'
    },
    yaxis: {
      title: 'Average Income'
    },
    margin: {
      b: 101 
    }
  };

  //Drawing new Plotly Graph
  Plotly.newPlot('Income', income_graph, income_graph_layout);

  }); //end of d3 element

};