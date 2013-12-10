var player =0;

//camera controls.                        
var guiView = function() {
            this.mouseControl = function(){
                    mousemove = !mousemove;
                    };
            this.topView = function() {
            		camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 1000 );
          			camera.position.z = 50;
                camera.position.y = 300;
                camera.position.x = 0;
         				mousemove = false;
                    };
            this.flipPlayer = function(){
                    //sometimes this zooms out a lot and idk why. FIXLATERS
                    console.log(camera.position.z);
                    var temp = camera.position.y;
                    var tempZ = camera.position.z;
                    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
                    camera.position.y = temp;
                    if (player %2 ==0)
                            camera.position.z = -100;
                    else
                          camera.position.z = 100;
                   if (tempZ ==50)
                            {
                                camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 1000 );
                                camera.position.z =-50;
                                camera.position.y = temp;
                            }
                  mousemove = false;
                  player+=1;

            };
          };
var guiOptions = function() {
                this.theme = 'default';
                this.gameId = 'None';
                this.start = function(){
                if (buttonDisable == false)
                {
                  if (gameid != "None")
                  //jsonobj = getGame('https://10.11.18.65/cg/chess/' + gameid);
                 //jsonobj = {"lastmovenumber": 17, "blacktime": 915.001665, "winner": 1, "gameover": true, "whitesturn": false, "moves": ["Pa2a4", "Pa7a6", "Pd2d4", "Pa6a5", "Qd1d2", "Pb7b6", "Qd2d3", "Pc7c6", "Qd3h7", "Pc6c5", "Qh7g8", "Pd7d6", "Qg8h8", "Pd6d5", "Qh8f8", "Pd5d4", "Qf8e8"], "whitetime": 909.452745}
                 console.log(jsonobj);
                 turnArray = jsonobj.moves;
                 lastTurn = jsonobj.lastmovenumber;
                 startGame = true;
                 buttonDisable = true;
                 console.log(buttonDisable);
               }
                else 
                  console.log('Wait for this game to be over, silly pants.');
                }
}
var view = new guiView();
var guiCamera = new DAT.GUI({ autoPlace: false });
              guiCamera.add(view, 'topView');
              guiCamera.add(view, 'mouseControl');
              guiCamera.add(view, 'flipPlayer');

var Options = new guiOptions();


//var guiGame = new DAT.GUI({ autoPlace: false });
var guiGame = new DAT.GUI();
var themeListener = guiGame.add(Options, 'theme').options('Classic Plain', 'Classic Marble');
themeListener.onChange(function(value)
{
  if (value == "Classic Plain")
    {
      init('Plain');
      modelKind = 'Plain';
    }
  else if (value == "Classic Marble")
    {
      init('Marble');
      modelKind = 'Marble';
    }  

});

var idListerner =  guiGame.add(Options, 'gameId');
idListerner.onFinishChange(function(value){gameid = value;});

guiGame.add(Options, 'start');