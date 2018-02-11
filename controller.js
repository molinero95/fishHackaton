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
let currentGround = null;
let infos = null;

let lang = "ES";

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
        setMarker(event.latLng, element.name);
        showHideInfo(element);
    });
}

function showHideInfo(fGround) {
    let layoutInfo = $("#layoutInfo");
    currentGround = fGround;

    if ($("#layoutInfo").is(":visible") && !region) {
        $("#layoutInfo").hide(700);
    }
    else if ($("#layoutInfo").is(":visible") && region) {    //modficar los datos de layoutInfo
        $("#layoutInfo").hide(500);
        $("#layoutInfo").show(500);
        setTimeout(function () {
            $("#layoutInfo > h2").text(fGround.name);
            showDefault();
            getActive();
        }, 500);

    }
    else if (!layoutInfo.is(":visible") && region) {
        $("#layoutInfo > h2").text(fGround.name);
        showDefault();
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

function parseSpeechTest(array) {
    let ret = "";
    let links = [];

    ret = "<ul>";
    array.forEach((elem) => {
        ret += "<li>";
        ret += elem;
        ret += "</li>";
    });
    ret += "</ul>";
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
    if (!responsiveVoice.isPlaying()) {
        let aux = getInfoById(currentGround.idInfo);
        let voice = "Spanish Female";
        if (lang === "ES") {
            voice = "Spanish Female";
        }
        else if (lang === "PT") {
            voice = "Portuguese Female";
        }
        else {
            voice = "UK English Female";
        }
        responsiveVoice.speak(parseSpeech(aux.speech), voice);
    }
    else {
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
    $("#fishingArt").css("opacity","0.5");
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

    $("#measure").css("opacity","0.5");
    let container = $("#infoContainer");

    let aux = getInfoById(currentGround.idInfo);

    //Contenido
    mytable = $('<table></table>').addClass("table");
    var rows = new Number(aux.minimumSizes.lenght);
    var cols = new Number(3);
    var tr = [];
    let row = $('<tr></tr>').appendTo(mytable);
    $('<th>').text("Nombre Común").appendTo(row);
    $('<th>').text("Nombre Latín").appendTo(row);
    $('<th>').text("Tamaño (cm)").appendTo(row);
    mytable.appendTo("#box");

    for (let fish of aux.minimumSizes) {
        let row = $('<tr></tr>').appendTo(mytable);
        $('<td></td>').text(fish.comercialName).appendTo(row);
        $('<td></td>').text(fish.latinName).css("font-style", "italic").appendTo(row);
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
    $("#more").css("opacity","0.5");
    let container = $("#infoContainer");

    let aux = getInfoById(currentGround.idInfo);

    $("#info").html(aux.more);

};


function showDefault() {

    clearData();
    $("hr").show();
    $(".activ").removeClass("activ");

    //Vacia el contenedor y crea el parrafo
    let container = $("#infoContainer");

    //Titulo de las artes de pesca por caladero
    let aux = getInfoById(currentGround.idInfo);
    if (aux != null) {
        //Contenido
        lang = aux.lang;
        let correctData = parseSpeechTest(aux.speech);
        $("#info").html(correctData.ret);
    };
};


function showForbidden() {
    $("hr").show();
    clearData();
    $(".activ").removeClass("activ");
    $("#forbiddenBtn").addClass("activ");
    $("#forbiddenFish").css("opacity","0.5");

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
    $("#measure").css("opacity","1");
    $("#fishingArt").css("opacity","1");
    $("#forbiddenFish").css("opacity","1");
    $("#more").css("opacity","1");
}

function setLangEN() {
    lang = "EN";
};

function setLangES() {
    lang = "ES";
};

function setLangPT() {
    lang = "PT";
};