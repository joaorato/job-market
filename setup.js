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



