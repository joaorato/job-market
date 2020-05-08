var gameData = {
    gender: null,
    name: null,
    ageYears: 0,
    ageMonths: 0,
    intelligence: 0,
    experience: 0,
    stress: 0,
    happiness: 100,
    money: 0,
    start: false
}

function genderButtonsOn(){
    document.getElementById("femaleButton").innerHTML = '<button onclick="gendering(0)">Female</button>';
    document.getElementById("maleButton").innerHTML = '<button onclick="gendering(1)">Male</button>';
    document.getElementById("yesButton").innerHTML = '<button onclick="gendering(2)">Yes</button>';
}

function genderButtonsOff(){
    document.getElementById("femaleButton").innerHTML = '';
    document.getElementById("maleButton").innerHTML = '';
    document.getElementById("yesButton").innerHTML = '';
}

genderButtonsOn()

function gendering(gender) {
    switch(gender) {
        case 0:
            gameData.gender = "Female";
            break;
        case 1:
            gameData.gender = "Male";
            break;
        case 2:
            rand = Math.floor(Math.random()*2)
            switch(rand) {
                case 0:
                    gameData.gender = "Female";
                    break;
                case 1:
                    gameData.gender = "Male";
                    break;
            }
    }
    genderButtonsOff()
    naming()
    gameData.start = true;
}

function naming() {
    var name = window.prompt("What name did your caretakers give you?")

    if (name != null && gameData.gender != null){
        gameData.name = name
        document.getElementById("nameAndGender").innerHTML = name + ", a " + gameData.gender;
    }
}

function reset(){
    gameData.gender = null;
    gameData.name = null;
    gameData.ageYears = 0;
    gameData.ageMonths = 0;
    gameData.intelligence = 0;
    gameData.experience = 0;
    gameData.stress = 0;
    gameData.happiness = 100;
    gameData.money = 0;
    gameData.start = false
    document.getElementById("nameAndGender").innerHTML = '';
    document.getElementById("age").innerHTML = "Age: " + gameData.ageYears + " years " + gameData.ageMonths + " months"
    document.getElementById("happiness").innerHTML = "Happiness: " + gameData.happiness + "/100"
    document.getElementById("intelligence").innerHTML = "Intelligence: " + gameData.intelligence
    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress
    document.getElementById("money").innerHTML = "Money: " + gameData.money + " $"
    document.getElementById("action").innerHTML = ''
    genderButtonsOn()
}



