// GETTING STARTED WITH THE GOOGLE MAPS JAVASCRIPT API

// SETUP
// 1. Go to console.cloud.google.com
// 2. Create a 'new project'
// 3. You can leave "organization" and "location" blank
// 4. Google will start creating the project for you (will take a moment)
// 5. Select the project
// 6. Open up the navigation and click on "APIs & Services > Library"
// 7. Click on Maps JavaScript API > Enable
// 8. Agree to terms and services
// 9. Save your API key in your scripts.js file. If you don't see it, go to "APIs & Services > Credentials > Create Credentials > API Key"
// 10. If you are prompted to "restrict the API key", ignore it

// LOAD THE MAP
// 1. new google.maps.Map
// 2. to set your own style, go to https://mapstyle.withgoogle.com/
// 3. paste the JSON into Map Styles > Import JSON > Save
// 4. create a Map ID in Map Management
// 5. in Map Styles, assign the new Map ID to the style > Save
// 6. paste the mapID below
// If you hit trouble, check https://www.youtube.com/watch?v=CdDXbvBFXLY

// SET PINS
// 1. get all of the lat and longs you need and store them as an array of objects
// 2. iterate through the array
// 3. for each item in the array, run new google.maps.Marker

// Initialize and add the map


// playground-385101
// AIzaSyA73BD5cjaAZwPjI7L5a4kJzP_DmZxfcR8


// HOW TO FETCH DATA ACROSS THE WEB
const url = 'engine.json';

fetch(url)
  .then(response => response.json())
	// pass the data to the function!
	.then(data => playWithData(data))


// QUERY, MANIPULATE, VISUALIZE THE DATASET
const playWithData = data => {
	
	// first, load the map 
	const NYCposition = { lat: 40.7831, lng: -73.9712 };

	const map = new google.maps.Map(document.getElementById("map"), {
		mapId: "bf560cba325c3c63",
		center: NYCposition,
		zoom: 12,
	})

	let lastPopupMessage = false;
	
	data.forEach(location => {

		const position = { lat: parseFloat(location.Latitude), lng: parseFloat(location.Longitude) };

		const marker = new google.maps.Marker({
			map: map,
			position: position,
			icon: {
				url: 'car.png',
				scaledSize: new google.maps.Size(70, 40), // size
			},
			animation: google.maps.Animation.DROP
		})

		let popupMessage = `
			<ul>
				<li>Address: ${location.Address}</li>
				<li>Borough: ${location.Borough}</li>
			<ul>
		`;

		// if (squirrel.eating == true) {
		// 	popupMessage = "don't bother me, i'm eating";
		// } else if (squirrel.indifferent == true) {
		// 	popupMessage = "don't bother me, i'm indifferent";
		// }
		
		const popupContent = new google.maps.InfoWindow({
			content: popupMessage
		});

		google.maps.event.addListener(marker, 'click', () => {
			if (lastPopupMessage) {
				lastPopupMessage.close();
			};
			lastPopupMessage = popupContent;
			popupContent.open(map, marker);			
		})
	})
}

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

  // Simple function to get a count of the number of items in mydata. Could also use `mydata.length`
  const totalStat = document.getElementById('count')
  totalStat.textContent = `${mydata.length}`

   // Function to get a count of the number of items in mydata that have a specific value for a given key
   function findBestBorough(mydata) {
	// Create an object to hold the counts of each breed
	const boroughCounts = {};

	// Loop through each item in the data array
	mydata.forEach(item => {
		// Retrieve the breed for the current item
		const borough = item.Borough;

		// If the breed is not undefined or null, increment its count in the boroughCounts object
		if (borough) {
			boroughCounts[borough] = (boroughCounts[borough] || 0) + 1;
		}
	});

	// Find the breed with the highest count
	let mostCommonBorough = null;
	let highestCount = 0;

	Object.entries(boroughCounts).forEach(([borough, count]) => {
		if (count > highestCount) {
			mostCommonBorough = borough;
			highestCount = count;
		}
	});

	// Return the most common breed
	return mostCommonBorough;
}

// ... and then render it to the page
const topBorough = document.getElementById('topborough')
topBorough.textContent = findBestBorough(mydata);
}

