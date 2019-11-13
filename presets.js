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