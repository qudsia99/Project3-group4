//CANADA MAP

// Create URL
let baseurl2 = 'http://127.0.0.1:5000/'
let type2 = 'api/CrimeData'

let url3 = baseurl2 + type2

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

let ontario, alberta, manitoba, newfoundland, quebec, sask, bc;
const markerz = {}

// Grabbing the Flask-API data with d3.
d3.json(url3).then(function(data) {
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

d3.selectAll("#yearData").on("change", optionChanged);

function optionChanged() {
  let yearmenu = d3.select('#selYearData');
  var yearselected = yearmenu.property("value");

    if (yearselected === "2019") {
      ontario.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Ontario");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:<strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 560, 350, 280, 280, 280`;
  
          console.log(event)
          ontario.bindPopup(info).openPopup();
          });
      alberta.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Alberta");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 160, 100, 80, 80, 80`
          console.log(event)
          alberta.bindPopup(info).openPopup();
          });

      manitoba.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Manitoba");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 80, 50, 40, 40, 40`
          console.log(event)
          manitoba.bindPopup(info).openPopup();
          });

      newfoundland.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Newfoundland and Labrador");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 80, 50, 40, 40, 40`
            console.log(event)
            newfoundland.bindPopup(info).openPopup();
            });

      quebec.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Quebec");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made</strong>: Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 160, 100, 80, 80, 80`
            console.log(event)
            quebec.bindPopup(info).openPopup();
            });

      sask.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Saskatchewan");
        let info = `
            <strong>${provinceInfo.Province}</strong><br>
            <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
            <strong>Value:</strong> 160, 100, 80, 80, 80`
            console.log(event)
            sask.bindPopup(info).openPopup();
            });

      bc.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "British Columbia");
        let info = `
            <strong>${provinceInfo.Province}</strong><br>
            <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
            <strong>Value:</strong> 160, 100, 80, 80, 80`
            console.log(event)
            bc.bindPopup(info).openPopup();
            });                 


    } else if (yearselected === "2020") {
      ontario.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Ontario");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:<strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 670, 420, 336, 336, 336`;
  
          console.log(event)
          ontario.bindPopup(info).openPopup();
          });

       alberta.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Alberta");
            let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 192, 120, 96, 96, 96`
              console.log(event)
              alberta.bindPopup(info).openPopup();
                  });

        manitoba.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Manitoba");
            let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 96, 60, 48, 48, 48`
              console.log(event)
              manitoba.bindPopup(info).openPopup();
              });

        newfoundland.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Newfoundland and Labrador");
            let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 96, 60, 48, 48, 48`
              console.log(event)
              newfoundland.bindPopup(info).openPopup();
              });


        quebec.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Quebec");
            let info = `
                <strong>${provinceInfo.Province}</strong><br>
                <strong>Top Categories of Calls made</strong>: Services, Assaults, B&E, Sexual Assaults, Threats <br>
                <strong>Value:</strong> 192, 120, 96, 96, 96`
                console.log(event)
                quebec.bindPopup(info).openPopup();
                });

        sask.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Saskatchewan");
            let info = `
                <strong>${provinceInfo.Province}</strong><br>
                <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
                <strong>Value:</strong> 192, 120, 96, 96, 96`
                console.log(event)
                sask.bindPopup(info).openPopup();
                });

        bc.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "British Columbia");
            let info = `
                <strong>${provinceInfo.Province}</strong><br>
                <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
                <strong>Value:</strong> 192, 120, 96, 96, 96`
                console.log(event)
                bc.bindPopup(info).openPopup();
                });
                    

    } else if (yearselected === "2021") {
      ontario.on('mouseover', function (event) {
        let provinceInfo = data.CrimeData.find(province => province.Province === "Ontario");
        let info = `
              <strong>${provinceInfo.Province}</strong><br>
              <strong>Top Categories of Calls made:<strong>2021 Services, Assaults, B&E, Sexual Assaults, Threats <br>
              <strong>Value:</strong> 672, 4200, 336, 336, 336`;
           console.log(event)
          ontario.bindPopup(info).openPopup();
          });

      alberta.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Alberta");
            let info = `
                    <strong>${provinceInfo.Province}</strong><br>
                    <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
                    <strong>Value:</strong> 192, 120, 96, 96, 96`
              console.log(event)
              alberta.bindPopup(info).openPopup();
                  });

      manitoba.on('mouseover', function (event) {
                    let provinceInfo = data.CrimeData.find(province => province.Province === "Manitoba");
                    let info = `
                          <strong>${provinceInfo.Province}</strong><br>
                          <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
                          <strong>Value:</strong> 96, 60, 48, 48, 48`
                      console.log(event)
       manitoba.bindPopup(info).openPopup();
      });

      newfoundland.on('mouseover', function (event) {
            let provinceInfo = data.CrimeData.find(province => province.Province === "Newfoundland and Labrador");
                        let info = `
                              <strong>${provinceInfo.Province}</strong><br>
                              <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
                              <strong>Value:</strong> 96, 60, 48, 48, 48`
                          console.log(event)
                          newfoundland.bindPopup(info).openPopup();
                          });


      quebec.on('mouseover', function (event) {
                            let provinceInfo = data.CrimeData.find(province => province.Province === "Quebec");
                            let info = `
                                  <strong>${provinceInfo.Province}</strong><br>
                                  <strong>Top Categories of Calls made</strong>: Services, Assaults, B&E, Sexual Assaults, Threats <br>
                                  <strong>Value:</strong> 120, 120, 96, 96, 96`
                   console.log(event)
                   quebec.bindPopup(info).openPopup();
                  });


      sask.on('mouseover', function (event) {
                                let provinceInfo = data.CrimeData.find(province => province.Province === "Saskatchewan");
                                let info = `
                                      <strong>${provinceInfo.Province}</strong><br>
                                      <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
                                      <strong>Value:</strong> 192, 120, 96, 96, 96`
                                  console.log(event)
                                  sask.bindPopup(info).openPopup();
                                  });
                            
      bc.on('mouseover', function (event) {
                                    let provinceInfo = data.CrimeData.find(province => province.Province === "British Columbia");
                                    let info = `
                                          <strong>${provinceInfo.Province}</strong><br>
                                          <strong>Top Categories of Calls made:</strong> Services, Assaults, B&E, Sexual Assaults, Threats <br>
                                          <strong>Value:</strong> 192, 120, 96, 96, 96`
                                      console.log(event)
                                      bc.bindPopup(info).openPopup();
                                      });
                                    }
      }
      optionChanged();
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