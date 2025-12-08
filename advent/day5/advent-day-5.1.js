console.log('Hello, day 5!')

// PSEUDO-CODE initial
// Parcourir la data par ligne : il faut bien séparer les 2 jeux de données
// Pour ça, on peut parcourir tant qu'on n'a pas rencontré d'élément "" (le saut de ligne)
// et alimenter un tableau IDRanges.

// Ensuite, parcourir le reste du tableau
// Pour chaque ID :
//      Je parcours le tableau IDRanges
//      Pour chaque élément qui est sous la forme "ID1-ID2",
//      Je splitte selon le "-" et récupère le low range et le high range
//      Si mon ID est compris entre le low range et le high range,
//      je l'ajoute à mon tableau freshIDs
// Je renvoie la taille de mon tableau freshIDs

// CODE - Le vrai
jQuery.get('day5-input.txt', function(data) {
    let freshIDs = []
    let IDRanges = []
    let inputArray = data.split("\n")

    // Alimenter les tableaux
    let firstPart = true
    let i = 0
    // D'abord les IDRanges, tant qu'on ne rencontre pas le saut de ligne
    while (firstPart && i < inputArray.length) {
        if (inputArray[i] == "\r"){
            firstPart = false
            i++
            break
        } 
        else {
            IDRanges.push(inputArray[i].replace("\r",""))
            i++
        }
    }
    // Deuxième boucle pour le reste des éléments du tableau
    // Je les ajoute à freshIDs si je les repère dans le tableau IDRanges
    for (let j=i; j<inputArray.length; j++){
        let currentID = parseInt(inputArray[j].replace("\r",""))
        // Je parcours les IDRanges alimentés précedemment
        for (let k=0; k<IDRanges.length; k++){
            let IDRange = IDRanges[k].split("-")
            let lowRangeID = parseInt(IDRange[0])
            let highRangeID = parseInt(IDRange[1])
            if ((currentID >= lowRangeID) && (currentID <= highRangeID)){
                freshIDs.push(currentID)
                break
            }
        }
    }
    console.log(freshIDs.length)

}, 'text');