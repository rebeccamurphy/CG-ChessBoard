function init() {
	
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 100;

	// scene

	scene = new THREE.Scene();

	var ambient = new THREE.AmbientLight( 0x101010 );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0.5, 2, 1 ).normalize();
	scene.add( directionalLight );

	// model
	chessBoard = new THREE.Object3D(); //group node

	var loader = new THREE.OBJMTLLoader(); //chess board files here, you could easily rename them
	loader.load( 'objects/board.obj', 'objects/board.mtl', function ( object ) {
		object.scale.x = 20;
		object.scale.y = 20;
		object.scale.z = 20;
		board = object;
		chessBoard.add( board );
	} );

	scene.add( board );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

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
	render();
}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	
	camera.lookAt( scene.position );
	renderer.render( scene, camera );

}