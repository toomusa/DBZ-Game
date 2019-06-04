
let player = {
    health: [],
    counter: 0,
    power: {
        melee: 0,
        energy: 0
    }
}

let opponent = {
    health: "",
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
let meleeButton = document.getElementById("melee-button");
let energyButton = document.getElementById("energy-button");
let restartButton = document.getElementById("restart-button");
meleeButton.disabled = true;
energyButton.disabled = true;
let deathRow = [];

$("#b-energy").on("click", function() {
    if (energyButton.disabled === true) {
        if (playerPick === false && opponentPick === false) {
            $("#marquee-box").prepend("<div style='color: black'>You must first pick a fighter</div>");
        } else if (playerPick === true && opponentPick === false) {
            $("#marquee-box").prepend("<div style='color: black'>You must first pick an opponent</div>");
        } else if (player.health === 0) {
            meleeButton.disabled = true;
            energyButton.disabled = true;
        } else {
        $("#marquee-box").prepend("<div style='color: black'>You must wait for attack to recharge</div>");
        }
    } 
});

$("#b-melee").on("click", function() {
    if (meleeButton.disabled === true) {
        if (playerPick === false && opponentPick === false) {
            $("#marquee-box").prepend("<div style='color: black'>You must first pick a fighter</div>");
        } else if (playerPick === true && opponentPick === false) {
            $("#marquee-box").prepend("<div style='color: black'>You must first pick an opponent</div>");
        } else if (player.health === 0) {
            meleeButton.disabled = true;
            energyButton.disabled = true;
        } else {
        $("#marquee-box").prepend("<div style='color: black'>You must wait for attack to recharge</div>");
        } 
    }
});

$(document).on("click", ".dead", function() {
    $("#marquee-box").prepend("<div style='color: black'>Fool he already dead</div>");
});
// executes melee attack, deals damange, receives counter damage
// includes gameOver check and restartGame

const meleeAttack = () => {

    let playerMeleeAttack = attackDamage(player.power.melee);
    if (playerMeleeAttack <= 20) {
        $("#marquee-box").prepend("<div style='color: green'>You missed! No damage dealt</div>");
    } else {
        opponent.health -= playerMeleeAttack;
        $("#marquee-box").prepend("<div style='color: green'>You dealt " + playerMeleeAttack + " damage </div>");
    }

    $("#b-melee").addClass("toggle");
    setTimeout(function() {
        $("#b-melee").removeClass("toggle");
    }, 100);
    
    meleeButton.disabled = true;


    if (gameOver(opponent.health)) {
        opponent.health = 0;
        meleeButton.disabled = true;
        energyButton.disabled = true;
        $("#marquee-box").prepend("<div style='color: green'>You defeated " + opponentPickId + "!</div>");
        printToScreen();
        nextFighter();
        // endGame("You won! You're the strongest fighter in the universe!");
        // return;
    }

    printToScreen();
    console.log("Player Melee Attack: " + playerMeleeAttack);

    setTimeout( () => {
        let opponentCounterAttack = attackDamage(opponent.counter);
        if (opponent.health > 0) {
            let opponentCounterAttack = attackDamage(opponent.counter);
            if (opponentCounterAttack <= 20) {
                $("#marquee-box").prepend("<div style='color: red'>" + opponentPickId + " missed! No damage dealt</div>");
            } else {
                player.health -= opponentCounterAttack;
                $("#marquee-box").prepend("<div style='color: red'>" + opponentPickId + " countered with " + opponentCounterAttack + " damage </div>");
            }
            
            printToScreen();
        }

        if (gameOver(player.health)) {
            player.health = 0;
            meleeButton.disabled = true;
            energyButton.disabled = true;
            $("#marquee-box").prepend("<div style='color: red'>" + opponentPickId + " defeated you!</div>");
            setTimeout(() => {
                $("#marquee-box").prepend("<div style='color: black'>Click restart to play again</div>");
            }, 400);
            printToScreen();
            // endGame("Opponent won the fight!");
            return;
        }
        
        meleeButton.disabled = false;
        if (gameOver(opponent.health)) {
            meleeButton.disabled = true;
            energyButton.disabled = true;
        }
        printToScreen();
        console.log("Opponent Counter Attack: " + opponentCounterAttack);
    }, 200)
}

// executes energy attack, deals damange, receives counter damage
// includes gameOver check and restartGame

const energyAttack = () => {

    let playerEnergyAttack = attackDamage(player.power.energy);
    if (playerEnergyAttack <= 20) {
        $("#marquee-box").prepend("<div style='color: green'>You missed! No damage dealt</div>");
    } else {
        opponent.health -= playerEnergyAttack;
        $("#marquee-box").prepend("<div style='color: green'>You dealt " + playerEnergyAttack + " damage </div>");
    }
    
    $("#b-energy").addClass("toggle");
    setTimeout(function() {
        $("#b-energy").removeClass("toggle");
    }, 100);

    energyButton.disabled = true;
    
    if (gameOver(opponent.health)) {
        opponent.health = 0;
        meleeButton.disabled = true;
        energyButton.disabled = true;
        $("#marquee-box").prepend("<div style='color: green'>You defeated " + opponentPickId + "!</div>");
        // setTimeout(() => {
        //     $("#marquee-box").prepend("<div style='color: black'>Pick your next opponent</div>");
        // }, 400);
        printToScreen();
        nextFighter();
        // endGame("You won! You're the strongest fighter in the universe!");
    }

    printToScreen();
    console.log("Player Energy Attack: " + playerEnergyAttack);

    if (opponent.health > 0) {
        setTimeout ( () => {
            let opponentCounterAttack = attackDamage(opponent.counter);
            if (opponentCounterAttack <= 20) {
                $("#marquee-box").prepend("<div style='color: red'>" + opponentPickId + " missed! No damage dealt</div>");
            } else {
                player.health -= opponentCounterAttack;
                $("#marquee-box").prepend("<div style='color: red'>" + opponentPickId + " countered with " + opponentCounterAttack + " damage </div>");
            }
            printToScreen();
            console.log("Opponent Counter Attack: " + opponentCounterAttack);
        },200);
    }

    setTimeout( () => {
        if (gameOver(player.health)) {
            player.health = 0;
            meleeButton.disabled = true;
            energyButton.disabled = true;
            $("#marquee-box").prepend("<div style='color: red'>" + opponentPickId + " defeated you! You lose</div>");
            // setTimeout(() => {
            //     $("#marquee-box").prepend("<div style='color: black'>Click restart to play again</div>");
            // }, 400);
            printToScreen();
            return;
            // endGame("Opponent won the fight!");
        }
        energyButton.disabled = false;
        
        if (gameOver(opponent.health)) {
            meleeButton.disabled = true;
            energyButton.disabled = true;
        }
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
    if (deathRow.length === 4) {
        $("#marquee-box").prepend("<div style='color: black'>" + message + "</div>");
        document.getElementById("melee-button").disabled = true;
        document.getElementById("energy-button").disabled = true;
    } else {
        nextFighter();
    }
}

const nextFighter = () => {
    if (deathRow.length === 3) {
        $("#active-opponent-name").html("<br>");
        $("#death-row").append($(".active-enemy"));
        deathRow.push(opponentPickId);
        $(".active-enemy").addClass("dead");
        $(".dead").removeClass("active-enemy");
        $(".dead").removeClass("char");
        charSwap();
        $("#marquee-box").prepend("<div style='color: black'>You won! You're the strongest fighter in the universe!</div>");
        meleeButton.disabled = true;
        energyButton.disabled = true;
        $("#b-melee").off("click");
        $("#b-energy").off("click");
    } else {
        setTimeout(() => {
            $("#marquee-box").prepend("<div style='color: black'>Pick your next opponent</div>");
        }, 200);
        opponent.health = 0;
        opponent.counter = 0;
        opponent.power.melee = 0;
        opponent.power.energy = 0;
        oHealth.textContent = "";
        oCounter.textContent = "";
        oMelee.textContent = "";
        oEnergy.textContent = "";
        opponentPick = false;
        activeOpponentName.textContent = "Next Fighter";
        meleeButton.disabled = true;
        energyButton.disabled = true;
        $(".char").disabled = false;
        $("#death-row").append($(".active-enemy"));
        deathRow.push(opponentPickId);
        $(".active-enemy").addClass("dead");
        $(".dead").removeClass("active-enemy");
        $(".dead").removeClass("char");
        // $(".dead").off("click");
        charSwap();
    }
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
    // document.getElementById("marquee-box").textContent = "";
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

    function playerMatch() {
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
    }
    function opponentMatch() {
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
            oMelee.textContent = beerus.power.melee;
            oEnergy.textContent = beerus.power.energy;
        }
    }

    $(document).on("click", ".char", function charSelect() {
        if (playerPick === false && opponentPick === false) {
            $(this).removeClass("char").addClass("active-player");
            $(this).next(".label").empty();
            charSwap();
            $("#player-active").append($(this));       
            $(".active-player").off("click");
            playerPick = true;
            playerPickId = $(this).attr("id");
            activePlayerName.textContent = playerPickId;
            playerMatch();
            printStats();
            printToScreen();
            $("#marquee-box").prepend("<div style='color: green'>You picked " + playerPickId + "</div>");
            setTimeout(() => {
                $("#marquee-box").prepend("<div style='color: black'>Now select your opponent</div>");
            }, 400);
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
            opponentMatch();
            
            // if (deathRow.length > 0) {
            //     player.health = player.health     
            // }


            printStats();
            printToScreen();
            $("#marquee-box").prepend("<div style='color: red'>Your opponent is " + opponentPickId + "</div>");
            setTimeout(() => {
                $("#marquee-box").prepend("<div style='color: black'>Ready to attack!</div>");
            }, 400);
            if (playerPick === true && opponentPick === true) {
                meleeButton.disabled = false;
                energyButton.disabled = false;
            }
            // pick opponent fighter
        }
        else {
            $(".char").disabled = true;
            //can't click characters
        }
    })



// additional features

    // on image hover, show fighter stats using modal
    // format text throughout
    // styling and background pics
    // double player health at nextFighter instead of reset

// bonus features

    // defeat enemy, go super saiyan
    // turn charMatch, charSwap, and printStats into for loops
    // miss a turn after using energy attack (double counter)
    // miss an attack if random attack power is less than 20 (double counter)
    // fully reset on restart instead of reload

// issues

    // images without char class are still choosable 
    // can click-off and display message coexist?
