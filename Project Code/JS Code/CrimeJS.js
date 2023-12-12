//Check if data is loading by modifying route and running the below code
const url3 = 'http://127.0.0.1:5000/api/CrimeData';


//initliazing the init function 
function init1() {

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
    var crime_trace = [{
      //initialing the keys and value of our crimecategory total dict as the x and y values
      x: Object.keys(crimeCategoryTotals),
      y: Object.values(crimeCategoryTotals),
      type: 'bar',
      width: 0.5,
      //displaying bar graph values
      text: Object.values(crimeCategoryTotals),
      textposition: 'auto',
      hoverinfo: 'none',
      //setting bar graph color along with its outline color
      marker: {
        color: 'rgb(139,0,0)',
        opacity: 0.8,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    }];
    // Set layout parameters for our bar graph
    var crime_graph_layout = {
      height: 600,
      title: `Crime Numbers in ${prov} (${crime_yr})`,
      xaxis: {
        title: 'Crime Categories'
      },
      yaxis: {
        title: 'Reported Incidents'
      },
      margin: {
        b: 101
      }
    };
    // Drawing new Plotly Graph
    Plotly.newPlot('Crime', crime_trace, crime_graph_layout);
  }); // end of d3 element
}

init1(); 

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
  
  // Loading crime data api
  d3.json(url3).then(function(data) {
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
    var crime_trace = [{
      x: Object.keys(crimeCategoryTotals),
      y: Object.values(crimeCategoryTotals),
      type: 'bar',
      width: 0.5,
      text: Object.values(crimeCategoryTotals),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: 'rgb(139,0,0)',
        opacity: 0.8,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
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
    Plotly.newPlot('Crime', crime_trace, crime_graph_layout);
  }); // end of d3 element
}



