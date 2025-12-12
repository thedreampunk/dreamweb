console.log('Hello, day 7!')

// PSEUDO-CODE initial
// Ne pas. paniquer.
// On a une formule, merci Euclide.

// Parcourir la data par ligne pour la stocker dans un tableau boxTab

// Variables :
// nbCircuitsToConnect = 10 / 1000
// boxesTab le tableau des junction boxes
// distancesTab, un tableau qui contiendra un tableau
    // pour chaque couple de box : leurs indexes dans boxesTab et la distance qui les sépare
    // sous la forme [index-box1, index-box2, distance]
// circuitsTab, qui stockera les différentes connexions sous forme de tableaux

// Parcourir le tableau boxesTab
    // Grace à une fonction dédiée, getDistance(box1,box2),
    // Calculer la distance entre chaque couple de box et alimenter distancesTab
// On prendra soin de trier ensuite distancesTab selon distance

// Ensuite on parcourt ce tableau distancesTab trié
// Pour chaque box du couple, on va regarder si elle est présente dans
// l'un des circuits de circuitsTab
// Si oui, alors concaténer l'autre élément au circuit existant
// Sinon, ajouter le couple de circuit dans circuitsTab
// WARN : les 2 boxes peuvent potentiellement déjà être présentes
// Voire dans un même circuit ! Auquel cas on ne les rajoutera pas

// On appellera getCircuitsSizesTab(circuitsTab)
// Qui nous renverra un tableau des tailles correspondant
// On pourra le trier par ordre décroissant afin de pouvoir multiplier les 3 premières valeurs

// Renvoyer le résultat

// Fonction getDistance(box1,box2)
    // appliquera la formule euclidienne 
    // Racine de ((x1-x2)^2 + (y1-y2)^2 + (z1-z2)^2)
    // Et renverra ce résultat

// Fonction getCircuitsSizesTab(circuitsTab)
    // Prendra en argument un tableau de circuits (eux-même des tableaux)
    // Celui correspondant à circuitsTab
    // et renverra un tableau des tailles correspondant

// Fonction addCircuitToTab(indexBox1, indexBox2, circuitsTab)
    // Parcours de circuitsTab qui stocke les circuits
    // sous la forme [box1, ..., box n]
    // Pour chaque circuit de circuitsTab
        // Si le circuit comprend indexBox1, alors indexCircuit1 = l'index du circuit courant et je continue
        // Si le circuit comprend indexBox2, alors indexCircuit2 = l'index du circuit courant et je continue
        // Si indexCircuit1 et indexCircuit 2 sont différents de -1 ici :
            // Je concatène les 2 circuits correspondants dans circuitsTab et je le renvoie
    // En fin de boucle :
    // Si indexCircuit1 != -1, alors l"indexBox1 a été trouvé ! Dans ce cas :
        // Concaténer indexBox2 avec le circuit correspondant 
    // Si indexCircuit2 != -1, alors l'indexBox2 a été trouvé ! Dans ce cas :
        // Concaténer indexBox1 avec le circuit correspondant 
    // Renvoyer circuitsTab



// CODE - Le vrai
let nbCircuitsToConnect = 1000
let boxesTab = []
let distancesTab = []
let circuitsTab = []

// Fonction getDistance(box1,box2) renvoie la distance entre 2 boxes
function getDistance(box1,box2){
    let x1 = parseInt(box1[0])
    let y1 = parseInt(box1[1])
    let z1 = parseInt(box1[2])
    let x2 = parseInt(box2[0])
    let y2 = parseInt(box2[1])
    let z2 = parseInt(box2[2])
    let distance = Math.round(Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2)+Math.pow(z1-z2,2)))
    return distance
}

// Fonction getCircuitsSizesTab(circuitsTab)
    // Prendra en argument un tableau de circuits (eux-même des tableaux)
    // Celui correspondant à circuitsTab
    // et renverra un tableau des tailles correspondant
function getCircuitsSizesTab(){
    let sizesTab = []
    for (let i=0; i<circuitsTab.length; i++){
        sizesTab.push(circuitsTab[i].length)
    }
    console.log("sizesTab : " + sizesTab)
    return sizesTab
}

// Fonction addCircuitToTab(indexBox1, indexBox2)
function addCircuitToTab(indexBox1, indexBox2){
    let indexCircuit1 = -1
    let indexCircuit2 = -1
    for (let i=0; i<circuitsTab.length; i++){
        let circuit = circuitsTab[i]
        // Est-ce que les 2 indexes des box 1 et 2 sont dans ce circuit ?
        if (circuit.includes(indexBox1)) {
            indexCircuit1 = i
        }
        if (circuit.includes(indexBox2)) {
            indexCircuit2 = i
        }
        if ((indexCircuit1 != -1) && (indexCircuit2 != -1)){
            console.log(indexCircuit1)
            console.log(indexCircuit2)
            if ((indexCircuit1 != indexCircuit2)){
                // On fusionne les 2 circuits
                circuitsTab[indexCircuit1] = circuitsTab[indexCircuit1].concat(circuitsTab[indexCircuit2])
                // On supprime le circuit qui a été fusionné
                circuitsTab.splice(indexCircuit2,1)
            }
            return circuitsTab
        }
    }

    // Au moins l'un des indexes des boxes n'a pas été trouvé
    if (indexCircuit1 != -1){
        // Concaténer indexBox2 avec le circuit dont fait déjà partie indexBox1
        circuitsTab[indexCircuit1].push(indexBox2)
    } else if (indexCircuit2 != -1){
        // Concaténer indexBox1 avec le circuit dont fait déjà partie indexBox2 
        circuitsTab[indexCircuit2].push(indexBox1)
    } else {
        // Simplement ajouter à circuitsTab le nouveau tableau [indexBox1,indexBox2]
        circuitsTab.push([indexBox1,indexBox2])
    }
    return circuitsTab

}

jQuery.get('day8-input.txt', function(data) {

    // Etape 1 : Alimenter boxesTab avec la data
    let inputArray = data.split("\n")
    for (let i=0; i<inputArray.length; i++){
        // Il faut récupérer la ligne en supprimant les "\r"
        let line = inputArray[i].replace("\r","").split(",")
        // Enfin on ajoute la ligne à la matrice
        boxesTab.push(line)
    }
    console.log(boxesTab)

    // Etape 2 : Calculer toutes les distances
    for (let i=0; i<boxesTab.length-1; i++){
        for (let j=i+1; j<boxesTab.length; j++){
            let distanceBoxes = getDistance(boxesTab[i],boxesTab[j])
            distancesTab.push({x:i,y:j,distance:distanceBoxes})
        }
    }
    //console.log(distancesTab)

    // Etape 3 : Trier le tableau des distances
    let distancesTabTries = distancesTab.sort((a, b) => a.distance - b.distance);
    console.log(distancesTabTries)

    // Etape 4 : Parcourir ce tableau trié des distances
    // pour connecter les circuits (au maximum : nbCircuitsToConnect)
    for (let i=0; i<nbCircuitsToConnect; i++){
        let indexFirstBox = distancesTabTries[i].x
        let indexSecondBox = distancesTabTries[i].y
        circuitsTab = addCircuitToTab(indexFirstBox,indexSecondBox)
    }
    console.log(circuitsTab)

    let sizesTabTries = getCircuitsSizesTab().sort((a, b) => b - a);
    let res = 1
    for (let i=0; i<3; i++){
        res *= sizesTabTries[i]
    }
    console.log(res)

}, 'text');