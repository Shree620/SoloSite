const apiKey = 'L0FOR5OAVLUP7YF4';
const symbol = 'AAPL';
const interval = '1min';
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the data to see the structure
        const timeSeries = data['Time Series (1min)'];
        if (timeSeries) {
            const times = [];
            const prices = [];
            for (const time in timeSeries) {
                times.push(new Date(time).toLocaleTimeString());
                prices.push(parseFloat(timeSeries[time]['1. open']));
            }
            createChart(times.reverse(), prices.reverse()); // Reverse to show oldest to newest
        } else {
            console.error('No data available');
        }
    })
    .catch(error => console.error('Error fetching stock data:', error));

function createChart(labels, data) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'APL Stock Price',
                data: data,
                borderColor: 'black',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
}
function updateChart(labels, data) {
    window.stockChart.data.labels = labels;
    window.stockChart.data.datasets[0].data = data;
    window.stockChart.update();
}

// Fetch data and create chart initially
fetchStockData();

// Set interval to fetch data every minute (60000 ms)
setInterval(fetchStockData, 60000);