//open database
var database = function () {
    if (!window.indexedDB) {
        window.alert('Does not support IndexedDB');
    } else {
        var db = {};
        var request = window.indexedDB.open('db');

        request.onsuccess = function (e) { return request; };
        request.onerror = function (e) { alert("Why didn't you allow my web app to use IndexedDB?!"); };
    }
}

//create database
request.onupgradeneeded = function (event) {
    database = event.target.result;

    //database object
    var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
};