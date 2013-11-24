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
	loader.load( '/objects/chessboard.obj', '/objects/chessboard.mtl', function ( object ) {
	//loader.load( '/objects/4square.obj', '/objects/4square.mtl', function ( object ) {
		object.scale.x = 20;
		object.scale.y = 20;
		object.scale.z = 20;
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
	//loader.load( 'objects/chessboard.js', function ( geometry, materials ) {
	loader.load( 'objects/untitled.js', function ( geometry, materials ) {
		//var material1 = materials[ 0 ]; //black
		//var material2 = materials[ 1 ]; //white
		
		//var materialArray
		//var vertexColorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
		/*
		var material = new THREE.MeshLambertMaterial({
    	map: THREE.ImageUtils.loadTexture('objects/marble.jpeg' ),  // specify and load the texture
    	colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
    	colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
    	colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
  		});
		*/
		mesh = new THREE.Mesh( geometry,new THREE.MeshFaceMaterial( materials) );
		mesh.scale.set(5,5,5);
		scene.add( mesh );
	});
	
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );
	
	
}

function initDae(){
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

	loader = new THREE.ColladaLoader();
	loader.load('objects/fullBoard.dae',function colladaReady( collada ){
	player = collada.scene;
	skin = collada.skins [ 0 ];
	scene.add( player );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );
	
});
}
function addObjects() {
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

var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'objects/marble.jpg' ) } );
var loader = new THREE.JSONLoader();
loader.load( { model: 'objects/fullBoardJPEG.js', callback: function ( geometry ) {
      geometry.computeTangents();
      mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = mesh.position.y = mesh.position.z = 0;
      mesh.rotation.x = mesh.rotation.y = mesh.rotation.z = 0;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = 700;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
     scene.add( mesh );
  } } );
 document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );
  // Finally when we are done loading our objects we need to add the group to the scene.
}
