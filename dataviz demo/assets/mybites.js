///////////////////////////////////////////////////////////////
// function to make dates more readable
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

///////////////////////////////////////////////////////////////
// Function to render your items
const renderItems = (mydata) => {
    // The `ul` where the items will be inserted
    const mydataList = document.getElementById('mydata')


    // Loop through each item in mydata array
    mydata.forEach(item => {
        const listItem = document.createElement('li') // Make the `li`


        // This can get annoying, so we can use “template literals” instead
        const itemDetails =
            `
			<p>#${item.uniqueid}</p>
            <p><time>${formatDate(item.dateofbite)}</time></p>
					<div class="breed">${item.breed}</div>
			`
        listItem.insertAdjacentHTML('beforeend', itemDetails) // Which can we then insert

        // You can build logic from your data, too
        if (!item.spayneuter) { // If this is `false`
            listItem.classList.add('alert') // Add this class to the whole `li`
        }

        mydataList.appendChild(listItem) // Then add the whole `li` into the `ul`
    })


    ///////////////////////////////////////////////////////////////
    // Simple function to get a count of the number of items in mydata. Could also use `mydata.length`
    const totalStat = document.getElementById('count')
    totalStat.textContent = `${mydata.length}`


    ///////////////////////////////////////////////////////////////
    // Function to get a count of the number of items in mydata that have a specific value for a given key
    function findMostCommonBreed(mydata) {
        // Create an object to hold the counts of each breed
        const breedCounts = {};

        // Loop through each item in the data array
        mydata.forEach(item => {
            // Retrieve the breed for the current item
            const breed = item.breed;

            // If the breed is not undefined or null, increment its count in the breedCounts object
            if (breed) {
                breedCounts[breed] = (breedCounts[breed] || 0) + 1;
            }
        });

        // Find the breed with the highest count
        let mostCommonBreed = null;
        let highestCount = 0;

        Object.entries(breedCounts).forEach(([breed, count]) => {
            if (count > highestCount) {
                mostCommonBreed = breed;
                highestCount = count;
            }
        });

        // Return the most common breed
        return mostCommonBreed;
    }

    // ... and then render it to the page
    const topBreed = document.getElementById('topbreed')
    topBreed.textContent = findMostCommonBreed(mydata);

    ///////////////////////////////////////////////////////////////
    // Function to find the most common day of the week to get bit
    function findMostCommonDay(mydata) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Create an object to hold the counts of each day of the week
        const dayCounts = {};

        // Loop through each item in the data array
        mydata.forEach(item => {
            // Retrieve the day of the week for the current item
            const date = new Date(formatDate(item.dateofbite));
            const dayOfWeek = daysOfWeek[date.getDay()];

            // Increment the count for the current day of the week
            dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
        });

        // Find the day of the week with the highest count
        let mostCommonDay = null;
        let highestCount = 0;

        Object.entries(dayCounts).forEach(([day, count]) => {
            if (count > highestCount) {
                mostCommonDay = day;
                highestCount = count;
            }
        });

        // Return the most common day of the week
        return mostCommonDay;
    }

    // ... and then render it to the page
    const worstDay = document.getElementById('worstday')
    worstDay.textContent = findMostCommonDay(mydata);

}


///////////////////////////////////////////////////////////////
// Fetch gets your JSON file…
fetch('assets/allbites.json')
    // fetch('assets/1weekbites.json')
    .then(response => response.json())
    .then(mydata => {
        // And passes the data to the function, above!
        renderItems(mydata.reverse()) // In reverse order
    })