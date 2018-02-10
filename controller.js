$(() => {
    $("#layoutInfo").hide();
});

function load(){
    loadMap();
}

function showHideInfo(){    //param
    if($("#layoutInfo").is(":visible"))
        $("#layoutInfo").hide();
    else
        $("#layoutInfo").show();


}