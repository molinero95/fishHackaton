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

function parse (infoGround) {
    let ret = "";
    let links = [];
    infoGround.methodsAvailable.forEach((elem)=>{
        elem += "</br>";
        if(elem.indexOf("http") > -1){
            links.push(elem);
        }
        else{
            ret += elem;
        }
    });
    return {ret: ret, links: links};
};

function prepareSpeech(stringArray){
    let ret = "";
    stringArray.forEach((elem)=>{
        ret +=elem;
    });
    return ret;
};

function speech (){
    let aux = getInfoById(currentGround.idInfo);
    responsiveVoice.speak(prepareSpeech(aux.speech),"Spanish Female");
};

//antiguo showInfo
function showMethodsAvailable() {
    //Vacia el contenedor y crea el parrafo
    let container = $("#infoContainer");
    container.empty();
    container.append($("<p>").attr("id","info"));

    //Titulo de las artes de pesca por caladero
    let aux = getInfoById(currentGround.idInfo);
    //Sonido
    let sound = '<button type="button" class="btn btn-primary" onclick="speech()">Reproducir</button>';
    container.prepend(sound);

    //Contenido
    let correctData = parse(aux);
    $("#info").html(correctData.ret);
    
    //Posibles links
    correctData.links.forEach((elem)=>{
        let link = $("<a>").attr("href", elem).html(elem);
        $("#info").append(link);+ 
        $("#info").append("</br>");
    });
};

function showMeasure() {

};

function showMore() {

};

function showForbidden() {

};