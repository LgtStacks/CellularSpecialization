function ExpManager(game) {
	//document.getElementById("dense").click();
	//document.getElementById("volatile").click();
	//this.game = game;
	this.automata = new Automata(game);
	//this.tick = 0;
	//this.run = 0;
	//this.title = "CellVolAgentVol#0";
}

ExpManager.prototype.update = function() {
	//if(this.tick % params.DLDB == 0){
	//	this.FreshStart();
	//	this.run++;
	//}
	this.automata.update();
	//this.tick++;
}

ExpManager.prototype.draw = function(ctx) {
	this.automata.draw(ctx);
}

ExpManager.prototype.FreshStart = function() {
	if(this.run % 9 == 8){
		this.title = "CellStAgentSt#" + Math.floor(this.run / 9);
		document.getElementById("cellStable").click();
		document.getElementById("agentStable").click();
	}
	else if(this.run % 9 == 7){
		this.title = "CellStAgentMid#" + Math.floor(this.run / 9);
		document.getElementById("cellStable").click();
		document.getElementById("agentMid").click();
	}
	else if(this.run % 9 == 6){
		this.title = "CellStAgentVol#" + Math.floor(this.run / 9);
		document.getElementById("cellStable").click();
		document.getElementById("agentVol").click();
	}
	else if(this.run % 9 == 5){
		this.title = "CellMidAgentSt#" + Math.floor(this.run / 9);
		document.getElementById("cellMid").click();
		document.getElementById("agentStable").click();
	}
	else if(this.run % 9 == 4){
		this.title = "CellMidAgentMid#" + Math.floor(this.run / 9);
		document.getElementById("cellMid").click();
		document.getElementById("agentMid").click();
	}
	else if(this.run % 9 == 3){
		this.title = "CellMidAgentVol#" + Math.floor(this.run / 9);
		document.getElementById("cellMid").click();
		document.getElementById("agentVol").click();
	}
	else if(this.run % 9 == 2){
		this.title = "CellVolAgentSt#" + Math.floor(this.run / 9);
		document.getElementById("cellVol").click();
		document.getElementById("agentStable").click();
	}
	else if(this.run % 9 == 1){
		this.title = "CellVolAgentMid#" + Math.floor(this.run / 9);
		document.getElementById("cellVol").click();
		document.getElementById("agentMid").click();
	}
	else {
		this.title = "CellVolAgentVol#" + Math.floor(this.run / 9);
		document.getElementById("cellVol").click();
		document.getElementById("agentVol").click();
		console.log("Finished a round!!");
	}
	this.automata = new Automata(this.game, this.title);
	this.game.board = this.automata;
}