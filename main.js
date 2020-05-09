function timePassing() {
    
    //time display
    gameData.ageMonths += 1
    if (gameData.ageMonths == 12) {
        gameData.ageMonths = 0
        gameData.ageYears += 1
    }
    
    if (gameData.ageMonths >= 3) {
        ageTextOff()
        actionTextOff()
    }

    if(gameData.ageYears == 5 && gameData.ageMonths == 0) {
        ageTextOn(5)
        studyButtonOn()
    }

    if (gameData.ageYears == 16 && gameData.ageMonths == 0)
        workButtonOn()
    
    if(gameData.ageYears == 80 && gameData.ageMonths == 0)
        workButtonOff()
    
    //natural increase in intelligence for age < 25
    if (gameData.ageYears <= 25) {
        gameData.intelligence += 1
    }
    //natural decrease in intelligence for age > 70
    else if (gameData.ageYears >= 70) {
        gameData.intelligence -= 1
    }
    //natural increase in stress for 25 < age < 70
    else {
        gameData.stress += 1
    }
    
    //natural decrease in happiness for everyone
    gameData.happiness -= 1
    
    document.getElementById("age").innerHTML = "Age: " + gameData.ageYears + " years " + gameData.ageMonths + " months"
    document.getElementById("happiness").innerHTML = "Happiness: " + gameData.happiness + "/100"
    document.getElementById("intelligence").innerHTML = "Intelligence: " + gameData.intelligence
    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress
}

function ageTextOn(age){
    if (age == 5)
        document.getElementById("comingOfAge").innerHTML = "You are now old enough to study!"
    if (age == 16)
        document.getElementById("comingOfAge").innerHTML = "You are now old enough to work or to choose a field of study!"

}

function ageTextOff(){
    document.getElementById("comingOfAge").innerHTML = ""
}

function actionTextOff(){
    document.getElementById("action").innerHTML = ""
}

function workButtonOn(){
    document.getElementById("workButtonAppear").innerHTML = '<button onclick="work()">Work</button>';
}

function workButtonOff(){
    document.getElementById("workButtonAppear").innerHTML = '';
}

function studyButtonOn(){
    document.getElementById("studyButtonAppear").innerHTML = '<button onclick="study()">Study</button>';
}

function studyButtonOff(){
    document.getElementById("studyButtonAppear").innerHTML = '';
}

function passMonths(months) {
    var expectedMonth = gameData.ageMonths + months
        if (expectedMonth < 12)
            gameData.ageMonths += months
        else {
            gameData.ageYears += 1
            gameData.ageMonths = expectedMonth - 12
        }
    document.getElementById("age").innerHTML = "Age: " + gameData.ageYears + " years " + gameData.ageMonths + " months"
}

function haveFun() {

    //reduce stress
    if(gameData.stress >= 1) {
        gameData.stress -= 1
    }
    else {
        gameData.stress = 0
    }

    //increase happiness
    if(gameData.happiness <= 98) {
        gameData.happiness += 2
    }
    else {
        gameData.happiness = 100
    }

    //reduce intelligence
    if(gameData.intelligence > 0) {
        gameData.intelligence -= 1
    }

    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress
    document.getElementById("happiness").innerHTML = "Happiness: " + gameData.happiness + "/100"
    document.getElementById("intelligence").innerHTML = "Intelligence: " + gameData.intelligence
    
    var phrases = ["You went to the movies!", "You danced!", "You played videogames!", "You went out with your parents!", "You hung out with friends!"]
    document.getElementById("action").innerHTML = phrases[Math.floor( Math.random()*5 )]
}

function relax() {
    
    // if age <= 25 relax costs no money nor time but reduces less stress
    if (gameData.ageYears <= 25) {
        if(gameData.stress >= 2) {
            gameData.stress -= 2
        }
        else {
            gameData.stress = 0
        }
    }
    // if age > 25 the contrary
    else {
        if (gameData.money >= 100) {
            gameData.money -= 100
            if(gameData.stress >= 5) {
                gameData.stress -= 5
            }
            else {
                gameData.stress = 0
            }
        }
        else {
            document.getElementById("action").innerHTML = "Not enough money to go on holiday!"
        }
        passMonths(1)
    }
    var phrases = ["You went on holiday!", "You stayed home with your family!", "You drank a cup of wine at night!", "Your read a fantasy novel!", "You listened to music!"]
    document.getElementById("action").innerHTML = phrases[Math.floor( Math.random()*5 )]
    
    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress
    document.getElementById("money").innerHTML = "Money: " + gameData.money + " $"
}

function work() { //work for 6 months
    
    // 16 < age < 21 less money but less stress
    if (gameData.ageYears >= 16 && gameData.ageYears < 21){
        gameData.money += 20
        gameData.stress += 3
        passMonths(6)
    }
    
    // age > 21 more money and more stress
    else {
        gameData.money += 50
        gameData.stress += 5
        passMonths(6)
    }

    //for now experience increase is the same for all ages
    gameData.experience += 1

    var phrases = ["You worked like a mad " + gameData.gender + "!"]
    document.getElementById("action").innerHTML = phrases[Math.floor( Math.random()*1 )]

    document.getElementById("experience").innerHTML = "Experience: " + gameData.experience
    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress
    document.getElementById("money").innerHTML = "Money: " + gameData.money + " $"
}

function study() {
    
    // for age <= 15 greater increase in intelligence more damage to happiness
    if (gameData.ageYears <= 15) {
        gameData.intelligence += 3
        gameData.happiness -= 2
        gameData.stress += 1
    }
    // for 16 < age < 23 less damage to hapiness, more to stress
    else if (gameData.ageYears <= 23) {
        gameData.intelligence += 3
        gameData.happiness -= 1
        gameData.stress += 2
    }
    // age > 23 small increase in happiness, smaller in intelligence, very small increase in stress 
    else {
        gameData.intelligence += 1
        gameData.happiness += 1
        gameData.stress += 1
    }
    passMonths(3)
}

function timeController(multiplier){
    document.getElementById("timeText").innerHTML = "Game Speed: x" + 1/multiplier
    clearInterval(mainGameLoop)
    startLoop(multiplier*2000)
}

var mainGameLoop = window.setInterval(function () {
    if (gameData.start == true) {
        timePassing()
    }
}, 2000)
    

// store in a function so we can call it again
function startLoop(time_interval) {
  // Store the id of the interval so we can clear it later
  mainGameLoop = setInterval(function() {
    if (gameData.start == true) {
        timePassing()
    }
  }, time_interval);
}

// var saveGameLoop = window.setInterval(function() {
//     localStorage.setItem("jobMarketSave", JSON.stringify(gameData))
// }, 15000)

// var savegame = JSON.parse(localStorage.getItem("jobMarketSave"))
// if (savegame !== null) {
//     gameData = savegame
// }