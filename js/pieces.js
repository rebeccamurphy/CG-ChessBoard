function initWhite(option)
{
	whiteQueen = new THREE.Object3D();
	whiteKing = new THREE.Object3D();
	whiteRook1 = new THREE.Object3D();
	whiteRook2 = new THREE.Object3D();
	whiteBishop1 = new THREE.Object3D();
	whiteBishop2 = new THREE.Object3D();
	whiteKnight1 = new THREE.Object3D();
	whiteKnight2 = new THREE.Object3D();
	
	if (option ==0)
	{
	initPieces('objects/queen.json', -10, 30, whiteQueen);
	initPieces('objects/king.json', 0, 30, whiteKing);
	initPieces('objects/rook.json', -40, 30, whiteRook1, whiteRook2);
	whiteRook2.translateX(30);
	initPieces('objects/bishop.json', -20, 30, whiteBishop1, whiteBishop2);
	//initPieces('objects/bishop.json', 10, 30, whiteBishop2);
	whiteBishop2.translateX(10);
	initPieces('objects/knight.json', -30, 30, whiteKnight1, whiteKnight2);
	//initPieces('objects/kingBen.js', -30, 30, ben);
	//initPieces('objects/knight.json', 20, 30, whiteKnight2);
	whiteKnight2.translateX(20);
	}
	else if (option ==1)
	{
	initPieces('objects/queenHaeys.js', -10, 30, whiteQueen);
	initPieces('objects/king2.js', 0, 30, whiteKing);
	initPieces('objects/hancock.js', -40, 30, whiteRook1, whiteRook2);
	whiteRook2.translateX(30);
	initPieces('objects/alanBishop.js', -20, 30, whiteBishop1, whiteBishop2);
	//initPieces('objects/bishop.json', 10, 30, whiteBishop2);
	whiteBishop2.translateX(10);
	initPieces('objects/knight.js', -30, 30, whiteKnight1, whiteKnight2);
	//initPieces('objects/kingBen.js', -30, 30, ben);
	//initPieces('objects/knight.json', 20, 30, whiteKnight2);
	whiteKnight2.translateX(20);
	}
	else
	{
		var loader = new THREE.OBJMTLLoader(); //chess board files here, you could easily rename them
		loader.load( 'objects/queen.obj', 'objects/queen.mtl', function ( object ) {
		object.scale.set(4,4,4);
		queen = object;
		console.log(queen.id);
		whiteQueen.add( queen );
	} );
	}

	scene.add(whiteQueen);
	/*scene.add(whiteKing);
	scene.add(whiteRook1);
	scene.add(whiteRook2);
	scene.add(whiteBishop1);
	scene.add(whiteBishop2);
	scene.add(whiteKnight1);
	scene.add(whiteKnight2);
	scene.add(ben);
	
	initWhitePawns();
	
	whitePawn1.translateZ(-20); //example move
	*/
	
	//console.log(whiteQueen.children[0]);
}

//initializes all of the pawns.
function initWhitePawns()
{
	whitePawn1 = new THREE.Object3D(); // first as 3js objects
	whitePawn2 = new THREE.Object3D();
	whitePawn3 = new THREE.Object3D();
	whitePawn4 = new THREE.Object3D();
	whitePawn5 = new THREE.Object3D();
	whitePawn6 = new THREE.Object3D();
	whitePawn7 = new THREE.Object3D();
	whitePawn8 = new THREE.Object3D();
	
	var pawnArray = [];
	for(var i = 1; i <= 8; i++)       //puts all of the pawn variables into an array
	{
		pawnArray.push(eval("whitePawn" + i));
	}
	
	
	initPawnsHelper('objects/pawn.json', 20, pawnArray); //initializes all of the pawns from the array
	
	var pawnLocal = -40;
	for(var i = 0; i < 8; i++)  //makes the row and adds them to the scene
	{
		pawnArray[i].translateX(pawnLocal);
		scene.add(pawnArray[i]);
		pawnLocal += 10;
	}
}

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