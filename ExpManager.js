function ExpManager(game) {
	document.getElementById("dense").click();
	document.getElementById("volatile").click();
	this.game = game;
	this.automata = new Automata(game);
	this.tick = 0;
	this.run = 0;
	this.title = "DeVo#0";
}

ExpManager.prototype.update = function() {
	if(this.tick % 1000 == 0){
		this.FreshStart();
		this.run++;
	}
	this.automata.update();
	this.tick++;
}

ExpManager.prototype.draw = function(ctx) {
	this.automata.draw(ctx);
}

ExpManager.prototype.FreshStart = function() {
	if(this.run % 4 == 0){
		this.title = "SpSt#" + (this.run / 4);
		document.getElementById("sparse").click();
		document.getElementById("stable").click();
	}
	else if(this.run % 3 == 0){
		this.title = "SpVo#" + (this.run / 3);
		document.getElementById("sparse").click();
		document.getElementById("volatile").click();
	}
	else if(this.run % 2 == 0){
		this.title = "DeSt#" + (this.run / 2);
		document.getElementById("dense").click();
		document.getElementById("stable").click();
	}
	else {
		this.title = "DeVo#" + (this.run / 1);
		document.getElementById("dense").click();
		document.getElementById("volatile").click();
	}
	this.automata = new Automata(this.game, this.title);
	this.game.board = this.automata;
}