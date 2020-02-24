var socket = io.connect("http://24.16.255.56:8888");
var context;
var ticks = 199;
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
    socket.emit("loadCA", { run: "test"});

    document.getElementById("queryButton").addEventListener("click", function (e) {
        var query = parseInt(document.getElementById("runToQuery").value);
        socket.emit("loadCA", { run: query});
    }, false);
});

socket.on("loadCA", function (e) {
    var array = e;
    parseData(array);
});

function parseData(data) {
    var arrHumans = [];
    var arrSeed = [];
    var totalSeeds = [];

    for (var i = 0; i < ticks; i++) {
        arrHumans.push(0);
        arrSeed.push(0);
        totalSeeds.push(0);
    }

    var maxHuman = 0;
    var maxSeed = 0;
    var runs = Math.min(maxRuns, data.length);
    for (var i = 0; i < runs; i++) {
        for (var j = 0; j < data[i].humanPop.length; j++) {
            arrHumans[j] += data[i].humanPop[j] / data.length;
            totalSeeds[j] += data[i].seedPop[j];
            arrSeed[j] += data[i].seedPop[j] / data.length;
        }
    }

    for (var i = 0; i < arrHumans.length; i++) {
        if (arrHumans[i] > maxHuman) {
            maxHuman = arrHumans[i];
        }
        if (arrSeed[i] > maxSeed) {
            maxSeed = arrSeed[i];
        }
    }

    var histogramRoots = [];
    var histogramWeight = [];
    var histogramSeeds = [];
    var histogramEnergy = [];
    var histogramDisp = [];

    for (var i = 0; i < ticks; i++) {
        histogramRoots.push([]);
        histogramWeight.push([]);
        histogramSeeds.push([]);
        histogramEnergy.push([]);
        histogramDisp.push([]);
        for (var j = 0; j < 20; j++) {
            histogramRoots[i].push(0);
            histogramWeight[i].push(0);
            histogramSeeds[i].push(0);
            histogramEnergy[i].push(0);
            histogramDisp[i].push(0);
        }
    }

    for (var j = 0; j < ticks; j++) {
        for (var k = 0; k < 20; k++) {
            for (var i = 0; i < runs; i++) {
                histogramRoots[j][k] += data[i].rootData[j][k] / totalSeeds[j];
                histogramWeight[j][k] += data[i].weightData[j][k] / totalSeeds[j];
                histogramSeeds[j][k] += data[i].seedData[j][k] / totalSeeds[j];
                histogramEnergy[j][k] += data[i].energyData[j][k] / totalSeeds[j];
                histogramDisp[j][k] += data[i].dispersalData[j][k] / totalSeeds[j];
            }
        }
    }
    var obj = {
        runs: data.length,
        query: data[0].params.seedStrategy,
        humans: arrHumans,
        seeds: arrSeed,
        maxHuman: maxHuman,
        maxSeed: maxSeed,
        histogramRoots: histogramRoots,
        histogramWeight: histogramWeight,
        histogramSeeds: histogramSeeds,
        histogramEnergy: histogramEnergy,
        histogramDisp: histogramDisp,
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
    ctx.clearRect(0, 0, 1400, 800);
    ctx.textAlign = "start";
    var maxHuman = obj.maxHuman * 1.05;
    var maxSeed = obj.maxSeed * 1.05;

    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, 0, width, height);
    ctx.fillRect(0, 120, width, height);
    ctx.fillRect(0, 240, width, height);
    ctx.fillRect(0, 360, width, height);
    ctx.fillRect(0, 480, width, height);
    ctx.fillRect(0, 600, width, height);

    drawGraph(ctx, "Black", 0, obj.humans, maxHuman, false);
    drawGraph(ctx, "Green", 0, obj.seeds, maxSeed, true);
    drawHistogram(ctx, 120, obj.histogramRoots, "Deep Roots");
    drawHistogram(ctx, 240, obj.histogramWeight, "Seed Weight");
    drawHistogram(ctx, 360, obj.histogramSeeds, "Fecundity");
    drawHistogram(ctx, 480, obj.histogramEnergy, "Fruit Energy");
    drawHistogram(ctx, 600, obj.histogramDisp, "Dispersal");
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