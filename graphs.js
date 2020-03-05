var socket = io.connect("http://24.16.255.56:8888");
var context;
var ticks = 100;
var maxRuns = 100;
var height = 100;
var xDelta = 2;
var width = xDelta * ticks;

socket.on("connect", function () {
    console.log("connected on output");
});

document.addEventListener("DOMContentLoaded", function (event) {

    context = document.getElementById("chart").getContext("2d");
    context.fillStyle = "#eeeeee";
    context.fillRect(0, 0, width, height);
    context.fillRect(0, 120, width, height);
    socket.emit("loadCA", { run: "sameVol"});

    document.getElementById("queryButton").addEventListener("click", function (e) {
        var query = parseInt(document.getElementById("runToQuery").value);
        socket.emit("loadCA", {run: query});
    }, false);
});

socket.on("loadCA", function (e) {
    var array = e;
    parseData(array);
});

function parseData(data) {
	for(var i = 0; i< data.length; i++){
		console.log(data[i].deviationCell);
	}
	var arrAgents = [];
	var arrDevAgents = [];
	var arrCells = [];
	var arrDevCells = [];
	var totalAgents = [];
	var totalCells = [];
	var arrDiff = [];
    for (var i = 0; i < ticks; i++) {
		arrAgents.push(0);
		arrDevAgents.push(0);
		arrCells.push(0);
		arrDevCells.push(0);
		totalAgents.push(0);
		totalCells.push(0);
		arrDiff.push(0);
    }
	var maxAgent = 0;
	var maxCell = 0;
	var maxDevAgent = 0;
	var maxDevCell = 0;
	var maxDiff = 0;
    var runs = Math.min(maxRuns, data.length);
	
	for (var i = 0; i < runs; i++) {
        for (var j = 0; j < data[i].popAgents.length; j++) {
			arrDiff[j] += data[i].cellFoodDiff[j] / data.length;
            arrAgents[j] += data[i].popAgents[j] / data.length;
			arrDevAgents[j] += data[i].deviationAgent[j] / data.length;
			totalAgents[j] += data[i].popAgents[j]
			arrCells[j] += data[i].popCells[j] / data.length;
			arrDevCells[j] += data[i].deviationCell[j] / data.length;
            totalCells[j] += data[i].popCells[j];
        }
    }

    for (var i = 0; i < arrAgents.length; i++) {
		if (arrDiff[i] > maxDiff) {
			maxDiff = arrDiff[i];
		}
        if (arrAgents[i] > maxAgent) {
            maxAgent = arrAgents[i];
        }
        if (arrDevAgents[i] > maxDevAgent) {
            maxDevAgent = arrDevAgents[i];
        }
		if (arrCells[i] > maxCell) {
            maxCell = arrCells[i];
        }
        if (arrDevCells[i] > maxDevCell) {
            maxDevCell = arrDevCells[i];
        }
    }
	var histogramFood = [];
	var histogramPoison = [];
	var histogramAttract = [];
	var histogramAvoid = [];
	var	histogramCell = [];

    for (var i = 0; i < ticks; i++) {
		histogramFood.push([]);
		histogramPoison.push([]);
		histogramAttract.push([]);
		histogramAvoid.push([]);
		histogramCell.push([]);
        for (var j = 0; j < 20; j++) {
			histogramFood[i].push(0);
			histogramPoison[i].push(0);
			histogramAttract[i].push(0);
			histogramAvoid[i].push(0);
			histogramCell[i].push(0);
        }
    }

    for (var j = 0; j < ticks; j++) {
        for (var k = 0; k < 20; k++) {
            for (var i = 0; i < runs; i++) {
				histogramFood[j][k] += data[i].foodData[j][k] / totalAgents[j];
				histogramPoison[j][k] += data[i].poisonData[j][k] / totalAgents[j];
				histogramAttract[j][k] += data[i].attractData[j][k] / totalAgents[j];
				histogramAvoid[j][k] += data[i].avoidData[j][k] / totalAgents[j];
				histogramCell[j][k] += data[i].cellData[j][k] / totalCells[j];
            }
        }
    }
	var obj = {
		diff: arrDiff,
		agents: arrAgents,
		cells : arrCells,
		devAgents: arrDevAgents,
		devCells: arrDevAgents,
		maxDiff: maxDiff,
		maxAgent: maxAgent,
		maxCell: maxCell,
		maxDevAgent: maxDevAgent,
		maxDevCell: maxDevCell,
		histogramFood: histogramFood,
		histogramPoison: histogramPoison,
		histogramAttract: histogramAttract,
		histogramAvoid: histogramAvoid,
		histogramCell: histogramCell
	};
    drawData(obj, runs, context);
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

function formatRole(obj) {
    var str = "";
    for (var i = 0; i < ticks; i++) {
        str += obj.histogramRoots[i] + "\n";
    }

    return str;
}


function drawData(obj, runs, ctx) {
    ctx.font = "10px Arial";
    ctx.clearRect(0, 0, 1400, 1400);
    ctx.textAlign = "start";
	var maxAgent = obj.maxAgent * 1.05;
	var maxCell = obj.maxCell * 1.05;
	var maxDevAgent = obj.maxDevAgent * 1.05;
	var maxDevCell = obj.maxDevCell * 1.05;
	
    var maxHuman = obj.maxHuman * 1.05;
    var maxSeed = obj.maxSeed * 1.05;

    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, 0, width, height);
    ctx.fillRect(0, 120, width, height);
    ctx.fillRect(0, 240, width, height);
    ctx.fillRect(0, 360, width, height);
    ctx.fillRect(0, 480, width, height);
    ctx.fillRect(0, 600, width, height);
	ctx.fillRect(0, 720, width, height);
	ctx.fillRect(0, 840, width, height);

    drawGraph(ctx, "Black", 0, obj.agents, maxAgent, true);
    drawGraph(ctx, "Green", 0, obj.devAgents, maxDevAgent, false);
	
	drawGraph(ctx, "Black", 120, obj.cells, maxCell, true);
    drawGraph(ctx, "Green", 120, obj.devCells, maxCell, false);
	
	drawGraph(ctx, "Black", 240, obj.diff, obj.maxDiff, true);
	
    drawHistogram(ctx, 360, obj.histogramFood, "Food Genome");
    drawHistogram(ctx, 480, obj.histogramPoison, "Poison Genome");
    drawHistogram(ctx, 600, obj.histogramAttract, "Attract Genome");
    drawHistogram(ctx, 720, obj.histogramAvoid, "Avoid Genome");
    drawHistogram(ctx, 840, obj.histogramCell, "Cell Genome");
    ctx.font = "14px Arial";
    ctx.fillText("Query: " + obj.query + " Runs: " + runs, 15, 740);
}

function drawGraph(ctx, color, start, obj, maxVal, labeling) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    var initAnt = height + start - Math.floor(obj[0] / maxVal * height);
    ctx.moveTo(0, initAnt);
    for (var i = 0; i < ticks; i ++) {
        var yPos = height + start - Math.floor(obj[i] / maxVal * height);
        ctx.lineTo(i*xDelta, yPos);
    }
    ctx.stroke();
    ctx.closePath();

    if (labeling) {
        ctx.fillStyle = "#000000";
        ctx.fillText(Math.ceil(maxVal), width + 4, start + 10);
        ctx.fillText(10000, width / 2 - 15, start + height + 10);
        ctx.fillText(20000, width - 15, start + height + 10);
    }
}

function drawHistogram(ctx, start, obj, label) {
    for (var i = 0; i < ticks; i++) {
        for (var j = 0; j < 20; j++) {
            fill(ctx, obj[i][j], start, i, 19 - j);
        }
    }
    ctx.fillStyle = "Black";
    ctx.fillText(label, width / 2 - 30, start + height + 10);
}

function fill(ctx, color, start, x, y) {
    var base = 16;
    var c = color * (base - 1) + 1;
    c = 511 - Math.floor(Math.log(c) / Math.log(base) * 512);
    if (c > 255) {
        c = c - 256;
        ctx.fillStyle = rgb(c, c, 255);
    }
    else {
        //c = 255 - c;
        ctx.fillStyle = rgb(0, 0, c);
    }

    ctx.fillRect(x * xDelta,
		            start + (y * height / 20),
				    xDelta,
					height / 20);

}