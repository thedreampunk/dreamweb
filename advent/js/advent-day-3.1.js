console.log('Hello, day 3!')

// PSEUDO-CODE initial
// Parcourir la data
// Pour chaque ligne (bank)
// Trouver les batteries à allumer ie la meilleure combinaison (fonction dédiée)
// On somme tous les résultats et on renvoie la somme

// Fonction d'identification de la meilleure combinaison de 2 chiffres
// On prend en paramètre la string correspondant à une bank de batteries
// Variables digit1 et digit2 pour stocker les valeurs trouvées
// 1ere boucle sur les caractères de la string, qu'on convertit à la volée en int
// Je vais jusqu'à l'avant-dernier caractère
// Si mon chiffre est supérieur strict à digit1, alors je mets à jour digit1 et
//		2e boucle sur les caractères suivants digit1 dans la bank :
//			Je cherche le plus grand qui suit, qq soit la valeur précédente de digit2
//			Variable maxDigit2 = 0.
// 			Si le chiffre courant est supérieur strict à maxDigit, je mets à jour digit2
//		Je mets à jour à la fin de la boucle, digit1 et digit2
// Je renvoie le nombre composé des deux digits

// CODE - Le vrai

// Fonction d'identification de la meilleure combinaison de 2 chiffres
function findBestBatteries(bankString){
	//console.log(bankString)
	let digit1 = 0
	let digit2 = 0
	for (let i=0; i<bankString.length-2; i++){
		let currentDigit1 = parseInt(bankString[i])
		if (currentDigit1 > digit1){
			let maxDigit2 = 0
			for (let j=i+1; j<bankString.length; j++){
				let currentDigit2 = parseInt(bankString[j])
				if (currentDigit2 > maxDigit2)
					maxDigit2 = currentDigit2
			}
			digit1 = currentDigit1
			digit2 = maxDigit2
		}
	}
	//console.log(digit1 + "" + digit2)
	return parseInt(digit1 + "" + digit2)
}

jQuery.get('../advent/input/day3-input.txt', function(data) {

	// on récupère les données et on les stocke dans un tableau, par ligne
	let bankArray = data.split("\n")

	let sumBatteries = 0
	
	// on parcourt le tableau de banks
	for (let i=0; i<bankArray.length; i++){
		sumBatteries += findBestBatteries(bankArray[i])
	}
	console.log("sum = " + sumBatteries)
	
}, 'text');