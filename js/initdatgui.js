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
                  if (gameid != "None")
                   jsonobj = getGame('https://10.11.18.65/cg/chess/' + gameid);
                  startGame = true;
                }
}
var view = new guiView();
var guiCamera = new DAT.GUI({ autoPlace: false });
              guiCamera.add(view, 'topView');
              guiCamera.add(view, 'mouseControl');
              guiCamera.add(view, 'flipPlayer');

var Options = new guiOptions();


var FizzyText = function() {
  this.message = 'dat.gui';
  this.speed = 0.8;
  this.displayOutline = false;

};

var text = new FizzyText();
//var guiGame = new DAT.GUI({ autoPlace: false });
var guiGame = new DAT.GUI();
var themeListener = guiGame.add(Options, 'theme').options('Classic Plain', 'Classic Marble');
themeListener.onChange(function(value)
{
  if (value == "Classic Plain")
    init('Plain');
  else if (value == "Classic Marble")
    init('Marble');
});

var idListerner =  guiGame.add(Options, 'gameId');
idListerner.onFinishChange(function(value){gameid = value;});

guiGame.add(Options, 'start');