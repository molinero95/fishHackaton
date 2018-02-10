$(() => {
    $("#layoutInfo").hide();
});

function load(){

    let repo = new jsonRepository();
    repo.getFishingGrounds((err, res) => {
        if(err){    //ya veremos
            
        }
        else{
            let talk = new voice(); //Establecemos el idioma
            talk.setLanguage("es-ES");
            loadMap(res);
        }
    });  
}
 

function showHideInfo(){    //param
    if($("#layoutInfo").is(":visible"))
        $("#layoutInfo").hide();
    else
        $("#layoutInfo").show();
}