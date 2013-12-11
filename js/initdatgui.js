var player =0;

//camera controls.                        
var guiView = function() {
            this.mouseControl = function(){
                    mousemove = !mousemove;
                    console.log('Mouse Loc x: ' + camera.position.x + 'y: '+  camera.position.y + 'z: ' +camera.position.z);
                    };
            this.topView = function() {
                //camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 1000 );
               console.log(top);
              // if (topview==false)
               {
                console.log(camera);
                //camera.fov = 20;
                console.log(camera.fov);
                camera.position.y=150;
                camera.position.z = 0;
                camera.position.x = 0;
                //xinc = camera.position.x /1000;
                //zinc = camera.position.x / 1000;
                //yinc = (camera.position.z -125)/1000;
                console.log('x: ' + camera.position.x + ' y: '+  camera.position.y + ' z: ' +camera.position.z);
                //camera.position.x = -2;
                //topview = true;
                mousemove = false;

              }
                    };
            this.flipPlayer = function(){
                    //sometimes this zooms out a lot and idk why. FIXLATERS
                    console.log(camera.position.z);
                    var temp = camera.position.y;
                    var tempZ = camera.position.z;
                    camera.position.z = -camera.position.z;
                    mousemove = false;
                    player+=1;

            };
          };
var guiOptions = function() {
                this.theme = 'default';
                this.gameId = 'None';
                this.start = function(){

                if (buttonDisable === false)
                {
                  if (gameid !== "None")
				  {
					jsonobj = getGame('https://10.11.18.65/cg/chess/' + gameid);
                 //jsonobj = {"lastmovenumber": 17, "blacktime": 915.001665, "winner": 1, "gameover": true, "whitesturn": false, "moves": ["Pa2a4", "Pa7a6", "Pd2d4", "Pa6a5", "Qd1d2", "Pb7b6", "Qd2d3", "Pc7c6", "Qd3h7", "Pc6c5", "Qh7g8", "Pd7d6", "Qg8h8", "Pd6d5", "Qh8f8", "Pd5d4", "Qf8e8"], "whitetime": 909.452745}
                 
					turnArray = jsonobj.moves;
					lastTurn = jsonobj.lastmovenumber;
					if(startException === 1)
					{
						restartGame = 1;
						//count = 500;
					}
					else
					{ 
						startGame = true;
					}
					buttonDisable = true;
					updateMoveHTML();
					updateTime();
				  }
                 //document.getElementById('MOVE').innerHTML = "White Time: " + jsonobj.whitetime;
               }
               else 
                 console.log('Wait for this game to be over, silly pants.');
               }
         this.restart = function(){
                 restartGame = 1;
				 //count = 400;
				 //currentTurn = 0;
               }
         this.evenSpeed = 26;
}
var Options = new guiOptions();
var view = new guiView();

var gui = new dat.GUI();

var initOptions = gui.addFolder('Initialization');

var controllerGameId = initOptions.add(Options, 'gameId');
controllerGameId.onFinishChange(function(value){
  gameid = value;
});

initOptions.add(Options, 'start');




var optionsGUI = gui.addFolder('Options');

var themeListener = optionsGUI.add(Options, 'theme').options('Classic Plain', 'Classic Marble', "???");
themeListener.onChange(function(value)
{
  if (value == "Classic Plain")
    {
      //init('Plain');
      modelKind = 'Plain';
    }
  else if (value == "Classic Marble")
    {
      //init('Marble');
      modelKind = 'Marble';
    }
  else if (value == "???")
  {
    modelKind = 'Faculty';
  }  
  restartGame = 1;
  //count = 500;
});

optionsGUI.add(Options, 'restart');

var controller = optionsGUI.add(Options, 'evenSpeed', 2, 50).step(2);

controller.onFinishChange(function(value){
  if(value % 2 === 0)
  {
    animationFramesChange = 1;
    //alert(deltaAnimation);
    deltaAnimation = 52 - value;
    //alert(deltaAnimation);
  }
  else
  {
    console.log("must be even. Wish I could put this somewhere you would notice...");
  }
});

var cameraGUI = gui.addFolder('Camera Controls');

cameraGUI.add(view, 'topView');
cameraGUI.add(view, 'mouseControl');
cameraGUI.add(view, 'flipPlayer');

initOptions.open();
optionsGUI.open();
cameraGUI.open();