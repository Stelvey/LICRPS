// Warn a user that the project is WIP
console.warn('This project is currently a WIP. Please, come back later. It will first be available as a CLI game and a final product will contain a fully-fledged GUI. Thank you for understanding!');
console.warn('DO THIS AT YOUR OWN RISK: You can force the unfinished game to start with playGame(). This might or might not work depending on the current state of the game');

// TO-DO:
// PROMPT CANCELLATION

// FUNCTIONS PART
// Generate and return AI's choice (012 as RPS)
function getAiChoice() {
    return Math.floor(Math.random() * 3);
}

// Get a user's choice and return it converted (RPS to 012)
function getUserChoice(message = 'Please, choose Rock, Paper or Scissors!', placeholder = 'Rock!') {
    const PATTERNS = [/rock/i, /paper/i, /scissors/i];

    let choice = prompt(message, placeholder);
    
    for (let i = 0; i < 3; i++) {
        if (PATTERNS[i].exec(choice)) {
            choice = PATTERNS[i].exec(choice)[0].toLowerCase();
            break;
        }
    }

    switch (choice) {
        case 'rock':
            return 0;
        case 'paper':
            return 1;
        case 'scissors':
            return 2;
        default:
            getUserChoice('You haven\'t chosen anything! Please, try again.', 'Rock!!!');
    }
}

// Evaluate the winner of a round (0 for P1, 1 for AI, 2 for Draw)
function getRound(pOne, pTwo) {
    if (pOne === pTwo) {
        return 2;
    } 
    
    switch (pOne + pTwo) {
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
function playGame(rounds = 3) {
    let oneWins = 0;
    let twoWins = 0;

    for (let i = 0; i < 3; i++) {
        pOne = getUserChoice();
        pTwo = getAiChoice();

        switch (getRound(pOne, pTwo)) {
            case 0:
                console.log('You won this one!');
                break;
            case 1:
                console.log('AI beats you.');
                break;
            case 2:
                console.log('It\'s a draw!');
                break;
        }
    }
}