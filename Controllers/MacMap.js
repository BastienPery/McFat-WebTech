function loadMap() {
    const map = L.map('map', {
        center: [37.75, -122.23],
        zoom: 10
    });
    L.esri.basemapLayer("Topographic").addTo(map);
}

function displayCoordinates() {
    var x = document.getElementById("user_coord");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
    }
}
