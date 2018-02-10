$(() => {
    $("#layoutInfo").hide();
});

function load(){
    let repo = new jsonRepository();
    repo.getFishingGrounds((err, res) => {
        if(err){    //ya veremos

        }
        else{
            console.log(res);
            loadMap({data: res});
        }
    });
    
}

function showHideInfo(){    //param
    if($("#layoutInfo").is(":visible"))
        $("#layoutInfo").hide();
    else
        $("#layoutInfo").show();
}