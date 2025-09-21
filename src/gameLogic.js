import chalk from "chalk";
import { select } from "@inquirer/prompts";
import {startTimer, endGame } from "./timer.js";

export async function mainMenu(gameState) {
    //displays main menu, allows player to exit or continue

    console.log(chalk.blue("Time for Trivia!"));

    let ready = await select({
        message: "When ready, select Begin with the arrow keys to start the timer and begin the game!\nYou will have 3 minutes to answer all 5 questions.",
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

export async function startGame(gameState) {

    startTimer(gameState);

    for (let question of qAndA) {
        //if time runs out, don't repeat questions
        if (gameState.over) break;

        //loops through each question, determines T or F
        let answer = await select({
            message: question.question,
            choices: question.options.map(opt => ({
                name: opt.text,
                value: opt.id
            }))
        })
        let chosen = question.options.find(opt => opt.id === answer);

        if (chosen.isCorrect) {
            console.log(chalk.green("Correct!"));
            updateStats(chosen, gameState);
        } else {
            console.log(chalk.yellow("Incorrect answer."));
            updateStats(chosen, gameState);
        }
    }

    endGame(gameState);
    gameState.over = true;
}

//stores questions
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

export function updateStats(chosen, gameState) {
    if (chosen.isCorrect) {
        gameState.stats.wins += 1;
    } else {
        gameState.stats.losses += 1;
    }
}

export function showStats(gameState) {
    console.log(chalk.gray.underline("\nGame Statistics:"));
    console.log(chalk.green(`Correct answers: ${gameState.stats.wins}`));
    console.log(chalk.red(`Incorrect answers: ${gameState.stats.losses}`));
}