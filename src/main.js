let body = document.getElementById("main");
let symbol = "🍣🍣🍕🍣🍕🥦🍕🥦🍣🍣🍕🍕🥦🍣";
let sushi = "🍣";
let pizza = "🍕";
let choux = "🥦";
let allMeal = [];

let header = document.createElement("header");
let title = document.createElement("h1");
let subtitle = document.createElement("h2");

let section = document.createElement("section");

let labelCommand = document.createElement("label");
let inputCommand = document.createElement("input");

let labelDay = document.createElement("label");
let inputDay = document.createElement("input");

let btnContainer = document.createElement("div");
let btn = document.createElement("button");

let triangleContainer = document.createElement("div");

// initialise le programme et l'interface utilisateur
function init() {
    header.id = "header";
    title.textContent = "Le triangle du miam !!!";
    subtitle.textContent = symbol;

    section.id = "section";
    labelCommand.textContent = "Entrez la commande : ";
    labelCommand.id = "inputTitle";
    inputCommand.type = "text";
    inputCommand.name = "symbol";
    inputCommand.id = "symbol";

    labelDay.textContent = "Entrez le nombre de jour : ";
    labelDay.id = "inputDayTitle";
    inputDay.type = "number";
    inputDay.name = "day";
    inputDay.id = "day";

    btnContainer.id = "btnContainer";
    btn.type = "submit";
    btn.textContent = "Afficher les repas";
    btn.id = "btnSubmit";
    display();
}

// gère l'affichage de l'interface utilisateurs
function display() {
    body.appendChild(header);
    header.appendChild(title);
    header.appendChild(subtitle);
    body.appendChild(section);
    section.appendChild(labelCommand);
    section.appendChild(inputCommand);
    section.appendChild(labelDay);
    section.appendChild(inputDay); 
    section.appendChild(btnContainer);
    btnContainer.appendChild(btn);
}

// détecteur d'évenement au click sur le bouton afficher les repas
// lance l'algorithme
btn.addEventListener("click", function() {
    let mealValue = inputCommand.value;
    let numberDay = inputDay.value;
    let meal = getMeal(mealValue);
    triangleMiam(meal,numberDay);
});

// récupère la commande entrer par l'utilisateur et la stock dans un tableau
function getMeal(value) {
    let words = value.split();
    let tabMeal = [];
    for (let i = 0; i < value.length; i++) {
        let index = i + 1;
        let symbol = words[0][i] + words[0][index];
        if (symbol === sushi || symbol === pizza || symbol === choux) tabMeal.push(symbol);
    }
    return tabMeal;
}

// fonction principal du programme c'est elle qui calcul le résultat en fonction
// du tableau contenant tout les repas calculé et du nombre de jour entrer par 
// l'utilisateur
function triangleMiam(meal,day) {
    let commandVerif = verifyCommand(meal);
    if (commandVerif) {
        addMealToTriangle(allMeal,meal);
        let newMeal = getNewMeal(meal);
        addMealToTriangle(allMeal,newMeal);
        while (newMeal.length > 1) {
            newMeal = getNewMeal(newMeal);
            addMealToTriangle(allMeal,newMeal);
        }
        let results = [allMeal[(day * 2) - 2],allMeal[(day * 2) - 1]];
        displayResults(results,day);
    }
}

// fonction permettant de vérifier les commandes entrer par l'utilisateur
function verifyCommand(meal) {
    let check;
    if (meal.length === 0) {
        let errorMessage = document.createElement("h2");
        errorMessage.textContent = "Le programme n'a pas reconnu la commande, veuillez entrer une commande valide !";
        errorMessage.style.color = "red";
        section.appendChild(errorMessage);
        check = false;
        return check;
    }
    check = true;
    return check;
}

// ajoute tout les nouveau repas calculer dans un tableau pour tout les repas
function addMealToTriangle(tab,meal) {
    let paraMeal = document.createElement("p");
    for (let i = 0; i < meal.length; i++) {
        paraMeal.textContent += meal[i];
        tab.push(meal[i])
    }
    triangleContainer.appendChild(paraMeal);
    return tab
}

// fonction permettant de récupérer les nouveau repas dans un tableau
function getNewMeal(meal) {
    let newMeal = [];
    for (let i = 0; i < meal.length; i++) {
        let index = i + 1;
        if(meal[index] != undefined) newMeal.push(computeMeal(meal[i],meal[index]));
    }
    return newMeal;
}

// calcul le troisième repas en fonction des deux repas donner
function computeMeal(meal1,meal2) {
    let meal3;
    if (meal1 === meal2) {
        meal3 = meal1;
    } else if (meal1 != meal2) {
        if (meal1 === sushi && meal2 === pizza || meal1 === pizza && meal2 === sushi) meal3 = choux;
        if (meal1 === sushi && meal2 === choux || meal1 === choux && meal2 === sushi) meal3 = pizza;
        if (meal1 === choux && meal2 === pizza || meal1 ===pizza && meal2 === choux) meal3 = sushi;
    }
    return meal3;
}

// fonction permettant d'afficher le résultat
function displayResults(results, day) {
    let titleResults = document.createElement("h2");
    let msgMidi = document.createElement("p");
    let msgSoir = document.createElement("p");
    titleResults.textContent = "Repas à j+" + day;
    titleResults.id = "titleResults";
    msgMidi.textContent = "Midi : " + results[0];
    msgSoir.textContent = "Soir : " + results[1];
    msgMidi.classList.add("msg");
    msgSoir.classList.add("msg");
    triangleContainer.id = "triangleContainer";
    section.appendChild(titleResults);
    section.appendChild(msgMidi);
    section.appendChild(msgSoir);
    section.appendChild(triangleContainer);
}

init();