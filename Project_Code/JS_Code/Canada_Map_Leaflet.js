//CANADA MAP

// Create URL
let baseurl = 'http://127.0.0.1:5000/'
let type2 = 'api/CrimeData'

let url1 = baseurl + type2

// Creating a map object.
  let myMap = L.map("map", {
    center: [53.09, -93.71],
    zoom: 4.0
  });

  // Adding tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

console.log('Map initialized woo!');

let ontario, alberta, manitoba, newfoundland, quebec, sask, bc;
const markerz = {}

// Grabbing the Flask-API data with d3.
d3.json(url1).then(function(data) {
  console.log("loading data:", data)

// Create markers for each province
  let radius = 5
 //Ontario
  ontario = L.circleMarker([51.215978, -86.869925], {
    draggable: true,
    color: "red",
    radius: radius,
    title: "Ontario"
    }).addTo(myMap);

    //alberta
    alberta = L.circleMarker([56.172808,-115.034279], {
      draggable: true,
      color: "red",
      radius: radius,
      title: "Alberta"
      }).addTo(myMap);

    //manitoba
   manitoba = L.circleMarker([55.977643, -97.152674], {
      draggable: true,
      color: "red",
      radius: radius,
      title: "Manitoba"
      }).addTo(myMap);

    //newfoundland
   newfoundland = L.circleMarker([53.473974, -61.092736], {
      draggable: true,
      color: "red",
      radius: radius,
      title: "New Foundland and Labrador"
      }).addTo(myMap);

    //quebec
   quebec = L.circleMarker([50.734533, -72.591731], {
      draggable: true,
      color: "red",
      radius: radius,
      title: "Quebec"
      }).addTo(myMap);
    
    //Saskatchewan
     sask = L.circleMarker([53.308699, -105.807130], {
      draggable: true,
      color: "red",
      radius: radius,
      title: "Saskatchewan"
      }).addTo(myMap);
    
    //British Columbia
   bc = L.circleMarker([56.684122, -125.494629], {
      draggable: true,
      color: "red",
      radius: radius,
      title: "British Columbia"
      }).addTo(myMap);
    
  let crimeCounts = {};

// Iterate through the data to count occurrences of each crime type in each province
data.CrimeData.forEach((entry => {
  let province = entry.Province;
  let crimeType = entry.CrimeType;

  // Initialize the counts for the province and crime type
  if (!crimeCounts[province]) {
    crimeCounts[province] = {};
  }

  // Increment the count for the crime type in the province
  crimeCounts[province][crimeType] = (crimeCounts[province][crimeType] || 0) + 1;
}));
});

function optionChanged() {
  d3.json(url1).then(function(data) {
  let yearmenu = d3.select('#selYearData');
  var yearselected = yearmenu.property("value");

    if (yearselected === "2019") {
      ontario.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Ontario");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top 3 Categories of Calls made:</strong> Services, Assaults, B&E <br>
              <strong>Persons with Income under $5,000: </strong> 11.7% <br>
              <strong>Mean Unemployment Rate:</strong> 5.4%`;
  
          console.log(event)
          ontario.bindPopup(info).openPopup();
          });
      alberta.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Alberta");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Theft, B&E, Assaults <br>
              <strong>Persons with Income under $5,000:</strong> 10.7% <br>
              <strong> Mean Unemployment Rate:</strong> 7.05%`

          console.log(event)
          alberta.bindPopup(info).openPopup();
          });

      manitoba.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Manitoba");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> B&E, Theft, Assaults <br>
              <strong>Persons with Income under $5,000:</strong> 12.8% <br>
              <strong>Mean Unemployment Rate:</strong> 4.97%`
      
          console.log(event)
          manitoba.bindPopup(info).openPopup();
          });

      newfoundland.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Newfoundland and Labrador");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Service, Assaults, B&E <br>
              <strong>Persons with Income under $5,000:</strong> 12.3% <br>
              <strong>Unemployment Rate:</strong> 12.23%`

            console.log(event)
            newfoundland.bindPopup(info).openPopup();
            });

      quebec.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Quebec");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made</strong>: Assaults, B&E, Theft <br>
              <strong>Persons with Income under $5,000:</strong> 11.5% <br>
              <strong> Mean Unemployment Rate:</strong> 5.3%`

            console.log(event)
            quebec.bindPopup(info).openPopup();
            });

      sask.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Saskatchewan");
        let info = `
            <strong>${provinceInfo.Province}</strong><br>
            <strong>Top Categories of Calls made:</strong> Services, B&E, Assaults <br>
            <strong>Persons with Income under $5,000:</strong> 13.2% <br>
            <strong>Mean Unemployment Rate:</strong> 5.31%`
            console.log(event)
            sask.bindPopup(info).openPopup();
            });

      bc.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "British Columbia");
        let info = `
            <strong>${provinceInfo.Province}</strong><br>
            <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
            <strong>Persons with Income under $5,000:</strong> 13.3% <br>
            <strong>Mean Unemployment Rate:</strong> 4.77%`
            console.log(event)
            bc.bindPopup(info).openPopup();
            });                 


    } else if (yearselected === "2020") {
      ontario.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Ontario");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
              <strong>Persons with Income under $5,000:</strong> 14.5% <br>
              <strong>Mean Unemployment Rate:</strong> 9.7%`;
  
          console.log(event)
          ontario.bindPopup(info).openPopup();
          });

       alberta.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Alberta");
            let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
              <strong>Persons with Income under $5,000:</strong> 11.9% <br>
              <strong>Mean Unemployment Rate:</strong>11.45%`
              console.log(event)
              alberta.bindPopup(info).openPopup();
                  });

        manitoba.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Manitoba");
            let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
              <strong>Persons with Income under $5,000:</strong> 12.8% <br>
              <strong>Mean Unemployment Rate:</strong> 7.94%`
              console.log(event)
              manitoba.bindPopup(info).openPopup();
              });

        newfoundland.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Newfoundland and Labrador");
            let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
              <strong>Persons with Income under $5,000:</strong> 14.1% <br>
              <strong>Mean Unemployment Rate:</strong> 14.59%`
              console.log(event)
              newfoundland.bindPopup(info).openPopup();
              });


        quebec.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Quebec");
            let info = `
                <strong>${provinceInfo.Province}</strong><br>
                <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
                <strong>Persons with Income under $5,000:</strong> 12.6% <br>
                <strong>Mean Unemployment Rate:</strong> 9.34%`
                console.log(event)
                quebec.bindPopup(info).openPopup();
                });

        sask.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Saskatchewan");
            let info = `
                <strong>${provinceInfo.Province}</strong><br>
                <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
                <strong>Persons with Income under $5,000:</strong> 12.7% <br>
                <strong>Mean Unemployment Rate:</strong> 8.32%`
                console.log(event)
                sask.bindPopup(info).openPopup();
                });

        bc.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "British Columbia");
            let info = `
                <strong>${provinceInfo.Province}</strong><br>
                <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
                <strong>Persons with Income under $5,000:</strong> 13.9% <br>
                <strong>Mean Unemployment Rate:</strong> 9.25%`
                console.log(event)
                bc.bindPopup(info).openPopup();
                });
                    

    } else if (yearselected === "2021") {
      ontario.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Ontario");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
              <strong>Persons with Income under $5,000:</strong> 13.8% <br>
              <strong>Unemployment Rate:</strong> 8.41%`;
           console.log(event)
          ontario.bindPopup(info).openPopup();
          });

      alberta.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Alberta");
            let info = `
                    <strong>${provinceInfo.Province}</strong><br>
                    <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
                    <strong>Persons with Income under $5,000:</strong> 14.2% <br>
                    <strong>Mean Unemployment Rate:</strong> 9.07%`
              console.log(event)
              alberta.bindPopup(info).openPopup();
                  });

      manitoba.on('mouseover', function (event) {
                    let provinceInfo = data.CrimeData.find(province => province.Province === "Manitoba");
                    let info = `
                          <strong>${provinceInfo.Province}</strong><br>
                          <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
                          <strong>Persons with Income under $5,000:</strong> 12.9% <br>
                          <strong>Mean Unemployment Rate:</strong> 6.27%`
                      console.log(event)
       manitoba.bindPopup(info).openPopup();
      });

      newfoundland.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Newfoundland and Labrador");
                        let info = `
                              <strong>${provinceInfo.Province}</strong><br>
                              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
                              <strong>Persons with Income under $5,000:</strong> 13.9% <br>
                              <strong>Mean Unemployment Rate:</strong> 13.2%`
                          console.log(event)
                          newfoundland.bindPopup(info).openPopup();
                          });


      quebec.on('mouseover', function (event) {
                            let provinceInfo = data.CrimeData.find(province => province.Province === "Quebec");
                            let info = `
                                  <strong>${provinceInfo.Province}</strong><br>
                                  <strong>Top Categories of Calls made</strong>: Services, Assaults, B&E <br>
                                  <strong>Persons with Income under $5,000:</strong> 12.4% <br>
                                  <strong>Mean Unemployment Rate:</strong> 6.34%`
                   console.log(event)
                   quebec.bindPopup(info).openPopup();
                  });


      sask.on('mouseover', function (event) {
                                let provinceInfo = data.CrimeData.find(province => province.Province === "Saskatchewan");
                                let info = `
                                      <strong>${provinceInfo.Province}</strong><br>
                                      <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E<br>
                                      <strong>Persons with Income under $5,000:</strong> 13.2% <br>
                                      <strong>Mean Unemployment Rate:</strong> 6.65%`
                                  console.log(event)
                                  sask.bindPopup(info).openPopup();
                                  });
                            
      bc.on('mouseover', function (event) {
                                    let provinceInfo = data.CrimeData.find(province => province.Province === "British Columbia");
                                    let info = `
                                          <strong>${provinceInfo.Province}</strong><br>
                                          <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E <br>
                                          <strong>Persons with Income under $5,000:</strong> 12.9% <br>
                                          <strong>Mean Unemployment Rate:</strong> 6.93%`
                                      console.log(event)
                                      bc.bindPopup(info).openPopup();
                                      });
                                    }
                                  });
      }
  
  optionChanged();

  function cP(){
      d3.json(url1).then(function(data) {
      
        let provinces = ["Ontario", "Alberta","Manitoba", "Newfoundland and Labrador","Quebec","Saskatchewan","British Columbia"];
       
      // Close all popups when mouse moves over markup
       ontario.on('mouseout', function (event) {console.log(event)
        ontario.closePopup()});
      alberta.on('mouseout', function (event) {console.log(event)
        alberta.closePopup()});
      manitoba.on('mouseout', function (event) {console.log(event)
        manitoba.closePopup()});
      newfoundland.on('mouseout', function (event) {console.log(event)
        newfoundland.closePopup()});
      quebec.on('mouseout', function (event) {console.log(event)
        quebec.closePopup()});    
      sask.on('mouseout', function (event) {console.log(event)
        sask.closePopup()});        
      bc.on('mouseout', function (event) {console.log(event) 
        bc.closePopup()});
      });

      }

    cP();
     
    


