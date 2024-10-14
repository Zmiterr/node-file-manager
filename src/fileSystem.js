import { chdir, cwd } from 'node:process';
import { dirname, join, resolve } from 'node:path';
import { lstatSync } from 'node:fs';
import { copyFile, readdir, readFile as fsReadFile, rename, unlink, writeFile } from 'node:fs/promises';

// ANSI escape codes for colors
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
};

export const goUp = () => {
    const currentDir = cwd();
    const parentDir = dirname(currentDir);
    if (currentDir !== parentDir) {
        chdir(parentDir);
        console.log(`${colors.green}Changed directory to: ${parentDir}${colors.reset}`);
    }
};

export const changeDirectory = newPath => {
    try {
        const resolvedPath = resolve(cwd(), newPath);
        chdir(resolvedPath);
        console.log(`${colors.green}Changed directory to: ${resolvedPath}${colors.reset}`);
    } catch (err) {
        console.log(`${colors.red}Operation failed: ${err.message}${colors.reset}`);
    }
};

export const listDirectory = async () => {
    try {
        const currentPath = cwd();
        const items = await readdir(currentPath);

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
        console.log(`${colors.red}Operation failed: ${err.message}${colors.reset}`);
    }
};

export const readFile = async filePath => {
    try {
        const fullPath = resolve(cwd(), filePath);
        const data = await fsReadFile(fullPath, 'utf-8');
        console.log(`${colors.green}File content:${colors.reset}\n${data}`);
    } catch (err) {
        console.log(`${colors.red}Operation failed: ${err.message}${colors.reset}`);
    }
};

export const addFile = async fileName => {
    try {
        const fullPath = join(cwd(), fileName);
        await writeFile(fullPath, '', { flag: 'wx' });
        console.log(`${colors.green}File created: ${fullPath}${colors.reset}`);
    } catch (err) {
        console.log(`${colors.red}Operation failed: ${err.message}${colors.reset}`);
    }
};

export const renameFile = async (oldPath, newPath) => {
    try {
        const resolvedOldPath = resolve(cwd(), oldPath);
        const resolvedNewPath = resolve(cwd(), newPath);
        await rename(resolvedOldPath, resolvedNewPath);
        console.log(`${colors.green}Renamed file from ${resolvedOldPath} to ${resolvedNewPath}${colors.reset}`);
    } catch (err) {
        console.log(`${colors.red}Operation failed: ${err.message}${colors.reset}`);
    }
};

export const copyFileToDestination = async (srcPath, destPath) => {
    try {
        const resolvedSrc = resolve(cwd(), srcPath);
        const resolvedDest = resolve(cwd(), destPath);
        await copyFile(resolvedSrc, resolvedDest);
        console.log(`${colors.green}Copied file from ${resolvedSrc} to ${resolvedDest}${colors.reset}`);
    } catch (err) {
        console.log(`${colors.red}Operation failed: ${err.message}${colors.reset}`);
    }
};

export const removeFile = async filePath => {
    try {
        const resolvedPath = resolve(cwd(), filePath);
        await unlink(resolvedPath);
        console.log(`${colors.green}Removed file: ${resolvedPath}${colors.reset}`);
    } catch (err) {
        console.log(`${colors.red}Operation failed: ${err.message}${colors.reset}`);
    }
};

export const moveFile = async (srcPath, destPath) => {
    try {
        await copyFileToDestination(srcPath, destPath);
        await removeFile(srcPath);
        console.log(`${colors.green}Moved file from ${srcPath} to ${destPath}${colors.reset}`);
    } catch (err) {
        console.log(`${colors.red}Operation failed: ${err.message}${colors.reset}`);
    }
};
