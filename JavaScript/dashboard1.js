// this is just an inclass activity from 14.3 i pasted here,
// essential for dropdown menu!



var url = 'http://192.168.2.23:5000/api/CrimeData';

  d3.json(url).then(function(data) {
    console.log(data);
   });