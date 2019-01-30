function displayMacMap() {
    $('#page').load('MacMap.html');
}

function displayMacHome() {
    $('#page').load('MacHome.html');
}

function displayMacStats() {
    $('#page').load('MacStats.html');
}

function displayMacMenu() {
    $('#page').load('MacMenu.html');
}

var database;

function loadDatabase() {
    database = window.sessionStorage;
	database.clear();
    var data = $.getJSON("../mcdonalds.json", function () {
        console.log("success");
    }).done(function () {
        var array = data.responseJSON;
        var longLat;
        for (var i = 0; i < array.length; i++) {
            longLat = {
                "Longitude": array[i].Longitude,
                "Latitude": array[i].Latitude
            }
            database.setItem(JSON.stringify(longLat), array[i].City);
        }
    });
	kita = $.getJSON("../meals.json", function () {
		console.log("success");
	}).done(function () {
		var array = kita.responseJSON;
		var meal;
		for (var i = 0; i < array.length; i++) {
			meal = {
				"mealName": array[i].mealName,
				"calories": array[i].calories,
				"type": array[i].type
			}
			database.setItem(array[i].mealId, JSON.stringify(meal));
		}
	});
}
