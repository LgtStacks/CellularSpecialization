// GameBoard code below
var graphCtx = null;
var params = {
}
// the "main" code begins here

var ASSET_MANAGER = new AssetManager();
var gameEngine = new GameEngine();

	ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
	var socket = null;
	if (window.io !== undefined) {
		console.log("Database connected!");
		socket = io.connect('http://24.16.255.56:8888');
	}

	ASSET_MANAGER.downloadAll(function () {
		getSettings();
		console.log("starting up da sheild");
		var canvas = document.getElementById('gameWorld');
		var ctx = canvas.getContext('2d');
		//graphCtx = document.getElementById('graphWorld').getContext('2d');
		//var gameEngine = new GameEngine();
		gameEngine.init(ctx);
		var automata = new Automata(gameEngine);
		gameEngine.addEntity(automata);
		gameEngine.board = automata;
		gameEngine.start();
	});
function initiliaze_game(){
	getSettings();
	gameEngine.entities = [];
	var automata2 = new Automata(gameEngine);
	gameEngine.addEntity(automata2);
	gameEngine.board = automata2;
}