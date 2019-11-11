function getRads(angle){
	return angle * (Math.PI/180)
};
function getX(angle, distance) {
	return distance * Math.cos(getRads(angle));
};
function getY(angle, distance) {
	return distance * Math.sin(getRads(angle));
};
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

};

colorCircle.prototype.draw = function (ctx) {
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
	this.ctx.stroke();
	console.log("x:" + getX(22.6, 12));
	console.log("y:" + getY(22.6, 12));
};