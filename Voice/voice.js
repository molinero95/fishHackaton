function voice() {
    this.language = "UK English Female";


    this.say = function (string) {
        responsiveVoice.speak(string, this.language);
    }

    this.stop = function (){
        responsiveVoice.cancel();
    }

    this.setLanguage = function (lang) {
        switch (lang) {
            case "es-ES": this.language = "Spanish Female"; break;
            case "en-EN": this.language = "UK English Female"; break;
            case "es-CAT": this.language = "Catalan Male"; break;   
            case "pt-PT": this.language = "Portuguese Female"; break;
        }

    }

}