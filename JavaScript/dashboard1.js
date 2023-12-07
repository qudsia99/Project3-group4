// this is just an inclass activity from 14.3 i pasted here,
// essential for dropdown menu!



var url = 'http://127.0.0.1:5000/api/CrimeData';
fetch(url)
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));