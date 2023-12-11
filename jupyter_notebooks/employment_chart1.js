/**
 * JavaScript file to fetch Employment data from an API and visualize it using Chart.js.
 * Provides functionality to select different provinces and view corresponding employment data in a bar chart.
 */

/**
 * Populates the dropdown menu with unique provinces from the provided data.
 * @param {Object[]} data - Array of employment data objects.
 */
function populateProvinceDropdown(data) {
    const uniqueProvinces = new Set(data.map(item => item.Province));
    const provinceSelector = document.getElementById('provinceSelector');
    uniqueProvinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelector.appendChild(option);
    });
}

/**
 * Processes data for a selected province and prepares it for the bar chart visualization.
 * @param {Object[]} data - Array of employment data objects.
 * @param {string} selectedProvince - The province selected in the dropdown.
 * @returns {Object} Chart data in the format required by Chart.js.
 */
function processDataForSelectedProvince(data, selectedProvince) {
    const filteredData = data.filter(item => item.Province === selectedProvince);
    const dataByYear = {};

    filteredData.forEach(item => {
        if (!dataByYear[item.Year]) {
            dataByYear[item.Year] = 0;
        }
        dataByYear[item.Year] += item.Value;
    });

    const backgroundColors = ['rgba(255, 255, 0, 0.6)', 'rgba(0, 128, 0, 0.6)', 'rgba(0, 0, 255, 0.6)'];

    return {
        labels: Object.keys(dataByYear).sort(),
        datasets: [{
            label: `Employment in ${selectedProvince}`,
            data: Object.values(dataByYear),
            backgroundColor: backgroundColors,
            fill: false
        }]
    };
}

/**
 * Updates the bar chart with data from the selected province.
 * @param {string} selectedProvince - The province selected in the dropdown.
 */
function updateChartForSelectedProvince(selectedProvince) {
    const chartData = processDataForSelectedProvince(window.globalData, selectedProvince);
    window.myBarChart.data = chartData;
    window.myBarChart.update();
}

/**
 * Creates a bar chart using Chart.js with the provided data.
 * @param {Object} chartData - Data formatted for use in Chart.js.
 * @returns {Chart} A Chart.js bar chart instance.
 */
function createBarChart(chartData) {
    const ctx = document.getElementById('employmentChart').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                }
            },
            // Additional chart options...
        }
    });
}

// Main entry point: fetches data and initializes the bar chart and dropdown on page load.
window.onload = function() {
    fetch('http://localhost:5000/api/EmploymentData')
        .then(response => response.json())
        .then(data => {
            window.globalData = data.EmploymentData; // Store data globally
            populateProvinceDropdown(data.EmploymentData);
            const initialProvince = data.EmploymentData[0].Province;
            const chartData = processDataForSelectedProvince(data.EmploymentData, initialProvince);
            window.myBarChart = createBarChart(chartData); // Store bar chart globally
        })
        .catch(error => console.error('Error fetching data:', error));
};
