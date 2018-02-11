$(() => {
    $("#layoutInfo").hide();
    $("#contactLayout").hide();
    $("#nav-contact-tab").on("click", showContact);
    $("#nav-home-tab").on("click", showHome);
    $("#artBtn").on("click", showMethodsAvailable);
    $("#measureBtn").on("click", showMeasure);
    $("#moreBtn").on("click", showMore);
    $("#forbiddenBtn").on("click", showForbidden);
});

let fishingGrounds = null;
let infos = null;
let currentGround = null;


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
        $("#layoutInfo").hide(750);
        $("#layoutInfo").show(750);
        setTimeout(function() {
            $("#layoutInfo > h2").text(fGround.name);
        }, 750);

    }
    else if (!$("#layoutInfo").is(":visible") && region) {
        $("#layoutInfo > h2").text(fGround.name);
        $("#layoutInfo").show(1000);
    }

    currentGround = fGround;
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

function leer (infoGround) {
    let ret = "";
    let links = [];
    infoGround.methodsAvailable.forEach((elem)=>{
        if(elem.indexOf("http") > -1){
            links.push(elem);
        }
        else{
            ret += elem;
        }
    });
    return {ret: ret, links: links};
}

//antiguo showInfo
function showMethodsAvailable() {

    //Titulo de las artes de pesca por caladero
    let infoGround = getInfoById(currentGround.idInfo);
    let res = $("<h3>").text(infoGround.methodsAvailable[0]);
    $("#infoContainer").prepend(res);
    
    //Contenido
    let correctData = leer(infoGround);
    $("#info").text(correctData.ret);
    //Posibles links
    correctData.links.forEach((elem)=>{
        let link = $("<a>").attr("href", elem).text(elem);
        $("#info").append(link);
    });


};

function showMeasure() {

};

function showMore() {

};

function showForbidden() {

};