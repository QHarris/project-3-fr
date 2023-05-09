// const ctx = document.getElementById('myChart');

// new Chart(ctx, {
//     type: 'pie',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

// get our data and use the reduce function to count the number of bites per breed
fetch('assets/allbites.json')
    .then(response => response.json())
    .then(data => {
        const breedCounts = data.reduce((counts, item) => {
            counts[item.breed] = (counts[item.breed] || 0) + 1;
            return counts;
        }, {});

        const breedNames = Object.keys(breedCounts);
        const breedCountsArray = Object.values(breedCounts);

        // Call the function to create the chart
        createPieChart(breedNames, breedCountsArray);
    });


// make the chart
function createPieChart(labels, data) {
    const canvas = document.getElementById('breedChart');
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#cc65fe',
                    '#ffce56',
                    '#b7dbab',
                    '#a5c3d9',
                    '#ff7f50',
                    '#cd5c5c',
                    '#f08080',
                    '#ffa07a'
                ]
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'right'
            }
        }
    });
}