//file1 is an optional parameter for the cloning process.
function initPieces(objString, x, z, file, file1){
	
	var loader  = new THREE.JSONLoader();

	loader.load( objString, function ( geometry, materials, divisions ) {
		// First we want to clone our original geometry.
		// Just in case we want to get the low poly version back.
		var smooth = geometry.clone( geometry );

		// Next, we need to merge vertices to clean up any unwanted vertex. 
		smooth.mergeVertices();

		// Create a new instance of the modifier and pass the number of divisions.
		var modifier = new THREE.SubdivisionModifier(divisions * 4);

		// Apply the modifier to our cloned geometry.
		modifier.modify( smooth );

		
		//var materialArray
		//var vertexColorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
		mesh = new THREE.Mesh( smooth, new THREE.MeshFaceMaterial( materials ) );
		mesh.scale.set(4,4,4);
		mesh.translateX(5); 
		mesh.translateY(1);
		mesh.translateZ(4.7);

		mesh.translateX(x);
		mesh.translateZ(z);
		//chessBoard.add( mesh );
		file.add( mesh );
		
		if(file1  !== undefined)
		{
			//alert("meow");
			mesh = new THREE.Mesh( smooth, new THREE.MeshFaceMaterial( materials ) );
			mesh.scale.set(4,4,4);
			mesh.translateX(5); 
			mesh.translateY(1);
			mesh.translateZ(4.7);
			mesh.translateZ(z);
			file1.add( mesh );
		}
	}, 'objects/Textures' );
}

//makes the pawns using the passed in array. z is the row they should be in
function initPawnsHelper(objString, z, fileArray){
	
	var loader  = new THREE.JSONLoader();

	loader.load( objString, function ( geometry, materials, divisions ) {
		// First we want to clone our original geometry.
		// Just in case we want to get the low poly version back.
		var smooth = geometry.clone( geometry );

		// Next, we need to merge vertices to clean up any unwanted vertex. 
		smooth.mergeVertices();

		// Create a new instance of the modifier and pass the number of divisions.
		var modifier = new THREE.SubdivisionModifier(divisions * 4);

		// Apply the modifier to our cloned geometry.
		modifier.modify( smooth );

		
		for(var i = 0; i < 8; i++)
		{
			mesh = new THREE.Mesh( smooth, new THREE.MeshFaceMaterial( materials ) );
			mesh.scale.set(4,4,4);
			mesh.translateX(5); 
			mesh.translateY(1);
			mesh.translateZ(4.7);
			mesh.translateZ(z);
			
			fileArray[i].add( mesh );
		}
		
	}, 'objects/Textures' );
}