
let player = {
    health: 1000,
    counter: 50,
    power: {
        melee: 100,
        energy: 400
    }
}

let opponent = {
    health: 1000,
    counter: 50,
    power: {
        melee: 100,
        energy: 400
    }
}

const meleeAttack = () => {

    let meleeButton = document.getElementById("melee-button");
    let marquee = document.getElementById("marquee");
    let restartButton = document.getElementById("restart-button");

    let playerMeleeAttack = attackDamage(player.power.melee);
    opponent.health -= playerMeleeAttack;
    meleeButton.disabled = true;

    if (gameOver(opponent.health)) {
        opponent.health = 0;
        printToScreen();
        endGame("Player won the fight!");
        return;
    }

    printToScreen();
    console.log("Player Melee Attack: " + playerMeleeAttack);

    setTimeout( () => {
        let opponentCounterAttack = attackDamage(opponent.counter);
        player.health -= opponentCounterAttack;
        
        if (gameOver(player.health)) {
            player.health = 0;
            printToScreen();
            endGame("Opponent won the fight!");
            return;
        }
        
        meleeButton.disabled = false;
        printToScreen();
        console.log("Opponent Counter Attack: " + opponentCounterAttack);
    }, 200)
}

const energyAttack = () => {

    let energyButton = document.getElementById("energy-button");
    let marquee = document.getElementById("marquee");
    let restartButton = document.getElementById("restart-button");

    let playerEnergyAttack = attackDamage(player.power.energy);
    opponent.health -= playerEnergyAttack;
    energyButton.disabled = true;
    
    if (gameOver(opponent.health)) {
        opponent.health = 0;
        printToScreen();
        endGame("Player won the fight!");
        return;
    }

    printToScreen();
    console.log("Player Energy Attack: " + playerEnergyAttack);

    setTimeout( () => {
        let opponentCounterAttack = attackDamage(opponent.counter);
        player.health -= opponentCounterAttack;
        
        if (gameOver(player.health)) {
            player.health = 0;
            printToScreen();
            endGame("Opponent won the fight!");
            return;
        }
        energyButton.disabled = false;
        printToScreen();
        console.log("Opponent Counter Attack: " + opponentCounterAttack);
    }, 2000)
}

const attackDamage = (power) => {
    return Math.floor(Math.random() * power);
}

const gameOver = (health) => {
    // health = 0;
    return health <= 0;
}

const endGame = (message) => {
    document.getElementById("marquee").textContent = message;
    document.getElementById("melee-button").hidden = true;
    document.getElementById("energy-button").hidden = true;
    document.getElementById("restart-button").hidden = false;
}

const restartGame = () => {
    let meleeButton = document.getElementById("melee-button");
    let energyButton = document.getElementById("energy-button");
    player.health = 1000;
    opponent.health = 1000;
    printToScreen();
    meleeButton.disabled = false;
    meleeButton.hidden = false;
    energyButton.disabled = false;
    energyButton.hidden = false;
    document.getElementById("marquee").textContent = "";
    document.getElementById("restart-button").hidden = true;
}

const printToScreen = () => {
    document.getElementById("player-health").textContent = player.health;
    document.getElementById("opponent-health").textContent = opponent.health;
}

printToScreen();

