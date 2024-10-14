import fs from 'node:fs';
import crypto from 'node:crypto';
import {consoleColors as colors} from "./consoleColors.js";

export const calculateFileHash = (filePath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            const result = hash.digest('hex');
            console.log(`${colors.cyan}Hash of the file: ${result}${colors.reset}`);
            resolve(result);
        });

        stream.on('error', (error) => {
            console.log(`${colors.red}Operation failed: ${error.message}${colors.reset}`);
            reject(error);
        });
    });
};
