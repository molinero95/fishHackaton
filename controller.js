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
        $("#layoutInfo").hide(700);
    }
    else if ($("#layoutInfo").is(":visible") && region) {    //modficar los datos de layoutInfo
        $("#layoutInfo").hide(500);
        $("#layoutInfo").show(500);
        setTimeout(function () {
            $("#layoutInfo > h2").text(fGround.name);
            getActive();
        }, 500);

    }
    else if (!$("#layoutInfo").is(":visible") && region) {
        $("#layoutInfo > h2").text(fGround.name);
        $("#layoutInfo").show(700);
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

function parseHTML(array) {
    let ret = "";
    let links = [];
    array.forEach((elem) => {
        elem += "</br>";
        if (elem.indexOf("http") > -1) {
            links.push(elem);
        }
        else {
            ret += elem;
        }
    });
    return { ret: ret, links: links };
};

function parseSpeech(stringArray) {
    let ret = "";
    stringArray.forEach((elem) => {
        ret += elem;
    });
    return ret;
};

function speech() {
    if(!responsiveVoice.isPlaying()){
        let aux = getInfoById(currentGround.idInfo);
        responsiveVoice.speak(parseSpeech(aux.speech), "Spanish Female");
    }
    else{
        stopSpeech();
    }
};

function stopSpeech() {
    responsiveVoice.cancel();
}

//antiguo showInfo
function showMethodsAvailable() {
    $("hr").show();
    $(".activ").removeClass("activ");
    $("#artBtn").addClass("activ");
    clearData();

    //Vacia el contenedor y crea el parrafo
    let container = $("#infoContainer");

    //Titulo de las artes de pesca por caladero
    let aux = getInfoById(currentGround.idInfo);

    //Contenido
    let correctData = parseHTML(aux.methodsAvailable);
    $("#info").html(correctData.ret);

    //Posibles links
    correctData.links.forEach((elem) => {
        let link = $("<a>").attr("href", elem).html(elem);
        $("#info").append(link); +
            $("#info").append("</br>");
    });
};

function showMeasure() {
    $("hr").hide();
    $(".activ").removeClass("activ");
    $("#measureBtn").addClass("activ");
    clearData();

    let container = $("#infoContainer");

    let aux = getInfoById(currentGround.idInfo);

    //Contenido
    mytable = $('<table></table>').addClass("table");
    var rows = new Number(aux.minimumSizes.lenght);
    var cols = new Number(3);
    var tr = [];
    let row = $('<tr></tr>').appendTo(mytable);
    $('<th>').text("Nombre Comun").appendTo(row);
    $('<th>').text("Nombre Latin").appendTo(row);
    $('<th>').text("Tamaño (cm)").appendTo(row);
    mytable.appendTo("#box");

    for(let fish of aux.minimumSizes){
        let row = $('<tr></tr>').appendTo(mytable);
        $('<td></td>').text(fish.comercialName).appendTo(row); 
        $('<td></td>').text(fish.latinName).css("font-style","italic").appendTo(row); 
        $('<td></td>').text(fish.size).appendTo(row); 
        mytable.appendTo("#box");
    }
    $("#infoContainer").append(mytable);
};

function showMore() {
    $("hr").show();
    $(".activ").removeClass("activ");
    $("#moreBtn").addClass("activ");  
    clearData();

    let container = $("#infoContainer");

    let aux = getInfoById(currentGround.idInfo);

    $("#info").html(aux.more);

};


function showDefault() {
    $("hr").show();
    clearData();
    $(".activ").removeClass("activ");

    //Vacia el contenedor y crea el parrafo
    let container = $("#infoContainer");

    //Titulo de las artes de pesca por caladero
    let aux = getInfoById(currentGround.idInfo);

    //Contenido
    let correctData = parseHTML(aux.speech);
    $("#info").html(correctData.ret);

    //Posibles links
    correctData.links.forEach((elem) => {
        let link = $("<a>").attr("href", elem).html(elem);
        $("#info").append(link); +
            $("#info").append("</br>");
    });
};


function showForbidden() {
    $("hr").show();
    clearData();
    $(".activ").removeClass("activ");
    $("#forbiddenBtn").addClass("activ");

    //Vacia el contenedor y crea el parrafo
    let container = $("#infoContainer");

    //Titulo de las artes de pesca por caladero
    let aux = getInfoById(currentGround.idInfo);

    //Contenido
    let correctData = parseHTML(aux.restrictedSpecies);
    $("#info").html(correctData.ret);

    //Posibles links
    correctData.links.forEach((elem) => {
        let link = $("<a>").attr("href", elem).html(elem);
        $("#info").append(link); +
            $("#info").append("</br>");
    });
};

function getActive() {
    let activ = $(".activ");
    switch (activ.prop("id")) {
        case "artBtn": {
            showMethodsAvailable();
            break;
        }
        case "measureBtn": {
            showMeasure();
            break;
        }
        case "forbiddenBtn": {
            showForbidden();
            break;
        }
        case "moreBtn": {
            showMore();
            break;
        }
    }
}

function clearData() {
    $("#info").text("");
    $(".table").remove();
    stopSpeech();
}