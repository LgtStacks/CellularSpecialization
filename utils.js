function download(filename, data) {
    var pom = document.createElement('a');
    var blob = new Blob([data], {type:"octet/stream"});
    var url = window.URL.createObjectURL(blob);
    pom.setAttribute('href', url);
    pom.setAttribute('download', filename);
    pom.click();
}

function graph(ctx, arr, max, count, x, y, width, height, style, text) {
    if(text && arr.length > 0) {
        ctx.fillStyle = "Black";
        var current = parseFloat(arr[arr.length - 1].toFixed(3));
        ctx.fillText(text + ": " + current + " Max: " + parseFloat(max.toFixed(3)), x, y + 10);
    }

    ctx.strokeStyle = style;
    var px = 0;
    var step = width / count;
    var range = max/height;
    var startY = y + height;

    var i = Math.max(0, arr.length - count); //display the last (max) events
    ctx.moveTo(x, startY - arr[i]/height);
    ctx.beginPath();
    while(i < arr.length) {
        ctx.lineTo(x + px++ * step, startY - arr[i]/range);
        i++;
    }
    ctx.stroke();
}

function distance(first, second) {
	var val = Math.abs(first - second);
	if(val > 180) {
		return (360 - val);
	}
	else {
		return val;
	}
}
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

function getSettings() {
	params.DLDB = parseInt(document.getElementById("waitDLDB").value);
    params.brainPower = document.getElementById("brainPower").checked;
	params.healingToggle = document.getElementById("healingToggle").checked;
    params.waitTurns = parseInt(document.getElementById("waitTurns").value);
	params.maxHits = parseInt(document.getElementById("maxHits").value);
	params.spawningPopulation = parseInt(document.getElementById("spawningPopulation").value);
	params.deathChanceAgent = parseFloat(document.getElementById("deathChanceAgent").value);
	params.cellGrowthRate = parseFloat(document.getElementById("cellGrowthRate").value);
	params.cellDecayRate = parseFloat(document.getElementById("cellDecayRate").value);
	params.reproductionChance = parseFloat(document.getElementById("reproductionChance").value);
	params.offspringVolatility = parseFloat(document.getElementById("offspringVolatility").value);
	params.cellSpawn = parseFloat(document.getElementById("cellSpawn").value);
	params.cellOffspringVolatility = parseFloat(document.getElementById("cellOffspringVolatility").value);
	params.healPoisonRange = parseInt(document.getElementById("healPoisonRange").value);
	params.attrAvoidRange = parseInt(document.getElementById("attrAvoidRange").value);
}
function randomInt(n) {
    return Math.floor(Math.random() * n);
}

function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

function standardDev(values){
  var avg = average(values);
  //console.log(avg);
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);
  var avg = sum / data.length;
  return avg;
}

function getRads(angle){
	return angle * Math.PI/180
};
function getX(angle, distance) {
	return distance * Math.cos(getRads(angle));
};
function getY(angle, distance) {
	return distance * Math.sin(getRads(angle));
};