function init(modelKind) {
	//these if-else are for reloading the board with a different texture. 
	if (document.getElementById('boardcontainer') !=null)
	{
  		var olddiv = document.getElementById('boardcontainer');
  		olddiv.parentNode.removeChild(olddiv);
	}
	else
	{
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener('keypress', function (e) {
                    if (e.keyCode==13) {
                    	console.log(e.keyCode);
                        mousemove = !mousemove;
                    				}

                                                }, false);  
	}
	container = document.createElement( 'div' );
	container.setAttribute("id", "boardcontainer");
	document.body.appendChild( container );
 	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
        //camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000  );
        camera.position.z = 100;
        camera.position.y = 100;

	// scene

	scene = new THREE.Scene();

	var ambient = new THREE.AmbientLight( 0x101010 );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0.5, 2, 1 ).normalize();
	scene.add( directionalLight );
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

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	


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
	if (startGame==true && jsonobj!=null){
	if(currentTurn !== lastTurn && count === 0 && animationFlag === 0) //change to || to test
	{
		pieceMove();
		//count = 200;
	}
	count -= 10;
	//update the json pulled from the server here, and the array, and the last turn number.
	
	if(animationFlag === 1)
	{
		if(animateCount < 5) //rise
		{
			currentPieceExternal.translateX(moveXtransition / 10);
			currentPieceExternal.translateZ(moveZtransition / 10);
			currentPieceExternal.translateY(3);
			animateCount++;
		}
		else if(animateCount < 10) //fall
		{
			currentPieceExternal.translateX(moveXtransition / 10);
			currentPieceExternal.translateZ(moveZtransition / 10);
			currentPieceExternal.translateY(-3);
			animateCount++;
		}
		else //wrap up
		{
			animationFlag = 0;
			animateCount = 0;
			count = 0;
		}
	}

	}
	
	if (gameid != "None" && startGame ==true)
	{
		if (jsonobj.gameOver==false && currentTurn>= lastTurn &&animationFlag != 1)
		{
		jsonobj = getGame('https://10.11.18.65/cg/chess/' + gameid);
		turnArray = jsonobj.moves;
		lastTurn = jsonobj.lastmovenumber;
		}
		else if (jsonobj.gameover==true &&currentTurn>= lastTurn &&  animationFlag != 1)
			{
			 startGame = false;
			}
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

}
