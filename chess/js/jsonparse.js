function getGame(gameUrl)
{
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", gameUrl, false );
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
}