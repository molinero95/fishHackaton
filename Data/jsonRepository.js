"use strict";

function jsonRepository() {

    this.getFishingGrounds = function (callback) {
        $.ajax({
            url: "http://localhost:8000/fishackaton/JSON/fishingGrounds.json",
            type: 'GET',
            dataType: 'json',
            cors: true,
            contentType: 'application/json',
            secure: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            beforeSend: function (xhr) {
                // xhr.setRequestHeader ("Authorization", "Basic " + btoa(""));
            },
            success: function (data) {
                alert(data);
                callback(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }
};