console.log('Hello, day 2!')

jQuery.get('https://thedreampunk.com/advent/input/advent-day-2-input.txt', function(data) {
	let inputArray = new Array(data.length);
	inputArray = data.split("\n")
	let sumPawaz = 0
	for (let i=0; i<inputArray.length; i++){
		if (inputArray[i] != null){
			console.log("str = " + inputArray[i])
			sumPawaz += gameSetPawa(inputArray[i])
		}
	}
	console.log("sumPawaz = " + sumPawaz)
}, 'text');

// Find the power of the set of cubes for each game played
// For each game : what are the maxes  for each color ?
// Sum Up !

function gameSetPawa(gameArray){
	let setArray = gameArray.split(";")
	//const regExpGameId = /Game [1-9][0-9]?[0-9]?/.exec(setArray[0]);
	//const gameId = parseInt(regExpGameId[0].split(" ")[1]);
	let redCubeNb = 0;
	let greenCubeNb = 0;
	let blueCubeNb = 0;
	for (let i=0; i<setArray.length; i++){
		let set = setArray[i]
		//console.log("set = " + set)
		// on cherche les valeurs trop élevées dans le set : 13+ red, 14+ green, 15+ blue
		const regExpRed = /[1-9] red|[1-9][0-9] red/.exec(set);
		const regExpGreen = /[1-9] green|[1-9][0-9] green/.exec(set);
		const regExpBlue = /[1-9] blue|[1-9][0-9] blue/.exec(set);
		if (regExpRed != null){
			let redSetNb = parseInt(regExpRed[0].split(" ")[0]);
			if (redSetNb > redCubeNb) 
			redCubeNb = redSetNb
		}
		if (regExpGreen != null){		
		let greenSetNb = parseInt(regExpGreen[0].split(" ")[0]);
		if (greenSetNb > greenCubeNb) 
			greenCubeNb = greenSetNb
		}		
		if (regExpBlue != null){
		let blueSetNb = parseInt(regExpBlue[0].split(" ")[0]);
		if (blueSetNb > blueCubeNb) 
			blueCubeNb = blueSetNb
		}
	}
	return redCubeNb*greenCubeNb*blueCubeNb
}