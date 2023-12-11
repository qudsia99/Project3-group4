//Check if data is loading by modifying route and running the below code
const url = 'http://127.0.0.1:5000/api/IncomeData';
const url1 = 'http://127.0.0.1:5000/api/CrimeData';
const url2 = 'http://127.0.0.1:5000/api/EmploymentData';


function init(){

  // Setting which year you want to filter the data for
  let year = 2019;

  updatePlotly(year, 'Alberta');
  updatePlotlyCrime(year, 'Alberta');

  d3.json(url).then(function(data) {
  
    //loading income data api 
    let inc = data.IncomeData;

    // Setting a filter for the tpye of income data we want
    let type_of_stat = 'Average employment income';

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
  }); //end of d3 element1

  //------------------------------------------------------//

  //Selecting Crime Data
  d3.json(url1).then(function(data) {

  //loading income data api 
  let crime = data.CrimeData;

  // Setting a filter for the tpye of income data we want
  let prov = 'Alberta';

  // Filtering data by Type of income data and year
  let filteredByValues1 = crime.filter(originalSample => originalSample['Province'] == prov && originalSample['Year'] == year);
 
  //Creating a dictonary to keep track of the nubmer of time a given crime took place 
  let crimeCategoryTotals = {};

  for (let i = 0; i < filteredByValues1.length; i++) {
    // Init variable to hold the current data in loop
    let item = filteredByValues1[i];

    // Extracting each Crime Category and Value (#number of times) tjat Crime
    let crimeCategory = item.CrimeCategory;
    let value = item.Value;
      
    if (crimeCategory in crimeCategoryTotals) {
      crimeCategoryTotals[crimeCategory] += value;
    } else {
      crimeCategoryTotals[crimeCategory] = value;
    }
  }

  //Selecting panel-body element of our page 
  const metadataPanel = d3.select(".panel-body");
  
  //Posting Crime Information
  metadataPanel
    .selectAll("p")
    .data(Object.entries(crimeCategoryTotals))
    .enter()
    //initlaizes a new "paragraph"
    .append("p")
    //prints each key and assoicated value
    .text(([key, value]) => `${key}: ${value}`);


  }); //end of d3 element
}

init();

// Function called by DOM changes
function optionChanged(province, time_period) {
  console.log("time_period: " + time_period, "province: " + province);
  updatePlotly(time_period, province);
}


// Update the restyled plot's values
function updatePlotly(new_year, new_province) {

  // Setting which year you want to filter the data for
  let year = new_year;
  updatePlotlyCrime(new_year, new_province);

  d3.json(url).then(function(data) {
  
    //loading income data api 
    let inc = data.IncomeData;

    // Setting a filter for the tpye of income data we want
    let type_of_stat = 'Average employment income';

    // Filtering data by Type of income data and year
    let filteredByValues = inc.filter(originalSample => originalSample['TypeOfStat'] == type_of_stat && originalSample["Year"] == year);
    //let filteredByValues1 = crime.filter(originalSample => originalSample['Province'] == prov && originalSample['Year'] == year);
    
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
  
  //Using function to average our income data
  const resultArray = averageEveryThreeNumbers(average_incomes);

  //Combining the province and income array into an object
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

  //------------------------------------------------------//

  //Selecting Crime Data
  d3.json(url1).then(function(data) {

    //loading income data api 
    let crime = data.CrimeData;
  
    // Setting a filter for the tpye of income data we want
    let prov = new_province;
    console.log("province: " + prov);
  
    // Filtering data by Type of income data and year
    let filteredByValues1 = crime.filter(originalSample => originalSample['Province'] == prov && originalSample['Year'] == year);
   
    //Creating a dictonary to keep track of the nubmer of time a given crime took place 
    let crimeCategoryTotals = {};
  
    for (let i = 0; i < filteredByValues1.length; i++) {
      // Init variable to hold the current data in loop
      let item = filteredByValues1[i];
  
      // Extracting each Crime Category and Value (#number of times) tjat Crime
      let crimeCategory = item.CrimeCategory;
      let value = item.Value;
        
      if (crimeCategory in crimeCategoryTotals) {
        crimeCategoryTotals[crimeCategory] += value;
      } else {
        crimeCategoryTotals[crimeCategory] = value;
      }
    }
  
    //Selecting panel-body element of our page 
    const metadataPanel = d3.select(".panel-body");

    metadataPanel.selectAll("p").remove(); 
    //Posting Crime Information
    metadataPanel
      .selectAll("p")
      .data(Object.entries(crimeCategoryTotals))
      .enter()
      //initlaizes a new "paragraph"
      .append("p")
      //prints each key and assoicated value
      .text(([key, value]) => `${key}: ${value}`);
  
  
    }); //end of d3 element

};

function updatePlotlyCrime(new_year, new_province) {

  // Setting which year you want to filter the data for
  let year = new_year;

  // Loading crime data api
  d3.json(url1).then(function(data) {

    let crime = data.CrimeData;

    // Setting a filter for the type of crime data we want
    let prov = new_province;

    // Filtering data by province and year
    let filteredByValues1 = crime.filter(originalSample => originalSample['Province'] == prov && originalSample['Year'] == year);

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

    // Selecting panel-body element of our page
    const metadataPanel = d3.select(".panel-body");

    metadataPanel.selectAll("p").remove();
    // Posting Crime Information
    metadataPanel
      .selectAll("p")
      .data(Object.entries(crimeCategoryTotals))
      .enter()
      // Initializes a new "paragraph"
      .append("p")
      // Prints each key and associated value
      .text(([key, value]) => `${key}: ${value}`);

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
      title: `Crime Numbers in ${prov} (${year})`,
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


