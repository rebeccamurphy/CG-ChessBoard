function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}
function getGame(gameUrl)
{
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", gameUrl, false );
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
}

function simpleHttpRequest(url) {
  var request = makeHttpObject();
  request.open("GET", url, true);
  request.send(null);
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200)
        console.log(request.responseText);
      //else if (failure)
       // failure(request.status, request.statusText);
    }
  };
}
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function requestCrossDomain( site, callback ) {  
      
    // If no url was passed, exit.  
    if ( !site ) {  
      
        return false;  
    }  
      
    // Take the provided url, and add it to a YQL query. Make sure you encode it!  
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=json&callback=?';  
    //  var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=xml&callback=?';  
    // Request that YSQL string, and run a callback function.  
    // Pass a defined function to prevent cache-busting.  
    $.getJSON( yql, cbFunc );  
      

    function cbFunc(data) {  
    // If we have something to work with...  
    
    callback(data); 
    /*
    if ( data.results[0] ) {  
    	
        // Strip out all script tags, for security reasons.  
        // BE VERY CAREFUL. This helps, but we should do more.   
        data = data.results[0].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');  
          
        // If the user passed a callback, and it  
        // is a function, call it, and send through the data var.  
        if ( typeof callback === 'function') {  

            callback(data);  
        }  
    }  
    // Else, Maybe we requested a site that doesn't exist, and nothing returned.  
    else throw new Error('Nothing returned from getJSON.');  */
    }  
}  