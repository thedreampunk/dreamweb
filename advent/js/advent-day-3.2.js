console.log('Hello, day 3.2!')

jQuery.get('https://thedreampunk.com/advent/input/advent-day-3-input.txt', function(data) {
	// 1. Ranger les data dans une matrice (tableau de tableaux)
	// On prendra soin de garder inputArray en plus de la matrice
	let inputArray = data.split("\n")
	let matrix = []
	var dicoGears = {}
	let daSum = 0
	
	for (let i=0; i<inputArray.length-1; i++){
		if (inputArray[i] != null){
			// console.log("str = " + inputArray[i])
			let matrixLine = []
			for (let j=0; j<inputArray[i].length; j++){
				matrixLine.push(inputArray[i][j])
			}
			// console.log("matrixLine = " + matrixLine)
			matrix.push(matrixLine) 
		}
	}
	// console.log(matrix)
	
	// 2. Parcourir la matrice à la recherche d'un chiffre
	// 3. Quand on trouve un chiffre :
	// On note son index puis on cherche les chiffres suivants jusqu'à avoir un point OU une fin de ligne
	// On concatene les chiffres en string : nbString - qu'on garde aussi -
	// puis on parseInt nbString pour avoir le nombre correspondant : nbInt
	// 3bis. On a un nombre et l'index du 1er chiffre le composant
	let sum = 0
	for (let i=0; i<matrix.length; i++){
		let matrixLine = matrix[i]
		// console.log("matrixline de " + i + " = " + matrix[i])
		let indexNb = -1
		let nbString = ""
		for (let j=0; j<matrix.length; j++){ 
			if (/[0-9]/.exec(matrixLine[j])){
				// C'est un chiffre !
				if (indexNb == -1) // on change indexNb si on est au début
					indexNb = j
				// On concatene les chiffres en string
				nbString += matrixLine[j]
			} else if (indexNb != -1){
				// Alors on était en train de lire un nombre
				// console.log("gearSetValue avec strNb = " + nbString)
				let tabResult = gearSetStarPosAndValue(nbString,i,indexNb,matrix)
				if (tabResult != 0){
					// c'est un potentiel gear !
					if (dicoGears[tabResult[0]] != null){
						// il y a déjà un gear qui a la meme clé "étoile"
						dicoGears[tabResult[0]].push(tabResult[1])
					} else {
						dicoGears[tabResult[0]] = [tabResult[1]]
					}
				}
				// on réinitialise nos variables 
				indexNb = -1
				nbString = ""
				}
			// cas particulier du bord droit si on a un chiffre
			// On refait les manips du dessus
			if ((j == matrix.length-1) && (indexNb != -1)) {
				// console.log("bord droit avec str = " + nbString)
				let tabResult = gearSetStarPosAndValue(nbString,i,indexNb,matrix)
				if (tabResult != 0){
					// c'est un potentiel gear !
					if (dicoGears[tabResult[0]] != null){
						// il y a déjà un gear qui a la meme clé "étoile"
						dicoGears[tabResult[0]].push(tabResult[1])
					} else {
						dicoGears[tabResult[0]] = [tabResult[1]]
					}
				}
				indexNb = -1
				nbString = ""
				}
		}
	}
	
	console.log(dicoGears)
	for (let key in dicoGears) {
		if (dicoGears[key].length == 2){
			daSum += dicoGears[key][0] * dicoGears[key][1]
		}
	}
	console.log(daSum)
	
}, 'text');

	// 4. On cherche dans la matrice la presence de symbole autour du nombre :
	// Soit même ligne : indexMin = index-1 et indexMax = index+nbString.length (warning bords)
	// Soit si ce n'est pas la 1ere ligne de la matrice : chercher la ligne du dessus, entre les 2 index
	// Soit si ce n'est pas la derniere ligne : chercher la ligne du dessous
	// 5. Si on a trouve autre chose qu'un point ou un chiffre, alors c'est un "part number" on return nbInt
	// Sinon, on return 0



// UPDATE 3.2
// Comme en 3.1, je boucle sur la matrice et sort tous les potentiels gears, 
// mais cette fois selon le nouveau critère de symbole *
//
// J'ajoute chaque gearValue dans un dico :
// clé : position de l'étoile dans la matrice - tableau de 2 éléments
// valeur : tableau de gearValue - au départ un tableau de 1 élément
// OR vu que la clé est unique dans un dico :
// Si j'essaie d'ajouter un nouvel élément qui a la même clé, alors c'est un potentiel gear qui nous intéresse
// Dans ce cas, j'ajoute le gearValue dans le tableau existant
//
// Une fois que j'ai le dico rempli,
// il suffit donc de boucler sur le dico
// et de sortir toutes les clés,valeur pour lesquelles la valeur est un tableau de 2 éléments
// On somme les produits et voilà ! :)


// Renvoie un tableau si le strNb est un gearset potentiel
// tableau avec la position de l'étoile ainsi que la valeur du gearset
// (aka il y a une etoile qui touche).
// renvoie 0 sinon
function gearSetStarPosAndValue(strNb,i,j,theMatrix){
	// ligne du dessus
	if (i>0){
		for (let k=Math.max(0,j-1); k<Math.min(j+strNb.length+1,theMatrix.length); k++){ 
			if (theMatrix[i-1][k] == "*"){
				// console.log("ligne dessus : " + strNb)
				return [[i-1,k], parseInt(strNb)]
			}
		}
	}
	// ligne du dessous
	if (i<theMatrix.length-1){
		for (let k=Math.max(j-1,0); k<Math.min(j+strNb.length+1,theMatrix.length); k++){ 
			if (theMatrix[i+1][k] == "*"){
				// console.log("ligne dessous : " + strNb)
				return [[i+1,k], parseInt(strNb)]
			}
		}
	}
	// carac à gauche
	if (j!=0){
		if (theMatrix[i][j-1] == "*"){
				// console.log("carac a gauche : " + strNb)
				return [[i,j-1], parseInt(strNb)]
			}
	}
	// carac à droite
	if (j+strNb.length!=theMatrix.length){
		if (theMatrix[i][j+strNb.length] == "*"){
				// console.log("carac a droite : " + strNb)
				return [[i,j+strNb.length], parseInt(strNb)]
			}
	}
	// console.log("PAS UN GEAR : " + strNb)
	return 0
}
