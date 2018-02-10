$(() => {
    $("#layoutInfo").hide();
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
        showHideInfo(element);
    });
}

function showHideInfo(fGround) {    //param
    if ($("#layoutInfo").is(":visible")) {
        $("#layoutInfo").hide();
    }
    else {
        var info = getInfoById(fGround.idInfo);

        let restrictedSpeciesHtml = "";

        info.restrictedSpecies.forEach(element => {
            restrictedSpeciesHtml += ("<br>" + element);
        });

        $("#layoutInfo").html(restrictedSpeciesHtml);
        $("#layoutInfo").show();
    }

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