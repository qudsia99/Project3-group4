//Check if data is loading by modifying route and running the below code
const url3 = 'http://127.0.0.1:5000/api/CrimeData';


function init() {

  d3.json(url3).then(function(data) {
    let crime = data.CrimeData;
    // Setting a filter for the type of crime data we want
    var prov = 'Alberta';
    var crime_yr = 2019;
    // Filtering data by province and year
    let filteredByValues1 = crime.filter(originalSample => originalSample['Province'] == prov && originalSample['Year'] == crime_yr);
    // Creating a dictionary to keep track of the number of times a given crime took place
    let crimeCategoryTotals = {};
    for (let i = 0; i < filteredByValues1.length; i++) {
      // Init variable to hold the current data in loop
      let item = filteredByValues1[i];
      // Extracting each Crime Category and Value (#number of times) that Crime
      let crimeCategory = item.CrimeCategory;
      let value = item.Value;
      if (crimeCategory in crimeCategoryTotals) {
        crimeCategoryTotals[crimeCategory] += value;
      } else {
        crimeCategoryTotals[crimeCategory] = value;
      }
    }
    // Set Parameters for our bar graph
    var crime_graph = [{
      x: Object.keys(crimeCategoryTotals),
      y: Object.values(crimeCategoryTotals),
      type: 'bar',
      width: 0.5,
      text: Object.values(crimeCategoryTotals),
      textposition: 'auto',
      hoverinfo: 'none',
    }];
    // Set layout parameters for our bar graph
    var crime_graph_layout = {
      height: 600,
      title: `Crime Numbers in ${prov} (${crime_yr })`,
      xaxis: {
        title: 'Crime Categories'
      },
      yaxis: {
        title: 'Crime Numbers'
      },
      margin: {
        b: 101
      }
    };
    // Drawing new Plotly Graph
    Plotly.newPlot('Crime', crime_graph, crime_graph_layout);
  }); // end of d3 element
}

init(); 

// Function called by DOM changes
function optionChanged3(new_province) {
  //console.log("time_period: " + new_year, "province: " + new_province);
  globalThis.new_prov = new_province
  //updatePlotlyCrime(new_province);
}

function optionChanged4(new_year) {
  //console.log("time_period: " + new_year, "province: " + new_province);
  globalThis.new_yr = new_year
  updatePlotlyCrime(new_prov, new_year);
}

function updatePlotlyCrime(new_province, new_year) {
  // Setting which year you want to filter the data for
  
  // Loading crime data api
  d3.json(url1).then(function(data) {
    let crime = data.CrimeData;
    // Setting a filter for the type of crime data we want
    let prov = new_province;
    // Filtering data by province and year
    let filteredByValues1 = crime.filter(originalSample => originalSample['Province'] == new_province && originalSample['Year'] == new_year);
    // Creating a dictionary to keep track of the number of times a given crime took place
    let crimeCategoryTotals = {};
    for (let i = 0; i < filteredByValues1.length; i++) {
      // Init variable to hold the current data in loop
      let item = filteredByValues1[i];
      // Extracting each Crime Category and Value (#number of times) that Crime
      let crimeCategory = item.CrimeCategory;
      let value = item.Value;
      if (crimeCategory in crimeCategoryTotals) {
        crimeCategoryTotals[crimeCategory] += value;
      } else {
        crimeCategoryTotals[crimeCategory] = value;
      }
    }
    // Set Parameters for our bar graph
    var crime_graph = [{
      x: Object.keys(crimeCategoryTotals),
      y: Object.values(crimeCategoryTotals),
      type: 'bar',
      width: 0.5,
      text: Object.values(crimeCategoryTotals),
      textposition: 'auto',
      hoverinfo: 'none',
    }];
    // Set layout parameters for our bar graph
    var crime_graph_layout = {
      height: 600,
      title: `Crime Numbers in ${new_province} (${new_year})`,
      xaxis: {
        title: 'Crime Categories'
      },
      yaxis: {
        title: 'Crime Numbers'
      },
      margin: {
        b: 101
      }
    };
    // Drawing new Plotly Graph
    Plotly.newPlot('Crime', crime_graph, crime_graph_layout);
  }); // end of d3 element
}



