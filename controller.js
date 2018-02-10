$(() => {
    $("#layoutInfo").hide();
    $("#contactLayout").hide();
    $("#nav-contact-tab").on("click", showContact);
    $("#nav-home-tab").on("click", showHome);
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
        region = true;
    });
}

function showHideInfo(fGround) {    //param
    if ($("#layoutInfo").is(":visible") && !region) {
        $("#layoutInfo").hide();
    }
    else if($("#layoutInfo").is(":visible") && region){    //modficar los datos de layoutInfo
        $("#layoutInfo > h2").text(fGround.name);

    }
    else if(!$("#layoutInfo").is(":visible") && region){
        $("#layoutInfo > h2").text(fGround.name);
        $("#layoutInfo").show();
    }
    //Si no es visible y tocamos agua no hacemos nada
}

function showHome(){
    $("#mapLayout").show();
    $("#contactLayout").hide();
}

function showContact(){
    $("#mapLayout").hide();
    $("#contactLayout").show();
}