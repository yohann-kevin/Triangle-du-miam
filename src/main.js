let body = document.getElementById("main");
let symbol = "🍣🍣🍕🍣🍕🥦🍕🥦🍣🍣🍕🍕🥦🍣";
let sushi = "🍣";
let pizza = "🍕";
let choux = "🥦";
let allMeal = [];

let header = document.createElement("header");
let title = document.createElement("h1");
let subtitle = document.createElement("h2");

let sectionForm = document.createElement("section");

let labelCommand = document.createElement("label");
let inputCommand = document.createElement("input");

let labelDay = document.createElement("label");
let inputDay = document.createElement("input");

let btn = document.createElement("button");

// initialise le programme et l'interface utilisateur
function init() {
    header.id = "header";
    title.textContent = "Le triangle du miam !!!";
    subtitle.textContent = symbol;

    sectionForm.id = "sectionForm";
    labelCommand.textContent = "Entrées la commande : ";
    labelCommand.id = "inputTitle";
    inputCommand.type = "text";
    inputCommand.name = "symbol";
    inputCommand.id = "symbol";

    labelDay.textContent = "Entrez le nombre de jour : ";
    labelDay.id = "inputDayTitle";
    inputDay.type = "number";
    inputDay.name = "day";
    inputDay.id = "day";

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
    body.appendChild(sectionForm);
    sectionForm.appendChild(labelCommand);
    sectionForm.appendChild(inputCommand);
    sectionForm.appendChild(labelDay);
    sectionForm.appendChild(inputDay); 
    sectionForm.appendChild(btn);
}

// détecteur d'évenement au click sur le bouton afficher les repas
// lance l'algorythme
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
    verifyCommand(meal);
    addMealToTab(allMeal,meal);

    console.log("" + meal);

    let newMeal = getNewMeal(meal);
    addMealToTab(allMeal,newMeal);

    while (newMeal.length > 1) {
        newMeal = getNewMeal(newMeal);
        addMealToTab(allMeal,newMeal);
    }

    let results = [allMeal[(day * 2) - 2],allMeal[(day * 2) - 1]];
    displayResults(results,day);
}

// ajoute tout les nouveau repas calculer dans un tableau pour tout les repas
function addMealToTab(tab,meal) {
    for (let i = 0; i < meal.length; i++) {
        tab.push(meal[i])
    }
    return tab
}

// fonction permettant de récupérer les nouveau repas dans un tableau
function getNewMeal(meal) {
    let newMeal = [];
    for (let i = 0; i < meal.length; i++) {
        let index = i + 1;
        if(meal[index] != undefined) newMeal.push(computeMeal(meal[i],meal[index]));
    }
    console.log(" " + newMeal);
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

// fonction permettant de vérifier les commandes entrer par l'utilisateur
function verifyCommand(meal) {
    if (meal.length === 0) {
        let errorMessage = document.createElement("h2");
        errorMessage.textContent = "Le programme n'a pas reconnu la commande, veuillez entrer une commande valide !";
        errorMessage.style.color = "red";
        sectionForm.appendChild(errorMessage);
    }
}

// fonction permettant d'afficher le résultat
function displayResults(results, day) {
    let midi = results[0];
    let soir = results[1]
    console.log("Repas à J+" + day);
    console.log("Midi : " + midi + " Soir : " + soir);
}

init();