//@40.4215449087015, -3.6926686128871475,19z coordenadas de thebridge en maps

// COORDENADAS LA 34.059868291155205, -118.26761173706329


let busIcon = L.icon({
    iconUrl: './assets/bus2.png',
    iconSize: [25, 25], // size of the icon
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor: [0,0] // point fr5om which the popup should open relative to the iconAnchor
});

let trainIcon = L.icon({
    iconUrl: './assets/metro.png',
    iconSize: [25, 25], // size of the icon
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor: [12, 12] // point fr5om which the popup should open relative to the iconAnchor
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        console.log("Geolocation is not supported by this browser.");;
    }
}

function getApiUrlFromAgency(agency) {
    return `https://api.metro.net/${agency}/vehicle_positions/all?geojson=false`
}

function ej1(position) {
    let location = { x: position.coords.latitude, y: position.coords.longitude }

    let map = L.map('map').setView([location.x, location.y], 19);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker = L.marker([location.x, location.y]).addTo(map);
}

async function addTransport(layerGroup) {

    let response = await fetch(getApiUrlFromAgency("LACMTA"));
    let buses = await response.json();

    let response2 = await fetch(getApiUrlFromAgency("LACMTA_Rail"));
    let trains = await response2.json();

    layerGroup.clearLayers();

    for (const bus of buses) {
        L.marker([bus.position.latitude, bus.position.longitude], { icon: busIcon }).bindPopup(bus.vehicle.vehicle_id).addTo(layerGroup);
    }

    for (const train of trains) {
        L.marker([train.position.latitude, train.position.longitude], { icon: trainIcon }).bindPopup(train.vehicle.vehicle_id).addTo(layerGroup);
    }

}

async function bucle(layerGroup) {
    setInterval(addTransport, 3000, layerGroup)
}

async function ej2() {

    let location = { x: 34.059868291155205, y: -118.26761173706329 }

    let map2 = L.map('map2').setView([location.x, location.y], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map2);

    const marker = L.marker([location.x, location.y]).addTo(map2);

    let layerGroup = L.layerGroup().addTo(map2);

    bucle(layerGroup)

}

function showPosition(position) {
    ej1(position)
    ej2()
}

getLocation()







