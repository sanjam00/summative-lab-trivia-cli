#!/usr/bin/env node

import {program} from "commander";
import gameState from "../src/state.js";
import { mainMenu } from "../src/gameLogic.js";

mainMenu(gameState);
// program.parse(process.argv);

//comment