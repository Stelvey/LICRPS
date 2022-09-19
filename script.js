// Warn a user that the project is WIP
console.warn(getWelcome());




// FUNCTIONS PART
// Placeholder notifying user that the project is WIP
function getWelcome() {
    return 'This project is currently a WIP. Please, come back later. It will first be available as a CLI game and a final product will contain a fully-fledged GUI. Thank you for understanding!';
}

// Generate and return AI's choice (012 as RPS)
function getAiChoice() {
    return Math.floor(Math.random() * 3);
}

// Evaluate the winner of a round (0 for P1, 1 for AI, 2 for Draw)
function getRound(pOne, pTwo) {
    if (pOne === pTwo) {
        return 2;
    } 
    
    switch(pOne + pTwo) {
        case 1:
            if (pOne === 1) {
                return 0;
            } else {
                return 1;
            }
        case 2:
            if (pOne === 0) {
                return 0;
            } else {
                return 1;
            }
        case 3:
            if (pOne === 2) {
                return 0;
            } else {
                return 1;
            }
    }
}

// PLAY A GAME WITH SPECIFIC AMOUNT OF ROUNDS AND THEN REPORT A GAME WINNER
