$(() => {
    $("#layoutInfo").hide();
});

function load() {
    let repo = new jsonRepository();
    repo.getFishingGrounds((err, res) => {
        if (err) {    //ya veremos

        }
        else {
            //console.log(JSON.parse(res));
            loadMap(res);
        }
    });

}


let addListenersOnPolygon = function (polygon, element) {
    google.maps.event.addListener(polygon, 'click', function (event) {
        showHideInfo(element);
    });
}

function showHideInfo(fGround) {    //param
    if ($("#layoutInfo").is(":visible")) {
        $("#layoutInfo").hide();
    }
    else {
        $("#layoutInfo").html(fGround.name);
        $("#layoutInfo").show();
    }
}