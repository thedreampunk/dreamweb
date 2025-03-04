console.log('Hello, day 1!')

// 53581 too low
// 53859 too high

jQuery.get('https://thedreampunk.com/advent/input/advent-day-1-input.txt', function(data) {
	let inputArray = new Array(data.length);
	inputArray = data.split("\n")
	let sumCalib = 0
	for (let i=0; i<inputArray.length; i++){
		// console.log("str = " + inputArray[i])
		calibValue = artStringToCalibrationValue(inputArray[i])
		// console.log("calibValue = " + calibValue)
		sumCalib += calibValue
	}
	console.log(sumCalib)
	// console.log(artStringToCalibrationValue("tsmtwone961eightoneightwone")) //52
}, 'text');

// Create function that takes a string and returns number made of first digit found and last digit found.
function artStringToCalibrationValue(artString){
	var firstDigit = -1
	var lastDigit = -1
	var tabNumbers = ["one","two","three","four","five","six","seven","eight","nine"]
	
	// Premiere passe pour changer les chiffres en lettres de la string, les remplacer par les chiffres
	// on note les index 1ere passe : indexOf(searchString)
	// on résoud dans l'ordre. A chaque fois, on tente de remplacer
	var ilEnReste;
	// console.log("coucou")
	// faire au moins une passe
	
	// boucle sur :
	// faire dico index et le trier
	// remplacer le 1er elem du dico index par sa valeur
	// tant que dico index est plein
	var debug = false
	
	var yaDuCaca = false
	
	do {
		yaDuCaca = false
		if (artString.includes("oneight")){
			// console.log("oneight")
			yaDuCaca = true;
			debug = true
			artString = artString.replace("oneight","18") }
		if (artString.includes("twone")){
			// console.log("twone")
			yaDuCaca = true;
			debug = true
			artString = artString.replace("twone","21")}
		if (artString.includes("eightwo")){
			// console.log("eightwo")
			yaDuCaca = true;
			debug = true
			artString = artString.replace("eightwo","82")}
	} while (yaDuCaca)
	
	do {
		ilEnReste = false
		let dicoIndex = {}
		for (let i=0; i<tabNumbers.length; i++) {
			let strNumber = tabNumbers[i]
			if (artString.includes(strNumber)){
				ilEnReste = true
				let index = artString.indexOf(strNumber)
				// if (debug) console.log("index = " + index + " - strNumber = " + strNumber)
				dicoIndex[index] = strNumber;
				// if (debug) console.log(strNumber + " trouvé !")
				// if (debug) console.log("str modified = " + artString)
				// possibilité d'avoir plusieurs occurences, on refait une passe sur le chiffre en question :
				// i--
			}
		}
		if (ilEnReste){
			var keys = Object.keys(dicoIndex);
			keys.sort();
			// for (var i=0; i<keys.length; i++) { // now lets iterate in sort order
				var key = keys[0];
				var value = dicoIndex[key];
				// if (debug) console.log("key : " + key + " - value : " + value)
				artString = artString.replace(value, dicoNumbers[value])
			// }
		}
	} while (ilEnReste)
	
	// console.log("str modified = " + artString)
	
	for (let i=0; i<artString.length; i++) {
		let c = artString[i]
		// si c'est un nombre
		if (c.match(/\d/g))
			// firstDigit n'a pas encore été instancié
			if (firstDigit == -1){
				firstDigit = c
				lastDigit = c
			// Dans tous les cas, lastDigit est instancié
			// on a comme ça le cas où un seul nombre est présent dans la string
			} else {
				lastDigit = c
			}
	}
	if (firstDigit != -1){
		var calib = parseInt(firstDigit+lastDigit)
		if (debug) console.log("CALIB : " + calib)
		return calib
	} else
		return 0
}

var dicoNumbers = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9"
}

var weirdosTab = ["oneight","twone","eightwo"]