function loadMap(data){
    var madrid = {lat: 40.416775, lng: -3.703790};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: madrid
    });
    generatePolygons(data, map)
}


function generatePolygon(path, color){
    console.log(color);
    return new google.maps.Polygon({
        path: path,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
}


function generatePolygons(data, map){
    data.forEach(element => {
        let coordsStr = element.coords;
        let coords = [];
        coordsStr.forEach(e => {
            coords.push({lat: Number(e.lat), lng: Number(e.lng)});
        });
        let polygon = generatePolygon(coords, element.color);
        polygon.setMap(map);
        addListenersOnPolygon(polygon,element);
        
    });
}

