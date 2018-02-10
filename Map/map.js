function loadMap(data){
    var madrid = {lat: 40.416775, lng: -3.703790};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: madrid
    });
    generatePolygons(data, map)
}

let addListenersOnPolygon = function(polygon) {
    google.maps.event.addListener(polygon, 'click', function (event) {
        showHideInfo();
    });  
}

function generatePolygon(path){
    return new google.maps.Polygon({
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
}

//TODO poner las coordenadas de fichero
//Por ahora demo de como será
function generatePolygons(data, map){
    console.log(data);
    //console.log(data);
    /*let ubications = Object.keys(data);
    for(let i = 0; i < ubications.length; i++){
        //console.log(ubications);
        let positions = Object.keys(data[ubications[i]]);
        for(let j = 0; j < positions.length; j++){
            console.log(data[ubications[i]][positions[j]]);
        }
        //console.log(data[ubications[i]]);
        
    }*/
}

