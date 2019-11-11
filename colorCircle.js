function colorCircle(game, x, y, label) {
    this.xSize = 360;
    this.ySize = 180;
    this.x = x;
    this.y = y;
    this.label = label;
    this.data = [];
    this.ctx = game.ctx;
    this.maxVal = 0;
};

colorCircle.prototype.update = function () {
	this.updateMax();
};

colorCircle.prototype.draw = function (ctx) {
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, 200, 0, 2 * Math.PI);
	this.ctx.stroke();
	this.ctx.closePath();
	
	for(var i = 0; i < 360; i++) {
		if(this.data[i] > 0){
			this.ctx.beginPath();
			this.ctx.moveTo(this.x, this.y);
			this.ctx.lineTo(this.x + (getX(i, this.data[i] * 200 / this.maxVal) ), this.y + (getY(i, this.data[i]* 200 / this.maxVal) ));
			this.ctx.strokeStyle = hsl(i, 100, 50);
			this.ctx.stroke();
			this.ctx.closePath();
			this.ctx.font = "lighter 12px Courier New";
			this.ctx.fillText(this.maxVal, this.x, this.y + 195);
		}
			
	}
};

colorCircle.prototype.updateMax = function () {
    this.maxVal = Math.max(...this.data);
}