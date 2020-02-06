function preset_sparse() {
	document.getElementById("cellGrowthRate").value = 0.2;
	document.getElementById("cellDecayRate").value = 0.005;
}

function preset_dense() {
	document.getElementById("cellGrowthRate").value = 0.8;
	document.getElementById("cellDecayRate").value = 0.002;
}
function preset_stable() {
	document.getElementById("cellSpawn").value = 0.0005;
	document.getElementById("cellOffspringVolatility").value = 0.005;
}
function preset_volatile() {
	document.getElementById("cellSpawn").value = 0.01;
	document.getElementById("cellOffspringVolatility").value = 0.15;
}

function preset_cell_stable() {
	document.getElementById("cellOffspringVolatility").value = 0.005;
	console.log("cellStable");
}

function preset_cell_mid(){
	document.getElementById("cellOffspringVolatility").value = 0.0775;
	console.log("cellMid");
}

function preset_cell_volatile() {
	document.getElementById("cellOffspringVolatility").value = 0.15;
	console.log("cellVol");
}

function preset_agent_stable() {
	document.getElementById("offspringVolatility").value = 0.005;
	console.log("agentStable");
}

function preset_agent_mid(){
	document.getElementById("offspringVolatility").value = 0.0775;
	console.log("agentMid");
}

function preset_agent_volatile() {
	document.getElementById("offspringVolatility").value = 0.15;
	console.log("agentVol")
}
