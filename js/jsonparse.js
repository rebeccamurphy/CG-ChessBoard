//This file will handle all the server communication and json parsing. 

function getGame(gameUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", gameUrl, false );
    xmlHttp.send( null );
    
    return JSON.parse(xmlHttp.responseText);

}