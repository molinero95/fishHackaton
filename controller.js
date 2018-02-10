$(() => {
    $("#layoutInfo").hide();
    $("#contactLayout").hide();
    $("#nav-contact-tab").on("click", showContact);
    $("#nav-home-tab").on("click", showHome);
    $("#artBtn").on("click", showInfo);
    $("#measureBtn").on("click", showMeasure);
    $("#moreBtn").on("click", showMore);
    $("#forbiddenBtn").on("click", showForbidden);
});

let fishingGrounds = null;
let infos = null;


function load() {
    let repo = new jsonRepository();
    repo.getFishingGrounds((err, res) => {
        loadMap(res);
        fishingGrounds = res;
    });

    repo.getFishingGroundsInfo((err, res) => {
        infos = res;
    });
}

let addListenersOnPolygon = function (polygon, element) {
    google.maps.event.addListener(polygon, 'click', function (event) {
        region = true;
        showHideInfo(element);
    });
}

function showHideInfo(fGround) {

    if ($("#layoutInfo").is(":visible") && !region) {
        $("#layoutInfo").hide(1000);
    }
    else if ($("#layoutInfo").is(":visible") && region) {    //modficar los datos de layoutInfo
        $("#layoutInfo > h2").text(fGround.name);

    }
    else if (!$("#layoutInfo").is(":visible") && region) {
        $("#layoutInfo > h2").text(fGround.name);
        $("#layoutInfo").show(1000);
    }
    //Si no es visible y tocamos agua no hacemos nada
}

function showHome() {
    $("#mapLayout").show();
    $("#contactLayout").hide();
}

function showContact() {
    $("#mapLayout").hide();
    $("#contactLayout").show();
}

function getInfoById(infoId) {
    let info = null;
    infos.some(function (obj) {
        if (obj.id == infoId) {
            info = obj;
            return true;
        }
    });
    return info;
}

function showInfo(){

}

function showMeasure(){

}

function showMore(){
    //
}

function showForbidden() {

}