var player =0;

//camera controls.                        
var guiView = function() {
            this.mouseControl = function(){
                    mousemove = !mousemove;
                    
 
                    };
            this.topView = function() {
                //camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 1000 );
               console.log(top);
              // if (topview==false)
               {
                console.log(camera);
              
                console.log(camera.fov);
                camera.position.y=150;
                camera.position.z = 0;
                camera.position.x = 0;
               
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
                this.backGround = 'default';
                this.gameId = 'None';
                this.start = function(){

                if (buttonDisable === false)
                { 
                  initOptions.close();
                  optionsGUI.open();
                  cameraGUI.open();
                  removeInstructions();
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
         count = computerSpeed;
         initOptions.close();
         //currentTurn = 0;
               }
         this.animationSpeed = 26;
     this.computerSpeed = 'default';
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
  else if (value  == 'War Games')
  {
    modelKind = 'gameover';
  animationFlag = 2;
  gui = null;
  //note: this does break the game. Originally not intentional, though improved to be.
  }
  restartGame = 1;
  count = computerSpeed;
});
var bgListener = optionsGUI.add(Options, 'backGround').options( 'plain1','plain2','plain3', 'kittens', 'cat', "spaceCat", 'moarCat', 'planetCat');
bgListener.onChange(function(value)
{
 currentBG = value;
 changeBG(currentBG); 

});

optionsGUI.add(Options, 'restart');

var controller = optionsGUI.add(Options, 'animationSpeed', 2, 50).step(2);

controller.onFinishChange(function(value){
  if(value % 2 !== 0)
  {
    value+=1;
  }
  animationFramesChange = 1;
  deltaAnimation = 52 - value;
    
});

var compControl = optionsGUI.add(Options, 'computerSpeed').options('Slow', 'Slower', 'Basically a Rock');
compControl.onChange(function(value)
{
  if (value == 'Slow')
    {
    computerSpeed = 600;
    }
  else if (value == 'Slower')
    {
    computerSpeed = 900;
    }
  else if (value == 'Basically a Rock')
  {
    computerSpeed = 1200;
  }  
});



var cameraGUI = gui.addFolder('Camera Controls');

cameraGUI.add(view, 'topView');
cameraGUI.add(view, 'mouseControl');
cameraGUI.add(view, 'flipPlayer');
/*
initOptions.open();
optionsGUI.open();
cameraGUI.open();
*/
gui.close();
function changeBG (name) {
   removeInstructions();
  container.style.background="#D0D0CD url(./objects/bgs/"+name + ".jpg) no-repeat"; 
  container.style.backgroundSize="100% 100%"

                    
}
function openAllControls()
{
  gui.open();
  initOptions.open();
  optionsGUI.open();
  cameraGUI.open();
}
function removeInstructions() {
 if (document.getElementById('instructText') != null) 
    {
      var oldText = document.getElementById('instructText');
      oldText.parentNode.removeChild(oldText);
    }

}