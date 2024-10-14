import { consoleColors as colors } from "./consoleColors.js";

export const logSuccess = (message) => {
    console.log(`${colors.green}${message}${colors.reset}`);
};

export const logError = (error) => {
    console.log(`${colors.red}Operation failed: ${error.message}${colors.reset}`);
};

export const logInfo = (message) => {
    console.log(`${colors.cyan}${message}${colors.reset}`);
};

export const logWarning = (message) => {
    console.log(`${colors.yellow}${message}${colors.reset}`);
};

export const logMagenta = (message) => {
    console.log(`${colors.magenta}${message}${colors.reset}`);
};

export const logBlue = (message) => {
    console.log(`${colors.blue}${message}${colors.reset}`);
};

export const logWithColor = (message, color) => {
    const colorCode = colors[color] || colors.reset; // Если цвет не найден, используем reset
    console.log(`${colorCode}${message}${colors.reset}`);
};
