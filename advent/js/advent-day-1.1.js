console.log('Hello, day 1!')

// Fonction qui change la valeur 'value' de notre coffre, passée aussi en paramètre,
// en fonction du sens 'direction' (L/R) et de la valeur donnée 'amount'
// Renvoie la nouvelle valeur, value, mise à jour
function updateValue(value, direction, amount){
	if (direction == 'L'){
		value -= amount
		// si la valeur devient négative, c'est qu'on a passé 0
		// il faut donc mettre à jour la valeur (note : on peut avoir bougé de plus de 100)
		while (value < 0){
			value = 100 + value
		}
	} else {
		value += amount
		// si la valeur devient supérieure à 100, c'est qu'on a passé 99
		// il faut donc mettre à jour la valeur (note : on peut avoir bougé de plus de 100)
		while (value >= 100){
			value = value - 100
		}
	}
	return value
}

jQuery.get('../advent/input/day1-1.txt', function(data) {

	// on récupère les données et on les stocke dans un tableau, par ligne
	let inputArray = data.split("\n")
	console.log(inputArray.length-1)

	// on garde en mémoire la valeur courante, qui démarre à 50
	let currentValue = 50
	// compteur de 0
	let zeroCounter = 0

	// on parcourt le tableau
	for (let i=0; i<inputArray.length-1; i++){
		// STEP 1 : Appliquer la combinaison
		let combi = inputArray[i]
		// pour chaque combinaison, on récupère la direction, L ou R
		let direction = combi[0]
		// et de combien on veut tourner
		let amount = parseInt(combi.substring(1))
		// enfin, on met à jour currentValue avec updateValue :
		currentValue = updateValue(currentValue, direction, amount)

		// STEP 2 : Est-ce qu'on est sur 0 ?
		if (currentValue == 0){
			zeroCounter++
		} 
	}
	// Le mot de passe
	console.log("zeroCounter = " + zeroCounter)
	
}, 'text');