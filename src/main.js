let body = document.getElementById("main");
let symbol = "🍣🍣🍕🍣🍕🥦🍕🥦🍣🍣🍕🍕🥦🍣";
let sushi = "🍣";
let pizza = "🍕";
let choux = "🥦";

let header = document.createElement("header");
let title = document.createElement("h1");
let subtitle = document.createElement("h2");

let sectionForm = document.createElement("section");

let labelCommand = document.createElement("label");
let inputCommand = document.createElement("input");

let labelDay = document.createElement("label");
let inputDay = document.createElement("input");

let btn = document.createElement("button");

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

btn.addEventListener("click", function() {
    let mealValue = inputCommand.value;
    let day = inputDay.value;
    let meal = getMeal(mealValue);
    triangleMiam(meal,day);
})

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

function triangleMiam(meal,day) {
    console.log(meal);
    verifyCommand(meal);
    if (meal[0] === sushi && meal[1] === sushi) {
        console.log(sushi);
    } else if (meal[0] === pizza && meal[1] === pizza) {
        console.log(pizza);
    } else if (meal[0] === choux && meal[1] === choux) {
        console.log(choux);
    } else {}
}

function verifyCommand(meal) {
    if (meal.length === 0) {
        let errorMessage = document.createElement("h2");
        errorMessage.textContent = "Le programme n'a pas reconnu la commande, veuillez entrer une commande valide !";
        errorMessage.style.color = "red";
        sectionForm.appendChild(errorMessage);
    }
}

init();