console.log('Hello, day 3!')

jQuery.get('https://thedreampunk.com/advent/input/advent-day-3-input.txt', function(data) {
	// 1. Ranger les data dans une matrice (tableau de tableaux)
	// On prendra soin de garder inputArray en plus de la matrice
	let inputArray = data.split("\n")
	let matrix = []
	let sumIds = 0
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
		console.log("matrixline de " + i + " = " + matrix[i])
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
				sum += gearSetValue(nbString,i,indexNb,matrix)
				// on réinitialise nos variables 
				indexNb = -1
				nbString = ""
				}
			// cas particulier du bord droit si on a un chiffre
			// On refait les manips du dessus
			if ((j == matrix.length-1) && (indexNb != -1)) {
				// console.log("bord droit avec str = " + nbString)
				sum += gearSetValue(nbString,i,indexNb,matrix)
				indexNb = -1
				nbString = ""
				}
		}
	}
	console.log("sum = " + sum)
	
}, 'text');

	// 4. On cherche dans la matrice la presence de symbole autour du nombre :
	// Soit même ligne : indexMin = index-1 et indexMax = index+nbString.length (warning bords)
	// Soit si ce n'est pas la 1ere ligne de la matrice : chercher la ligne du dessus, entre les 2 index
	// Soit si ce n'est pas la derniere ligne : chercher la ligne du dessous
	// 5. Si on a trouve autre chose qu'un point ou un chiffre, alors c'est un "part number" on return nbInt
	// Sinon, on return 0

// gearSetValue renvoie la valeur du gear si c'en est un
// (aka il y a un symbole qui touche),
// renvoie 0 sinon
function gearSetValue(strNb,i,j,theMatrix){
	// ligne du dessus
	if (i>0){
		for (let k=Math.max(0,j-1); k<Math.min(j+strNb.length+1,theMatrix.length); k++){ 
			if ((theMatrix[i-1][k] != ".") && (/[0-9]/.exec(theMatrix[i-1][k])==null)){
				// console.log("ligne dessus : " + strNb)
				return parseInt(strNb)
			}
		}
	}
	// ligne du dessous
	if (i<theMatrix.length-1){
		for (let k=Math.max(j-1,0); k<Math.min(j+strNb.length+1,theMatrix.length); k++){ 
			if ((theMatrix[i+1][k] != ".") && (/[0-9]/.exec(theMatrix[i+1][k])==null)){
				// console.log("ligne dessous : " + strNb)
				return parseInt(strNb)
			}
		}
	}
	// carac à gauche
	if (j!=0){
		if ((theMatrix[i][j-1] != ".") && (/[0-9]/.exec(theMatrix[i][j-1])==null)){
				// console.log("carac a gauche : " + strNb)
				return parseInt(strNb)
			}
	}
	// carac à droite
	if (j+strNb.length!=theMatrix.length){
		if ((theMatrix[i][j+strNb.length] != ".") && (/[0-9]/.exec(theMatrix[i][j+strNb.length])==null)){
				// console.log("carac a droite : " + strNb)
				return parseInt(strNb)
			}
	}
	// console.log("PAS UN GEAR : " + strNb)
	return 0
}