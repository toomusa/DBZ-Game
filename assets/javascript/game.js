
let player = {
    health: 0,
    counter: 0,
    power: {
        melee: 0,
        energy: 0
    }
}

let opponent = {
    health: 0,
    counter: 0,
    power: {
        melee: 0,
        energy: 0
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

pHealth = document.getElementById("p-health");
pCounter = document.getElementById("p-counter");
pMelee = document.getElementById("p-melee");
pEnergy = document.getElementById("p-energy");
oHealth = document.getElementById("o-health");
oCounter = document.getElementById("o-counter");
oMelee = document.getElementById("o-melee");
oEnergy = document.getElementById("o-energy");
activePlayerName = document.getElementById("active-player-name");
activeOpponentName = document.getElementById("active-opponent-name");
marquee = document.getElementById("marquee-box");

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
        nextFighter();
        // endGame("Player won the fight!");
        // return;
    }

    printToScreen();
    console.log("Player Melee Attack: " + playerMeleeAttack);

    setTimeout( () => {
        let opponentCounterAttack = attackDamage(opponent.counter);
        player.health -= opponentCounterAttack;
        
        if (gameOver(player.health)) {
            player.health = 0;
            printToScreen();
            nextFighter();
            // endGame("Opponent won the fight!");
            // return;
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
        nextFighter();
        // endGame("Player won the fight!");
    }

    printToScreen();
    console.log("Player Energy Attack: " + playerEnergyAttack);

    setTimeout( () => {
        let opponentCounterAttack = attackDamage(opponent.counter);
        player.health -= opponentCounterAttack;
        
        if (gameOver(player.health)) {
            player.health = 0;
            printToScreen();
            nextFighter();
            // endGame("Opponent won the fight!");
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
    document.getElementById("melee-button").disabled = true;
    document.getElementById("energy-button").disabled = true;
    // document.getElementById("restart-button").hidden = false;
}

const nextFighter = () => {
    opponent.health = 0;
    opponent.counter = 0;
    opponent.power.melee = 0;
    opponent.power.energy = 0;
    oHealth.textContent = "";
    oCounter.textContent = "";
    oMelee.textContent = "";
    oEnergy.textContent = "";
    opponentPick = false;
    activeOpponentName.textContent = "";
    $(".char").disabled = false;
    $("#death-row").append($(".active-enemy"));
    $(".active-enemy").addClass("dead");
    $(".dead").removeClass("active-enemy");
    $(".dead").off("click");
    charSwap();
}

// resets the game 

const restartGame = () => {
    location.reload(true);
    // let meleeButton = document.getElementById("melee-button");
    // let energyButton = document.getElementById("energy-button");
    // player.health = 0;
    // opponent.health = 0;
    // printToScreen();
    // meleeButton.disabled = false;
    // meleeButton.hidden = false;
    // energyButton.disabled = false;
    // energyButton.hidden = false;
    // document.getElementById("marquee").textContent = "";
    // document.getElementById("restart-button").hidden = true;
}

// displays health information on screen 

const printToScreen = () => {
    document.getElementById("player-health").textContent = player.health;
    document.getElementById("opponent-health").textContent = opponent.health;
}

printToScreen();
   
    var playerPick = false;
    var opponentPick = false;
    let playerPickId;
    let opponentPickId;

    function charSwap() {
        if ($("#Goku").hasClass("active-player")) {
            $("#Goku").attr("src", "./assets/images/goku2.png");
        };
        if ($("#Vegeta").hasClass("active-player")) {
            $("#Vegeta").attr("src", "./assets/images/vegeta2.png")
        };
        if ($("#Frieza").hasClass("active-player")) {
            $("#Frieza").attr("src", "./assets/images/frieza2.png")
        };
        if ($("#Beerus").hasClass("active-player")) {
            $("#Beerus").attr("src", "./assets/images/beerus2.png")
        };
        if ($("#Jiren").hasClass("active-player")) {
            $("#Jiren").attr("src", "./assets/images/jiren2.png")
        };
        if ($("#Goku").hasClass("active-enemy")) {
            $("#Goku").attr("src", "./assets/images/goku2.png");
        };
        if ($("#Vegeta").hasClass("active-enemy")) {
            $("#Vegeta").attr("src", "./assets/images/vegeta2.png")
        };
        if ($("#Frieza").hasClass("active-enemy")) {
            $("#Frieza").attr("src", "./assets/images/frieza2.png")
        };
        if ($("#Beerus").hasClass("active-enemy")) {
            $("#Beerus").attr("src", "./assets/images/beerus2.png")
        };
        if ($("#Jiren").hasClass("active-enemy")) {
            $("#Jiren").attr("src", "./assets/images/jiren2.png")
        };
        if ($("#Goku").hasClass("dead")) {
            $("#Goku").attr("src", "./assets/images/goku1.png");
        };
        if ($("#Vegeta").hasClass("dead")) {
            $("#Vegeta").attr("src", "./assets/images/vegeta1.png")
        };
        if ($("#Frieza").hasClass("dead")) {
            $("#Frieza").attr("src", "./assets/images/frieza1.png")
        };
        if ($("#Beerus").hasClass("dead")) {
            $("#Beerus").attr("src", "./assets/images/beerus1.png")
        };
        if ($("#Jiren").hasClass("dead")) {
            $("#Jiren").attr("src", "./assets/images/jiren1.png")
        };
    }

    function charMatch() {
        if (playerPickId == "Goku") {
            player.health = goku.health;
            pCounter.textContent = goku.counter;
            player.power.melee = goku.power.melee;
            player.power.energy = goku.power.energy;
        }
        if (playerPickId == "Vegeta") {
            player.health = vegeta.health;
            pCounter.textContent = vegeta.counter;
            player.power.melee = vegeta.power.melee;
            player.power.energy = vegeta.power.energy;
        }
        if (playerPickId == "Jiren") {
            player.health = jiren.health;
            pCounter.textContent = jiren.counter;
            player.power.melee = jiren.power.melee;
            player.power.energy = jiren.power.energy;
        }
        if (playerPickId == "Frieza") {
            player.health = frieza.health;
            pCounter.textContent = frieza.counter;
            player.power.melee = frieza.power.melee;
            player.power.energy = frieza.power.energy;
        }
        if (playerPickId == "Beerus") {
            player.health = beerus.health;
            pCounter.textContent = beerus.counter;
            player.power.melee = beerus.power.melee;
            player.power.energy = beerus.power.energy;
        }
        if (opponentPickId == "Goku") {
            opponent.health = goku.health;
            opponent.counter = goku.counter;
            opponent.power.melee = goku.power.melee;
            opponent.power.energy = goku.power.energy;
        }
        if (opponentPickId == "Vegeta") {
            opponent.health = vegeta.health;
            opponent.counter = vegeta.counter;
            opponent.power.melee = vegeta.power.melee;
            opponent.power.energy = vegeta.power.energy;
        }
        if (opponentPickId == "Jiren") {
            opponent.health = jiren.health;
            opponent.counter = jiren.counter;
            opponent.power.melee = jiren.power.melee;
            opponent.power.energy = jiren.power.energy;
        }
        if (opponentPickId == "Frieza") {
            opponent.health = frieza.health;
            opponent.counter = frieza.counter;
            opponent.power.melee = frieza.power.melee;
            opponent.power.energy = frieza.power.energy;
        }
        if (opponentPickId == "Beerus") {
            opponent.health = beerus.health;
            opponent.counter = beerus.counter;
            opponent.power.melee = beerus.power.melee;
            opponent.power.energy = beerus.power.energy;
        }
    }


    const printStats = () => {
        if (playerPickId == "Goku") {
            pHealth.textContent = goku.health;
            pCounter.textContent = goku.counter;
            pMelee.textContent = goku.power.melee;
            pEnergy.textContent = goku.power.energy;
        }
        if (playerPickId == "Vegeta") {
            pHealth.textContent = vegeta.health;
            pCounter.textContent = vegeta.counter;
            pMelee.textContent = vegeta.power.melee;
            pEnergy.textContent = vegeta.power.energy;
        }
        if (playerPickId == "Jiren") {
            pHealth.textContent = jiren.health;
            pCounter.textContent = jiren.counter;
            pMelee.textContent = jiren.power.melee;
            pEnergy.textContent = jiren.power.energy;
        }
        if (playerPickId == "Frieza") {
            pHealth.textContent = frieza.health;
            pCounter.textContent = frieza.counter;
            pMelee.textContent = frieza.power.melee;
            pEnergy.textContent = frieza.power.energy;
        }
        if (playerPickId == "Beerus") {
            pHealth.textContent = beerus.health;
            pCounter.textContent = beerus.counter;
            pMelee.textContent = beerus.power.melee;
            pEnergy.textContent = beerus.power.energy;
        }
        if (opponentPickId == "Goku") {
            oHealth.textContent = goku.health;
            oCounter.textContent = goku.counter;
            oMelee.textContent = goku.power.melee;
            oEnergy.textContent = goku.power.energy;
        }
        if (opponentPickId == "Vegeta") {
            oHealth.textContent = vegeta.health;
            oCounter.textContent = vegeta.counter;
            oMelee.textContent = vegeta.power.melee;
            oEnergy.textContent = vegeta.power.energy;
            
        }
        if (opponentPickId == "Jiren") {
            oHealth.textContent = jiren.health;
            oCounter.textContent = jiren.counter;
            oMelee.textContent = jiren.power.melee;
            oEnergy.textContent = jiren.power.energy;
        }
        if (opponentPickId == "Frieza") {
            oHealth.textContent = frieza.health;
            oCounter.textContent = frieza.counter;
            oMelee.textContent = frieza.power.melee;
            oEnergy.textContent = frieza.power.energy;
        }
        if (opponentPickId == "Beerus") {
            oHealth.textContent = beerus.health;
            oCounter.textContent = beerus.counter;
            onmouseleave.textContent = beerus.power.melee;
            oEnergy.textContent = beerus.power.energy;
        }
    }

    $(".char").on("click", function charSelect() {
        if (playerPick === false && opponentPick === false) {
            $(this).removeClass("char").addClass("active-player");
            $(this).next(".label").empty();
            charSwap();
            $("#player-active").append($(this));
            playerPick = true;
            playerPickId = $(this).attr("id");
            activePlayerName.textContent = playerPickId;
            charMatch();
            printStats();
            printToScreen();
            // pick your fighter
        }
        else if (playerPick === true && opponentPick === false) {
            $(this).removeClass("char").addClass("active-enemy");
            $(this).next(".label").empty();
            charSwap();
            $("#opponent-active").append($(this));
            opponentPick = true;
            opponentPickId = $(this).attr("id");
            activeOpponentName.textContent = opponentPickId;
            charMatch();
            printStats();
            printToScreen();
            // pick opponent fighter
        }
        else {
            $(".char").disabled = true;
            //can't click characters
        }
    })

    
   

// additional features

    // on image hover, show fighter stats using modal
    // change attack buttons
    // disable attack buttons between gameOver and nextFighter
    // format text throughout
    // program game ticker
    // styling and background pics
    // game over and game won conditions
    // fully reset on restart

// bonus features

    // defeat enemy, go super saiyan
    // location.reload(true); to reload page
    // turn charMatch, charSwap, and printStats into for loops
    // miss a turn after using energy attack (double counter)
    // miss an attack if random attack power is less than 20 (double counter)


