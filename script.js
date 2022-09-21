// Warn a user that the project is WIP
console.warn('This project is currently a WIP. As of now, it already works as a CLI game and a final product will contain a fully-fledged GUI.');
console.warn('You can start a game by typing playGame(). This game is unfinished and might lack simple features. You were warned.');

// TO-DO:
// PROMPT CANCELLATION

// FUNCTIONS PART

// Convert 012 to RPS (emoji or text)
function convertToRps(value, type) {
    if (type === 'emoji') {
        switch (value) {
            case 0:
                return '🪨';
            case 1:
                return '🧻';
            case 2:
                return '🗡️';
        }
    } else if (type === 'text') {
        switch (value) {
            case 0:
                return 'Rock! 🪨';
            case 1:
                return 'Paper! 🧻';
            case 2:
                return 'Sword! 🗡️';
        }
    }
}

// Generate and return AI's choice (012 as RPS)
function getAiChoice() {
    return Math.floor(Math.random() * 3);
}

// Get a user's choice and return it converted (RPS to 012)
function getUserChoice(message = 'Please, choose Rock, Paper or Sword!', placeholder = convertToRps(getAiChoice(), 'text')) {
    const PATTERNS = [/rock/i, /paper/i, /sword/i];

    let choice = prompt(message, placeholder);
    
    for (let i = 0; i < 3; i++) {
        if (PATTERNS[i].exec(choice)) {
            choice = PATTERNS[i].exec(choice)[0];
            break;
        }
    }

    switch (choice.toLowerCase()) {
        case 'rock' || 'r' || '🪨':
            return 0;
        case 'paper' || 'p' || '🧻':
            return 1;
        case 'sword' || 's' || '🗡️':
            return 2;
        default:
            return getUserChoice('You haven\'t chosen anything! Please, try again.');
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

    for (let i = 0; i < rounds; i++) {
        pOne = getUserChoice();
        pTwo = getAiChoice();

        console.group(`%cRound ${i + 1}`,
        'font-size: 18px; background-color: #1B2430;')
        console.log(`%cYour ${convertToRps(pOne, 'emoji')} %cVS %cAI's ${convertToRps(pTwo, 'emoji')}`,
        'font-size: 16px;',
        'font-size: 24px;',
        'font-size: 16px;'
        );

        switch (getRound(pOne, pTwo)) {
            case 0:
                oneWins++;
                console.log('%cYou won this one!',
                'font-size: 14px;');
                break;
            case 1:
                twoWins++;
                console.log('%cAI beats you.',
                'font-size: 14px;');
                break;
            case 2:
                console.log('%cIt\'s a draw!',
                'font-size: 14px;');
                break;
        }
        console.groupEnd();

        // Break the loop if someone has already won
        if (oneWins * 2 > rounds || twoWins * 2 > rounds) {
            break;
        }
    }

    console.log('%cEnd of the game',
    'font-size: 24px;');

    if (oneWins > twoWins) {
        console.log('%cYou are the winner!',
        'font-size: 24px;');
    } else if (twoWins > oneWins) {
        console.log('%cAI wins!',
        'font-size: 24px;');
    } else {
        console.log('%cIt\'s a draw!',
        'font-size: 24px;');
    }
}