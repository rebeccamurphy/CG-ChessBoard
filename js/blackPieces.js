/*
* @author Tom & Rebecca
* This file is used to add the black chess pieces to the scene, based on the selected kind of model, referenced in the theme in the datgui interface.
*/

function initBlack(modelKind)
{
	blackQueen = new THREE.Object3D();
	blackKing = new THREE.Object3D();
	blackRook1 = new THREE.Object3D();
	blackRook2 = new THREE.Object3D();
	blackBishop1 = new THREE.Object3D();
	blackBishop2 = new THREE.Object3D();
	blackKnight1 = new THREE.Object3D();
	blackKnight2 = new THREE.Object3D();
	
	//for handling the two sets of models.
	
	initPieces('objects/'+ modelKind +'/blackQueen.json', -10, -40, blackQueen);
	initPieces('objects/'+ modelKind +'/blackKing.json', 0, -40, blackKing);
	initPieces('objects/'+ modelKind +'/blackRook.json', -40, -40, blackRook1, blackRook2);
	blackRook2.translateX(30);
	initPieces('objects/'+ modelKind +'/blackBishop.json', -20, -40, blackBishop1, blackBishop2);
	blackBishop2.translateX(10);
	initPieces('objects/'+ modelKind +'/blackKnight.json', -30, -40, blackKnight1, blackKnight2);
	blackKnight2.translateX(20);
	
	
	scene.add(blackQueen);
	scene.add(blackKing);
	scene.add(blackRook1);
	scene.add(blackRook2);
	scene.add(blackBishop1);
	scene.add(blackBishop2);
	scene.add(blackKnight1);
	scene.add(blackKnight2);
	
	initBlackPawns(modelKind); //same as above
	
	//whitePawn1.translateZ(-20); //example move
}

//initializes all of the pawns.
function initBlackPawns(modelKind)
{
	blackPawn1 = new THREE.Object3D(); // first as 3js objects
	blackPawn2 = new THREE.Object3D();
	blackPawn3 = new THREE.Object3D();
	blackPawn4 = new THREE.Object3D();
	blackPawn5 = new THREE.Object3D();
	blackPawn6 = new THREE.Object3D();
	blackPawn7 = new THREE.Object3D();
	blackPawn8 = new THREE.Object3D();
	
	var pawnArray = [];
	for(var i = 1; i <= 8; i++)       //puts all of the pawn variables into an array
	{
		pawnArray.push(eval("blackPawn" + i));
	}
	
		initPawnsHelper('objects/'+ modelKind +'/blackPawn.json', -30, pawnArray); //initializes all of the pawns from the array

	
	var pawnLocal = -40;
	for(var i = 0; i < 8; i++)  //makes the row and adds them to the scene
	{
		pawnArray[i].translateX(pawnLocal);
		scene.add(pawnArray[i]);
		pawnLocal += 10;
	}
}