"use strict";

var urlBase = "http://localhost:8000/fishackathon";
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

    this.getInfoFishingGround = function (idFishingGround, callback){
        this.getFishingGrounds ((err,fishingGraoundData)=>{
            if(err || isNaN(idFishingGround)){
                alert("Se ha producido un error al leer los caladeros!");
                callback(err);
            }
            else{
                this.getData("/JSON/info.json",(err,infoData)=>{
                    if(err){
                        alert("Se ha producido un error al leer la info del caladero");
                        callback(err);
                    }
                    else{
                        let found = false;
                        let i = 0, j = 0;
                        let sizeFishingGraound = fishingGraoundData.length;
                        let sizeInfo = infoData.length;
                        while(i < sizeFishingGraound && !found){
                            if(idFishingGround === Number(fishingGraoundData[i].id)){
                                while(j < sizeInfo && !found){
                                    if(fishingGraoundData[i].idInfo === infoData[j].id){
                                        found = true;
                                        callback(null,infoData[j]);
                                    }
                                    j++;
                                }
                            }
                            i++;
                        }
                    }
                });
                
            }
        });
    }

};