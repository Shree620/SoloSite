document.addEventListener('DOMContentLoaded', () => {
    var observer = new IntersectionObserver(fadeInOnScroll, {
        threshold: 0.1
    });

    var aboutSection = document.getElementById('about');
    observer.observe(aboutSection);
});

function fadeInOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            var section = entry.target;
            var opacity = 0;
            var interval = setInterval(function() {
                if (opacity < 1) {
                    opacity += 0.015;
                    section.style.opacity = opacity;
                } else {
                    clearInterval(interval);
                }
            }, 100);
            observer.unobserve(entry.target); // Stop observing once it has appeared
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    var observer = new IntersectionObserver(fadeInOnScroll, {
        threshold: 0.1
    });

    var articleIDSection = document.getElementById('articleID');
    observer.observe(articleIDSection);
});

document.addEventListener('DOMContentLoaded', () => {
    var observer = new IntersectionObserver(fadeInOnScroll, {
        threshold: 0.1
    });

    var aboutImage = document.getElementById('aboutImage');
    observer.observe(aboutImage);
});

function fadeInOutHeader() {
    var header = document.querySelector('.header-overlay');
    var opacity = 0;
    var intervalIn = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.02;
            header.style.opacity = opacity;
        } else {
            clearInterval(intervalIn);
            setTimeout(function() {
                var intervalOut = setInterval(function() {
                    if (opacity > 0) {
                        opacity -= 0.02;
                        header.style.opacity = opacity;
                    } else {
                        clearInterval(intervalOut);
                    }
                }, 100);
            }, 2500); // Change 2000 to the amount of time you want the header to remain fully visible
        }
    }, 100);
}

function fadeInCarousel() {
    var carouselContainer = document.querySelector('.carousel-container');
    var opacity = 0;
    var interval = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.02;
            carouselContainer.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    fadeInCarousel();
});

let currentIndex = 0;

const carouselContent = document.querySelector('.carousel-content');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
});

function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselContent.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('load', fadeInOutHeader);

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
                label: 'Stock Price',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
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
