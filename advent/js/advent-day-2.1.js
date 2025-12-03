console.log('Hello, day 2!')

// PSEUDO-CODE initial
// Lire la data
// Enregistrer dans un tableau de tableaux à 2 éléments [first-id,last-id]
// sum = 0
// Parcourir le tableau
// Pour chaque paire, parcourir tous les ID 
// Pouvoir identifier un ID invalide (fonction à part)
// L'ajouter à la sum quand on le trouve

// Fonction Trouver un ID invalide
// any ID which is made only of some sequence of digits repeated twice
// Longueur paire obligatoirement
// On divise en 2 string, on compare, si c'est égal, renvoie true.

// CODE - Le vrai

let sumInvalidIds = 0

// Fonction isValidId, prend un id en paramètre et renvoie vrai
// si l'id est valide. Faux sinon.
function isValidId(id){
	let stringId = id.toString()
	// Si l'id a une longueur impaire, il ne peut être invalide
	if (stringId.length%2!=0) return true
	// Sinon, coupons stringId en 2 nouvelles string
	let stringIdA = stringId.substring(0,stringId.length/2)
	let stringIdB = stringId.substring(stringId.length/2)
	// Comparons les 2 string
	return (stringIdA != stringIdB)
}

jQuery.get('../advent/input/day2-input.txt', function(data) {

	// on récupère les données et on les stocke dans un tableau, par ligne
	//let inputArray = data.split("\n")

	// Tableau d'ids
	let arrayIds = data.split(",")
	
	// on parcourt le tableau d'Ids
	for (let i=0; i<arrayIds.length; i++){
		console.log(arrayIds[i])
		// Analysons chaque paire
		let idRange = arrayIds[i].split("-")
		let firstId = parseInt(idRange[0])
		let lastId = parseInt(idRange[1])
		// Parsons les ids compris entre ces 2 ids
		for (let id=firstId; id<=lastId; id++){
			if (!isValidId(id)){
				console.log("not valid : " + id)
				sumInvalidIds+=parseInt(id)
			}
		}
	}
	console.log("sum = " + sumInvalidIds)
	
}, 'text');