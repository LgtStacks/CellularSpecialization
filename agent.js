function Agent(game, x, y, agent) {
    this.x = x;
    this.y = y;
    this.game = game;    
    if (agent) {
        var bit = randomInt(2);
        this.genomeFood	= agent.genomeFood + Math.pow(-1, bit) * Math.random() * params.offspringVolatility;
        if (this.genomeFood < 0) this.genomeFood = this.genomeFood + 1;
        if (this.genomeFood > 1) this.genomeFood = this.genomeFood - 1;
		
		var bit1 = randomInt(2);
        this.genomePoison = agent.genomePoison + Math.pow(-1, bit1) * Math.random() * params.offspringVolatility;
        if (this.genomePoison < 0) this.genomePoison = this.genomePoison + 1;
        if (this.genomePoison > 1) this.genomePoison = this.genomePoison - 1;
		
		var bit2 = randomInt(2);
        this.genomeAttract = agent.genomeAttract + Math.pow(-1, bit2) * Math.random() * params.offspringVolatility;
        if (this.genomeAttract < 0) this.genomeAttract = this.genomeAttract + 1;
        if (this.genomeAttract > 1) this.genomeAttract = this.genomeAttract - 1;
		
		var bit3 = randomInt(2);
        this.genomeAvoid = agent.genomeAvoid + Math.pow(-1, bit3) * Math.random() * params.offspringVolatility;
        if (this.genomeAvoid < 0) this.genomeAvoid = this.genomeAvoid + 1;
        if (this.genomeAvoid > 1) this.genomeAvoid = this.genomeAvoid - 1;
    }
    else {
        this.genomeFood = Math.random();
		this.genomePoison = Math.random();
		this.genomeAttract = Math.random();
		this.genomeAvoid = Math.random();
    }

    var val = Math.floor(360 * this.genomeFood);
	this.color = hsl(val, 100, 50);
    this.maxHits = params.maxHits;
    this.hits = this.maxHits;
}

Agent.prototype.update = function () {
    var cell = this.game.board.board[this.x][this.y];
    // resolve cell
    /*if (cell.color === "Red") {
        if (Math.random() > this.genome) {
            if (this.hits < this.maxHits && params.healingToggle) this.hits++;
            //cell.color = "Black";
            cell.color = "White";
        }
        else this.hits--;
    } else if (cell.color === "Green") {
        if (Math.random() < this.genome) {
            if (this.hits < this.maxHits && params.healingToggle) this.hits++;
            //cell.color = "Black";
            cell.color = "White";
        }
        else this.hits--;
        //else cell.color = "Black";
    } 
	*/	
	if (cell.color === "White") {
        if (Math.random() < params.reproductionChance) {
            var agent = new Agent(this.game, this.x, this.y, this);
			//console.log("Old genome:" + this.genomeFood + " New genome:" + agent.genomeFood);
            this.game.board.agents.push(agent);
        }
        cell.color = "Black";
    } else if (cell.color === "Black") {
        // safe
    } else {
		//Landed in a colored square
		var dist = distance(Math.floor(360 * this.genomeFood), Math.floor(360 * cell.genome));//Calculate distance
		var dist2 = distance(Math.floor(360 * this.genomePoison), Math.floor(360 * cell.genome));
		if((Math.random() * params.healPoisonRange) > dist2){
			this.hits--;
			cell.color = "Black";
			//console.log("Poisoned");
		}
		if((Math.random() * params.healPoisonRange) > dist) {
			if (this.hits < this.maxHits && params.healingToggle) this.hits++;
            cell.color = "White";
			//console.log("Healed");
		}
		if(cell.color !== "White") {
			cell.color = "Black";
			//console.log("Nothing");
		}
		
	}

    // did I die?
    if (this.hits < 1 || Math.random() < params.deathChanceAgent) {
        this.dead = true;
    }

    // move
    if (!this.dead) {
		
        if (params.brainPower) {
            var topLeftX = (this.x - 1 + this.game.board.dimension) % this.game.board.dimension;
            var topX = (this.x + this.game.board.dimension) % this.game.board.dimension;
            var topRightX = (this.x + 1 + this.game.board.dimension) % this.game.board.dimension;
            var leftX = (this.x - 1 + this.game.board.dimension) % this.game.board.dimension;
            var rightX = (this.x + 1 + this.game.board.dimension) % this.game.board.dimension;
            var botLeftX = (this.x - 1 + this.game.board.dimension) % this.game.board.dimension;
            var botX = (this.x + this.game.board.dimension) % this.game.board.dimension;
            var botRightX = (this.x + 1 + this.game.board.dimension) % this.game.board.dimension;

            var topLeftY = (this.y + 1 + this.game.board.dimension) % this.game.board.dimension;
            var topY = (this.y + 1 + this.game.board.dimension) % this.game.board.dimension;
            var topRightY = (this.y + 1 + this.game.board.dimension) % this.game.board.dimension;
            var leftY = (this.y + this.game.board.dimension) % this.game.board.dimension;
            var rightY = (this.y + this.game.board.dimension) % this.game.board.dimension;
            var botLeftY = (this.y - 1 + this.game.board.dimension) % this.game.board.dimension;
            var botY = (this.y - 1 + this.game.board.dimension) % this.game.board.dimension;
            var botRightY = (this.y - 1 + this.game.board.dimension) % this.game.board.dimension;

            var topLeftCell = this.game.board.board[topLeftX][topLeftY];
            var topCell = this.game.board.board[topX][topY];
            var topRightCell = this.game.board.board[topRightX][topRightY];
            var leftCell = this.game.board.board[leftX][leftY];
            var rightCell = this.game.board.board[rightX][rightY];
            var botLeftCell = this.game.board.board[botLeftX][botLeftY];
            var botCell = this.game.board.board[botX][botY];
            var botRightCell = this.game.board.board[botRightX][botRightY];
            var neighs = [topLeftCell, topCell, topRightCell, leftCell, rightCell, botLeftCell, botCell, botRightCell];
            var probs = [];
            for (var i = 0; i < neighs.length; i++) {
                var cellInQuestion = neighs[i];
                if (cellInQuestion.color === "Red") {
                    probs.push((1 - this.genome) * 150);
                }
                else if (cellInQuestion.color === "Green") {
                    probs.push(this.genome * 150);
                }
                if (cellInQuestion.color === "Black") {
                    probs.push(10);
                }
                else if (cellInQuestion.color === "White") {
                    probs.push(180);
                }
				else {
					var attrDist = distance(Math.floor(360 * this.genomeAttract), Math.floor(360 * cellInQuestion.genome)); // attract distance 0-180
					var avoidDist = distance(Math.floor(360 * this.genomeAvoid), Math.floor(360 * cellInQuestion.genome));  // avoid distance 0-180
					var attrValue = 0;
					var avoidValue = 0;
					if((Math.random() * params.attrAvoidRange) > attrDist) {
						attrValue = (1 - attrDist); //put attract score 0-180
					}
					if((Math.random() * params.attrAvoidRange) > avoidDist){
						avoidValue = (1 - avoidDist); //put avoid score 0-180
					}
					var totalValue = attrValue - avoidValue;
					if(attrValue == 0 && avoidValue == 0){ //if you miss the attract and avoid genomes you get a base score of 10
						totalValue = 10;
					}
					if(totalValue < 0){
						totalValue = 0;
					}
					
					probs.push(totalValue);
				}
            }
            var sum = probs.reduce((a, b) => a + b);
            for (var i = 0; i < probs.length; i++) {
                probs[i] = probs[i] / sum;
            }
            for (var i = 1; i < probs.length; i++) {
                probs[i] = probs[i] + probs[i - 1];
            }
            var test = Math.random();
            if (test < probs[0]) {
                this.x = topLeftX;
                this.y = topLeftY;
            }
            else if (test < probs[1]) {
                this.x = topX;
                this.y = topY;
            }
            else if (test < probs[2]) {
                this.x = topRightX;
                this.y = topRightY;
            }
            else if (test < probs[3]) {
                this.x = leftX;
                this.y = leftY;
            }
            else if (test < probs[4]) {
                this.x = rightX;
                this.y = rightY;
            }
            else if (test < probs[5]) {
                this.x = botLeftX;
                this.y = botLeftY;
            }
            else if (test < probs[6]) {
                this.x = botX;
                this.y = botY;
            }
            else {
                this.x = botRightX;
                this.y = botRightY;
            }
        }
        else {
            var newX = (this.x + randomInt(3) - 1 + this.game.board.dimension) % this.game.board.dimension;
            var newY = (this.y + randomInt(3) - 1 + this.game.board.dimension) % this.game.board.dimension;
            var newCell = this.game.board.board[newX][newY];
            this.x = newX;
            this.y = newY;
        }
	   
    }
}