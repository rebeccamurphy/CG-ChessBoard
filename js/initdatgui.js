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
               
					turnArray = jsonobj.moves;
					lastTurn = jsonobj.lastmovenumber;
					if(startException === 1)
					{
						restartGame = 1;
					}
					else
					{ 
						startGame = true;
					}
					startException = 1;
					buttonDisable = true;
					updateMoveHTML();
					updateTime();
				  }
           else 
              console.log('Enter a Game ID');
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

var themeListener = optionsGUI.add(Options, 'theme').options('Classic Plain', 'Classic Marble', "???", 'War Games');
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
  else if (value  == 'WarGames')
    modelKind = 'gameover';
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