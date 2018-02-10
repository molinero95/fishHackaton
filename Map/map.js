function loadMap(){
    var madrid = {lat: 40.416775, lng: -3.703790};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: madrid
    });
    generatePolygons({}, map)
}
//TODO poner las coordenadas de fichero
//Por ahora demo de como será
function generatePolygons(data, map){
    data["27"] = {};
    data["27"]["8c"] = [
        {lat: 48, lng: -11},
        {lat: 48, lng: -10.64},
        {lat: 47.77, lng: -10.37},
        {lat: 47.45, lng: -9.89},
        {lat: 46.88, lng: -9.62},
        {lat: 46.34, lng: -10.95},
        {lat: 46.32, lng: -11},
        {lat: 48, lng: -11}
    ];
    new google.maps.Polygon({
        path:  data["27"]["8c"],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    }).setMap(map);
}