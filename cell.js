function Cell(game,x,y) {
    this.x = x;
    this.y = y;
    this.game = game;
	this.genome = Math.random();
	var val = Math.floor(360 * this.genome);
    var cellSpawn = params.cellSpawn;
    if (Math.random() < cellSpawn) this.color = hsl(val, 100, 50);
    else this.color = "Black";
}

Cell.prototype.update = function () {
    var growthRate = params.cellGrowthRate;
    var decayRate = params.cellDecayRate;
    if (this.color !== "Black" && this.color !== "White" && (Math.random() < growthRate)) {
        var newX = (this.x + randomInt(3) - 1 + this.game.board.dimension) % this.game.board.dimension;
        var newY = (this.y + randomInt(3) - 1 + this.game.board.dimension) % this.game.board.dimension;

        if (this.game.board.board[newX][newY].color === "Black") {
			var newCell = this.game.board.board[newX][newY];
			var bit = randomInt(2);
			newCell.genome = this.genome + Math.pow(-1, bit) * Math.random() * params.cellOffspringVolatility;
			if (newCell.genome < 0) newCell.genome = newCell.genome + 1;
			if (newCell.genome > 1) newCell.genome = newCell.genome - 1;
			newCell.color = hsl(Math.floor(360 * newCell.genome), 100, 50);

		}			
    }
    if (this.color !== "Black" && Math.random() < decayRate) this.color = "Black";
}