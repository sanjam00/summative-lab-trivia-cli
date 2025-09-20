import chalk from "chalk";
import { select } from "@inquirer/prompts";

export async function mainMenu(gameState) {

    console.log(chalk.blue("Time for Trivia!"));

    let ready = await select({
        message: "When ready, select Begin with the arrow keys to start the timer and begin the game!\nYou will have 5 minutes to answer all 5 questions.",
        choices: [
            { name: "Begin", value: "begin" },
            { name: "Quit", value: "quit" }
        ]
    })

    switch (ready) {
        case "begin":
            await startGame(gameState);
            break;
        case "quit":
            console.log("Goodbye!");
            break;
    }

    return ready;
}

//error with startGame logic. seemingly everything else works. 
//add game is finished message after all questions are complete.
export async function startGame(gameState) {

    startTimer(gameState);

    for (let question of qAndA) {
        let answer = await select({
            message: question.question,
            choices: question.options.map(opt => ({
                name: opt.text,
                value: opt.id
            }))
        })
        let chosen = question.options.find(opt => opt.id === answer);

        updateStats(answer, gameState);

        if (chosen.isCorrect) {
            console.log(chalk.green("Correct!"));
        } else {
            console.log(chalk.gray("Incorrect answer."));
        }
    }
    
    endGame(gameState);
}

let qAndA = [
    {
        "id": 1,
        "question": "How many brains does an octopus have?",
        "options": [
            {
                "id": 1,
                "text": "1",
                "isCorrect": false
            },
            {
                "id": 2,
                "text": "5",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "9",
                "isCorrect": true
            },
            {
                "id": 4,
                "text": "8",
                "isCorrect": false
            }
        ]
    },
    {
        "id": 2,
        "question": "How many bones are in the human body?",
        "options": [
            {
                "id": 1,
                "text": "207",
                "isCorrect": false
            },
            {
                "id": 2,
                "text": "326",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "126",
                "isCorrect": false
            },
            {
                "id": 4,
                "text": "206",
                "isCorrect": true
            }
        ]
    },
    {
        "id": 3,
        "question": "What was the name of the first computer virus?",
        "options": [
            {
                "id": 1,
                "text": "Creeper",
                "isCorrect": true
            },
            {
                "id": 2,
                "text": "Storm Worm",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "Conficker",
                "isCorrect": false
            },
            {
                "id": 4,
                "text": "Code Red",
                "isCorrect": false
            }
        ]
    },
    {
        "id": 4,
        "question": "Who is the director of the critically acclaimed film “Parasite”?",
        "options": [
            {
                "id": 1,
                "text": "Bong Joon-ho",
                "isCorrect": true
            },
            {
                "id": 2,
                "text": "Park Chan-wook",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "Takashi Miike",
                "isCorrect": false
            },
            {
                "id": 4,
                "text": "Im Kwon-taek",
                "isCorrect": false
            }
        ]
    },
    {
        "id": 5,
        "question": "How many hearts does an octopus have?",
        "options": [
            {
                "id": 1,
                "text": "4",
                "isCorrect": false
            },
            {
                "id": 2,
                "text": "3",
                "isCorrect": true
            },
            {
                "id": 3,
                "text": "2",
                "isCorrect": false
            },
            {
                "id": 4,
                "text": "1",
                "isCorrect": false
            }
        ]
    },
];

const totalTime = 5 * 60;
export function startTimer(gameState) {

    let timeLeft = totalTime;

    console.log(chalk.yellow(`You have ${totalTime / 60} minutes left!`));

    const interval = setInterval(() => {
        timeLeft--;

        if (timeLeft === 300) console.log(chalk.magenta("5 minutes remaining."));
        if (timeLeft === 180) console.log(chalk.magenta("3 minutes remaining."));
        if (timeLeft === 60) console.log(chalk.magenta("1 minute remaining"))

        if (timeLeft < 0) {
            clearInterval(interval);
            console.log(chalk.red.bold(`Time's up! The game is over.`));

            const answered = gameState.stats.wins + gameState.stats.losses;
            const unanswered = gameState.totalQuestions - answered;

            gameState.stats.losses += unanswered;
            gameState.over = true;

            showStats(gameState);
        }
    }, 1000);

    return interval;
}

//the value of answer will be boolean yes? therefore should work as a parameter?
//create updatesstats and pass boolean as result. if boolean is tru update stats to 1
export function updateStats(answer, gameState) {
    if (answer === true) {
        gameState.stats.wins += 1;
    } else {
        gameState.stats.losses += 1;
    }
}

export function endGame(gameState){
    //display message that says "You finished the game! Here's your statistics:"
    console.log(showStats(gameState));
    //stop timer
    //display how much time was left or how long the player took to finish the game
    //do I need to integrate startTimer or change the clearInterval logic within startTimer?
}

export function showStats(gameState) {
    console.log(chalk.gray.underline("Game Statistics:"));
    console.log(chalk.green(`Correct answers: ${gameState.stats.wins}`));
    console.log(chalk.red(`Incorrect answers: ${gameState.stats.losses}`));
}