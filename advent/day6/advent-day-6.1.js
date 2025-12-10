console.log('Hello, day 6!')

// PSEUDO-CODE initial
// Parcourir la data par ligne pour la stocker dans une matrice
// Attention aux espaces, il va falloir nettoyer

// Une fois qu'on a la matrice
// Déclarer une variable totalSum initialisée à 0
// Parcourir la matrice par colonne !
// Pour chaque colonne :
// Si le dernier élément est "+"
// Alors on somme tous les autres éléments
// Sinon
// On multiplie tous les autres éléments
// J'ajoute le résultat à ma variable totalSum

// CODE - Le vrai
jQuery.get('day6-input.txt', function(data) {
    let totalSum = 0
    let operationsMatrix = []
    let matrixHeight = 0
    let matrixWidth = 0
    let inputArray = data.split("\n")

    // Remplissage de operationsMatrix
    for (let i=0; i<inputArray.length; i++){
        // Il faut récupérer la ligne en supprimant les "\r" puis les chaines vides
        let line = inputArray[i].replace("\r","").split(" ").filter(elem => elem !== '');
        // Enfin on ajoute la ligne à la matrice
        operationsMatrix.push(line)
    }
    console.log(operationsMatrix)

    matrixHeight = operationsMatrix.length
    matrixWidth = operationsMatrix[0].length

    // Parcours de la matrice par colonne
    for (let j=0; j<matrixWidth; j++){
        let resultCol
        if (operationsMatrix[matrixHeight-1][j] == '+'){
            resultCol = 0
            for (let i=0; i<matrixHeight-1; i++){
                resultCol += parseInt(operationsMatrix[i][j])
            }
        } else {
            resultCol = 1
            for (let i=0; i<matrixHeight-1; i++){
                resultCol *= parseInt(operationsMatrix[i][j])
            }
        }
        console.log(resultCol)
        totalSum += resultCol
    }
    console.log("totalSum = " + totalSum)

}, 'text');