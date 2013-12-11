
function init(modelKind) {
	//these if-else are for reloading the board with a different texture. 
	if (document.getElementById('boardcontainer') !=null)
	{
  		var olddiv = document.getElementById('boardcontainer');
  		olddiv.parentNode.removeChild(olddiv);
  		
         openAllControls();
	}
	else
	{
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener('keypress', function (e) {
           console.log(e.keyCode);
                    if (e.keyCode==122) {
                        //pressing the z button turns on camera controls.
                    	
                        mousemove = !mousemove;
                        
                    				}

                                                }, false); 
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 50;
        camera.position.y = 120;

	}
    container = document.createElement( 'div' );
    container.setAttribute("id", "boardcontainer");
    document.body.appendChild( container );
    if (modelKind != 'gameover')
    {
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

	// 

	chessBoard = new THREE.Object3D(); //group node

	var loader = new THREE.OBJMTLLoader(); //chess board files here, you could easily rename them
	loader.load( 'objects/' + modelKind+'/chessboard.obj', 'objects/'+modelKind+'/chessboard.mtl', function ( object ) {
		object.scale.set(5,5,5);
		board = object;
		chessBoard.add( board );
	} );
	
	initWhite(modelKind);
	initBlack(modelKind);
	initBoardArray();
	
	scene.add( chessBoard );

	
	
    }

    else
    {   
        container.style.background="#0000A0";
        container.innerHTML = "<b style=text-align:center;font-size:40px;font-family:CENTURY GOTHIC> <br> <br> GREETINGS PROFESSOR <br> <br> A STRANGE GAME. <br> <br> THE ONLY WINNING MOVE IS NOT TO PLAY.</b>";
    }
    if (firstLoad ==true)
    {
    container.innerHTML = instructions;
    firstLoad = false;
    }
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function cloneObj ( obj ) {
	var i, cpy = new THREE.Object3D();
	for (var i in obj.children) {
		cpy.add(
			new THREE.Mesh(obj.children[i].geometry)
		);
	}
	return cpy;
}

function cloneObjMtl ( objmtl ) {
	var i, cpy = new THREE.Object3D();
	for (var i in objmtl.children) {
		cpy.add(
			new THREE.Mesh(objmtl.children[i].geometry,
			objmtl.children[i].material)
		);
	}
	return cpy;
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
        requestAnimationFrame( animate );
        // TOM I COMMENTED THIS OUT MOMENTARILY. 
        //also include something about the animation not finishing/animating.
        if (startGame == true && jsonobj !== null && restartGame === 0){
                if(currentTurn < lastTurn && count <= 0 && animationFlag === 0) //change to || to test
                {
                        pieceMove();
                        //count = 200;
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
                
                //change the speed after the current animation has finished... not sure how though, as datGUI
                if(animationFramesChange === 1 && animationFlag === 0)
                {
                        animationFrames = deltaAnimation; //deltaAnimation
                        animationFramesChange = 0;
                }
				updateTime();
				//updateMoveHTML();

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
			startGame = false;
			buttonDisable = false;
            updateMoveHTML();
            updateTime();
		}
		
		//restart
        if(restartGame === 1  && animationFlag === 0){
                
                if (gameid !== "None")
                {
                    jsonobj = getGame('https://10.11.18.65/cg/chess/' + gameid);
                    turnArray = jsonobj.moves;
                    lastTurn = jsonobj.lastmovenumber;
                }
                count = 500;
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
                updateMoveHTML();
                updateTime();
        }
		
        render();
}

function render() {

	
	 if (mousemove ==true)
        { camera.position.x += ( mouseX - camera.position.x ) * .05;
          camera.position.y += ( - mouseY - camera.position.y ) * .05;
        }
   
	camera.lookAt( scene.position );
	renderer.render( scene, camera );

	controls.update()

}
