var database;


function getCoordinates() {
    var x = document.getElementById("user_coord");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayCoordinates);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function displayCoordinates(position) {
    var x = document.getElementById("user_coord");
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

    findNearestMc(position.coords.longitude, position.coords.latitude);
}

function findNearestMc(longitude, latitude) {
    var currentPosition = [longitude, latitude];

    function calculDist(currentPosition) {
        var dist = new Array();
        for (var i = 0, j=0; i < database.length; i++, j++) {
            dist[i] = new Array();
            try {
				mcPosition = JSON.parse(database.key(i));
			}
			catch (e) {
				console.log(database.key(i));
				j--;
				continue;
			}
            dist[j][0] = distance(mcPosition.Latitude, mcPosition.Longitude, currentPosition[1], currentPosition[0]);
            dist[j][1] = database.getItem(database.key(i));
        }
        return dist;
    };

    var distances = calculDist(currentPosition);
	
    distances.sort(sortFunction);

    displayNearestMc(distances);
}

function displayNearestMc(distances) {
	console.log(distances)
    var x = document.getElementById("NearestMcDonald");
    x.innerHTML = "The closest McDonald is " + (distances[0][0]).toFixed(2) + " meters away." +
        "<br><br>In " + distances[0][1];
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function distance(lat1, lon1, lat2, lon2) /* Return float. Unit is the metter */ {
    if (parseFloat(lat1) != lat1 || parseFloat(lon1) != lon1 || parseFloat(lat2) != lat2 || parseFloat(lon1) != lon1)
        throw ("Error params. Only float value accepted.");

    if (lat1 < 0 || lat1 > 90 || lat2 < 0 || lat2 > 90)
        throw ("Error params. The params lat1 and lat2 must be 0< ? <90. Here lat1 = " + lat1 + " and lat2 = " + lat2);
    if (lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180)
        throw ("Error params. The params lon1 and lon2 must be -180< ? <180. Here lon1 = " + lon1 + " and lon2 = " + lon2);

    a = Math.PI / 180;
    lat1 = lat1 * a;
    lat2 = lat2 * a;
    lon1 = lon1 * a;
    lon2 = lon2 * a;

    t1 = Math.sin(lat1) * Math.sin(lat2);
    t2 = Math.cos(lat1) * Math.cos(lat2);
    t3 = Math.cos(lon1 - lon2);
    t4 = t2 * t3;
    t5 = t1 + t4;
    rad_dist = Math.atan(-t5 / Math.sqrt(-t5 * t5 + 1)) + 2 * Math.atan(1);

    return (rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446 * 1000;
}
