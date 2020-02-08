function Graph(game, x, y, automata, label) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.automata = automata;
    this.label = label;

    this.xSize = 360;
    this.ySize = 175;
    this.ctx = game.ctx;
	this.standardDeviation = [];
	this.totalPop = [];
    this.maxVal = Math.max(...this.standardDeviation,
						   ...this.totalPop);
}

Graph.prototype.update = function () {
	this.whiteData = this.automata.standardDeviation;
    this.totalData = this.automata.totalPopCell;
    this.updateMax();
}

Graph.prototype.draw = function (ctx) {
    if (this.totalData.length > 1) {
        // reds
        /*this.ctx.strokeStyle = "#FF0000";
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        var xPos = this.x;
        var yPos = this.redData.length > this.xSize ? this.y + this.ySize - Math.floor(this.redData[this.redData.length - this.xSize] / this.maxVal * this.ySize)
										: this.y + this.ySize - Math.floor(this.redData[0] / this.maxVal * this.ySize);
        this.ctx.moveTo(xPos, yPos);
        var length = this.redData.length > this.xSize ?
            this.xSize : this.redData.length;
        for (var i = 1; i < length; i++) {
            var index = this.redData.length > this.xSize ?
						this.redData.length - this.xSize - 1 + i : i;
            xPos++;
            yPos = this.y + this.ySize - Math.floor(this.redData[index] / this.maxVal * this.ySize);
            if (yPos <= 0) {
                yPos = 0;
            }

            this.ctx.lineTo(xPos, yPos);
        }
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle = "#000000";
        this.ctx.fillSytle = "#000000";
        this.ctx.fillText(this.redData[this.redData.length - 1], this.x + this.xSize + 5, yPos + 10);

        // greens
        this.ctx.strokeStyle = "#008000";
        this.ctx.beginPath();
        var xPos = this.x;
        var yPos = this.greenData.length > this.xSize ? this.y + this.ySize - Math.floor(this.greenData[this.greenData.length - this.xSize] / this.maxVal * this.ySize)
										: this.y + this.ySize - Math.floor(this.greenData[0] / this.maxVal * this.ySize);
        this.ctx.moveTo(xPos, yPos);
        var length = this.greenData.length > this.xSize ?
            this.xSize : this.greenData.length;
        for (var i = 1; i < length; i++) {
            var index = this.greenData.length > this.xSize ?
						this.greenData.length - this.xSize - 1 + i : i;
            xPos++;
            yPos = this.y + this.ySize - Math.floor(this.greenData[index] / this.maxVal * this.ySize);
            if (yPos <= 0) {
                yPos = 0;
            }

            this.ctx.lineTo(xPos, yPos);
        }
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle = "#000000";
        this.ctx.fillSytle = "#000000";
        this.ctx.fillText(this.greenData[this.greenData.length - 1], this.x + this.xSize + 5, yPos + 10); */

		//Standard Deviation
		this.ctx.strokeStyle = "#CCCCCC";
        this.ctx.beginPath();
        var xPos = this.x;
        var yPos = this.whiteData.length > this.xSize ? this.y + this.ySize - Math.floor(this.whiteData[this.whiteData.length - this.xSize] / this.maxVal * this.ySize)
										: this.y + this.ySize - Math.floor(this.whiteData[0] / this.maxVal * this.ySize);
        this.ctx.moveTo(xPos, yPos);
        var length = this.whiteData.length > this.xSize ?
            this.xSize : this.whiteData.length;
        for (var i = 1; i < length; i++) {
            var index = this.whiteData.length > this.xSize ?
						this.whiteData.length - this.xSize - 1 + i : i;
            xPos++;
            yPos = this.y + this.ySize - Math.floor(this.whiteData[index] / this.maxVal * this.ySize);
            if (yPos <= 0) {
                yPos = 0;
            }

            this.ctx.lineTo(xPos, yPos);
        }
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle = "#000000";
        this.ctx.fillSytle = "#000000";
        this.ctx.fillText(this.whiteData[this.whiteData.length - 1], this.x + this.xSize + 5, yPos + 10);
		
		//Total
		this.ctx.strokeStyle = "#000000";
		this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        var xPos = this.x;
        var yPos = this.totalData.length > this.xSize ? this.y + this.ySize - Math.floor(this.totalData[this.totalData.length - this.xSize] / this.maxVal * this.ySize)
										: this.y + this.ySize - Math.floor(this.totalData[0] / this.maxVal * this.ySize);
        this.ctx.moveTo(xPos, yPos);
        var length = this.totalData.length > this.xSize ?
            this.xSize : this.totalData.length;
        for (var i = 1; i < length; i++) {
            var index = this.totalData.length > this.xSize ?
						this.totalData.length - this.xSize - 1 + i : i;
            xPos++;
            yPos = this.y + this.ySize - Math.floor(this.totalData[index] / this.maxVal * this.ySize);
            if (yPos <= 0) {
                yPos = 0;
            }

            this.ctx.lineTo(xPos, yPos);
        }
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle = "#000000";
        this.ctx.fillSytle = "#000000";
        this.ctx.fillText(this.totalData[this.totalData.length - 1], this.x + this.xSize + 5, yPos + 10);
		
		
        //var firstTick = 0;
        //firstTick = this.greenData.length > this.xSize ? this.greenData.length - this.xSize : 0;
        //this.ctx.fillText(firstTick * params.reportingPeriod, this.x, this.y + this.ySize + 10);
        //this.ctx.textAlign = "right";
        //this.ctx.fillText(this.automata.day - 1, this.x + this.xSize - 5, this.y + this.ySize + 10);
    }
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(this.x, this.y, this.xSize, this.ySize);
	
	this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.label, this.x + this.xSize / 2, this.y + this.ySize + 10);
}

Graph.prototype.updateMax = function () {
    var tick = this.totalData.length;
    if (tick > this.xSize) {
       // var recentRed = this.redData.slice(tick - this.xSize);
        //var recentGreen = this.greenData.slice(tick - this.xSize);
		var recentWhite = this.whiteData.slice(tick - this.xSize);
        var recentTotal = this.totalData.slice(tick - this.xSize);

        this.maxVal = Math.max(//...recentRed,
		                       //...recentGreen,
							   ...recentWhite,
							   ...recentTotal);
    } else {
        this.maxVal = Math.max(//...this.redData,
							   //...this.greenData,
							   ...this.whiteData,
							   ...this.totalData);
    }
}