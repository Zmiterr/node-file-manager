import fs from 'node:fs';
import zlib from 'node:zlib';
import {consoleColors as colors} from "./consoleColors.js";

export const compressFile = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        const source = fs.createReadStream(sourcePath);
        const destination = fs.createWriteStream(destinationPath);
        const brotli = zlib.createBrotliCompress();

        source.pipe(brotli).pipe(destination);

        destination.on('finish', () => {
            console.log(`${colors.green}File compressed successfully: ${destinationPath}${colors.reset}`);
            resolve();
        });

        destination.on('error', (error) => {
            console.log(`${colors.red}Operation failed: ${error.message}${colors.reset}`);
            reject(error);
        });
    });
};

export const decompressFile = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        const source = fs.createReadStream(sourcePath);
        const destination = fs.createWriteStream(destinationPath);
        const brotli = zlib.createBrotliDecompress();

        source.pipe(brotli).pipe(destination);

        destination.on('finish', () => {
            console.log(`${colors.green}File decompressed successfully: ${destinationPath}${colors.reset}`);
            resolve();
        });

        destination.on('error', (error) => {
            console.log(`${colors.red}Operation failed: ${error.message}${colors.reset}`);
            reject(error);
        });
    });
};
