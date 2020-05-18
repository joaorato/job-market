function timePassing() {
    
    //time display
    passMonths(1)
    
    if (gameData.ageMonths >= 4) {
        ageTextOff()
    }

    if (actionMade){
        if(holdActionText)
            holdActionText = false
        else{
            actionTextOff()
            actionMade = false
            holdActionText = true
        }
    }

    if(gameData.ageYears >= 5 && gameData.lifeStage == 0) {
        ageTextOn(5)
        studyButtonOn()
        gameData.lifeStage = 1
        document.getElementById("nameAndGender").innerHTML = gameData.name + ", a " + gameData.gender + " " + lifeStages[gameData.lifeStage];
    }

    if (gameData.ageYears >= 13 && gameData.lifeStage == 1){
        ageTextOn(13)
        workButtonOn()
        gameData.lifeStage = 2
        document.getElementById("nameAndGender").innerHTML = gameData.name + ", a " + gameData.gender + " " + lifeStages[gameData.lifeStage];
    }
    
    if (gameData.ageYears >= 21 && gameData.lifeStage == 2){
        gameData.lifeStage = 3
        document.getElementById("nameAndGender").innerHTML = gameData.name + ", a " + gameData.gender + " " + lifeStages[gameData.lifeStage];
    }

    if(gameData.ageYears >= 65 && gameData.lifeStage == 3){
        gameData.lifeStage = 4
        document.getElementById("nameAndGender").innerHTML = gameData.name + ", a " + gameData.gender + " " + lifeStages[gameData.lifeStage];
    }

    if(gameData.ageYears >= 85 && gameData.lifeStage == 4){
        workButtonOff()
        gameData.lifeStage = 5
        document.getElementById("nameAndGender").innerHTML = gameData.name + ", a " + gameData.gender + " " + lifeStages[gameData.lifeStage];
    }
    
    //natural increase in intelligence for age < 25
    if (gameData.ageYears <= 25) {
        setIntelligence(1)
    }
    //natural decrease in intelligence for age > 70
    else if (gameData.ageYears >= 70) {
        setIntelligence(-1)
    }
    //natural increase in stress for 25 < age < 70
    else {
        setStress(1)
    }
    
    //natural decrease in happiness for everyone
    setHapiness(-1)
    
    //final computation of the chance of death
    //maybe not compute this every month
    deathChance()

    document.getElementById("age").innerHTML = "Age: " + gameData.ageYears + " years " + Math.floor(gameData.ageMonths) + " months"
    document.getElementById("happiness").innerHTML = "Happiness: " + gameData.happiness + "/100"
    document.getElementById("intelligence").innerHTML = "Intelligence: " + gameData.intelligence
    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress + "/100"
}

function deathChance(){
    //calculates the chance of death from the attributes and age.
    //also computes de cause of death
    var chance = 0 //out of 100
    var chanceHap = 0 //happiness factor
    var chanceHealth = 0 //stress + age factor

    //happiness contribution - not until 13 years old
    if (gameData.ageYears > 12){
        var happiness = gameData.happiness
        // if (happiness < 50 && happiness > 30){
        //     //from 0% to 5% chance of dying - suicide
        //     chanceHap = 0.05*(100 - 5*(happiness-30))
        // }
        // if (happiness <= 30 && happiness > 10){
        //     //from 5% to 15% chance of dying - suicide
        //     chanceHap = 0.15*(100 - (10/3)*(happiness-10))
        // }
        // if (gameData <= 10){
        //     //from 15% to 50% chance of dying - suicide
        //     chanceHap = 0.50*(100 - 7*(happiness))
        // }
        chanceHap = 0.1*Math.exp(-0.15*(happiness-15)) //yearly
        console.log("Happiness Yearly Chance: " + chanceHap*100 + "%")
        chanceHap = (1 - Math.pow(1-chanceHap, 1/12))*100 //monthly
    }

    //stress + age contribution
    var stress = gameData.stress
    // if (stress < 70){
    //     //from 0% to 15% chance of dying - 
    //     chanceHealth = 0.15*(100 - (10/7)*(70-stress)) //change this to non-linear after
    // }
    // if (stress >= 70 && stress < 90){
    //     //from 15% to 35% chance of dying - 
    //     chanceHealth = 0.35*(100 - 2.857142*(90-stress))
    // }
    // if (stress >= 90 && stress){
    //     //from 35% to 60% chance of dying - 
    //     chanceHealth = 0.60*(100 - (25/6)*(100-stress))
    // }
    age = gameData.ageYears
    chanceHealth = 0.1*Math.exp(-0.003*age*(85-stress)) //yearly
    console.log("Health Yearly Chance: " + chanceHealth*100 + "%")
    chanceHealth = (1 - Math.pow(1-chanceHealth, 1/12))*100 //monthly

    //chanceHealth = gameData.ageYears*chanceHealth/50 //check for balance
    //include some natural death where stress is not a factor!
    //gaussian function around 90 yrs?
    if (gameData.ageYears > 65){
        chanceHealth += Math.min(gameData.ageYears*(4/10), 40)
    }
    if (chanceHealth >= 100)
        chanceHealth = 99

    chance = chanceHealth + chanceHap

    if (chance >= 100)
        chance = 99

    console.log("Happiness Chance: " + chanceHap + "%")
    console.log("Health Chance: " + chanceHealth + "%")
    console.log("Chance: " + chance + "%")
    
    var random = Math.random()*101
    console.log(random)
    
    if (random <= chance) {
        if (chanceHap > chanceHealth) {
            gameData.deathCause = "suicide"
        }
        else{
            if (gameData.ageYears > 85 && gameData.stress < 30) //tweak this
                gameData.deathCause = "a natural death"
            gameData.deathCause = "heart failure"
        }
        death()
    }
}

function death()
{
    window.alert("You sadly passed away at the age of " + gameData.ageYears + " from " + gameData.deathCause + ".")
    reset()
}

function expenses(){
    //monthly loss of money for adults+
}

function monthlyAttributes(){
    //monthly change in attributes for each lifestage
}

function ageTextOn(age){
    if (age == 5)
        document.getElementById("comingOfAge").innerHTML = "You are now old enough to study!"
    if (age == 13)
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

function setIntelligence(value){
    var expectedInt = gameData.intelligence + value
    if (expectedInt < 0)
        gameData.intelligence = 0
    else
        gameData.intelligence = expectedInt
}

function setExperience(value){
    gameData.experience += value
}

function setStress(value){
    var expectedStress = gameData.stress + value;
    if (expectedStress > 100)
        gameData.stress = 100
    else if (expectedStress < 0)
        gameData.stress = 0
    else
        gameData.stress = expectedStress
}

function setHapiness(value){
    var expectedHap = gameData.happiness + value;
    if (expectedHap > 100)
        gameData.happiness = 100
    else if (expectedHap < 0)
        gameData.happiness = 0
    else
        gameData.happiness = expectedHap
}

function setMoney(value){
    var expectedMoney = gameData.money + value
    if (expectedMoney < 0) //MAYBE POSSIBILITY OF DEBT IN THE FUTURE
        gameData.money = 0
    else
        gameData.money = expectedMoney
    
}

function haveFun() {

    //reduce stress
    setStress(-1)

    //increase happiness
    setHapiness(2)

    //reduce intelligence
    //maybe more damage to intelligence if happiness is capped
    setIntelligence(-1)

    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress + "/100"
    document.getElementById("happiness").innerHTML = "Happiness: " + gameData.happiness + "/100"
    document.getElementById("intelligence").innerHTML = "Intelligence: " + gameData.intelligence
    
    var phrases = ["You went to the movies!", "You danced!", "You played videogames!", "You went out with your parents!", "You hung out with friends!"]
    document.getElementById("action").innerHTML = phrases[Math.floor( Math.random()*5 )]
    actionMade = true
}

function relax() {
    
    // if age <= 25 relax costs no money nor time but reduces less stress
    if (gameData.ageYears <= 25) {
        setStress(-2)
    }
    // if age > 25 the contrary
    else {
        if (gameData.money >= 100) {
            setMoney(-100)
            setStress(-5)
        }
        else {
            document.getElementById("action").innerHTML = "Not enough money to go on holiday!"
        }
        passMonths(1)
    }
    var phrases = ["You went on holiday!", "You stayed home with your family!", "You drank a cup of wine at night!", "Your read a fantasy novel!", "You listened to music!"]
    document.getElementById("action").innerHTML = phrases[Math.floor( Math.random()*5 )]
    
    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress + "/100"
    document.getElementById("money").innerHTML = "Money: " + gameData.money + " $"
    actionMade = true
}

function work() { //work for 6 months
    
    // 13 < age < 16, less time, almost no money, almost no stress, less experience
    if (gameData.ageYears >= 13 && gameData.ageYears < 16){
        setMoney(5)
        setStress(1)
        setExperience(1)
        passMonths(3)
    }

    // 16 < age < 21 few money but few stress, some experience
    else if (gameData.ageYears >= 16 && gameData.ageYears < 21){
        setMoney(20)
        setStress(3)
        setExperience(2)
        passMonths(6)
    }
    
    // age > 21 more money and more stress, good experience
    else {
        setMoney(50)
        setStress(5)
        setExperience(3)
        passMonths(6)
    }

    var phrases = ["You worked like a mad " + gameData.gender + "!"]
    document.getElementById("action").innerHTML = phrases[Math.floor( Math.random()*1 )]

    document.getElementById("experience").innerHTML = "Experience: " + gameData.experience
    document.getElementById("stress").innerHTML = "Stress: " + gameData.stress + "/100"
    document.getElementById("money").innerHTML = "Money: " + gameData.money + " $"
    actionMade = true
}

function study() {
    
    // for age <= 15 greater increase in intelligence more damage to happiness
    if (gameData.ageYears <= 15) {
        setIntelligence(3)
        setHapiness(-2)
        setStress(1)
    }
    // for 16 < age < 23 less damage to hapiness, more to stress
    else if (gameData.ageYears <= 23) {
        setIntelligence(3)
        setHapiness(-1)
        setStress(2)
        gameData.intelligence += 3
        gameData.happiness -= 1
        gameData.stress += 2
    }
    // age > 23 small increase in happiness, smaller in intelligence, very small increase in stress 
    else {
        setIntelligence(1)
        setHapiness(1)
        setStress(1)
        //maybe costs money?
    }
    passMonths(3)
    actionMade = true
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
