/*
* @author Tom & Rebecca
* This file is used to create the board with lights, controls, etc.
*/

function init(modelKind) {
	
	if (document.getElementById('boardcontainer') !=null)
	{	//if the current container for the chessboard is not empty, this removes the container from the html, so a board with a different modelKind can be loaded.
  		var olddiv = document.getElementById('boardcontainer');
  		olddiv.parentNode.removeChild(olddiv);
  		//this opens all the gui controls
  		openAllControls(); 
	}
	else
	{	//first time the document is loaded, adds all control listerners as well as camera
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener('keypress', function (e) {
           console.log(e.keyCode);
                    if (e.keyCode==122) {
                        //pressing the z button turns on camera follow mouse controls.
                        mousemove = !mousemove;
                        
                    				}

                                                }, false); 
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 50;
        camera.position.y = 120;

	}
	//creates the div tag for the board
    container = document.createElement( 'div' );
    container.setAttribute("id", "boardcontainer");
    document.body.appendChild( container );
    
    if (modelKind != 'gameover')
    {
    	//if the theme is not war games, it loads the board with all the lights normally.
	// scene

	scene = new THREE.Scene();

	var ambient = new THREE.AmbientLight( 0x101010 );
		scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
		directionalLight.position.set( 0.5, 2, 1 ).normalize();
		scene.add( directionalLight );
    
    var pointLight2 = new THREE.PointLight( 0xffeedd );
	    pointLight2.position.set( -100, 250, -25 ).normalize();
	    scene.add( pointLight2 );

    var spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 100, 1000, 100 );

        spotLight.castShadow = true;

        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;

        spotLight.shadowCameraNear = 500;
        spotLight.shadowCameraFar = 4000;
        spotLight.shadowCameraFov = 30;

        scene.add( spotLight );
   
    if (modelKind == 'Faculty')
    {
    //adds an extra light for a certain theme.
    var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.25 );
	    directionalLight2.position.set( 0, 0, 50 );
	    scene.add( directionalLight2 );
	}

 
	// Loads the chessboard that corresponds with the current theme/modelKind

	chessBoard = new THREE.Object3D(); //group node

	var loader = new THREE.OBJMTLLoader(); //chess board files here, you could easily rename them
	loader.load( 'objects/' + modelKind+'/chessboard.obj', 'objects/'+modelKind+'/chessboard.mtl', function ( object ) {
		object.scale.set(5,5,5);
		board = object;
		chessBoard.add( board );
	} );
	// keeps the same background when a new theme is loaded
	changeBG(currentBG);
	//initiates the chessboard and adds it to the scene
	initWhite(modelKind);
	initBlack(modelKind);
	initBoardArray();
	scene.add( chessBoard );

	
	
    }

    else //loads the War Games Screen 
    {   
        container.style.background="#0000A0";
        container.innerHTML = "<b style=text-align:center;font-size:40px;font-family:CENTURY GOTHIC> <br> <br> GREETINGS PROFESSOR <br> <br> A STRANGE GAME. <br> <br> THE ONLY WINNING MOVE IS NOT TO PLAY.</b>";
    }
    if (firstLoad ==true) //Only loads the instructions on the first load
    {
    container.innerHTML = instructions;
    firstLoad = false;
    }
    //creates renderer and appends it to container
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    //ands click, drag and zoom camera controls. 
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}


//resizes board based on window size
function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
// tracks mouse movement for camera controls.
function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;
}

//animation function
function animate() {
        requestAnimationFrame( animate );
        if (startGame == true && jsonobj !== null){
                if(currentTurn < lastTurn && count <= 0 && animationFlag === 0) //change to || to test
                {
                        pieceMove();
                        
                }
                count -= 10;
                //update the json pulled from the server here, and the array, and the last turn number.
                //check if an animation is ready
                if(animationFlag === 1)
                {
                        if(animateCount < animationFrames / 2) //rise
                        {
                                currentPieceExternal.translateX(moveXtransition / animationFrames);
                                currentPieceExternal.translateZ(moveZtransition / animationFrames);
                                currentPieceExternal.translateY(1);
                                animateCount++;
                        }
                        else if(animateCount < animationFrames) //fall
                        {
                                currentPieceExternal.translateX(moveXtransition / animationFrames);
                                currentPieceExternal.translateZ(moveZtransition / animationFrames);
                                currentPieceExternal.translateY(-1);
                                animateCount++;
                        }
                        else //wrap up
                        {
                                animationFlag = 0;
                                animateCount = 0;
                                count = 0;
                        }
                }
                
                //change the speed after the current animation has finished
                if(animationFramesChange === 1 && animationFlag === 0)
                {
                        animationFrames = deltaAnimation; //deltaAnimation
                        animationFramesChange = 0;
                }
				updateTime();
				

        } 
		
		//pull from the server
		if(gameid !== "None" && startGame === true && animationFlag === 0 && restartGame === 0)
		{
			if(serverPull === 0)
			{
				jsonobj = getGame('https://10.11.18.65/cg/chess/' + gameid);
				turnArray = jsonobj.moves;
				lastTurn = jsonobj.lastmovenumber;
				updateMoveHTML();
				updateTime();
				serverPull = 200;
			}
			serverPull -= 10;
		}
        
		//check if the game is over. (have to be sure)
		if(gameid !== "None" && startGame === true && jsonobj.gameover === true && currentTurn === lastTurn && animationFlag === 0)
		{
			if(jsonobj.winner == 1)
			{
				if(jsonobj.hasOwnProperty('whitename'))
				{
					alert(jsonobj.whitename + " wins!");
				}
				else
				{
					alert("White Team wins!");
				}
			}
			else
			{
				if(jsonobj.hasOwnProperty('blackname'))
				{
					alert(jsonobj.blackname + " wins!");
				}
				else
				{
					alert("White Team wins!");
				}
		}
			startGame = false;
			buttonDisable = false;
            updateMoveHTML();
            updateTime();
		}
		
		//restart
        if(restartGame === 1  && (animationFlag === 0 || animationFlag === 2)){
                
                if (gameid !== "None")
                {
                    jsonobj = getGame('https://10.11.18.65/cg/chess/' + gameid);
                    turnArray = jsonobj.moves;
                    lastTurn = jsonobj.lastmovenumber;
					updateMoveHTML();
					updateTime();
                }
                
                count = computerSpeed;
				serverPull = 200;
				if(startException === 1)
				{
					startGame = true;
					startException = 1;
				}
                currentTurn = 0;
                restartGame = 0;
				
                init(modelKind);
                animate();
        }
		
		if(animationFlag === 2)
		{
			gui.close();
			//locks the user out, "permanently" when they choose 'War Games'
			//refresh necessary, as otherwise, game will not go well because of models.
			//So, it was either lock the user out and force a refresh, or let everything
			//explode if the use changes models after first run.
            //this doesn't work if you restart the game, gui is still shown.
			if (document.getElementById('MOVE') != null) 
			{
			  var oldText = document.getElementById('MOVE');
			  oldText.parentNode.removeChild(oldText);
			}
			if (document.getElementById('TIME') != null) 
			{
			  var oldText = document.getElementById('TIME');
			  oldText.parentNode.removeChild(oldText);
			}
			//dat.GUI.dom.removeChild(gui.domElement);
			dat.GUI.toggleHide();

		}
		
        render();
}
// render function
function render() {

	// if mousemove is true, the camera will follow the mouse
	 if (mousemove ==true)
        { camera.position.x += ( mouseX - camera.position.x ) * .05;
          camera.position.y += ( - mouseY - camera.position.y ) * .05;
        }
   
	camera.lookAt( scene.position );
	renderer.render( scene, camera );

	//updates the click, drag, and zoom camera controls
	controls.update()

}
