function Histogram(game, x, y, label) {
    this.xSize = 360;
    this.ySize = 180;
    this.x = x;
    this.y = y;
    this.label = label;
    this.data = [];
    this.ctx = game.ctx;
    this.maxVal = 0;
};

Histogram.prototype.update = function () {

};

Histogram.prototype.draw = function (ctx) {
    var length = this.data.length > (this.xSize / 3) ?
				 Math.floor(this.xSize / 3) : this.data.length;
    var start = this.data.length > (this.xSize / 3) ?
				this.data.length - (this.xSize / 3) : 0;
    for (var i = 0; i < length; i++) {
        var maxVal = this.data[i + start].reduce(function (acc, x) {
            return acc + x;
        }, 0);
        for (var j = 0; j < this.data[i + start].length; j++) {
            var val = Math.ceil(this.data[i + start][j] / maxVal * 20);
            this.fill(val, i, 19 - j);
        }
    }
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.label, this.x + this.xSize / 2, this.y + this.ySize + 10);

    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(this.x, this.y, this.xSize, this.ySize);
};

Histogram.prototype.fill = function (color, x, y) {
    switch (color) {
        case 0:
            this.ctx.fillStyle = "#FFFFFF";
            break;
        case 1:
            this.ctx.fillStyle = "#F0F0F0";
            break;
        case 2:
            this.ctx.fillStyle = "#E4E4E4";
            break;
        case 3:
            this.ctx.fillStyle = "#D8D8D8";
            break;
        case 4:
            this.ctx.fillStyle = "#CCCCCC";
            break;
        case 5:
            this.ctx.fillStyle = "#C0C0C0";
            break;
        case 6:
            this.ctx.fillStyle = "#B4B4B4";
            break;
        case 7:
            this.ctx.fillStyle = "#A8A8A8";
            break;
        case 8:
            this.ctx.fillStyle = "#9C9C9C";
            break;
        case 9:
            this.ctx.fillStyle = "#909090";
            break;
        case 10:
            this.ctx.fillStyle = "#848484";
            break;
        case 11:
            this.ctx.fillStyle = "#787878";
            break;
        case 12:
            this.ctx.fillStyle = "#6C6C6C";
            break;
        case 13:
            this.ctx.fillStyle = "#606060";
            break;
        case 14:
            this.ctx.fillStyle = "#545454";
            break;
        case 15:
            this.ctx.fillStyle = "#484848";
            break;
        case 16:
            this.ctx.fillStyle = "#3C3C3C";
            break;
        case 17:
            this.ctx.fillStyle = "#303030";
            break;
        case 18:
            this.ctx.fillStyle = "#242424";
            break;
        case 19:
            this.ctx.fillStyle = "#181818";
            break;
        case 20:
            this.ctx.fillStyle = "#0C0C0C";
            break;
    }
    var width = Math.floor(this.xSize / 120);
    var height = Math.floor(this.ySize / 20);
    this.ctx.fillRect(this.x + (x * width),
		              this.y + (y * height),
				      width,
					  height);
}