import os from 'node:os';
import {consoleColors as colors} from "./consoleColors.js";



export const getEOL = () => {
    console.log(`${colors.blue}System End-Of-Line: ${JSON.stringify(os.EOL, null, 2)}${colors.reset}`);
};

export const getCPUsInfo = () => {
    const cpus = os.cpus();
    console.log(`${colors.green}Number of CPUs: ${cpus.length}${colors.reset}`);

    cpus.forEach((cpu, index) => {
        console.log(
            `${colors.yellow}CPU ${index + 1}:${colors.reset} ` +
            `${colors.cyan}Model: ${cpu.model}${colors.reset}, ` +
            `${colors.magenta}Speed: ${(cpu.speed / 1000).toFixed(2)} GHz${colors.reset}`
        );
    });
};

export const getHomeDirectory = () => {
    console.log(`${colors.green}Home Directory: ${os.homedir()}${colors.reset}`);
};

export const getSystemUsername = () => {
    console.log(`${colors.green}System Username: ${os.userInfo().username}${colors.reset}`);
};

export const getArchitecture = () => {
    console.log(`${colors.green}CPU Architecture: ${os.arch()}${colors.reset}`);
};
