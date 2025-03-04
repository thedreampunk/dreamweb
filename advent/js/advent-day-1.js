console.log('Hello, day 1!')

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
}, 'text');

// Create function that takes a string and returns number made of first digit found and last digit found.
function artStringToCalibrationValue(artString){
	var firstDigit = -1
	var lastDigit = -1
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
	if (firstDigit != -1)
		return parseInt(firstDigit+lastDigit)
	else
		return 0
}

// Make array of numbers

// Sum values in array
