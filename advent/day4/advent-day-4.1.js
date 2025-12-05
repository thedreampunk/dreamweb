console.log('Hello, day 4!')

// PSEUDO-CODE initial
// Parcourir TOUTE la data et stocker dans une matrice
// Noter les dimensions de la matrice et les stocker dans 
// 2 variables : maxHeight et maxWidth
// Parcourir ensuite la matrice
    // Pour chaque élément, si c'est un roll, appeler la fonction isRollAccessible
        // Incrémenter la somme si le roll est effectivement accessible 
// Renvoyer cette somme

// Fonction isRoll(i,j) pour savoir si la case courante est un roll

// Fonction isRollAccessible(i,j)
// let sumCloseRolls = 0
// On appelle une autre fonction :

    // Fonction findNeighbours(i, j) qui renvoie un tableau des positions
    // des voisins de notre roll, en fonction de la position de celui-ci
    // Il prendra compte des positions et n'ajoutera que celles
    // comprises dans notre matrice parmi :
    // i-1,j-1 _ i-1, j _ i-1, j+1 _ i, j-1 _ i, j+1 _ i+1, j-1, i+1, j _ i+1, j+1

// Note : On utilisera plutôt x et y au lieu de i et j, pour plus de clarté

// On parcourt ce tableau
    // On somme chaque élément qui est un roll dans la matrice
    // Si sumCloseRolls est supérieur strict à 4 renvoyer faux.
// En fin de boucle, renvoyer vrai.

// CODE - Le vrai
let tabData = []
let maxHeight = 0
let maxWidth = 0
let sumAccessibleRolls = 0

// Fonction isRoll(x,y) pour savoir si la case courante est un roll
function isRoll(x,y){
    return(tabData[x][y] == '@')
}

// Fonction findNeighbourRolls(x, y) qui renvoie un tableau des positions
// des rolls voisins de notre roll, en fonction de la position de celui-ci
function findNeighbourRolls(x,y){
    let neighboursTab = []
    for (let i=x-1; i<=x+1; i++){
        for (let j=y-1; j<=y+1; j++){
            // Ignorons la case x,y
            if ((i!=x) || (j!=y)){
                // Assurons-nous d'être dans les bornes
                if ((i>=0) && (i<maxWidth) && (j>=0) && (j<maxHeight)){
                    if (isRoll(i,j)){
                        neighboursTab.push([i,j])
                    }
                }
            }
        }
    }
    return neighboursTab
}

// Fonction qui renvoie vraie si un roll est accessible, selon ses coordonnées
function isRollAccessible(x,y){
    let neighboursTab = findNeighbourRolls(x,y)
    return (neighboursTab.length < 4)
}

jQuery.get('day4-input.txt', function(data) {
    let inputArray = data.split("\n")

    // Remplissage de tabData, notre matrice
    for (let i=0; i<inputArray.length; i++){
        let line = inputArray[i].split("")
        // On retire les sauts de ligne
        line.pop()
        // On ajoute la ligne dans le tableau
        tabData.push(line)
    }
    console.log(tabData)

    // Mise à jour des bornes :
    maxHeight = tabData.length
    maxWidth = tabData[0].length
    console.log("Dimensions : " + maxHeight + ", " + maxWidth)

    // Parcours de la matrice
    for (let i=0; i<maxHeight; i++){
        for (let j=0; j<maxWidth; j++){
            if (isRoll(i,j)){
                if (isRollAccessible(i,j)){
                    sumAccessibleRolls++
                }
            }
        }
    }
    console.log("Accessible Rolls : " + sumAccessibleRolls)

}, 'text');