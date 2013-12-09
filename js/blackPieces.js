function initBlack(modelNumber)
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
	if(modelNumber === 0)
	{
		initPieces('objects/Marble/blackQueen.json', -10, -40, blackQueen);
		initPieces('objects/Marble/blackKing.json', 0, -40, blackKing);
		initPieces('objects/Marble/blackRook.json', -40, -40, blackRook1, blackRook2);
		blackRook2.translateX(30);
		initPieces('objects/Marble/blackBishop.json', -20, -40, blackBishop1, blackBishop2);
		blackBishop2.translateX(10);
		initPieces('objects/Marble/blackKnight.json', -30, -40, blackKnight1, blackKnight2);
		blackKnight2.translateX(20);
	}
	else //more or less the same as what is in the if, but with the second set of file names.
	{
	}
	
	scene.add(blackQueen);
	scene.add(blackKing);
	scene.add(blackRook1);
	scene.add(blackRook2);
	scene.add(blackBishop1);
	scene.add(blackBishop2);
	scene.add(blackKnight1);
	scene.add(blackKnight2);
	
	initBlackPawns(modelNumber); //same as above
	
	//whitePawn1.translateZ(-20); //example move
}

//initializes all of the pawns.
function initBlackPawns(modelNumber)
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
	
	if(modelNumber === 0) //same as above
	{
		initPawnsHelper('objects/Marble/blackPawn.json', -30, pawnArray); //initializes all of the pawns from the array
	}
	else
	{
		
	}
	
	var pawnLocal = -40;
	for(var i = 0; i < 8; i++)  //makes the row and adds them to the scene
	{
		pawnArray[i].translateX(pawnLocal);
		scene.add(pawnArray[i]);
		pawnLocal += 10;
	}
}