console.log('Hello, day 2!')

jQuery.get('https://thedreampunk.com/advent/input/advent-day-2-input.txt', function(data) {
	const RED_LIMIT = 12
	const GREEN_LIMIT = 13
	const BLUE_LIMIT = 14
	let inputArray = new Array(data.length);
	inputArray = data.split("\n")
	let sumIds = 0
	for (let i=0; i<inputArray.length-1; i++){
		if (inputArray[i] != null){
			console.log("str = " + inputArray[i])
			sumIds += isValidGame(inputArray[i])
		}
	}
	console.log("sumIds = " + sumIds)
}, 'text');

function isValidGame(gameArray){
	let setArray = gameArray.split(";")
	const regExpGameId = /Game [1-9][0-9]?[0-9]?/.exec(setArray[0]);
	const gameId = parseInt(regExpGameId[0].split(" ")[1]);
	for (let i=0; i<setArray.length; i++){
		let set = setArray[i]
		// on cherche les valeurs trop élevées dans le set : 13+ red, 14+ green, 15+ blue
		const regExpRed = /[1][3-9] red|[2-9][0-9] red/.exec(set);
		const regExpGreen = /[1][4-9] green|[2-9][0-9] green/.exec(set);
		const regExpBlue = /[1][5-9] blue|[2-9][0-9] blue/.exec(set);
		if ((regExpGreen != null) || (regExpRed != null) || (regExpBlue != null)){
			// not valid
			console.log(regExpGameId[0] + " not valid")
			return 0;
		}
	}
	return gameId
}