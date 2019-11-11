

function Automata(game) {
	this.firstDeath = true;
	this.updateCounter = 0;
    this.game = game;
    this.x = 0;
    this.y = 0;

    this.dimension = 100;
    this.populationSize = params.spawningPopulation;
    this.agents = [];


	 // data gathering
    this.weightData = [];
	this.poisonData = [];
	this.attractData = [];
	this.avoidData = [];
	this.cellData = [];
    //this.redPop = [];
    //this.greenPop = [];
	this.whitePop = [];
    this.totalPop = [];
	this.standardDeviation = [];

    // graphs
	this.colorCirc = new colorCircle(game, 1390, 590, "Poison Genome Dist.");
	this.game.addEntity(this.colorCirc);
    this.popGraph = new Graph(game, 1210, 200, this, "Population");
    this.game.addEntity(this.popGraph);
    this.weightHist = new Histogram(game, 810, 0, "Food Genome Dist.")
    this.game.addEntity(this.weightHist);
	
	this.poisonHist = new Histogram(game, 810, 200, "Poison Genome Dist.")
    this.game.addEntity(this.poisonHist);
	
	this.attractHist = new Histogram(game, 810, 400, "Attract Food Difference Dist.")
    this.game.addEntity(this.attractHist);
	
	this.avoidHist = new Histogram(game, 810, 600, "Avoid Poison Difference Dist.")
    this.game.addEntity(this.avoidHist);
	
	this.cellHist = new Histogram(game, 1210, 0, "Cell Dist.")
	this.game.addEntity(this.cellHist);
	
    // create board
    this.board = [];
    for (var i = 0; i < this.dimension; i++) {
        this.board.push([]);
        for (var j = 0; j < this.dimension; j++) {
            this.board[i].push(new Cell(game,i,j));
        }
    }

    // add agents
    while (this.agents.length < this.populationSize) {
        var x = randomInt(100);
        var y = randomInt(100);

        var agent = new Agent(game, x, y);
        this.agents.push(agent);
    }

};
Automata.prototype.updateData = function () {
	var cellGenomes = [];
    var weightData = [];
	var poisonData = [];
	var attractData = [];
	var avoidData = [];
	var cellData = [];
    var redPop = 0;
    var greenPop = 0;
	var whitePop = 0;
	var totalPop = 0;
	
	//console.log(standardDeviation);
	
    for (var i = 0; i < 20; i++) {
        weightData.push(0);
		poisonData.push(0);
		attractData.push(0);
		avoidData.push(0);
		cellData.push(0);
    }
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            var cell = this.board[i][j];
			cellGenomes.push(cell.genome);
			if (cell.color !== "Black") {
				totalPop+=1;
			}
            
        }
    }
	var standardDeviation = standardDev(cellGenomes) * 10000;
    for (var k = 0; k < this.agents.length; k++) {
        var weightIndex = Math.floor(this.agents[k].genomeFood * 20) < 20 ? Math.floor(this.agents[k].genomeFood * 20) : 19;
        weightData[weightIndex]++;
		
		var poisonIndex = Math.floor(this.agents[k].genomePoison * 20) < 20 ? Math.floor(this.agents[k].genomePoison * 20) : 19;
        poisonData[poisonIndex]++;
		
		var attractIndex = Math.abs(Math.floor(this.agents[k].genomeAttract * 20) - Math.floor(this.agents[k].genomeFood * 20)) < 20 ? Math.abs(Math.floor(this.agents[k].genomeAttract * 20) - Math.floor(this.agents[k].genomeFood * 20)) : 19;
        attractData[attractIndex]++;
		
		var avoidIndex = Math.abs(Math.floor(this.agents[k].genomeAvoid * 20) - Math.floor(this.agents[k].genomePoison * 20)) < 20 ? Math.abs(Math.floor(this.agents[k].genomeAvoid * 20) - Math.floor(this.agents[k].genomePoison * 20)) : 19;
        avoidData[avoidIndex]++;
		
		
    }
	for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            var cell = this.board[i][j];
			var cellIndex = Math.floor(cell.genome * 20) < 20 ? Math.floor(cell.genome * 20) : 19;
            cellData[cellIndex]++;
            
        }
    }

    this.weightData.push(weightData);
    this.weightHist.data = this.weightData;
	
	this.poisonData.push(poisonData);
    this.poisonHist.data = this.poisonData;
	
	this.attractData.push(attractData);
    this.attractHist.data = this.attractData;
	
	this.avoidData.push(avoidData);
    this.avoidHist.data = this.avoidData;
	
	this.cellData.push(cellData);
	this.cellHist.data = this.cellData;
    //this.redPop.push(redPop);
    //this.greenPop.push(greenPop);
	//this.whitePop.push(whitePop);
    this.totalPop.push(totalPop);
	this.standardDeviation.push(standardDeviation);
}

Automata.prototype.update = function () {
	this.updateCounter++;
	document.getElementById("counter").innerHTML = this.updateCounter;
	if(this.updateCounter >= params.waitTurns){
		if(this.agents.length == 0 && this.firstDeath){
			document.getElementById("survive").value= this.updateCounter;
			this.firstDeath = false;
		}
		for (var i = 0; i < this.agents.length; i++) {
			this.agents[i].update();
		}

		for (var i = this.agents.length - 1; i >= 0; i--) {
			if (this.agents[i].dead) {
				this.agents.splice(i, 1);
			}
		}
		
	}
    

    //while (this.agents.length < this.populationSize) {
    //    var parent = this.agents[randomInt(this.agents.length)];
    //    var agent = new Agent(this.game, parent.x, parent.y, parent);
    //    this.agents.push(agent);
    //}

    for (var i = 0; i < this.dimension; i++) {
        for (var j = 0; j < this.dimension; j++) {
            this.board[i][j].update();
        }
    }
	this.updateData();
};

Automata.prototype.draw = function (ctx) {
    var size = 8;
    for (var i = 0; i < this.dimension; i++) {
        for (var j = 0; j < this.dimension; j++) {
            var cell = this.board[i][j];
            
            ctx.fillStyle = cell.color;
            ctx.fillRect(i * size, j * size, size, size);
        }
    }

    for (var i = 0; i < this.agents.length; i++) {
        ctx.fillStyle = this.agents[i].color;
        ctx.beginPath();
        ctx.arc((this.agents[i].x * size) + (size / 2), (this.agents[i].y * size) + (size / 2), (size / 2), 0, 2 * Math.PI, false);
        ctx.fill();
    }
};