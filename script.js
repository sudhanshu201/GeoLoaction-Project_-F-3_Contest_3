// Get the button and map elements from the HTML document
const getLocationButton = document.getElementById('getLocationButton');
const mapElement = document.getElementById('map');

// Check if the latitude and longitude are already saved in local storage
if (localStorage.getItem('lat') && localStorage.getItem('long')) {
  // Disable the "Get Location" button since we already have the coordinates
  getLocationButton.disabled = true;

  // Display the map using the saved coordinates
  const lat = localStorage.getItem('lat');
  const long = localStorage.getItem('long');
  const mapUrl = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
  mapElement.innerHTML = `<iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${mapUrl}"></iframe>`;
}

// Function to get the user's location and save it in local storage
function getLocation() {
  // Check if the browser supports the Geolocation API
  if (navigator.geolocation) {
    // Call the getCurrentPosition method with a callback function
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Callback function to show the user's position and save it in local storage
function showPosition(position) {
  // Retrieve the latitude and longitude from the position object
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  // Save the latitude and longitude in local storage
  localStorage.setItem('lat', lat);
  localStorage.setItem('long', long);

  // Disable the "Get Location" button since we already have the coordinates
  getLocationButton.disabled = true;

  // Display the map using the saved coordinates
  const mapUrl = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
  mapElement.innerHTML = `<iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${mapUrl}"></iframe>`;
}

// Function to remove the saved location from local storage
function removeLocation() {
  localStorage.removeItem('lat');
  localStorage.removeItem('long');
  
  // Enable the "Get Location" button again
  getLocationButton.disabled = false;

  // Remove the map from the page
  mapElement.innerHTML = '';
}

// Attach event listeners to the buttons
getLocationButton.addEventListener('click', getLocation);
const removeLocationButton = document.getElementById('removeLocationButton');
removeLocationButton.addEventListener('click', removeLocation);
