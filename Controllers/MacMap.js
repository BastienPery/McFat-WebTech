function loadMap() {
    const map = L.map('map', {
        center: [37.75, -122.23],
        zoom: 10
    });
    L.esri.basemapLayer("Topographic").addTo(map);
}
