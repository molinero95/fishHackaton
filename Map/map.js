"use strict";

let region = false;

var marker = null;
var map = null;

function loadMap(data) {
    var madrid = { lat: 40.416775, lng: -3.703790 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: madrid,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        disableDoubleClickZoom: true

    });

    google.maps.event.addListener(map, "click", function (event) {
        //limpia la ventana de info
        region = false;
        setMarker(event.latLng, "International Waters");
        showHideInfo();
    });

    generatePolygons(data, map);
}


function generatePolygon(path, color) {
    console.log(color);
    return new google.maps.Polygon({
        path: path,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2,

    });
}


function generatePolygons(data, map) {
    data.forEach(element => {
        let coordsStr = element.coords;
        let coords = [];
        coordsStr.forEach(e => {
            coords.push({ lat: Number(e.lat), lng: Number(e.lng) });
        });
        let polygon = generatePolygon(coords, element.color);
        polygon.setMap(map);
        addListenersOnPolygon(polygon, element);
    });
}

function setMarker(latlng, name) {
    if (marker != null) {
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: name
    });
}

