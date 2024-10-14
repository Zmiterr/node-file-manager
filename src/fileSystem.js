import { chdir, cwd } from 'node:process';
import { dirname, join, resolve } from 'node:path';
import { lstatSync } from 'node:fs';
import fs from 'node:fs';
import { consoleColors as colors } from "./consoleColors.js";
import {logError, logInfo, logSuccess} from "./colorLogger.js";

export const goUp = () => {
    const currentDir = cwd();
    const parentDir = dirname(currentDir);
    if (currentDir !== parentDir) {
        chdir(parentDir);
        logInfo(`Changed directory to: ${parentDir}`);
    }
};

export const changeDirectory = newPath => {
    try {
        const resolvedPath = resolve(cwd(), newPath);
        chdir(resolvedPath);
        logSuccess(`Changed directory to: ${resolvedPath}`);
    } catch (err) {
        logError(`${colors.red}Operation failed: ${err.message}`);
    }
};

export const listDirectory = async () => {
    try {
        const currentPath = cwd();
        const items = await fs.promises.readdir(currentPath);

        const tableData = items.map(item => {
            const itemPath = resolve(currentPath, item);
            const isDirectory = lstatSync(itemPath).isDirectory();
            return {
                Name: item,
                Type: isDirectory ? 'Directory' : 'File',
            };
        });

        tableData.sort((a, b) => {
            if (a.Type === b.Type) {
                return a.Name.localeCompare(b.Name);
            }
            return a.Type === 'Directory' ? -1 : 1;
        });

        console.table(tableData);

    } catch (err) {
        logError(`${colors.red}Operation failed: ${err.message}`);
    }
};

export const readFile = filePath => {
    const fullPath = resolve(cwd(), filePath);
    const readStream = fs.createReadStream(fullPath, 'utf-8');

    readStream.on('data', chunk => {
        console.log(`File content:\n${chunk}`);
    });

    readStream.on('error', err => {
        logError(`${colors.red}Operation failed: ${err.message}`);
    });
};

export const addFile = async fileName => {
    try {
        const fullPath = join(cwd(), fileName);
        const writeStream = fs.createWriteStream(fullPath, { flags: 'wx' });

        writeStream.on('finish', () => {
            console.log(`File created: ${fullPath}`);
        });

        writeStream.on('error', err => {
            console.log(`${colors.red}Operation failed: ${err.message}`);
        });

        writeStream.end();
    } catch (err) {
        logError(`${colors.red}Operation failed: ${err.message}`);
    }
};

export const renameFile = async (oldPath, newPath) => {
    try {
        const resolvedOldPath = resolve(cwd(), oldPath);
        const resolvedNewPath = resolve(cwd(), newPath);
        await fs.promises.rename(resolvedOldPath, resolvedNewPath);
        logSuccess(`Renamed file from ${resolvedOldPath} to ${resolvedNewPath}`);
    } catch (err) {
        logError(`${colors.red}Operation failed: ${err.message}`);
    }
};

export const copyFileToDestination = (srcPath, destPath) => {
    const resolvedSrc = resolve(cwd(), srcPath);
    const resolvedDest = resolve(cwd(), destPath);

    const readStream = fs.createReadStream(resolvedSrc);
    const writeStream = fs.createWriteStream(resolvedDest);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        logSuccess(`Copied file from ${resolvedSrc} to ${resolvedDest}`);
    });

    writeStream.on('error', err => {
        logError(`${colors.red}Operation failed: ${err.message}`);
    });

    readStream.on('error', err => {
        logError(`${colors.red}Operation failed: ${err.message}`);
    });
};

export const removeFile = async filePath => {
    try {
        const resolvedPath = resolve(cwd(), filePath);
        await fs.promises.unlink(resolvedPath);
        logSuccess(`Removed file: ${resolvedPath}`);
    } catch (err) {
        logError(`${colors.red}Operation failed: ${err.message}`);
    }
};

export const moveFile = async (srcPath, destPath) => {
    try {
        copyFileToDestination(srcPath, destPath);
        await removeFile(srcPath);
        logSuccess(`Moved file from ${srcPath} to ${destPath}`);
    } catch (err) {
        logError(`${colors.red}Operation failed: ${err.message}`);
    }
};
