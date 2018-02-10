"use strict";

var urlBase = "http://localhost:8000/fishackaton";
function jsonRepository() {
    this.getData = function (urlRel, callback) {
        $.ajax({
            url: urlBase + urlRel,
            type: 'GET',
            dataType: 'json',
            cors: true,
            contentType: 'application/json',
            secure: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            success: function (data) {
                callback(null,data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                callback(thrownError);
                alert("Se ha producido un error " + thrownError);
            }
        });
    };

    this.getFishingGrounds = function (callback) {
        this.getData("/JSON/fishingGrounds.json", (err,data) => {
            callback(err,data);
        });
    };

    this.getShips = function (callback){
        this.getData("/JSON/ships.json", (err,data) =>{
            callback(err,data);
        });
    };


};