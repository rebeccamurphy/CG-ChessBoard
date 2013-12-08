//This file will handle all the server communication and json parsing. I know we don't really need it anymore, but its here for debugging
//purposed and incase we do need to use bencarle.com

function requestCrossDomain( site, gameOver) {  
     /*
     * To do around the cross domain probelm I used a yahooapi, which can be a little slow, but it shouldn't ever fail and it is
     * not as much additional code as other methods.
     */
    // If no url was passed, exit.  
    if ( !site ) {  
      
        return false;  
    }  
      
    // Take the provided url, and add it to a YQL query. Make sure you encode it!  
    var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=json&callback=?';  
    //  var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=xml&callback=?';  
    // Request that YSQL string, and run a callback function.  
    // Pass a defined function to prevent cache-busting.  
    
    $.getJSON( yql, moveList);  
    
}  

function moveList(results)
{
	//var turn = $.parseJSON((results.query.results.body.p));
	console.log(results);

}

function getGame(gameUrl, turn)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", gameUrl, false );
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
}