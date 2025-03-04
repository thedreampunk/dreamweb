console.log('Hello, day 4!')

// 46798848 too high

jQuery.get('https://thedreampunk.com/advent/input/advent-day-4-input.txt', function(data) {

	// on récupère les données et on les stocke dans un tableau, par ligne
	let inputArray = data.split("\n")
	let sum = 0
	
	for (let i=0; i<inputArray.length-1; i++){
		let cardTab = inputArray[i].split("|")
		let winningNumbers = cardTab[0].split(" ")
		// console.log(winningNumbers)
		let myNumbers = cardTab[1].split(" ")
		let points = 0
		// 1er élement de tab : tableau des nombres gagnants
		// 2ème élément de tab : tableau des nombres qu'on a
		for (let i = 0; i<winningNumbers.length; i++){
			if ((winningNumbers[i] != "") && (myNumbers.includes(winningNumbers[i]))){
				// console.log("elem : " + winningNumbers[i])
				if (points == 0)
					points = 1
				else
					points = points * 2
			}
		}
		// console.log("pts : " + points)
		sum += points
	}
	console.log("sum = " + sum)
	
}, 'text');