import chalk from "chalk";
import { showStats } from "./gameLogic.js";

let interval;
const totalTime = 2 * 60;

export function startTimer(gameState) {

    gameState.startTime = Date.now();

    let timeLeft = totalTime;

    console.log(chalk.yellow(`You have ${totalTime / 60} minutes left!`));

    interval = setInterval(() => {
        timeLeft--;

        //warnings
        if (timeLeft === 300) console.log(chalk.magenta("\n5 minutes remaining."));
        if (timeLeft === 180) console.log(chalk.magenta("\n3 minutes remaining."));
        if (timeLeft === 60) console.log(chalk.magenta("\n1 minute remaining"))

        //when time runs out
        if (timeLeft < 0) {
            clearInterval(interval);
            console.log(chalk.red.bold(`\nTime's up! The game is over.`));

            const answered = gameState.stats.wins + gameState.stats.losses;
            const unanswered = gameState.totalQuestions - answered;

            gameState.stats.losses += unanswered;

            showStats(gameState);
            gameState.over = true;
            process.exit(0);
        }
    }, 1000);

    return interval;
}

export function endGame(gameState) {

    clearInterval(interval);

    console.log(chalk.cyan("\nYou finished the game!"));
    showStats(gameState);

    //finds the elapsed time
    const endTime = Date.now();
    const elapsedMs = endTime - gameState.startTime;
    const elapsedSec = Math.floor(elapsedMs / 1000);
    const elapsedMin = Math.floor(elapsedSec / 60);

    console.log(chalk.cyan(`\nYou finished in ${elapsedMin}m and ${elapsedSec}s!`))
}

export default { interval, totalTime };