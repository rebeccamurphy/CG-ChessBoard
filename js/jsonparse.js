//This file will handle all the server communication and json parsing. 

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
   
    
    function cbFunc(data) {  
    // If we have something to work with... 
    callback(data); 
    } 
    
}
function moveList(results)
{
    //var turn = $.parseJSON((results.query.results.body.p));
    console.log(results);

}


function getGame(gameUrl)
{
    var xmlHttp1 = null;
    var xmlHttp2 = null;
    var jsonTemp = null
    //xmlHttp1 = new XMLHttpRequest();
    //xmlHttp1.open( "GET", gameUrl, false );
    //xmlHttp1.send( null );

    //xmlHttp2= requestCrossDomain(gameUrl);
    
    //return JSON.parse(xmlHttp.responseText);
    //console.log(xmlHttp2); 
    console.log(gameUrl);
    //Servers are down, so now there are only preprogrammed games.
    switch (gameUrl)
    {
    case '1':
    jsonTemp = {"blackname": "Beta", "whitename": "Alpha", "lastmovenumber": 87, "blacktime": 1108.887688, "lastmovetime": "2013-11-09 22:17:28.577119", "moves": ["Pe2e4", "Pd7d6", "Pd2d4", "Ng8f6", "Nb1c3", "Pg7g6", "Bc1e3", "Bf8g7", "Qd1d2", "Pc7c6", "Pf2f3", "Pb7b5", "Ng1e2", "Nb8d7", "Be3h6", "Bg7h6", "Qd2h6", "Bc8b7", "Pa2a3", "Pe7e5", "Ke1c1", "Qd8e7", "Kc1b1", "Pa7a6", "Ne2c1", "Ke8c8", "Nc1b3", "Pe5d4", "Rd1d4", "Pc6c5", "Rd4d1", "Nd7b6", "Pg2g3", "Kc8b8", "Nb3a5", "Bb7a8", "Bf1h3", "Pd6d5", "Qh6f4", "Kb8a7", "Rh1e1", "Pd5d4", "Nc3d5", "Nb6d5", "Pe4d5", "Qe7d6", "Rd1d4", "Pc5d4", "Re1e7", "Ka7b6", "Qf4d4", "Kb6a5", "Pb2b4", "Ka5a4", "Qd4c3", "Qd6d5", "Re7a7", "Ba8b7", "Ra7b7", "Qd5c4", "Qc3f6", "Ka4a3", "Qf6a6", "Ka3b4", "Pc2c3", "Kb4c3", "Qa6a1", "Kc3d2", "Qa1b2", "Kd2d1", "Bh3f1", "Rd8d2", "Rb7d7", "Rd2d7", "Bf1c4", "Pb5c4", "Qb2h8", "Rd7d3", "Qh8a8", "Pc4c3", "Qa8a4", "Kd1e1", "Pf3f4", "Pf7f5", "Kb1c1", "Rd3d2", "Qa4a7"], "gameover": true, "whitesturn": false, "now": "2014-03-01 15:02:21.457131", "whitetime": 920.588292};
    break;
    case '2':
    jsonTemp ={"blackname": "Beta", "whitename": "Alpha", "lastmovenumber": 38, "blacktime": 811.470934, "lastmovetime": "2013-12-11 16:20:26.801488", "winner": 2, "moves": ["Pb2b3", "Pc7c6", "Bc1b2", "Nb8a6", "Nb1c3", "Pe7e5", "Ng1h3", "Pg7g5", "Pa2a4", "Ra8b8", "Pd2d3", "Pd7d5", "Nc3d5", "Pc6d5", "Pe2e4", "Pb7b6", "Bb2e5", "Qd8e7", "Pf2f4", "Bf8g7", "Be5b8", "Ng8f6", "Bb8e5", "Bc8g4", "Qd1g4", "Nf6g4", "Be5g7", "Na6b4", "Bg7h8", "Nb4c2", "Ke1e2", "Pa7a5", "Ra1c1", "Nc2e3", "Ke2f3", "Pd5e4", "Rc1e1", "Pe4f3"], "gameover": true, "whitesturn": true, "now": "2014-03-01 15:22:50.859784", "whitetime": 914.983729}
    break;
    case '3':
    jsonTemp ={"blackname": "", "whitename": "Alpha", "lastmovenumber": 8, "blacktime": 500.55867, "lastmovetime": "2013-12-11 14:00:03.399928", "winner": 107, "moves": ["Pe2e4", "Pd7d5", "Pe4d5", "Qd8d5", "Pd2d4", "Qd5e6", "Ng1f3", "Qe6e1"], "gameover": true, "whitesturn": true, "now": "2014-03-01 15:54:04.125016", "whitetime": 919.650595};
    break;
    case '4':
    jsonTemp ={"blackname": "Beta", "whitename": "Alpha", "lastmovenumber": 87, "blacktime": 995.648753, "lastmovetime": "2013-12-11 14:31:11.880448", "moves": ["Nb1c3", "Nb8c6", "Nc3e4", "Nc6e5", "Ng1h3", "Pg7g6", "Ne4c3", "Ph7h5", "Nc3d5", "Pc7c6", "Nd5f4", "Pa7a6", "Pa2a3", "Pb7b6", "Pa3a4", "Pa6a5", "Pb2b3", "Ne5g4", "Pd2d4", "Ng4e3", "Pf2e3", "Pb6b5", "Pa4b5", "Pc6b5", "Nf4d5", "Pg6g5", "Nd5b6", "Pf7f6", "Nb6a8", "Ke8f7", "Na8b6", "Pb5b4", "Pc2c4", "Pa5a4", "Nb6d5", "Pa4b3", "Nd5b6", "Pb3b2", "Bc1b2", "Pb4b3", "Nb6d5", "Pe7e5", "Nd5b6", "Pe5e4", "Nb6d5", "Pd7d6", "Nd5b6", "Kf7g7", "Nb6d5", "Pf6f5", "Nh3g5", "Kg7g6", "Ng5e6", "Pf5f4", "Nd5b6", "Pf4e3", "Ne6d8", "Ng8e7", "Nd8e6", "Kg6f7", "Ne6g5", "Kf7f6", "Ng5e4", "Kf6f5", "Ne4g3", "Kf5e6", "Ng3h5", "Ke6f5", "Nh5g3", "Kf5f4", "Pc4c5", "Pd6d5", "Pc5c6", "Ne7c6", "Nb6c8", "Kf4g4", "Nc8b6", "Nc6d4", "Nb6d5", "Nd4c2", "Nd5f6", "Kg4g5", "Qd1c2", "Pb3c2", "Nf6d7", "Kg5h4", "Nd7e5"], "gameover": true, "whitesturn": false, "now": "2014-03-01 15:59:54.950249", "whitetime": 986.989368};
    break;
    case '5':
    jsonTemp = {"blackname": "Beta", "whitename": "Alpha", "lastmovenumber": 47, "blacktime": -68.466978, "lastmovetime": "2013-12-10 20:38:52.479289", "winner": 1, "moves": ["Ng1h3", "Pg7g6", "Pc2c3", "Pf7f6", "Pb2b4", "Ph7h5", "Pf2f3", "Pd7d6", "Ke1f2", "Ke8d7", "Pb4b5", "Kd7e6", "Pa2a4", "Ke6d7", "Pg2g4", "Kd7e8", "Pd2d4", "Pg6g5", "Pc3c4", "Pf6f5", "Kf2g1", "Ke8f7", "Pb5b6", "Kf7e6", "Pb6a7", "Ke6d7", "Pa7b8Q", "Qd8e8", "Qb8c7", "Kd7c7", "Qd1b3", "Pd6d5", "Ra1a2", "Ra8a6", "Qb3b6", "Kc7b6", "Bc1d2", "Kb6a7", "Ra2b2", "Ra6a5", "Pf3f4", "Qe8b5", "Pa4b5", "Pe7e6", "Pc4c5", "Pe6e5", "Pe2e3"], "gameover": true, "whitesturn": false, "now": "2014-03-01 16:10:01.466173", "whitetime": 383.537461};
    break;
    default:
    alert("Not available game number.");
    }
    
   jsonTemp ={"blackname": "Beta", "whitename": "Alpha", "lastmovenumber": 38, "blacktime": 811.470934, "lastmovetime": "2013-12-11 16:20:26.801488", "winner": 2, "moves": ["Pb2b3", "Pc7c6", "Bc1b2", "Nb8a6", "Nb1c3", "Pe7e5", "Ng1h3", "Pg7g5", "Pa2a4", "Ra8b8", "Pd2d3", "Pd7d5", "Nc3d5", "Pc6d5", "Pe2e4", "Pb7b6", "Bb2e5", "Qd8e7", "Pf2f4", "Bf8g7", "Be5b8", "Ng8f6", "Bb8e5", "Bc8g4", "Qd1g4", "Nf6g4", "Be5g7", "Na6b4", "Bg7h8", "Nb4c2", "Ke1e2", "Pa7a5", "Ra1c1", "Nc2e3", "Ke2f3", "Pd5e4", "Rc1e1", "Pe4f3"], "gameover": true, "whitesturn": true, "now": "2014-03-01 15:22:50.859784", "whitetime": 914.983729}
   return jsonTemp;

}