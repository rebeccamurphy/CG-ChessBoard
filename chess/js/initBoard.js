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
	loader.load( 'objects/chessboard.obj', 'objects/chessboard.mtl', function ( object ) {
		object.scale.set(5,5,5);
		board = object;
		chessBoard.add( board );
	} );

	scene.add( chessBoard );

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

function initMeow2(){
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 100;
			
	scene = new THREE.Scene();
	
	var ambient = new THREE.AmbientLight( 0x101010 );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0.5, 2, 1 ).normalize();
	scene.add( directionalLight );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	var loader  = new THREE.JSONLoader();
	//jsonLoader2.load( "objects/chessboard.js");
	// loader.load({
		// model: "objects/chessboard.json",
		// callback: function(geometry) {
			// mesh = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial);
			// mesh.position.set(0,0,0);
			// mesh.scale.set(20,20,20);
			// scene.add(mesh);
			// renderer.render(scene, camera);
		// }
	// });
	loader.load( 'objects/chessboard.json', function ( geometry, materials, divisions ) {
		var material1 = materials[ 0 ]; //black
		var material2 = materials[ 1 ]; //white
		
		// First we want to clone our original geometry.
		// Just in case we want to get the low poly version back.
		var smooth = geometry.clone( geometry );

		// Next, we need to merge vertices to clean up any unwanted vertex. 
		smooth.mergeVertices();

		// Create a new instance of the modifier and pass the number of divisions.
		var modifier = new THREE.SubdivisionModifier(divisions * 2);

		// Apply the modifier to our cloned geometry.
		modifier.modify( smooth );

		
		//var materialArray
		//var vertexColorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
		mesh = new THREE.Mesh( smooth, new THREE.MeshFaceMaterial( materials ) );
		mesh.scale.set(5,5,5);
		scene.add( mesh );
	} );
	
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );
	
	
}