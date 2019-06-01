
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

let goku = {
    health: 1400,
    counter: 50,
    power: {
        melee: 120,
        energy: 400
    }
};

let vegeta = {
    health: 800,
    counter: 100,
    power: {
        melee: 80,
        energy: 300
    }
};

let frieza = {
    health: 1200,
    counter: 70,
    power: {
        melee: 90,
        energy: 500
    }
};

let jiren = {
    health: 1300,
    counter: 200,
    power: {
        melee: 50,
        energy: 600
    }
};

let beerus = {
    health: 1500,
    counter: 150,
    power: {
        melee: 200,
        energy: 700
    }
};

// executes melee attack, deals damange, receives counter damage
// includes gameOver check and restartGame

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

// executes energy attack, deals damange, receives counter damage
// includes gameOver check and restartGame

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

// calculate attack damage at random

const attackDamage = (power) => {
    return Math.floor(Math.random() * power);
}

// boolean check for is the game over

const gameOver = (health) => {
    // health = 0;
    return health <= 0;
}

// resets buttons and prints message

const endGame = (message) => {
    document.getElementById("marquee").textContent = message;
    document.getElementById("melee-button").hidden = true;
    document.getElementById("energy-button").hidden = true;
    document.getElementById("restart-button").hidden = false;
}

// resets the game 

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

// displays health information on screen 

const printToScreen = () => {
    document.getElementById("player-health").textContent = player.health;
    document.getElementById("opponent-health").textContent = opponent.health;
}

printToScreen();



// part of the restartGame function

    // select character and assign to player

    // select character and assign to opponent
    

// insert character images to character selector

    // create 4 states: ready, player, opponent, dead

    // move character to correct box based on state


// enchance game mechanics

    // miss a turn after using energy attack (double counter)

    // miss an attack if random attack power is less than 20

    // function playerPick() {
    //     $(this).hasClass("char")
    // }

    // function opponentPick() {
    //     $(this).hasClass("char")
    // }
    
    var playerPick = false;
    var opponentPick = false;

    function charSwap() {
        if ($("#goku").hasClass("active")) {
            $("#goku").attr("src", "./assets/images/goku2.png");
        };
        if ($("#vegeta").hasClass("active")) {
            $("#vegeta").attr("src", "./assets/images/vegeta2.png")
        };
        if ($("#frieza").hasClass("active")) {
            $("#frieza").attr("src", "./assets/images/frieza2.png")
        };
        if ($("#beerus").hasClass("active")) {
            $("#beerus").attr("src", "./assets/images/beerus2.png")
        };
        if ($("#jiren").hasClass("active")) {
            $("#jiren").attr("src", "./assets/images/jiren2.png")
        };
    }


    $(".char").on("click", function charSelect() {
        if (playerPick === false && opponentPick === false) {
            $(this).removeClass("char").addClass("active");
            charSwap();
            $("#player-active").replaceWith($(this));
            playerPick = true;
            debugger;
            $(this).attr("id") = document.querySelector("id")
            activeFighter = 
            $(this) = beerus;
            player.health = beerus.health; // ???????????????
            printToScreen();
            console.log($(this));
            // pick your fighter
        }
        else if (playerPick === true && opponentPick === false) {
            $(this).removeClass("char").addClass("active");
            charSwap();
            $("#opponent-active").replaceWith($(this));
            opponentPick = true;
            // pick opponent fighter
        }
        else {
            $(".char").disabled = true;
            //can't click characters
        }
    })

    // on character click
    // if playerPick and enemyPick is false, pick a fighter
    // character id removed so pick can't be repicked
    // when dead, set enemyPick to false
    // assign a class to defeated enemy
    // to change image, use .html with img tags in quotes
    // defeat enemy, go super saiyan
    // gameEnd function for end game or pick next enemy
    // location.reload(true); to reload page

// additional features

    // on image hover, show fighter stats using modal
