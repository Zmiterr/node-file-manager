import { chdir, cwd } from 'node:process';
import os from 'node:os';
import readline from 'node:readline';
import {getUsername} from "./user.js";
import {handleCommand} from "./comands.js";

const username = getUsername()
console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${cwd()}`);

chdir(os.homedir());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

rl.on('line', (line) => {
    handleCommand(line.trim());
    rl.prompt();
}).on('close', () => {
    console.log(`Thank you for using File Manager, ${username} goodbye!`);
    process.exit(0);
});

rl.prompt();
