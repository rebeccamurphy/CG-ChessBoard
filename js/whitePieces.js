/*
* @author Tom & Rebecca
* This file is used to add the white chess pieces to the scene, based on the selected kind of model, referenced in the theme in the datgui interface.
*/

function initWhite(modelKind)
{
	whiteQueen = new THREE.Object3D();
	whiteKing = new THREE.Object3D();
	whiteRook1 = new THREE.Object3D();
	whiteRook2 = new THREE.Object3D();
	whiteBishop1 = new THREE.Object3D();
	whiteBishop2 = new THREE.Object3D();
	whiteKnight1 = new THREE.Object3D();
	whiteKnight2 = new THREE.Object3D();
	
	//for handling the two sets of models.
	
		initPieces('objects/'+ modelKind +'/queen.json', -10, 30, whiteQueen);
		initPieces('objects/'+ modelKind +'/king.json', 0, 30, whiteKing);
		initPieces('objects/'+ modelKind +'/rook.json', -40, 30, whiteRook1, whiteRook2);
		whiteRook2.translateX(30);
		initPieces('objects/'+ modelKind +'/bishop.json', -20, 30, whiteBishop1, whiteBishop2);
		//initPieces('objects/bishop.json', 10, 30, whiteBishop2);
		whiteBishop2.translateX(10);
		initPieces('objects/'+ modelKind +'/knight.json', -30, 30, whiteKnight1, whiteKnight2);
		//initPieces('objects/knight.json', 20, 30, whiteKnight2);
		whiteKnight2.translateX(20);
	
	
	
	scene.add(whiteQueen);
	scene.add(whiteKing);
	scene.add(whiteRook1);
	scene.add(whiteRook2);
	scene.add(whiteBishop1);
	scene.add(whiteBishop2);
	scene.add(whiteKnight1);
	scene.add(whiteKnight2);
	
	initWhitePawns(modelKind); //same as above
	
	//whitePawn1.translateZ(-20); //example move
}

//initializes all of the pawns.
function initWhitePawns(modelKind)
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
	
	 //same as above
	
		initPawnsHelper('objects/'+ modelKind +'/pawn.json', 20, pawnArray); //initializes all of the pawns from the array
	

	var pawnLocal = -40;
	for(var i = 0; i < 8; i++)  //makes the row and adds them to the scene
	{
		pawnArray[i].translateX(pawnLocal);
		scene.add(pawnArray[i]);
		pawnLocal += 10;
	}
}