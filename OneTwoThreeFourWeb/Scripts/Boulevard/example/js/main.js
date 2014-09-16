$(function(){
    var boulevard, config;

    //set up the boulevard configuration parameters
    config = {"styleType":"blur","layout":"single-album-cover"};


    //initialize boulevard
    boulevard = $('#boulevard-container').ttwBoulevard(myPlaylist, config);

});